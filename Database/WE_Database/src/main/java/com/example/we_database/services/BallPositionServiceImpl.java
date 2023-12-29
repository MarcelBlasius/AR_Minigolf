package com.example.we_database.services;


import com.example.we_database.dtos.BallPositionDTO;
import com.example.we_database.repositories.BallPositionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BallPositionServiceImpl implements BallPositionService {

    private final BallPositionRepository ballPositionRepository;

    public BallPositionServiceImpl(BallPositionRepository ballPositionRepository) {
        this.ballPositionRepository = ballPositionRepository;
    }

    @Override
    public BallPositionDTO get(String id) {
        return new BallPositionDTO(ballPositionRepository.get(id));

    }

    @Override
    public List<BallPositionDTO> getAll(String id) {
        return ballPositionRepository.getAll(id).stream().map(BallPositionDTO::new).toList();

    }

    @Override
    public BallPositionDTO post(BallPositionDTO b) {
        return new BallPositionDTO(ballPositionRepository.post(b.toBallposition()));
    }

    @Override
    public BallPositionDTO put(BallPositionDTO b) {
        return new BallPositionDTO(ballPositionRepository.put(b.toBallposition()));
    }

    @Override
    public long delete(String id) {
        return ballPositionRepository.delete(id);
    }
}
