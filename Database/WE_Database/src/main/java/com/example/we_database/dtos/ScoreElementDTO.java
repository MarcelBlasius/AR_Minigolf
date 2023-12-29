package com.example.we_database.dtos;

import com.example.we_database.models.ScoreElement;
public record ScoreElementDTO(int score, int round) {
    public ScoreElementDTO(ScoreElement se){
       this(se.getRound(),se.getScore());
    }
    public ScoreElement toScoreElement(){
        return new ScoreElement(score,round);
    }
}
