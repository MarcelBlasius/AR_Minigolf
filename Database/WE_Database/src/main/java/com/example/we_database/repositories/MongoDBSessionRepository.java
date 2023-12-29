package com.example.we_database.repositories;

import com.mongodb.ReadConcern;
import com.mongodb.ReadPreference;
import com.mongodb.TransactionOptions;
import com.mongodb.WriteConcern;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.FindOneAndReplaceOptions;

import com.example.we_database.models.Session;
import jakarta.annotation.PostConstruct;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.ReturnDocument.AFTER;
@Repository
public class MongoDBSessionRepository implements SessionRepository {
    private static final TransactionOptions txnOptions = TransactionOptions.builder()
            .readPreference(ReadPreference.primary())
            .readConcern(ReadConcern.MAJORITY)
            .writeConcern(WriteConcern.MAJORITY)
            .build();
    private final MongoClient client;
    private MongoCollection<Session> sessionCollection;

    public MongoDBSessionRepository(MongoClient mongoClient) {
        this.client = mongoClient;
    }

    @PostConstruct
    void init() {
        sessionCollection = client.getDatabase("WebEngineeringDataBase").getCollection("Session", Session.class);
    }

    @Override
    public Session get(String id) {
        return sessionCollection.find(eq("_id", new ObjectId(id))).first();
    }

    @Override
    public List<Session> getAll() {
        return sessionCollection.find().into(new ArrayList<>());
    }
    @Override
    public Session post(Session s) {
        sessionCollection.insertOne(s);
        return s;
    }

    @Override
    public Session put(Session s) {
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().returnDocument(AFTER);
        return sessionCollection.findOneAndReplace(eq("_id", s.getId()), s, options);
    }

    @Override
    public long delete(String id) {
        return sessionCollection.deleteOne(eq("_id", new ObjectId(id))).getDeletedCount();

    }

}
