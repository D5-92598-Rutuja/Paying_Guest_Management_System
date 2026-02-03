package com.pg.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pg.entities.PasswordResetToken;
import com.pg.entities.User;
import com.pg.exception.InvalidResetTokenException;
import com.pg.exception.TokenExpiredException;
import com.pg.exception.UserNotFoundException;
import com.pg.repository.PasswordResetTokenRepository;
import com.pg.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PasswordResetServiceImpl implements PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void sendResetLink(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        // Delete old token if exists
        tokenRepository.deleteByUser(user);

        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(60));

        tokenRepository.save(resetToken);

        String resetLink =
                "http://localhost:5173/reset-password?token=" + token;

        emailService.sendResetPasswordEmail(user.getEmail(), resetLink);
    }

    @Override
    public void resetPassword(String token, String newPassword) {

        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new InvalidResetTokenException("Invalid token"));

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new TokenExpiredException("Token expired");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        System.out.println("password is encode...!");
        userRepository.save(user);

        tokenRepository.delete(resetToken);
   }
//    @Override
//    public boolean resetPassword(String token, String newPassword) {
//
//        Optional<PasswordResetToken> opt = tokenRepository.findByToken(token);
//
//        if (opt.isEmpty()) {
//            return false;
//        }
//
//        PasswordResetToken resetToken = opt.get();
//
//        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
//            tokenRepository.delete(resetToken);
//            return false;
//        }
//
//        User user = resetToken.getUser();
//        user.setPassword(passwordEncoder.encode(newPassword));
//        userRepository.save(user);
//
//        tokenRepository.delete(resetToken);
//        return true;
//    }

}
