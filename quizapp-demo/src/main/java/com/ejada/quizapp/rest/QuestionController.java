package com.ejada.quizapp.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ejada.quizapp.entity.QuizAnswer;
import com.ejada.quizapp.service.QuizService;

@RestController
@RequestMapping("/quiz")
public class QuestionController {

	
		@Autowired
		private QuizService quizService;
	
		
		 @PostMapping("/submit")
		 public ResponseEntity<Integer> submitQuestion(@RequestBody List<QuizAnswer> responses, 
				 @RequestParam("userid") int userid , @RequestParam("quizid") int quizid ){
			 
			 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		        String loggedInUsername = authentication.getName();

		        int finalScore = quizService.submitQuestion(responses, userid, quizid, loggedInUsername);

		        return ResponseEntity.ok(finalScore);
		 }
		
		
	 
}
