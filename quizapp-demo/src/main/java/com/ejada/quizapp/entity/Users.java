package com.ejada.quizapp.entity;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class Users  {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "username")
    private String userName;

    @Column(name = "password")
    private String password;

    @Column(name = "enabled")
    private int active;

    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<Authorities> authorities;

    public Users() {
    }

    public Users(String username, String password, int enabled) {
        this.userName = username;
        this.password = password;
        this.active = enabled;
    }	
	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassWord() {
		return password;
	}

	public void setPassWord(String passWord) {
		this.password = passWord;
	}


	   public List<Authorities> getAuthorities() {
	        return authorities;
	    }

	    public void setAuthorities(List<Authorities> authorities) {
	        this.authorities = authorities;
	    }

	    
	public int getActive() {
			return active;
		}

		public void setActive(int active) {
			this.active = active;
		}



	@Override
	public String toString() {
		return "Users [username=" + userName + ", passWord=" + password + "]";
	}

	
}
