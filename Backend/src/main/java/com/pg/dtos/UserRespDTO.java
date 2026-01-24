package com.pg.dtos;

import java.time.LocalDate;

import com.pg.entities.Gender;
import com.pg.entities.Role;
import com.pg.entities.Status;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserRespDTO {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String mobileNo;

    private Gender gender;

    private LocalDate dob;

    private Role role;

    private Status status;
}
