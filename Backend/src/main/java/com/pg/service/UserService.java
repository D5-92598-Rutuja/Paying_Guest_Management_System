package com.pg.service;

import java.util.List;

import com.pg.dtos.UserRespDTO;
import com.pg.entities.User;

public interface UserService {

    UserRespDTO createUser(User user);

    List<UserRespDTO> getAllUsers();

    UserRespDTO getUserById(Long id);
}
