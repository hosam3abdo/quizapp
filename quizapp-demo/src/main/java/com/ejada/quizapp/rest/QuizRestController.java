package com.ejada.quizapp.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ejada.quizapp.entity.Quiz;
import com.ejada.quizapp.exception.ResponseMissingException;
import com.ejada.quizapp.repo.QuizRepo;
import com.ejada.quizapp.service.QuizService;

@RestController
@RequestMapping("/quiz")
public class QuizRestController {
	
	@Autowired
	private QuizService quizServices;
	
	@Autowired
	private QuizRepo quizDao;
	
	
	@GetMapping("/getquizes")
	public List<Quiz> allQuizes() {
		return quizServices.getAllQuizes();
	    }
	
	public Quiz findbyId(int id) {
		// TODO Auto-generated method stub
		Optional<Quiz> result = Optional.of(quizDao.findById(id));
		
		Quiz quiz = null;
		if(result.isPresent()) {
			quiz = result.get();
		}
		else {
			throw new RuntimeException("nothing");
		}
		return quiz;
	}
	
	 @PostMapping("/addquiz")
	 public Quiz addQuiz(@RequestBody Quiz quiz) {
		 return quizServices.saveQuiz(quiz);
	 	}
 
 	@PutMapping("/updatequiz")
	public Quiz updateQuiz(@RequestBody Quiz quiz) {
 		quizServices.saveQuiz(quiz);
		return quiz;
	}
 	
	@DeleteMapping("/delete-quiz/{id}")
	public String deleteQuiz(@PathVariable int id ) {
		
		Quiz quiz =quizDao.findById(id);
		if(quiz == null) {
			throw new ResponseMissingException("quiz not found :"+id);
		}
		quizServices.deleteQuizbyid(id);
		return "the quiz is deleted with id : " + id ;
		}

}
