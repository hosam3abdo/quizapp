package com.ejada.quizapp.config.jwt;

public class JwtProperties {
    public static final String SECRET = "QUIZSECRET";  // Replace with a strong, random secret key
    public static final long EXPIRATION_TIME = 864_000_000;  // 10 days in milliseconds
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

}
