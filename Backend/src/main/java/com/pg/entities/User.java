package com.pg.entities;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@AttributeOverride(name = "id", column = @Column(name = "user_id"))
@NoArgsConstructor
@Getter
@Setter
@ToString
public class User extends BaseEntity {

    @Column(nullable = false, length = 30)
    private String firstName;

    @Column(nullable = false, length = 30)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(length = 400, nullable = false)
    private String password;

    @Column(name="mobile_no",nullable = false, length = 15)
    private String mobileNo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private Gender gender;

    @NotNull
    @Past
    @Column(nullable = true)
    private LocalDate dob;

//    @Column(length = 255)
//    private String address;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Enumerated(EnumType.STRING)
    private Status status;

	public User(String firstName, String lastName, String email, String mobileNo, LocalDate dob) 
	{
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.mobileNo = mobileNo;
		this.dob = dob;
	}

}
