package com.ejada.quizapp.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "authorities")
public class Authorities {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users users;

    @Column(name = "authority")
    private String authority;

    public Authorities() {
    }

    public Authorities(Users user, String authority) {
        this.users = user;
        this.authority = authority;
    }
    
	public Users getUsers() {
		return users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	@Override
	public String toString() {
		return "Authorities [users=" + users + ", authority=" + authority + "]";
	}
	

}
