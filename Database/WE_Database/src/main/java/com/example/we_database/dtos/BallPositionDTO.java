package com.example.we_database.dtos;


import com.example.we_database.models.BallPosition;
import org.bson.types.ObjectId;

public record BallPositionDTO(String id,String sessionId, String player, float x, float y, float z) {

public BallPositionDTO(BallPosition b){
    this(b.getId() == null ? new ObjectId().toHexString() : b.getId().toHexString(),b.getSessionId(),b.getPlayer(), b.getX(), b.getY(),b.getZ());
}
public BallPosition toBallposition(){
    ObjectId _id = id == null ? new ObjectId() : new ObjectId(id);
    return new BallPosition(_id,sessionId,player,x,y,z);
}
}
