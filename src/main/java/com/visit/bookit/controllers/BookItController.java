package com.visit.bookit.controllers;

import com.visit.bookit.baseTest.BookitBD;
import com.visit.bookit.baseTest.ShowDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * First class to test basic controllers
 */
@RestController
public class BookItController {

    @GetMapping("/test")
    public int test() {
        return 1;
    }

    @Autowired
    ShowDB showUsers;

    @GetMapping("/users")
    public List<BookitBD> getAllUsers() {
        return showUsers.getAllUsers();
    }

}
