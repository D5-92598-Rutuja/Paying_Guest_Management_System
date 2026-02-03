package com.pg.service;


import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.pg.dtos.FeedbackRequest;
import com.pg.dtos.FeedbackResponse;
import com.pg.entities.Feedback;
import com.pg.entities.User;
import com.pg.exception.UserNotFoundException;
import com.pg.repository.FeedbackRepository;
import com.pg.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;	


    @Override
    public void submitFeedback(String email, FeedbackRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Feedback feedback = modelMapper.map(request, Feedback.class);

        feedback.setUser(user);
        feedbackRepository.save(feedback);
    }
    @Override
    public List<FeedbackResponse> getAllFeedback() {

        List<Feedback> feedbackList =
                feedbackRepository.findAllByOrderByCreatedOnDesc();

        return feedbackList.stream()
                .map(f -> new FeedbackResponse(
                        f.getId(),
                        f.getUser().getFirstName() + " " + f.getUser().getLastName(),   
                        f.getRating(),
                        f.getComment(),
                        f.getCreatedOn()
                ))
                .toList();
    }

}
