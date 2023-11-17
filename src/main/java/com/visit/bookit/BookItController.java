package com.visit.bookit;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookItController {

    @GetMapping("/test")
    public int test() {
        return 1;
    }
}
