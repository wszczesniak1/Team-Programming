package com.visit.bookit;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

/**
 * Class that represents User Appointments
 */
public class UserAppointments implements Serializable {
    @JsonProperty("companyName")
    private String companyName;

    @JsonProperty("location")
    private String location;

    @JsonProperty("date")
    private String date;

    @JsonProperty("time")
    private String time;

    @JsonProperty("userId")
    private int companyID;

    /**
     * Constructor for the class.
     * @param companyName
     * @param location
     * @param date
     * @param time
     * @param companyID
     */
    public UserAppointments(String companyName, String location, String date, String time, int companyID) {
        this.companyName = companyName;
        this.location = location;
        this.date = date;
        this.time = time;
        this.companyID = companyID;
    }
}