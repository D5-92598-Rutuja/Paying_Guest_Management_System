package com.pg.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pg.dtos.AllocationRespDTO;
import com.pg.dtos.BookingReqDTO;
import com.pg.dtos.BookingRespDTO;
import com.pg.entities.*;
import com.pg.repository.*;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final AllocationRepository allocationRepository;
    

    // ✅ CREATE BOOKING + CREATE ALLOCATION
    @Override
    public Long createBooking(BookingReqDTO dto,Authentication authentication) {

    	String email = authentication.getPrincipal().toString();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = new Booking();

        booking.setRoomType(SharingType.valueOf(dto.getRoomType()));
        booking.setJoinDate(dto.getJoinDate());
        booking.setEndDate(dto.getEndDate());

        booking.setStatus(BookingStatus.PENDING);
        booking.setKycStatus(KycStatus.PENDING);
        booking.setPaymentStatus(PaymentStatus.PENDING);

        booking.setUser(user);

        // 1️⃣ Save booking
        Booking savedBooking = bookingRepository.save(booking);

        return savedBooking.getId();
    }

    // ✅ GET ALL BOOKINGS
    @Override
    public List<BookingRespDTO> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // ✅ GET PENDING BOOKINGS (for admin view)
    @Override
    public List<BookingRespDTO> getPendingBookings() {
        return bookingRepository.findByStatus(BookingStatus.PENDING)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // ✅ MAP ENTITY TO DTO
    private BookingRespDTO mapToDTO(Booking booking) {
        BookingRespDTO dto = new BookingRespDTO();
        dto.setBookingId(booking.getId());
        dto.setUserName(booking.getUser().getFirstName());
        dto.setRoomType(booking.getRoomType().name());
        dto.setJoinDate(booking.getJoinDate());
        dto.setEndDate(booking.getEndDate());
        dto.setStatus(booking.getStatus());
        return dto;
    }

    @Override
    @Transactional
    public void allocateRoom(Long bookingId, Long roomId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (room.getAvailableBeds() <= 0) {
            throw new RuntimeException("No beds available");
        }

        if (!room.getSharingType().equals(booking.getRoomType())) {
            throw new RuntimeException("Room type mismatch");
        }

        // ✅ Reduce bed count
        room.setAvailableBeds(room.getAvailableBeds() - 1);

        // ✅ Create allocation NOW (correct place)
        Allocation allocation = new Allocation();
        allocation.setBooking(booking);
        allocation.setUser(booking.getUser());
        allocation.setRoom(room);
        allocation.setAllocationStatus(AllocationStatus.COMPLETED);
        allocation.setVerified(true);
        allocation.setPaymentDone(true);

        // ✅ Update booking status
        booking.setStatus(BookingStatus.ACTIVE);

        roomRepository.save(room);
        allocationRepository.save(allocation);
        bookingRepository.save(booking);
    }


    // ✅ GET AVAILABLE ROOMS FOR A BOOKING
    @Override
    public List<Room> getAvailableRoomsForBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        SharingType type = booking.getRoomType();

        return roomRepository
                .findBySharingTypeAndAvailableBedsGreaterThan(type, 0);
    }
    
    
    @Override
    public List<AllocationRespDTO> getReadyForAllocation() {

        return allocationRepository
                .findByIsVerifiedTrueAndIsPaymentDoneTrueAndAllocationStatus(AllocationStatus.PENDING)
                .stream()
                .map(a -> {
                    AllocationRespDTO dto = new AllocationRespDTO();
                    dto.setBookingId(a.getBooking().getId());
                    dto.setUserName(a.getUser().getFirstName());
                    dto.setRoomType(a.getBooking().getRoomType().name());
                    dto.setJoinDate(a.getBooking().getJoinDate().toString());
                    return dto;
                })
                .toList();
    }
    

    
    @Override
    public List<BookingRespDTO> getBookingsReadyForAllocation() {
    	
    	//bookingId-->kyc and then status

        return bookingRepository.findAll()
                .stream()
//                .filter(b -> b.getStatus() == BookingStatus.PENDING)
                .filter(b -> b.getStatus() == BookingStatus.COMPLETED)//Auto changed PENDING-COMPLETED when Payment is Done
//                .filter(b -> b.getKycStatus() == KycStatus.VERIFIED)
//                .filter(b -> b.getPaymentStatus() == PaymentStatus.PAID)
                .filter(b -> allocationRepository.findByBooking_Id(b.getId()).isEmpty())
                .map(this::mapToDTO)
                .toList();
    }



}
