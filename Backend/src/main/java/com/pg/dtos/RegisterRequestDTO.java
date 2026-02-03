package com.pg.dtos;

import java.time.LocalDate;

import com.pg.entities.Gender;
import com.pg.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String mobileNo;
    private LocalDate dob;
    private Gender gender;

    // optional
    private Role role;
}
