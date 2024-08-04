package com.ejada.quizapp.config;

import com.ejada.quizapp.config.jwt.JwtAuthenticationFilter;
import com.ejada.quizapp.config.jwt.JwtAuthorizationFilter;
import com.ejada.quizapp.repo.UserRepo;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private UserRepo userDao;

    private final UserDetailsService userDetailsService;

    public SecurityConfig(UserDetailsService userDetailsService , UserRepo userDao) {
        this.userDetailsService = userDetailsService;
        this.userDao = userDao;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }


    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
        .cors().and()
       .authorizeRequests()
        .antMatchers(HttpMethod.POST,"/login").permitAll()
        .antMatchers(HttpMethod.POST,"/logout").permitAll()
        .antMatchers("/question/get-question-by-quizid/{quizid}").hasAnyRole("USER","ADMIN")
        .antMatchers("/quiz/getquizes").hasAnyRole("USER","ADMIN")
        .antMatchers("/question/**").hasRole("ADMIN")
        .antMatchers("/quiz/submit").hasAnyRole("USER","ADMIN")
        .antMatchers("/quiz/**").hasRole("ADMIN")
        .antMatchers("/users/**").hasRole("ADMIN")
        .antMatchers("/result/**").hasRole("ADMIN")
            .and().logout().logoutSuccessHandler((request, response, authentication) -> {
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().flush();
            })
            .invalidateHttpSession(true).and()
            .addFilter(new JwtAuthenticationFilter(authenticationManagerBean()))
            .addFilter(new JwtAuthorizationFilter(authenticationManagerBean(),this.userDao))
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    };
    
  
}
