package com.klef.sdp.controller;

import com.klef.sdp.dto.TaskDTO;
import com.klef.sdp.model.Admin;
import com.klef.sdp.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/task/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Admin Signup
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Admin admin) {
        if (adminService.registerAdmin(admin) != null) {
            return ResponseEntity.ok("Admin registered successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Signup failed!");
        }
    }

    // Admin Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {
        Admin loggedIn = adminService.loginAdmin(admin.getUsername(), admin.getPassword());
        if (loggedIn != null) {
            Map<String, Object> res = new HashMap<>();
            res.put("message", "Login successful");
            res.put("username", loggedIn.getUsername());
            return ResponseEntity.ok(res);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials!");
        }
    }

    // Fetch all tasks with usernames
    @GetMapping("/alltasks")
    public List<TaskDTO> getAllTasks() {
        return adminService.getAllTasks();
    }
}
