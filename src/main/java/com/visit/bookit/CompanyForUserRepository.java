package com.visit.bookit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Repository of Company View for User
 */
@Repository
public class CompanyForUserRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    /**
     * Method to get all companies for user from database.
     * @return List with location, companyId and tags for all companies
     */
    public List<Map<String, Object>> getAll() {

        return jdbcTemplate.queryForList("SELECT c.location, ct.companyID, t.tagName FROM company c JOIN companytags ct ON c.companyID = ct.companyID" +
                " JOIN tags t ON ct.tagID = t.tagID;", BeanPropertyRowMapper.newInstance(CompanyForUser.class));
    }

    /**
     * Method to get events by company id.
     * @return List of companyID, location and eventDateTime.
     */
    public List<Map<String, Object>> getById(int companyId) {
        return (List<Map<String, Object>>) jdbcTemplate.queryForObject("SELECT company.companyID, company.location, calendarevents.eventDateTime " +
                "FROM company " +
                "JOIN eventdetails ON company.companyID = eventdetails.companyID " +
                "JOIN calendarevents ON eventdetails.eventDetailsID = calendarevents.eventDetailsID" +
                " WHERE companyID = ?;", BeanPropertyRowMapper.newInstance(CompanyForUser.class),
                companyId);
    }
}
