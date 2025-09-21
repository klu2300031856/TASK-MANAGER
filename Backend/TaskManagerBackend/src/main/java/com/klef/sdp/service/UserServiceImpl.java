package com.klef.sdp.service;

import com.klef.sdp.model.User;
import com.klef.sdp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("Username already exists");
        }
        return userRepository.save(user);
    }

    @Override
    public User loginUser(String username, String password) {
        User existing = userRepository.findByUsername(username);
        if (existing != null && existing.getPassword().equals(password)) {
            return existing;
        }
        return null;
    }
}
