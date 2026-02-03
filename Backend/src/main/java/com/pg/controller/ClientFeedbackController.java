package com.pg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pg.dtos.FeedbackRequest;
import com.pg.service.FeedbackService;

import lombok.RequiredArgsConstructor;

@RestController
@PreAuthorize("hasRole('USER')")
@RequestMapping("/client/feedback")
@RequiredArgsConstructor
public class ClientFeedbackController {

	@Autowired
    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<?> submitFeedback(
            @RequestBody FeedbackRequest request,
            Authentication authentication)
    {
   	 System.out.println("🔥 Client Feedback CONTROLLER HIT");

        feedbackService.submitFeedback(authentication.getName(), request);
        return ResponseEntity.ok("Feedback submitted successfully");
    }
}
