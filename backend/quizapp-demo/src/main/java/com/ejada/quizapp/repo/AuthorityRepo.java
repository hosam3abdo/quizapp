package com.ejada.quizapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ejada.quizapp.entity.Authorities;

public interface AuthorityRepo extends JpaRepository<Authorities, Integer> {

	void deleteByUsers(int userId);
}
