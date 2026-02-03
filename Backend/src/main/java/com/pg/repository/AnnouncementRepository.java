package com.pg.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pg.entities.Announcements.Announcement;
import com.pg.entities.Announcements.AnnouncementStatus;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
	 // Fetch only non-deleted announcements
    List<Announcement> findByStatus(AnnouncementStatus status);
}
