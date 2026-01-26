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
	
}
