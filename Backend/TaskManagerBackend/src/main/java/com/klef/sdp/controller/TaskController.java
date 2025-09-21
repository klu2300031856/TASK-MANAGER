package com.klef.sdp.controller;

import com.klef.sdp.dto.ProgressResponse;
import com.klef.sdp.model.Task;
import com.klef.sdp.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Add task (frontend must include "username" in body)
    @PostMapping("/addtask")
    public ResponseEntity<?> addTask(@RequestBody Task task) {
        try {
            Task saved = taskService.addTask(task);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    // Get tasks for a username
    @GetMapping("/view/{username}")
    public ResponseEntity<?> getTasksByUser(@PathVariable String username) {
        try {
            List<Task> list = taskService.getTasksByUsername(username);
            return ResponseEntity.ok(list);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    // Toggle status
    @PatchMapping("/complete/{username}/{id}")
    public ResponseEntity<?> toggleTask(@PathVariable String username, @PathVariable Long id) {
        try {
            Task updated = taskService.toggleTaskStatus(id, username);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    // Delete a task (only owner)
    @DeleteMapping("/delete/{username}/{id}")
    public ResponseEntity<?> delete(@PathVariable String username, @PathVariable Long id) {
        try {
            taskService.deleteTask(id, username);
            return ResponseEntity.ok("Task deleted.");
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    // Progress for a username
    @GetMapping("/progress/{username}")
    public ResponseEntity<?> progress(@PathVariable String username) {
        try {
            ProgressResponse res = taskService.getProgress(username);
            return ResponseEntity.ok(res);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
