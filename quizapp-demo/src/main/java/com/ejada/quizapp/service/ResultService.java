package com.ejada.quizapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ejada.quizapp.entity.QuizAnswer;
import com.ejada.quizapp.entity.Result;
import com.ejada.quizapp.repo.QuizAnswerRepo;
import com.ejada.quizapp.repo.ResultRepo;

@Service
public class ResultService {
	
	@Autowired
	private ResultRepo resultRepo ;
	
	@Autowired
	private QuizAnswerRepo quizAnswerDao;
	
	public List<Result> findResultByUserId(int userid , int quizid) {
		return resultRepo.findByUserIdAndQuizId(userid, quizid);
		
	}

	public List<QuizAnswer> findAnswersByResultId(int resultId){
		return quizAnswerDao.findByResultId(resultId);
	}
	
	public void deleteResult(int userId) {
		resultRepo.deleteById(userId);
	}
}
