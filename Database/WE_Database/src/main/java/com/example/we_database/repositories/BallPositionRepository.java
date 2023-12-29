package com.example.we_database.repositories;


import com.example.we_database.models.BallPosition;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BallPositionRepository {
    BallPosition get(String id);

    List<BallPosition> getAll(String id);
    BallPosition post(BallPosition ballPosition);
    BallPosition put(BallPosition ballPosition);
    long delete(String id);
}
