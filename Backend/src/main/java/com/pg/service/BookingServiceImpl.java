package com.pg.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pg.dtos.BookingReqDTO;
import com.pg.dtos.BookingRespDTO;
import com.pg.entities.Booking;
import com.pg.entities.BookingStatus;
import com.pg.entities.KycStatus;
import com.pg.entities.PaymentStatus;
import com.pg.entities.Room;
import com.pg.entities.SharingType;
import com.pg.entities.User;
import com.pg.repository.BookingRepository;
import com.pg.repository.RoomRepository;
import com.pg.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    //CREATE BOOKING
    @Override
    public void createBooking(BookingReqDTO dto, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = new Booking();

        booking.setRoomType(SharingType.valueOf(dto.getRoomType()));
        booking.setJoinDate(dto.getJoinDate());
        booking.setEndDate(dto.getEndDate());

        booking.setStatus(BookingStatus.PENDING);
        booking.setKycStatus(KycStatus.PENDING);
        booking.setPaymentStatus(PaymentStatus.PENDING);

        booking.setUser(user);

        bookingRepository.save(booking);
    }

    // GET ALL BOOKINGS
    @Override
    public List<BookingRespDTO> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    //GET PENDING BOOKINGS
    @Override
    public List<BookingRespDTO> getPendingBookings() {
        return bookingRepository.findByStatus(BookingStatus.PENDING)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // MAP ENTITY TO DTO
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

    
    // ALLOCATE ROOM TO BOOKING
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

        booking.setRoom(room);
        booking.setStatus(BookingStatus.APPROVED);

        room.setAvailableBeds(room.getAvailableBeds() - 1);

        bookingRepository.save(booking);
        roomRepository.save(room);
    }
    
    @Override
    public List<Room> getAvailableRoomsForBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        SharingType type = booking.getRoomType();

        return roomRepository
                .findBySharingTypeAndAvailableBedsGreaterThan(type, 0);
    }


}
