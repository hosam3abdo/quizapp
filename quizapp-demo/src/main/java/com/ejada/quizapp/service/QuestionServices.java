package com.ejada.quizapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ejada.quizapp.entity.Question;
import com.ejada.quizapp.entity.QuizAnswer;
import com.ejada.quizapp.exception.ResponseMissingException;
import com.ejada.quizapp.repo.QuestionRepo;

@Service
public class QuestionServices {

	@Autowired
	private QuestionRepo questionDao;
	
	
	public List<Question> getAllQuestions(){
	return questionDao.findAll();	
		}
	
	public Question findbyId(int id) {
		
		Optional<Question> result = questionDao.findById(id);
		
		Question question = null;
		if(result.isPresent()) {
			question = result.get();
		}
		else {
			throw new ResponseMissingException("question not found with id  : " + id);
		}
		return question;
	}
	
	public Question saveQuestion(Question question) {
		questionDao.save(question);
		return question;
	}
	
	public void deletebyid(int id) {
		questionDao.deleteById(id);	
	}
	

	

	 
	public int calculateResult(List<QuizAnswer> responses , int userid
			, int quizid ) {
		 int right = 0;

		    for (QuizAnswer response : responses) {
		        Question question = questionDao.findById(response.getQuestion().getId()).orElse(null);
		        if (question != null && response.getResponse().equals(question.getCorrectAnswer())) {
		            right++;
		        }
		    }
		    
		    return right;
	}
	 
	public List<Question> getQuestionsByQuizId(int quizId) {
	    return questionDao.findByQuizId(quizId);
	}
	 
	
	 
		
}
