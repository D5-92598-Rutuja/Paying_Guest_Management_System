package com.pg.dtos;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FeedbackResponse {

    private Long id;
    private String userName;
    private int rating;
    private String comment;
    private LocalDate createdOn;
}
