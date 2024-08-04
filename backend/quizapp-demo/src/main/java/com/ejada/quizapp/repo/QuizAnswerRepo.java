package com.ejada.quizapp.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ejada.quizapp.entity.QuizAnswer;

public interface QuizAnswerRepo extends JpaRepository<QuizAnswer, Integer> {

	List<QuizAnswer> findByResultId(int resultId);
	
	void deleteByResultId(int resultId);
	
}
