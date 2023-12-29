package com.example.we_database.models;

public class ScoreElement {
    private int round;
    private int score;
    public ScoreElement(){

    }
    public ScoreElement(int round,int score){
        this.round=round;
        this.score=score;
    }
    public void setRound(int round){
        this.round=round;
    }
    public int getRound(){
        return round;
    }
    public void setScore(int score){
        this.score=score;
    }

    public int getScore() {
        return score;
    }
}
