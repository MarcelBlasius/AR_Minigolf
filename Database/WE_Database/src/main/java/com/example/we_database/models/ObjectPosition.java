package com.example.we_database.models;

import org.bson.types.ObjectId;

public class ObjectPosition {
    private ObjectId id;

    private String sessionId;
    private Integer name;
    private float x;
    private float y;
    private float z;
    private float rotationX;
    private float rotationY;
    private float rotationZ;

    public ObjectPosition(ObjectId id, String sessionId, Integer name, float x,float y,float z, float rotationX, float rotationY, float rotationZ){
        this.id=id;
        this.sessionId=sessionId;
        this.name=name;
        this.x=x;
        this.y=y;
        this.z=z;
        this.rotationX = rotationX;
        this.rotationY = rotationY;
        this.rotationZ = rotationZ;
    }

    public void setId(ObjectId id){
        this.id = id;
    }
    public ObjectId getId(){
        return id;
    }
    public void setSessionId(String sessionId){
        this.sessionId=sessionId;
    }
    public Integer getName(){
        return name;
    }
    public void setName(Integer name){
        this.name = name;
    }
    public String getSessionId(){
        return sessionId;
    }
    public void setX(float x){
        this.x = x;
    }
    public float getX(){
        return x;
    }
    public void setY(float y){
        this.y = y;
    }
    public float getY(){
        return y;
    }
    public void setZ(float z){
        this.z = z;
    }
    public float getZ(){
        return z;
    }
    public void setRotationX(float x){
        this.rotationX = x;
    }
    public float getRotationX(){
        return this.rotationX;
    }
    public void setRotationY(float x){
        this.rotationY = y;
    }
    public float getRotationY(){
        return this.rotationX;
    }
    public void setRotationZ(float x){
        this.rotationZ = z;
    }
    public float getRotationZ(){
        return this.rotationZ;
    }
}
