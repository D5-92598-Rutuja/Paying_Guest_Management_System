package com.pg.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.pg.dtos.UserRespDTO;
import com.pg.entities.User;
import com.pg.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public UserRespDTO createUser(User user) {
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserRespDTO.class);
    }

    @Override
    public List<UserRespDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserRespDTO.class))
                .collect(Collectors.toList());
    }

   
    @Override
    public UserRespDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id : " + id));

        return modelMapper.map(user, UserRespDTO.class);
    }
}
