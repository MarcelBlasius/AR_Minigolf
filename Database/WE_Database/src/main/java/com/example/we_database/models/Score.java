package com.example.we_database.models;

import org.bson.types.ObjectId;

import java.util.List;

public class Score {

    private ObjectId id;
    private String sessionId;
    private String player;

    private List<ScoreElement> scoreElementList;
    public Score(){}
    public Score(ObjectId id,String sessionId,String player,List<ScoreElement> scoreElementList){
        this.id=id;
        this.sessionId=sessionId;
        this.player=player;
        this.scoreElementList=scoreElementList;
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
    public void setScoreElementList(List<ScoreElement> scoreElementList){
        this.scoreElementList = scoreElementList;
    }
    public List<ScoreElement> getScoreElementList(){
        return scoreElementList;
    }

}
