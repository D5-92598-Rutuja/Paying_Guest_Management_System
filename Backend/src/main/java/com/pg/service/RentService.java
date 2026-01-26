package com.pg.service;

import com.pg.dtos.RentUpdateDTO;

public interface RentService {
    void updateRent(RentUpdateDTO dto);
    RentUpdateDTO getCurrentRent();

}
