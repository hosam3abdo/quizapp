package com.ejada.quizapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ejada.quizapp.config.model.UserPrincipal;
import com.ejada.quizapp.entity.Authorities;
import com.ejada.quizapp.entity.Users;
import com.ejada.quizapp.exception.ResponseMissingException;
import com.ejada.quizapp.repo.AuthorityRepo;
import com.ejada.quizapp.repo.UserRepo;

@Service
public class UserDetailsServices implements UserDetailsService {


    private UserRepo userDao;

    @Autowired
    private AuthorityRepo authorityDao; 
    
    @Autowired
    public UserDetailsServices(UserRepo userDao) {
        this.userDao = userDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userDao.findByUserName(username);
        UserPrincipal userPrincipal = new UserPrincipal(user);
        return userPrincipal;
    }
    
    	public Users findbyId(int id) {
		
    		Users user = userDao.findById(id);
            if (user != null) {
                return user;
		}
		else {
			throw new ResponseMissingException("question not found with id  : " + id);
		}
	}
	
    
    public Users saveUser(Users user) {
		userDao.save(user);
		return user;
	}
    
    
    public void deleteUserbyid(int userId) {
    	
		userDao.deleteById(userId);	
	}
    
    public Authorities addAuthority(Authorities authority) {
        authorityDao.save(authority);
        return authority;
    }
    
    public void deleteAuthoritybyid(int id) {
		authorityDao.deleteByUsers(id);	
	}
    
   
}
