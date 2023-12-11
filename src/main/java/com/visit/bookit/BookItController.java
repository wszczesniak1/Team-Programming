package com.visit.bookit;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    
    //* 
    //* This classes can be changed or deleted, I used them to test frontend - Pawel
    //* If you want to delete this classes make sure you create different ones i can use to test frontend
    //* 
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

    //* 
    //* END of classes that can be changed
    //* 
    //* 


    //* CHANDLE LOGIN */

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password, @RequestParam String loginType, RedirectAttributes redirectAttributes) {
        
        if(loginType.equals("user")) {

            //* here we need to check if user email is in db and if credentials are correct */

            if (isValidUser(email, password)) {

                //* if they are correct, return their ID in @userId */

                redirectAttributes.addFlashAttribute("email", email); // i'll delete it later
                int userId = 123;
                return "redirect:/userhome?userId=" + userId;
            } else {

                return "redirect:/login";
            }
        } else if (loginType.equals("company")){

            //* here we need to check if company email is in db and if credentials are correct */
            if (isValidCompany(email, password)) {

                //* if they are correct, return their ID in @companyId */
                
                redirectAttributes.addFlashAttribute("email", email); // i'll delete it later
                int companyId = 321;
                return "redirect:/companyhome?companyId=" + companyId;
            } else {

                return "redirect:/login";
            }

        }   else {
            return "redirect:/login";
        }
    }

    //* REGISTER chandling will be added later */


    //* endpoints that dont need changes */

    @GetMapping("/login")
    public String loginpage() {
        return "loginpage";
    }

    @GetMapping("/register")
    public String registerpage() {
        return "registerpage";
    }

    @GetMapping("/redirectToCompany/{companyId}")
    public String redirectToComapny(@PathVariable int companyId) {
        return "redirect:/companyhome?companyId=" + companyId;
    }

    @GetMapping("/redirectUserToCompany/{companyId}")
    public String redirectUser(@PathVariable int companyId) {
        return "redirect:/companyhome?companyId=" + companyId;
    }

    @GetMapping("/redirectToCalendar/{companyId}")
    public String redirectCalendar(@PathVariable int companyId) {
        return "redirect:/companycalendar?companyId=" + companyId;
    }

    @GetMapping("/userhome")
    public String userHomePage(Model model) {
        return "userhomepage";
    }

    @GetMapping("/companyhome")
    public String companyHomePage(Model model) {
        return "companyhomepage";
    }

    @GetMapping("/companycalendar")
    public String companyCalendar(Model model){
        return "companycalendar";
    }

    //* END OF endpoints that dont need changes */
    

    //* Function to validate user, add logic */

    private boolean isValidUser(String email, String password) {
        //some logic goes here 
        return true;  
    }

    //* Function to validate company,  add logic*/

    private boolean isValidCompany(String email, String password) {
    //some logic goes here 
    return true;  
    }


    //* Function to get users appointment 
    //* INPUT: userId 
    //* OUTPUT: List < Object > 
    /* Where Object {
        String companyName;
        String location;
        String date;
        String time;
        Enum status; // can be just string with "pending", "accepted", "rejected"
        } */
    //* Variables need to have @JsonProperty("name") with exact "name" as listed in Object() for JSON corectness?? huh this word
    @GetMapping("/getUserAppo/{userId}")
    public ResponseEntity<List<UserAppointments>> getUserItems(@PathVariable int userId) {

        List<UserAppointments> userItems = new ArrayList<>();
        userItems.add(new UserAppointments("firma 1", "New York", "21-12-2023", "10:31", userId));
        userItems.add(new UserAppointments("firma 2", "Warsaw", "21-11-2023", "12:21", userId));
        userItems.add(new UserAppointments("firma 3", "Chicago", "30-12-2023", "11:11", userId));
        userItems.add(new UserAppointments("firma 4", "New Britain", "11-10-2024", "12:13", userId));
        return ResponseEntity.ok(userItems);
    }

    //* Function to get companies user search for
    //* INPUT: string, as what user typed in search bar 
    //* OUTPUT: List < Object > 
    /* Where Object {
        String companyName;
        String location;  //* Not sure about it, I guess we can divide location to city and address, will be easier
        List<String> tags;
        int companyID;
        } */
    //* Variables need to have @JsonProperty("name") with exact "name" as listed in Object() for JSON corectness?? huh this word

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

    //* Function to get company data from db for main page
    //* INPUT: companyId
    //* OUTPUT: < HashMap > or < Object >
    /* Where Object {
        String aboutus;
        String address;
        String city;
        String email;
        String phoneNumber;
        List<String> tags;
        int companyID;
        } */
    //* Variables need to have @JsonProperty("name") with exact "name" as listed in Object() for JSON corectness?? huh this word
    

    @GetMapping("/getCompanyData/{companyId}")
    public ResponseEntity <Map<String, String>> getCompanyData(@PathVariable int companyId) {


        // baza danych
        System.out.println("aaaasaaaaaaassasassasasas");
        Map<String, String> companyMap = new HashMap<>();
        companyMap.put("aboutus", "about company 1");
        companyMap.put("address", "main street");
        companyMap.put("city", "newington CT");
        companyMap.put("email", "jakisemail@gmail.com");
        companyMap.put("telephone", "123456789");
        companyMap.put("tags", "#haircut #beauty");

        return ResponseEntity.ok(companyMap);
    }

    //* TO BE ADDED */
    /* 
     * Function to get calendar data
     * Function to add employee ? 
     * More and more <3
     */
}
