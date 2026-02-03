package com.pg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pg.entities.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findAllByOrderByCreatedOnDesc();

}
