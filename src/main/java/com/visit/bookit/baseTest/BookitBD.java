package com.visit.bookit.baseTest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookitBD {
    //odpowiadaja columna w tabeli users
    private int userID;
    private String firstName;
    private String lastName;
    private String emailAddress;
    private String phoneNumber;

}
