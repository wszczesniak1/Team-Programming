package com.visit.bookit;

import org.springframework.web.bind.annotation.GetMapping;
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
                return "redirect:/userhome";
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
}
