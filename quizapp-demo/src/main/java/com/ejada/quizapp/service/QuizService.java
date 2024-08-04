package com.ejada.quizapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ejada.quizapp.entity.Question;
import com.ejada.quizapp.entity.Quiz;
import com.ejada.quizapp.entity.QuizAnswer;
import com.ejada.quizapp.entity.Result;
import com.ejada.quizapp.entity.Users;
import com.ejada.quizapp.exception.ResponseMissingException;
import com.ejada.quizapp.repo.QuizRepo;
import com.ejada.quizapp.repo.ResultRepo;
import com.ejada.quizapp.repo.UserRepo;

@Service
public class QuizService {

	
	
	@Autowired
	private QuizRepo quizDao;
	
	@Autowired
	private  FetchService fetchService;
    
	@Autowired
	private  QuestionServices questionService;
    
	@Autowired
	private  QuizAnswerService assessmentService;
    
	@Autowired
	private  ResultRepo resultDao;
    
	@Autowired
	private  UserRepo userDao;
	
	public List<Quiz> getAllQuizes(){
		return quizDao.findAll();	
			}
	
	public Quiz saveQuiz(Quiz quiz) {
		quizDao.save(quiz);
		return quiz;
	}
	
	public void deleteQuizbyid(int id) {
		quizDao.deleteById(id);
		
	}
	


	 public int submitQuestion(List<QuizAnswer> responses, int userid,
			 int quizid, String loggedInUsername) {
	        Users loggedInUser = userDao.findByUserName(loggedInUsername);

	        if (loggedInUser == null || loggedInUser.getId() != userid) {
	            throw new ResponseMissingException(
	            		"The authenticated user does not match the requested user ID");
	        }

	        Users user = fetchService.getUserById(userid);
	        Quiz quiz = fetchService.getQuizById(quizid);

	        if (user == null) {
	            throw new ResponseMissingException("User not found: " + userid);
	        }
	        if (quiz == null) {
	            throw new ResponseMissingException("Quiz not found: " + quizid);
	        }

	        List<Question> quizQuestions = questionService.getQuestionsByQuizId(quizid);

	        if (responses.size() != quizQuestions.size()) {
	            throw new ResponseMissingException(
	            		"You should answer all the questions for the quiz");
	        }

	        Result result = new Result();
	        result.setUser(userid);
	        result.setQuiz(quizid);
	        Result savedResult = resultDao.save(result);

	        int resultId = savedResult.getId();

	        for (QuizAnswer response : responses) {
	            response.setResultId(resultId);

	            Question question = fetchService.getQuestionById(response.getQuestion().getId());
	            if (question != null) {
	                response.setQuestion(question);
	            } else {
	                throw new ResponseMissingException("Question not found");
	            }

	            if (question.getQuizId() != quizid) {
	                throw new ResponseMissingException(
	                	"Question " + response.getQuestion().getId() + 
	                	" does not belong to quiz " + quizid);
	            }

	            response.setQuestion(question);
	        }

	        assessmentService.saveAllAnswers(responses);
	        int finalScore = questionService.calculateResult(responses, userid, quizid);
	        savedResult.setScore(finalScore);
	        resultDao.save(savedResult);

	        return finalScore;
	    }
}
