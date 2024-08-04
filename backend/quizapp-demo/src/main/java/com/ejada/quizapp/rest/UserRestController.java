package com.ejada.quizapp.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ejada.quizapp.entity.Authorities;
import com.ejada.quizapp.entity.Users;
import com.ejada.quizapp.exception.ResponseMissingException;
import com.ejada.quizapp.service.UserDetailsServices;

@RestController
@RequestMapping("/users")
public class UserRestController {
	
	@Autowired
	private UserDetailsServices detailsService;
	
	
	

	@PostMapping("/add-user")
	public Users addUser(@RequestBody Users user) {
		
		return detailsService.saveUser(user);
	}
	
	@DeleteMapping("/delete-user/{userId}")
	public String deleteUser(@PathVariable int userId ) {
		
		Users users = detailsService.findbyId(userId);
		if(users == null) {
			throw new ResponseMissingException("user not found : " +userId);
		}
		
		detailsService.deleteUserbyid(userId);
		
		return "the user is deleted with id : " + userId ;
		}
	
	
	
	
	@PostMapping("/add-authority")
	public Authorities addAuthorityToUser(@RequestBody Authorities authority) {
		return detailsService.addAuthority( authority);
    }
	
	
	
}
