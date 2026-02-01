package com.pg.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pg.dtos.ApiResponse;
import com.pg.entities.Announcements.Announcement;
import com.pg.entities.Announcements.AnnouncementStatus;
import com.pg.repository.AnnouncementRepository;

@Service
@Transactional
public class AnnouncementServiceImpl implements AnnouncementService{
	
	@Autowired
	private AnnouncementRepository announcementRepository;

	@Override
	public List<Announcement> getAllAnnouncements() {
		return announcementRepository.findAll();
	}

	@Override
	public ApiResponse addAnnouncement(Announcement a) {
		Announcement newAnnouncement = announcementRepository.save(a);
		return new ApiResponse("New Announcement Added Sucessfully", "Success");
	}
	
	@Override
    public Announcement updateAnnouncement(Long id, Announcement updated) {

        Announcement existing = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found"));

        existing.setTitle(updated.getTitle());
        existing.setMessage(updated.getMessage());
        existing.setStartDate(updated.getStartDate());
        existing.setEndDate(updated.getEndDate());
        existing.setStatus(updated.getStatus());

        return announcementRepository.save(existing);
    }

	// Soft delete by setting status = INACTIVE
    public void softDelete(Long id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found with id: " + id));
        announcement.setStatus(AnnouncementStatus.INACTIVE); // soft delete
        announcementRepository.save(announcement);
    }

    // Get only ACTIVE announcements
    public List<Announcement> getAllActive() {
        return announcementRepository.findByStatus(AnnouncementStatus.ACTIVE);
    }
}
