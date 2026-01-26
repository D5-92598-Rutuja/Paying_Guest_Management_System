package com.pg.service;

import org.springframework.stereotype.Service;

import com.pg.dtos.RentUpdateDTO;
import com.pg.entities.RentPolicy;
import com.pg.entities.SharingType;
import com.pg.repository.RentPolicyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RentServiceImpl implements RentService {

    private final RentPolicyRepository rentPolicyRepository;

    @Override
    public void updateRent(RentUpdateDTO dto) {

        rentPolicyRepository.save(
                createPolicy(SharingType.SINGLE, dto.getSingleRent()));

        rentPolicyRepository.save(
                createPolicy(SharingType.DOUBLE, dto.getDoubleRent()));

        rentPolicyRepository.save(
                createPolicy(SharingType.TRIPLE, dto.getTripleRent()));
    }

    private RentPolicy createPolicy(SharingType type, double rent) {
        RentPolicy policy = new RentPolicy();
        policy.setSharingType(type);
        policy.setRentPerBed(rent);
        return policy;
    }
    
    @Override
    public RentUpdateDTO getCurrentRent() {

        RentUpdateDTO dto = new RentUpdateDTO();

        dto.setSingleRent(
                rentPolicyRepository.findById(SharingType.SINGLE).get().getRentPerBed());

        dto.setDoubleRent(
                rentPolicyRepository.findById(SharingType.DOUBLE).get().getRentPerBed());

        dto.setTripleRent(
                rentPolicyRepository.findById(SharingType.TRIPLE).get().getRentPerBed());

        return dto;
    }

    
}
