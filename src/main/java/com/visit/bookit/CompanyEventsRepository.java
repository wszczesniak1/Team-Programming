package com.visit.bookit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Repository of Company Events
 */
@Repository
public class CompanyEventsRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    /**
     * Method to get all possible events for user from database.
     * @return List of events.
     */
    public List<Map<String, Object>> getById(int companyId) {
        return (List<Map<String, Object>>) jdbcTemplate.queryForObject("SELECT ed.eventName, ce.eventDateTime, ce.duration, ce.price, e.employeeName " +
                        "FROM eventdetails ed " +
                        "JOIN calendarevents ce ON ed.eventDetailsID = ce.eventDetailsID " +
                        "JOIN eventemployee ee ON ce.eventDetailsID = ee.eventDetailsID " +
                        "JOIN employee e ON ee.employeeID = e.employeeID;" +
                        " WHERE companyID = ?;", BeanPropertyRowMapper.newInstance(CompanyEvents.class),
                companyId);
    }


}

