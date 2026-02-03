package com.pg.service;

import com.pg.dtos.UserRoomProfileDTO;

public interface ProfileService {

    UserRoomProfileDTO getUserRoomProfile(String email);
}