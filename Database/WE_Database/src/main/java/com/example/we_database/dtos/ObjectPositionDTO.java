package com.example.we_database.dtos;

import com.example.we_database.models.ObjectPosition;
import org.bson.types.ObjectId;

public record ObjectPositionDTO(String id, String sessionId, Integer name, float x, float y, float z, float rotationX, float rotationY, float rotationZ) {

    public ObjectPositionDTO(ObjectPosition op){
        this(op.getId() == null ? new ObjectId().toHexString() : op.getId().toHexString(), op.getSessionId(), op.getName(), op.getX(), op.getY(), op.getZ(), op.getRotationX(), op.getRotationY(), op.getRotationZ());
    }
    public ObjectPosition toObjectPosition(){
        ObjectId _id = id == null ? new ObjectId() : new ObjectId(id);
        return new ObjectPosition(_id, sessionId, name, x, y, z, rotationX, rotationY, rotationZ);
    }
}
