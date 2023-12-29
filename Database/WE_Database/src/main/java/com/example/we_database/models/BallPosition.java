package com.example.we_database.models;

import org.bson.types.ObjectId;

public class BallPosition {
    private ObjectId id;

    private String sessionId;
    private String player;
    private float x;
    private float y;
    private float z;
    public BallPosition(){}
    public BallPosition(ObjectId id, String sessionId,String player, float x,float y,float z){
        this.id=id;
        this.sessionId=sessionId;
        this.player=player;
        this.x=x;
        this.y=y;
        this.z=z;
    }
    public void setId(ObjectId id){
        this.id=id;
    }
    public ObjectId getId(){
        return id;
    }

    public void setSessionId(String sessionId){
        this.sessionId=sessionId;
    }
    public String getSessionId(){
        return sessionId;
    }
    public void setPlayer(String player){
        this.player=player;
    }
    public String getPlayer(){
        return player;
    }
    public void setX(float x){
        this.x=x;
    }
    public float getX(){
        return x;
    }
    public void setY(float y){
        this.y=y;
    }
    public float getY(){
        return y;
    }
    public void setZ(float z){
        this.z=z;
    }
    public float getZ(){
        return z;
    }
}
