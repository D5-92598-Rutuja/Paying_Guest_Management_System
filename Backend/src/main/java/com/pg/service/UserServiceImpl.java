package com.pg.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.pg.dtos.RegisterRequestDTO;
import com.pg.dtos.UserRespDTO;
import com.pg.entities.User;
import com.pg.exception.EmailAlreadyExistsException;
import com.pg.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

        //  REGISTER USER
    @Override
    public UserRespDTO registerUser(RegisterRequestDTO dto) {

        if (userRepository.findByEmail(dto.getEmail()).isPresent()) { 
        	throw new EmailAlreadyExistsException("Email already registered");
        }

        User user = modelMapper.map(dto, User.class);

        user.setPassword(encoder.encode(dto.getPassword()));
        user.setRole(Role.ROLE_USER);     
        user.setStatus(Status.ACTIVE);

        return modelMapper.map(userRepository.save(user), UserRespDTO.class);
    }

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
