package com.klef.sdp.service;

import com.klef.sdp.dto.TaskDTO;
import com.klef.sdp.model.Admin;

import java.util.List;

public interface AdminService {
    Admin registerAdmin(Admin admin);
    Admin loginAdmin(String username, String password);
    List<TaskDTO> getAllTasks();
}
