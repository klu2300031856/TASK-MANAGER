package com.klef.sdp.service;

import com.klef.sdp.model.User;

public interface UserService {
    User registerUser(User user);
    User loginUser(String username, String password);
}
