package com.pg.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pg.entities.PasswordResetToken;
import com.pg.entities.User;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

	Optional<PasswordResetToken> findByToken(String token);

	void deleteByUser(User user);
}
