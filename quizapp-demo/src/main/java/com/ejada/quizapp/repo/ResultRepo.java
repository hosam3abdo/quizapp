package com.ejada.quizapp.repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ejada.quizapp.entity.Result;

@Repository
public interface ResultRepo extends JpaRepository<Result, Integer> {
	
	 Result findById(int id);
	
	 List<Result> findByQuizId(int quizId);
	 List<Result> findByUserId(int userId);
	 
	 List<Result> findByUserIdAndQuizId(int userId,int quizId);
}
