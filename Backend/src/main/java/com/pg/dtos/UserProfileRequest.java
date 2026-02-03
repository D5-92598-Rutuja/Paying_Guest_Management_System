package com.pg.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileRequest {

    private String firstName;
    private String lastName;
    private String mobile;
    private String gender;
    private String dateOfBirth; // yyyy-MM-dd
}
