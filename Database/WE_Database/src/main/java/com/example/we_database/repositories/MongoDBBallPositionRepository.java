package com.example.we_database.repositories;

import com.mongodb.ReadConcern;
import com.mongodb.ReadPreference;
import com.mongodb.TransactionOptions;
import com.mongodb.WriteConcern;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.FindOneAndReplaceOptions;
import com.example.we_database.models.BallPosition;
import jakarta.annotation.PostConstruct;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.ReturnDocument.AFTER;
@Repository
public class MongoDBBallPositionRepository implements BallPositionRepository{

    private static final TransactionOptions txnOptions = TransactionOptions.builder()
            .readPreference(ReadPreference.primary())
            .readConcern(ReadConcern.MAJORITY)
            .writeConcern(WriteConcern.MAJORITY)
            .build();
    private final MongoClient client;
    private MongoCollection<BallPosition> ballPositionCollection;

    public MongoDBBallPositionRepository(MongoClient mongoClient) {
        this.client = mongoClient;
    }

    @PostConstruct
    void init() {
        ballPositionCollection = client.getDatabase("WebEngineeringDataBase").getCollection("ballPosition", BallPosition.class);
    }

    @Override
    public BallPosition get(String id) {
        return ballPositionCollection.find(eq("_id", new ObjectId(id))).first();
    }

    @Override
    public List<BallPosition> getAll(String id) {
        return ballPositionCollection.find(eq("sessionId",id)).into(new ArrayList<>());
    }

    @Override
    public BallPosition post(BallPosition ballPosition) {
        ballPositionCollection.insertOne(ballPosition);
        return ballPosition;
    }

    @Override
    public BallPosition put(BallPosition ballPosition) {
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().returnDocument(AFTER);
        BallPosition tmpballposition=ballPositionCollection.find(and(eq("sessionId", ballPosition.getSessionId()),eq("player", ballPosition.getPlayer()))).first();
        try {
            ballPosition.setId(tmpballposition.getId());
        }catch (NullPointerException nex){
            nex.printStackTrace();
        }
        return ballPositionCollection.findOneAndReplace(and(eq("sessionId", ballPosition.getSessionId()),eq("player", ballPosition.getPlayer())), ballPosition, options);
    }

    @Override
    public long delete(String id) {
        return ballPositionCollection.deleteMany(eq("sessionId", id)).getDeletedCount();

    }
}
