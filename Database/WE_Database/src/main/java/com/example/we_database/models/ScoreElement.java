package com.example.we_database.models;

public class ScoreElement {
    private int round;
    private int score;

    private boolean finished;

    public ScoreElement(){

    }
    public ScoreElement(int round,int score, boolean finished){
        this.round=round;
        this.score=score;
        this.finished = finished;
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

    public boolean getFinished() {
        return finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }
}
