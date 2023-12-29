package com.example.we_database.repositories;


import com.example.we_database.models.Score;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoreRepository {

    List<Score> getAll(String id);
    Score post(Score s);
    Score put(Score s);
    long delete(String id);
}
