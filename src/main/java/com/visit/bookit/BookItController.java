package com.visit.bookit;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class BookItController {

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password, @RequestParam String loginType, RedirectAttributes redirectAttributes) {
        
        if(loginType.equals("user")) {
            if (isValidUser(email, password)) {
                redirectAttributes.addFlashAttribute("email", email);
                int userId = 123;
                return "redirect:/userhome?userId=" + userId;
            } else {

                return "redirect:/login";
            }
        } else if (loginType.equals("company")){
            if (isValidUser(email, password)) {
                redirectAttributes.addFlashAttribute("email", email);
                return "redirect:/companyhome";
            } else {

                return "redirect:/login";
            }

        }   else {
            return "redirect:/login";
        }
    }

    @GetMapping("/login")
    public String loginpage() {
        return "loginpage";
    }

    @GetMapping("/register")
    public String registerpage() {
        return "registerpage";
    }

    @GetMapping("/redirectUserToCompany/{companyId}")
    public String redirectUser(@PathVariable int companyId) {
        return "redirect:/companyhome?companyId=" + companyId;
    }

    @GetMapping("/userhome")
    public String userHomePage(Model model) {
        return "userhomepage";
    }

        @GetMapping("/companyhome")
    public String companyHomePage(Model model) {
        return "companyhomepage";
    }

    private boolean isValidUser(String email, String password) {
        //some logic goes here 
        return true;  
    }

    public class UserAppointments implements Serializable{
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
    

        public UserAppointments(String companyName, String location, String date, String time, int companyID) {
            this.companyName = companyName;
            this.location = location;
            this.date = date;
            this.time = time;
            this.companyID = companyID;
        }
    }

    @GetMapping("/getUserAppo/{userId}")
    public ResponseEntity<List<UserAppointments>> getUserItems(@PathVariable int userId) {

        List<UserAppointments> userItems = new ArrayList<>();
        userItems.add(new UserAppointments("firma 1", "New York", "21-12-2023", "10:31", userId));
        userItems.add(new UserAppointments("firma 2", "Warsaw", "21-11-2023", "12:21", userId));
        userItems.add(new UserAppointments("firma 3", "Chicago", "30-12-2023", "11:11", userId));
        userItems.add(new UserAppointments("firma 4", "New Britain", "11-10-2024", "12:13", userId));
        return ResponseEntity.ok(userItems);
    }

    public class CompanyForUser implements Serializable{
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

    @GetMapping("/serachForCompanies")
    public ResponseEntity <List<CompanyForUser>> searchForCompanies(@RequestParam String str) {
        List<CompanyForUser> companyList = new ArrayList<>();
        companyList.add(new CompanyForUser("company name 1", "new york 123W st.", List.of("tag1", "tag2"), 1));
        companyList.add(new CompanyForUser("company name 2", "chicago 1W st.", List.of("tag3", "tag4"), 2));
        companyList.add(new CompanyForUser("company name 3", "los angeles 1W st.", List.of("tag1", "tag2", "tag3"), 3));
        companyList.add(new CompanyForUser("company name 4", "los santos 1W st.", List.of("tag1", "tag2"), 4));
        companyList.add(new CompanyForUser("company name 5", "berlin 13 st.", List.of("tag1", "tag2"), 5));
        companyList.add(new CompanyForUser("company name 6", "asdassdasd.", List.of("tag1", "tag2"), 6));
        companyList.add(new CompanyForUser("company name 7", "dsdadasdddd.", List.of("tag1", "tag2"), 7));
        companyList.add(new CompanyForUser("company name 8", "nie chce mi sie wymyslac", List.of("tag1", "tag2"), 8));
        return ResponseEntity.ok(companyList);
    }
}
