package com.example.we_database.dtos;

import com.example.we_database.models.Score;
import org.bson.types.ObjectId;

import java.util.List;

public record ScoreDTO(String id,String sessionId, String player, List<ScoreElementDTO> scoreElementList) {
    public ScoreDTO(Score s){
        this(s.getId() == null ? new ObjectId().toHexString() : s.getId().toHexString(),s.getSessionId(),s.getPlayer(),s.getScoreElementList().stream().map(ScoreElementDTO::new).toList());
    }
    public Score toScore(){
        ObjectId _id = id == null ? new ObjectId() : new ObjectId(id);
        return new Score(_id,sessionId,player,scoreElementList.stream().map(ScoreElementDTO::toScoreElement).toList());
    }
}
