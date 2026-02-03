package com.pg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pg.dtos.FeedbackResponse;
import com.pg.service.FeedbackService;

import lombok.RequiredArgsConstructor;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/admin/feedback")
@RequiredArgsConstructor
public class AdminFeedbackController {

	//@Autowired
    private final FeedbackService feedbackService;

    @GetMapping
    public ResponseEntity<List<FeedbackResponse>> getAllFeedback() {
   	 System.out.println("🔥 Admin Feedback CONTROLLER HIT");

        return ResponseEntity.ok(feedbackService.getAllFeedback());
    }
}
