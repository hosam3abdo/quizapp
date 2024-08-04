package com.ejada.quizapp.entity;

public class JwtLogin {

	private String username;
	
	private String password;
	
	public JwtLogin() {}

	public JwtLogin(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
}
