package com.pg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pg.dtos.ApiResponse;
import com.pg.entities.Announcements.Announcement;
import com.pg.service.AnnouncementService;

//@CrossOrigin(origins = "*")
@RestController
@PreAuthorize("hasRole('USER')")
@RequestMapping("/client/announcements")
//@RequestMapping("/api/announcements")
public class ClientAnnouncementController {

	@Autowired
	private AnnouncementService announcementService;
	
	@GetMapping
    public ResponseEntity<?> getActiveAnnouncements() {

        List<Announcement> announcements = announcementService.getActiveAnnouncements();

        if (announcements.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.ok(announcements);
    }
	
	

}
