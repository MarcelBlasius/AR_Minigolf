package com.example.we_database.repositories;

import com.mongodb.ReadConcern;
import com.mongodb.ReadPreference;
import com.mongodb.TransactionOptions;
import com.mongodb.WriteConcern;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.FindOneAndReplaceOptions;

import com.example.we_database.models.Score;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.ReturnDocument.AFTER;
@Repository
public class MongoDBScoreRepository implements ScoreRepository{


    private static final TransactionOptions txnOptions = TransactionOptions.builder()
            .readPreference(ReadPreference.primary())
            .readConcern(ReadConcern.MAJORITY)
            .writeConcern(WriteConcern.MAJORITY)
            .build();
    private final MongoClient client;
    private MongoCollection<Score> scoreCollection;

    public MongoDBScoreRepository(MongoClient mongoClient) {
        this.client = mongoClient;
    }

    @PostConstruct
    void init() {
        scoreCollection = client.getDatabase("WebEngineeringDataBase").getCollection("Score", Score.class);
    }
    @Override
    public Score post(Score s){
        scoreCollection.insertOne(s);
        return s;
    }
    @Override
    public List<Score> getAll(String id) {
        return scoreCollection.find(in("sessionId", id)).into(new ArrayList<>());

    }
    @Override
    public long delete(String id) {
        return scoreCollection.deleteMany(eq("sessionId", id)).getDeletedCount();
    }
    @Override
    public Score put(Score s) {
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().returnDocument(AFTER);
        Score tmpscore=scoreCollection.find(and(eq("sessionId", s.getSessionId()),eq("player", s.getPlayer()))).first();
        try {
            s.setId(tmpscore.getId());
        }catch(NullPointerException nex)   {
            nex.printStackTrace();
        }
        return scoreCollection.findOneAndReplace(and(eq("sessionId", s.getSessionId()),eq("player", s.getPlayer())), s, options);
    }
}
