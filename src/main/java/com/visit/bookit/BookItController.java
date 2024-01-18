package com.visit.bookit;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class BookItController {

    //* CHANDLE LOGIN */

    @PostMapping("/companyRegister")
    public String compRegister(@PathVariable String name, @PathVariable String street, @PathVariable String city, @PathVariable String phone, @PathVariable String email, @PathVariable String password){

        System.out.println(name + " " + street + " " + phone);
        //* Add company to Db and redirect to login page, or return 0 if already exists, can be as string like return "0"; 

        return "redirect:/login";
    }

    @PostMapping("/userRegister")
    public String userRegister(@PathVariable String user_fname, @PathVariable String user_lname, @PathVariable String user_email, @PathVariable String user_phone, @PathVariable String user_password, @PathVariable String user_redopassword){

        System.out.println(user_fname + " " + user_lname + " " + user_phone);
        //* Add user to Db and redirect to login page, or return 0 if already exists, can be as string like return "0"; 

        return "redirect:/login";
    }

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

    //* REGISTER handling will be added later */


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

    @GetMapping("/redirectUserToCompany/{companyId}/{userId}")
    public String redirectUser(@PathVariable int companyId, @PathVariable int userId) {
        System.out.println("blablabla");
        return "redirect:/usercalendar?companyId=" + companyId + "&userId=" + userId;
    }

    @GetMapping("/redirectToCalendar/{companyId}")
    public String redirectCalendar(@PathVariable int companyId) {
        return "redirect:/companycalendar?companyId=" + companyId;
    }

    @GetMapping("/userhome")
    public String userHomePage(Model model) {
        return "userhomepage";
    }

    @GetMapping("/usercalendar")
    public String userCalendarPage(Model model) {
        return "usercalendar";
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


    @GetMapping("/getUserInfo/{userId}")
    public ResponseEntity<Map<String,String>> getUserInfo(@PathVariable int userId) {
        Map<String, String> userMap = new HashMap<>();
        userMap.put("email", "thatsUserEmail@gmail.com");

        return ResponseEntity.ok(userMap);
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
        Int appointmentId;
        } */
    //* Variables need to have @JsonProperty("name") with exact "name" as listed in Object() for JSON corectness?? huh this word

    @Autowired
    UserAppointmentsRepository userAppointmentsRepository;
    @GetMapping("/getUserAppo/{userId}")
    public ResponseEntity<List<UserAppointments>> getUserItems(@PathVariable int userId) {

        // user id change to appo id or company id not sure yet
//        List<UserAppointments> userItems = new ArrayList<>();
//        userItems.add(new UserAppointments("firma 1", "New York", "21-12-2023", "10:31", userId));
//        userItems.add(new UserAppointments("firma 2", "Warsaw", "21-11-2023", "12:21", userId));
//        userItems.add(new UserAppointments("firma 3", "Chicago", "30-12-2023", "11:11", userId));
//        userItems.add(new UserAppointments("firma 4", "New Britain", "11-10-2024", "12:13", userId));
        return (ResponseEntity<List<UserAppointments>>) userAppointmentsRepository.getAll();
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
    //* Variables need to have @JsonProperty("name") with exact "name" as listed in Object() for JSON correctness?? huh this word

    @Autowired
    CompanyForUserRepository companyForUserRepository;
    @GetMapping("/serachForCompanies")
    public ResponseEntity <List<CompanyForUser>> searchForCompanies(@RequestParam String str) {
//        List<CompanyForUser> companyList = new ArrayList<>();
//        companyList.add(new CompanyForUser("company name 1", "new york 123W st.", List.of("tag1", "tag2"), 1));
//        companyList.add(new CompanyForUser("company name 2", "chicago 1W st.", List.of("tag3", "tag4"), 2));
//        companyList.add(new CompanyForUser("company name 3", "los angeles 1W st.", List.of("tag1", "tag2", "tag3"), 3));
//        companyList.add(new CompanyForUser("company name 4", "los santos 1W st.", List.of("tag1", "tag2"), 4));
//        companyList.add(new CompanyForUser("company name 5", "berlin 13 st.", List.of("tag1", "tag2"), 5));
//        companyList.add(new CompanyForUser("company name 6", "asdassdasd.", List.of("tag1", "tag2"), 6));
//        companyList.add(new CompanyForUser("company name 7", "dsdadasdddd.", List.of("tag1", "tag2"), 7));
//        companyList.add(new CompanyForUser("company name 8", "nie chce mi sie wymyslac", List.of("tag1", "tag2"), 8));

        return (ResponseEntity<List<CompanyForUser>>) companyForUserRepository.getAll();
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

//        // baza danych
//        System.out.println("aaaasaaaaaaassasassasasas");
//        Map<String, String> companyMap = new HashMap<>();
//        companyMap.put("aboutus", "about company 1");
//        companyMap.put("address", "main street");
//        companyMap.put("city", "newington CT");
//        companyMap.put("email", "jakisemail@gmail.com");
//        companyMap.put("telephone", "123456789");
//        companyMap.put("tags", "#haircut #beauty");

        return (ResponseEntity<Map<String, String>>) companyForUserRepository.getById(companyId);
    }

    // companyEvents
    @Autowired
    CompanyEventsRepository companyEventsRepository;
    @GetMapping("/getEventsFromCompany/{companyId}")
    public ResponseEntity<List<Integer>> getCompanyEvents(@PathVariable int companyId) {
        

        //* return list of objects companyEvents where is :
            // title
            // time that event starts
            // duration of event
            // date of event
            // price
            // employee name
//        List<Integer> arrayList = new ArrayList<>();
//        arrayList.add(3);
//        arrayList.add(3);
//        arrayList.add(3);
//
//        return ResponseEntity.ok(arrayList);

        return (ResponseEntity<List<Integer>>) companyEventsRepository.getById(companyId);
    }

    @PostMapping("/putEventToDatabase/{companyId}")
    public void putEvent( @RequestBody String data, @PathVariable int companyId){

        // put event to db with id of company
        System.out.println("event to company " + data + " " + companyId);
    }

    // companyEvents
    @GetMapping("/getEventsFromCompanyForUser/{companyId}")
    public ResponseEntity<List<Integer>> getCompanyEventsForUser(@PathVariable int companyId) {
        

        //* return list of objects companyEvents where is :
        //! Return only events that are for reservation not that are already reserved cuz they are for user view
            // title
            // time that event starts
            // duration of event
            // date of event
            // price
            // employee name
        List<Integer> arrayList = new ArrayList<>();
        arrayList.add(2);
        arrayList.add(2);
        arrayList.add(2);

        return ResponseEntity.ok(arrayList);
    }

    // employee
    @GetMapping("/getCompanyEmployeeList/{companyId}")
    public ResponseEntity<List<Integer>> getEmployeeList(@PathVariable int companyId) {
        List<Integer> arrayList = new ArrayList<>();
        arrayList.add(0);
        arrayList.add(1);
        arrayList.add(2);

        return ResponseEntity.ok(arrayList);
        //* Return list of employees that company has from db
    }

    // EventsToAccept
    @GetMapping("/getCompanyReservationToAccept/{companyId}")
    public ResponseEntity<List<Integer>> getCompanyReservationToAccept(@PathVariable int companyId){

        List<Integer> arrayList = new ArrayList<>();
        arrayList.add(1);
        arrayList.add(1);
        arrayList.add(1);

        return ResponseEntity.ok(arrayList);
        //* Return list of events to accept by company id
    }

    @PostMapping("/sendUpdateAboutReservation/")
    public void sendUpdateAboutReservation(@RequestBody String data) {
        //* data is :
            // eventId
            // 1 / 0  ##### 1 - if accepted event by company, 0 if no

        //* Update  db for user events and delete from company to accept table
    }

    
    //* update reservation status
    //* update employee list
    //* update company info

}
