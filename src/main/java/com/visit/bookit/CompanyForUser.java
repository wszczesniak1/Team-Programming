package com.visit.bookit;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

/**
 * Class that represents Company View for User
 */
public class CompanyForUser implements Serializable {
    @JsonProperty("companyName")
    private String companyName;

    @JsonProperty("location")
    private String location;

    @JsonProperty("tags")
    private List<String> tags;

    @JsonProperty("companyID")
    private int companyID;


    public CompanyForUser(String companyName, String location, List<String> tags, int companyID) {
        this.companyName = companyName;
        this.location = location;
        this.tags = tags;
        this.companyID = companyID;
    }
}