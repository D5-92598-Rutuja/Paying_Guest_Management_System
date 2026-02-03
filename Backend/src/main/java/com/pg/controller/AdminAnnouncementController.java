package com.pg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/announcements")
public class AdminAnnouncementController {

	@Autowired
	private AnnouncementService announcementService;
	
	//GetAll Announcement
	@GetMapping
	public ResponseEntity<?> getAllAnnouncements(){
		List<Announcement> announcements = announcementService.getAllAnnouncements();
		if(announcements.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT)
					.build();
		}
		
		return ResponseEntity.ok(announcements);
	}
	
	//Add Announcement
	@PostMapping
	public ResponseEntity<?> addNewAnnouncement(@RequestBody Announcement a) {
		System.out.println("RECEIVED: " + a);
		try {
			return ResponseEntity.status(HttpStatus.CREATED)// SC 201
					.body(announcementService.addAnnouncement(a));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT) // SC 409
					.body(new ApiResponse(e.getMessage(), "Failed"));

		}
	}
	
	// Edit Announcement
    @PutMapping("/{id}")
    public ResponseEntity<Announcement> updateAnnouncement(
            @PathVariable Long id,
            @RequestBody Announcement announcement) {

        Announcement updated = announcementService.updateAnnouncement(id, announcement);
        return ResponseEntity.ok(updated);
    }

    // Delete Announcement
    @DeleteMapping("/{id}")
    public ResponseEntity<String> softDelete(@PathVariable Long id) {
        announcementService.softDelete(id);
        return ResponseEntity.ok("Announcement marked as INACTIVE");
    }

}
