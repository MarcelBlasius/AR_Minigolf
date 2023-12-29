package com.example.we_database.dtos;

import com.example.we_database.models.Session;

import org.bson.types.ObjectId;

import java.util.List;

public record SessionDTO(String id, String name, List<String> players) {

    public SessionDTO(Session s){
        this(s.getId() == null ? new ObjectId().toHexString() : s.getId().toHexString(),s.getName(),s.getPlayers());
    }

    public Session toSession(){
        ObjectId _id = id == null ? new ObjectId() : new ObjectId(id);
        return new Session(_id,name,players);
    }
}
