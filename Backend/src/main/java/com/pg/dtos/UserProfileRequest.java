package com.pg.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserProfileRequest {
	
    private String firstName;
    private String lastName;
    private String mobile;
    private String email;
    private String gender;
    private String dateOfBirth; // yyyy-MM-dd
}
