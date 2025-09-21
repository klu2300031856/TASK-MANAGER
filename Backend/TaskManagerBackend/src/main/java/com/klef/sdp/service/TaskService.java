package com.klef.sdp.service;

import com.klef.sdp.dto.ProgressResponse;
import com.klef.sdp.model.Task;

import java.util.List;

public interface TaskService {
    Task addTask(Task task);
    List<Task> getTasksByUsername(String username);
    Task toggleTaskStatus(Long id, String username);
    void deleteTask(Long id, String username);
    ProgressResponse getProgress(String username);
}
