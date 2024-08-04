package com.ejada.quizapp.rest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import com.ejada.quizapp.config.model.LoginRequest;


@RestController
public class AuthController {
	
	
	 @PostMapping("/login")
	 public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
	        
	        String token = generateJwtToken(loginRequest.getUsername());
	        return ResponseEntity.ok().header("Authorization", "Bearer " + token).build();
	 }
	 
	 
	@PostMapping("/logout")
	public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    if (auth != null) {
	        new SecurityContextLogoutHandler().logout(request, response, auth);
	    }
	    request.getSession().invalidate();
	    SecurityContextHolder.clearContext();
	    return ResponseEntity.ok("logout successful");
	}
	private String generateJwtToken(String username) {
   
        return "your_generated_token_here";
    }
}