package com.example.we_database.services;


import com.example.we_database.dtos.BallPositionDTO;
import java.util.List;

public interface BallPositionService {
    BallPositionDTO get(String id);
    List<BallPositionDTO> getAll(String id);
    BallPositionDTO post(BallPositionDTO b);
    BallPositionDTO put(BallPositionDTO b);
    long delete(String id);
}
