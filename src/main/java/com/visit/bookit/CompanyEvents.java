package com.visit.bookit;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Class that represents Company Events
 */
public class CompanyEvents {

    @JsonProperty("eventName")
    private String eventName;

    @JsonProperty("location")
    private String location;

    @JsonProperty("date")
    private String date;

    @JsonProperty("duration")
    private String duration;

    @JsonProperty("employeeName")
    private String employeeName;

    @JsonProperty("price")
    private int price;

    /**
     * Constructor for the class.
     * @param eventName
     * @param location
     * @param date
     * @param duration
     * @param employeeName
     * @param price
     */
    public CompanyEvents(String eventName, String location, String date, String duration,String employeeName, int price) {
        this.eventName = eventName;
        this.location = location;
        this.date = date;
        this.duration = duration;
        this.employeeName = employeeName;
        this.price = price;
    }
}
