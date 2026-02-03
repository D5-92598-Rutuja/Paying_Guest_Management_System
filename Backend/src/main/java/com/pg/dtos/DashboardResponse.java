package com.pg.dtos;

import java.util.List;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {
	private DashboardDTO stats;
    private List<ActivityDTO> activities;
}