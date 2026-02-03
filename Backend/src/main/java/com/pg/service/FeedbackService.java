package com.pg.service;

import java.util.List;

import com.pg.dtos.FeedbackRequest;
import com.pg.dtos.FeedbackResponse;

public interface FeedbackService {
    void submitFeedback(String email, FeedbackRequest request);
    List<FeedbackResponse> getAllFeedback();
  
}
