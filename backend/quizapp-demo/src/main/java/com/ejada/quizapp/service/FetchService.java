package com.ejada.quizapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ejada.quizapp.entity.Question;
import com.ejada.quizapp.entity.Quiz;
import com.ejada.quizapp.entity.Result;
import com.ejada.quizapp.entity.Users;
import com.ejada.quizapp.repo.QuestionRepo;
import com.ejada.quizapp.repo.QuizRepo;
import com.ejada.quizapp.repo.ResultRepo;
import com.ejada.quizapp.repo.UserRepo;


@Service
public class FetchService {

		@Autowired
	    private UserRepo userRepository;

	    @Autowired
	    private QuizRepo quizRepository;

	    @Autowired
	    private QuestionRepo questionRepository;
	    
	    @Autowired
	    private ResultRepo resultDao;

	    
	    public Users getUserById(int userid) {
	        Users user = userRepository.findById(userid);
	        return user;
	    }

	    public Quiz getQuizById(int quizId) {
	        Quiz quiz = quizRepository.findById(quizId);
	        return quiz;
	    }
	    
	    public Result getresultById(int resultid) {
	        Result result = resultDao.findById(resultid);
	        return result;
	    }

	    public Question getQuestionById(int questionId) {
	        java.util.Optional<Question> question = questionRepository.findById(questionId);
	        return question.orElseThrow(() -> new RuntimeException("Question not found with id: " + questionId));
	    }
}
