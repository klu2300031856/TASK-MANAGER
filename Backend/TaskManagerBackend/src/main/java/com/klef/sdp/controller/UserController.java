package com.klef.sdp.controller;

import com.klef.sdp.model.User;
import com.klef.sdp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/task/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    // Signup
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User saved = userService.registerUser(user);

            Map<String, Object> res = new HashMap<>();
            res.put("message", "Signup successful");
            res.put("username", saved.getUsername());

            return ResponseEntity.ok(res);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User loggedIn = userService.loginUser(user.getUsername(), user.getPassword());
        if (loggedIn != null) {
            Map<String, Object> res = new HashMap<>();
            res.put("message", "Login successful");
            res.put("username", loggedIn.getUsername());
            // if later you add JWT, put token here
            return ResponseEntity.ok(res);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
        }
    }
}
