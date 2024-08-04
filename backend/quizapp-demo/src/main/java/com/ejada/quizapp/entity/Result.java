package com.ejada.quizapp.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "result")
public class Result {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
    private int id;
	
	@Column(name = "score")
	private int score;
	
	@Column(name = "user_id")
	private int userId;
	
	@Column(name = "quiz_id")
	private int quizId;
	
	public Result() {}

	public Result(int right, int user , int quiz) {
		this.score = right;
		this.userId = user;
		this.quizId = quiz;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getUser() {
		return userId;
	}

	public void setUser(int user) {
		this.userId = user;
	}
	

	public int getQuiz() {
		return quizId;
	}

	public void setQuiz(int quiz) {
		this.quizId = quiz;
	}

	@Override
	public String toString() {
		return "Result [id=" + id + ", score=" + score + "]";
	}
	
	
	
}
