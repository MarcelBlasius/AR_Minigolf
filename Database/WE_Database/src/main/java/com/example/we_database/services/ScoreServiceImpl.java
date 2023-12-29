package com.example.we_database.services;


import com.example.we_database.dtos.ScoreDTO;
import com.example.we_database.repositories.ScoreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreServiceImpl implements ScoreService{

    private final ScoreRepository scoreRepository;

    public ScoreServiceImpl(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }

    @Override
    public List<ScoreDTO> getAll(String id) {
        return scoreRepository.getAll(id).stream().map(ScoreDTO::new).toList();
    }
    @Override
    public ScoreDTO post(ScoreDTO s) {
        return new ScoreDTO(scoreRepository.post(s.toScore()));
    }

    @Override
    public ScoreDTO put(ScoreDTO s) {
        return new ScoreDTO(scoreRepository.put(s.toScore()));

    }

    @Override
    public long delete(String id) {
        return scoreRepository.delete(id);
    }
}
