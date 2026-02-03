package com.pg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pg.dtos.UserRoomProfileDTO;
import com.pg.entities.Allocation;
import com.pg.repository.AllocationRepository;

@Service
@Transactional
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private AllocationRepository allocationRepository;

    @Override
    public UserRoomProfileDTO getUserRoomProfile(String email) {

    	
        Allocation allocation = allocationRepository
                .findTopByUserEmailOrderByCreatedOnDesc(email)
                .orElseThrow(() -> new RuntimeException("No room allocated"));

        UserRoomProfileDTO dto = new UserRoomProfileDTO();
        dto.setRoomNumber(allocation.getRoom().getRoomNumber());
        dto.setSharingType(allocation.getRoom().getSharingType());
        dto.setMonthlyRent(allocation.getRoom().getRentPerBed());
        dto.setAllocationStatus(allocation.getAllocationStatus());
        return dto;
    }
}