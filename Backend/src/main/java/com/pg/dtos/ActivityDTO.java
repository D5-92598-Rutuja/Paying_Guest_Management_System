package com.pg.dtos;

import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ActivityDTO {
    private String message;
    private LocalDateTime timestamp;
    private String type;
}