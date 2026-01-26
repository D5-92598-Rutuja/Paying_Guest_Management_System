package com.pg.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.pg.entities.Room;
import com.pg.entities.SharingType;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByAvailableBedsGreaterThan(int beds);

    List<Room> findBySharingTypeAndAvailableBedsGreaterThan(SharingType sharingType, int beds);
}
