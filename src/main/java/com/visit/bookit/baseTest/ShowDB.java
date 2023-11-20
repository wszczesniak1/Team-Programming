package com.visit.bookit.baseTest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ShowDB {
    @Autowired
    JdbcTemplate jdbcTemplate;

    //pokazuj wszystko dodane do tabeli users
    public List<BookitBD> getAllUsers()
    {
        //return jdbcTemplate.query("SELECT userID, firstName, lastName, emailAddress, phoneNumber FROM users",
        //        BeanPropertyRowMapper.newInstance(BookitBD.class));
        return jdbcTemplate.query("SELECT * FROM users", BeanPropertyRowMapper.newInstance(BookitBD.class));
    }
}
