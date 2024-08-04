package com.ejada.quizapp.config.model;

public class LoginRequest {
    private String userName;
    private String passWord;

    public String getUsername() {
        return userName;
    }

    public void setUsername(String username) {
        this.userName = username;
    }

    public String getPassword() {
        return passWord;
    }

    public void setPassWord(String password) {
        this.passWord = password;
    }
}