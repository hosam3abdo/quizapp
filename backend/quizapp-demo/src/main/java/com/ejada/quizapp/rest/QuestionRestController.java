package com.ejada.quizapp.rest;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ejada.quizapp.entity.Question;
import com.ejada.quizapp.exception.ResponseMissingException;
import com.ejada.quizapp.service.QuestionServices;
@RestController
@RequestMapping("/question")
public class QuestionRestController {

	
	
	@Autowired
	private QuestionServices questionServices;
	
	
	
	@Autowired
	public QuestionRestController(QuestionServices theQuestionServices) {
		questionServices = theQuestionServices;
	}

	@GetMapping("/getquestions")
	public List<Question> allQuestions() {
		return questionServices.getAllQuestions();
	    }
	
	@GetMapping("/get-question-by-quizid/{quizid}")
	public List<Question> getQuestionByQuizId(@PathVariable int quizid){
		return questionServices.getQuestionsByQuizId(quizid);
	}

 
	 @PostMapping("/{quizId}/addquestion")
	 public Question addQuestion(@RequestBody Question question, @PathVariable Integer quizId) {
		 Question q = new Question();
		 q.setQuizId(quizId);
		 return questionServices.saveQuestion(question);
	 	}
 
 	@PutMapping("/updatequestion")
	public Question updateEmployee(@RequestBody Question question) {
 		
 		if (question.getId() == null || question.getId() == 0) {
 	        throw new ResponseMissingException("Question ID is required for update");
 	    }
	 questionServices.saveQuestion(question);
		return question;
	}
 	
	@DeleteMapping("/deletequestion/{id}")
	public String deleteEmployee(@PathVariable int id ) {
		
		Question question = questionServices.findbyId(id);
		if(question == null ) {
			throw new ResponseMissingException("question not found : " +id);
		}
		questionServices.deletebyid(id);
		return "the question is deleted with id : " + id ;
		}
	
	
	
	 
}
	