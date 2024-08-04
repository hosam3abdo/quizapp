package com.ejada.quizapp.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ejada.quizapp.entity.QuizAnswer;
import com.ejada.quizapp.entity.Result;
import com.ejada.quizapp.exception.ResponseMissingException;
import com.ejada.quizapp.service.ResultService;

@RestController
@RequestMapping("/result")
public class resultController {
	
	@Autowired
	private ResultService resultService;

    @GetMapping("/user/{userid}/quiz/{quizid}")
    public List<Result> getResultByUserIdAndQuizId(@PathVariable int userid , @PathVariable int quizid){
        
    	List<Result> result= resultService.findResultByUserId(userid, quizid) ;
    	if(result.isEmpty() ) {
    		throw new ResponseMissingException("this user with id : " + userid +
    				" did not answer the quiz with id : " + quizid + " before");
    	}
    	return result;
    }

    @GetMapping("/resultid/{resultid}")
    public List<QuizAnswer> getAnswersByResultId(@PathVariable int resultid){
    	
    	List<QuizAnswer> answers = resultService.findAnswersByResultId(resultid);
    	return answers;
    }
}
