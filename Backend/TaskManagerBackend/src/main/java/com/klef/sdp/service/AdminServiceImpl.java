package com.klef.sdp.service;

import com.klef.sdp.dto.TaskDTO;
import com.klef.sdp.model.Admin;
import com.klef.sdp.model.Task;
import com.klef.sdp.repository.AdminRepository;
import com.klef.sdp.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Admin registerAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public Admin loginAdmin(String username, String password) {
        return adminRepository.findByUsernameAndPassword(username, password);
    }

    @Override
    public List<TaskDTO> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        List<TaskDTO> dtos = new ArrayList<>();

        for (Task t : tasks) {
            TaskDTO dto = new TaskDTO();
            dto.setId(t.getId());
            dto.setUsername(t.getUsername());   // ✅ Directly from Task entity
            dto.setTitle(t.getTitle());
            dto.setDescription(t.getDescription());
            dto.setStatus(t.getStatus());
            dtos.add(dto);
        }
        return dtos;
    }
}
