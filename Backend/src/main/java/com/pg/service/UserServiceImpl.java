package com.pg.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pg.dtos.RegisterRequestDTO;
import com.pg.dtos.UserRespDTO;
import com.pg.entities.*;
import com.pg.exception.EmailAlreadyExistsException;
import com.pg.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final ModelMapper modelMapper;

    // 🔹 REGISTER USER
    @Override
    public UserRespDTO registerUser(RegisterRequestDTO dto) {

        if (repo.findByEmail(dto.getEmail()).isPresent()) { 
        	throw new EmailAlreadyExistsException("Email already registered");
        }

        User user = modelMapper.map(dto, User.class);

        user.setPassword(encoder.encode(dto.getPassword()));
        user.setRole(Role.ROLE_USER);     
        user.setStatus(Status.ACTIVE);

        return modelMapper.map(repo.save(user), UserRespDTO.class);
    }


    // 🔹 CREATE USER (ADMIN)
    @Override
    public UserRespDTO createUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        User savedUser = repo.save(user);
        return modelMapper.map(savedUser, UserRespDTO.class);
    }

    // 🔹 GET ALL USERS
    @Override
    public List<UserRespDTO> getAllUsers() {
        return repo.findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserRespDTO.class))
                .collect(Collectors.toList());
    }

    // 🔹 GET USER BY ID
    @Override
    public UserRespDTO getUserById(Long id) {
        User user = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return modelMapper.map(user, UserRespDTO.class);
    }
}
