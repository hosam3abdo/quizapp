package com.ejada.quizapp.exception;

public class ResponseMissingException extends RuntimeException {

	
	private static final long serialVersionUID = 1L;

	public ResponseMissingException(String message) {
        super(message);
    }
}
