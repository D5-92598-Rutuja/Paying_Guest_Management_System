package com.pg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pg.dtos.DashboardResponse;
import com.pg.service.DashboardService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AdminDashboardController {

    private final DashboardService dashboardService;

    public AdminDashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse> getDashboard() {
    	DashboardResponse dashboard = dashboardService.getDashboardData();
        return ResponseEntity.ok(dashboard);
    }
}