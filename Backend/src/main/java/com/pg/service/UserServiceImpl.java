package com.pg.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pg.dtos.RegisterRequestDTO;
import com.pg.dtos.UserProfileRequest;
import com.pg.dtos.UserProfileResponse;
import com.pg.dtos.UserRespDTO;
import com.pg.entities.*;
import com.pg.exception.EmailAlreadyExistsException;
import com.pg.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final ModelMapper modelMapper;

    //REGISTER USER
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


    // CREATE USER (ADMIN)
    @Override
    public UserRespDTO createUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserRespDTO.class);
    }

    // 🔹 GET ALL USERS
    @Override
    public List<UserRespDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserRespDTO.class))
                .collect(Collectors.toList());
    }

    // 🔹 GET USER BY ID
    @Override
    public UserRespDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return modelMapper.map(user, UserRespDTO.class);
    }

    public UserProfileResponse getMyProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserProfileResponse response =
                modelMapper.map(user, UserProfileResponse.class);

       
        response.setMobile(user.getMobileNo());
        response.setGender(user.getGender().name());
        response.setDateOfBirth(user.getDob().toString());

        return response;
    }

    @Override
    public void updateMyProfile(String email, UserProfileRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setMobileNo(request.getMobile());
        user.setDob(LocalDate.parse(request.getDateOfBirth()));
        userRepository.save(user);
    }
}
