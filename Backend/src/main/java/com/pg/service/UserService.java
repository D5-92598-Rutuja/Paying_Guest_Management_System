package com.pg.service;

import java.util.List;

import com.pg.dtos.RegisterRequestDTO;
import com.pg.dtos.UserProfileRequest;
import com.pg.dtos.UserProfileResponse;
import com.pg.dtos.UserRespDTO;
import com.pg.entities.User;

public interface UserService {

    UserRespDTO registerUser(RegisterRequestDTO dto);
    UserRespDTO createUser(User user);
    List<UserRespDTO> getAllUsers();
    UserRespDTO getUserById(Long id);
    UserProfileResponse getMyProfile(String email);
    void updateMyProfile(String email, UserProfileRequest request);
}

