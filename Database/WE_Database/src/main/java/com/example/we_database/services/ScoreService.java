package com.example.we_database.services;


import com.example.we_database.dtos.ScoreDTO;
import java.util.List;

public interface ScoreService {
    List<ScoreDTO> getAll(String id);
    ScoreDTO post(ScoreDTO s);
    ScoreDTO put(ScoreDTO s);
    long delete(String id);
}
