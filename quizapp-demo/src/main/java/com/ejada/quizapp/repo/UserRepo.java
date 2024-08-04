package com.ejada.quizapp.repo;


import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ejada.quizapp.entity.Users;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer> {

	 @EntityGraph(attributePaths = "authorities")
	
	Users findById(int id);

	Users findByUserName(String userName);
	
	

}
