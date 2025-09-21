package com.klef.sdp.service;

import com.klef.sdp.dto.ProgressResponse;
import com.klef.sdp.model.Task;
import com.klef.sdp.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task addTask(Task task) {
        if (task.getUsername() == null || task.getUsername().isBlank()) {
            throw new RuntimeException("username required in task");
        }
        if (task.getStatus() == null) task.setStatus("PENDING");
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getTasksByUsername(String username) {
        return taskRepository.findByUsername(username);
    }

    @Override
    public Task toggleTaskStatus(Long id, String username) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        if (!username.equals(task.getUsername())) {
            throw new RuntimeException("Unauthorized: not task owner");
        }

        LocalDate now = LocalDate.now();
        if ("PENDING".equalsIgnoreCase(task.getStatus())) {
            if (task.getDeadline() != null && task.getDeadline().isBefore(now)) {
                throw new RuntimeException("Deadline passed! Cannot mark as completed.");
            }
            task.setStatus("COMPLETED");
        } else {
            task.setStatus("PENDING");
        }
        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(Long id, String username) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        if (!username.equals(task.getUsername())) {
            throw new RuntimeException("Unauthorized: not task owner");
        }
        taskRepository.deleteById(id);
    }

    @Override
    public ProgressResponse getProgress(String username) {
        List<Task> tasks = taskRepository.findByUsername(username);
        int total = tasks.size();
        long completed = tasks.stream().filter(t -> "COMPLETED".equalsIgnoreCase(t.getStatus())).count();
        long notCompleted = tasks.stream().filter(t ->
                !"COMPLETED".equalsIgnoreCase(t.getStatus())
                        && t.getDeadline() != null
                        && t.getDeadline().isBefore(LocalDate.now())
        ).count();
        long pending = total - completed - notCompleted;
        double percent = total > 0 ? Math.round((completed * 100.0) / total) : 0.0;
        return new ProgressResponse(completed, pending, notCompleted, percent, total);
    }
}
