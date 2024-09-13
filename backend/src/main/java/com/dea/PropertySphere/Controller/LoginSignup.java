package com.dea.PropertySphere.Controller;


import com.dea.PropertySphere.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "api/v1/login")

public class LoginSignup {

    @Autowired
    UserService userService;
    @PostMapping(value = "/auth")
    public String Authenticate(@RequestBody Map<String, String> payload){
        String password = payload.get("password");
        if(userService.fetchUser(password)){
            return "Redirect Function";
        }
        else {
            return "Nice try hahahahahahaha";
        }
    }
}
