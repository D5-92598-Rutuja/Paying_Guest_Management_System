package com.pg.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@AttributeOverride(name = "id", column = @Column(name = "user_id"))
@NoArgsConstructor
@Getter
@Setter
public class User extends BaseEntity {

    @Column(nullable = false, length = 30)
    private String firstName;

    @Column(nullable = false, length = 30)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(length = 400, nullable = false)
    private String password;

    @Column(nullable = false, length = 15)
    private String contact;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    private int age;

    @Column(length = 255)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    public User(String firstName, String lastName, String email,
                String contact, Gender gender, int age,
                String address, Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.contact = contact;
        this.gender = gender;
        this.age = age;
        this.address = address;
        this.role = role;
    }
}
