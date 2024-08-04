package com.ejada.quizapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ejada.quizapp.entity.Quiz;

public interface QuizRepo extends JpaRepository<Quiz, Integer> {

	Quiz findById(int id);
}
