package com.ejada.quizapp.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ejada.quizapp.entity.QuizAnswer;
import com.ejada.quizapp.repo.QuizAnswerRepo;

import java.util.List;

@Service
public class QuizAnswerService {
    
	@Autowired
	private  QuizAnswerRepo assessmentAnswerDao;
   

    public void saveAllAnswers(List<QuizAnswer> responses) {
        assessmentAnswerDao.saveAll(responses);
    }
    
    public void deleteAnsweres(int resultId) {
    	
    	assessmentAnswerDao.deleteByResultId(resultId);
    }
}


