package com.pg.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pg.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
