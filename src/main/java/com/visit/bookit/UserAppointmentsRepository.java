package com.visit.bookit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class UserAppointmentsRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;
    public List<Map<String, Object>> getAll() {

        return jdbcTemplate.queryForList("SELECT company.companyID, company.location, calendarevents.eventDateTime " +
                "FROM company" +
                "JOIN eventdetails ON company.companyID = eventdetails.companyID " +
                "JOIN calendarevents ON eventdetails.eventDetailsID = calendarevents.eventDetailsID;", BeanPropertyRowMapper.newInstance(UserAppointments.class));
    }

}
