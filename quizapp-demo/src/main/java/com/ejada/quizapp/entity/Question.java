package com.ejada.quizapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "question")
public class Question {

		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name="id")
	    private int id;
	    
		@Column(name = "quiz_id")
		private Integer quizId;
	    
		@Column(name="question_text")
	    private String questionText;
	    
		@Column(name="correct_answer")
	    private String correctAnswer;
	    
		@Column(name="option_1")
	    private String option1;
	    
		@Column(name="option_2")
	    private String option2;
	    
		@Column(name="option_3")
	    private String option3;
	    
		@Column(name="option_4")
	    private String option4;
		
		public Question() {}

		

		public Question(int quizId, String questionText, String correctAnswer, String option1, String option2,
				String option3, String option4) {
			super();
			this.quizId = quizId;
			this.questionText = questionText;
			this.correctAnswer = correctAnswer;
			this.option1 = option1;
			this.option2 = option2;
			this.option3 = option3;
			this.option4 = option4;
		}



		public Integer getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		

		public String getQuestionText() {
			return questionText;
		}

		public void setQuestionText(String questionText) {
			this.questionText = questionText;
		}

		public String getCorrectAnswer() {
			return correctAnswer;
		}

		public void setCorrectAnswer(String correctAnswer) {
			this.correctAnswer = correctAnswer;
		}

		public String getOption1() {
			return option1;
		}

		public void setOption1(String option1) {
			this.option1 = option1;
		}

		public String getOption2() {
			return option2;
		}

		public void setOption2(String option2) {
			this.option2 = option2;
		}

		public String getOption3() {
			return option3;
		}

		public void setOption3(String option3) {
			this.option3 = option3;
		}

		public String getOption4() {
			return option4;
		}

		public void setOption4(String option4) {
			this.option4 = option4;
		}

		public int getQuizId() {
			return quizId;
		}

		public void setQuizId(int quizId) {
			this.quizId = quizId;
		}

		@Override
		public String toString() {
			return "Question [id=" + id + ", quizId=" + quizId + ", questionText=" + questionText + ", correctAnswer="
					+ correctAnswer + ", option1=" + option1 + ", option2=" + option2 + ", option3=" + option3
					+ ", option4=" + option4 + "]";
		}

		
		
}
