package com.pg.service;

public interface PasswordResetService {
    void sendResetLink(String email);
 //  boolean resetPassword(String token, String newPassword);
    void resetPassword(String token, String newPassword);

}
