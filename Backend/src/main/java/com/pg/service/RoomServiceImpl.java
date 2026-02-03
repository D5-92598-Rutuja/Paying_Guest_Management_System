package com.pg.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.pg.dtos.RoomReqDTO;
import com.pg.dtos.RoomRespDTO;
import com.pg.entities.Room;
import com.pg.entities.Status;
import com.pg.repository.RentPolicyRepository;
import com.pg.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final ModelMapper modelMapper;
    private final RentPolicyRepository rentPolicyRepository;

    @Override
    public RoomRespDTO addRoom(RoomReqDTO dto) {

        Room room = new Room();

        room.setFloorNumber(dto.getFloorNumber());
        room.setRoomNumber(dto.getRoomNumber());
        room.setSharingType(dto.getSharingType());

        int beds = switch (dto.getSharingType()) {
            case SINGLE -> 1;
            case DOUBLE -> 2;
            case TRIPLE -> 3;
        };

        room.setTotalBeds(beds);
        room.setAvailableBeds(beds);

        
        double rent = rentPolicyRepository
                .findById(dto.getSharingType())
                .orElseThrow(() -> new RuntimeException("Rent not set for this sharing type"))
                .getRentPerBed();

        room.setRentPerBed(rent);   

        room.setStatus(Status.ACTIVE);

        Room savedRoom = roomRepository.save(room);

        return modelMapper.map(savedRoom, RoomRespDTO.class);
    }

    @Override
    public List<RoomRespDTO> getAllRooms() {
        return roomRepository.findAll()
                .stream()
                .map(room -> modelMapper.map(room, RoomRespDTO.class))
                .collect(Collectors.toList());
    }
}

