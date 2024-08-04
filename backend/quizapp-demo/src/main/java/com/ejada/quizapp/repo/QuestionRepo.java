package com.ejada.quizapp.repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ejada.quizapp.entity.Question;

@Repository
public interface QuestionRepo extends JpaRepository<Question, Integer> {

	 List<Question> findByQuizId(int quizId);
}
