package com.example.we_database.models;

import org.bson.types.ObjectId;

import java.util.List;

public class Session {
    private ObjectId id;

    private String sessionId;
    private String name;
    private List<String> players;
    public Session(){

    }
    public Session(ObjectId id,String name, List<String> players){
        this.id=id;

        this.name=name;
        this.players=players;
    }
    public ObjectId getId(){
        return id;
    }
    public void setId(ObjectId id){
        this.id=id;
    }
    public void setSessionId(String sessionId){
        this.sessionId=sessionId;
    }
    public String getSessionId(){
        return sessionId;
    }

    public void setName(String name){
        this.name=name;
    }
    public String getName(){
        return name;
    }
    public void setPlayers(List<String> players){
        this.players=players;
    }
    public List<String> getPlayers(){
       return players;
    }
}
