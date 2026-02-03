package com.pg.service;

import java.util.List;

import com.pg.dtos.ApiResponse;
import com.pg.entities.Announcements.Announcement;

public interface AnnouncementService {

	List<Announcement> getAllAnnouncements();

	ApiResponse addAnnouncement(Announcement a);
	
}
