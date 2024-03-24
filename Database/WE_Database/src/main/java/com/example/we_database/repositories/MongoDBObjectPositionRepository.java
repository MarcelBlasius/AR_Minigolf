package com.example.we_database.repositories;

import com.example.we_database.models.BallPosition;
import com.mongodb.ReadConcern;
import com.mongodb.ReadPreference;
import com.mongodb.TransactionOptions;
import com.mongodb.WriteConcern;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.FindOneAndReplaceOptions;
import com.example.we_database.models.ObjectPosition;
import jakarta.annotation.PostConstruct;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.ReturnDocument.AFTER;
@Repository
public class MongoDBObjectPositionRepository implements ObjectPositionRepository{

    private static final TransactionOptions txnOptions = TransactionOptions.builder()
            .readPreference(ReadPreference.primary())
            .readConcern(ReadConcern.MAJORITY)
            .writeConcern(WriteConcern.MAJORITY)
            .build();
    private final MongoClient client;
    private MongoCollection<ObjectPosition> objectPositionCollection;

    public MongoDBObjectPositionRepository(MongoClient mongoClient) {
        this.client = mongoClient;
    }

    @PostConstruct
    void init() {
        this.objectPositionCollection = this.client.getDatabase("WebEngineeringDataBase").getCollection("objectPosition", ObjectPosition.class);
    }

    @Override
    public ObjectPosition get(String id) {
        return this.objectPositionCollection.find(eq("_id", new ObjectId(id))).first();
    }

    @Override
    public List<ObjectPosition> getAll(String id) {
        return this.objectPositionCollection.find(eq("sessionId",id)).into(new ArrayList<>());
    }

    @Override
    public ObjectPosition post(ObjectPosition objectPosition) {
        this.objectPositionCollection.insertOne(objectPosition);
        return objectPosition;
    }

    @Override
    public ObjectPosition put(ObjectPosition objectPosition) {
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().returnDocument(AFTER);
        ObjectPosition tmpobjectposition=objectPositionCollection.find(and(eq("sessionId", objectPosition.getSessionId()),eq("name", objectPosition.getName()))).first();
        try {
            objectPosition.setId(tmpobjectposition.getId());
        }catch (NullPointerException nex){
            nex.printStackTrace();
        }
        return objectPositionCollection.findOneAndReplace(and(eq("sessionId", objectPosition.getSessionId()),eq("name", objectPosition.getName())), objectPosition, options);
    }

    @Override
    public long delete(String id) {
        return this.objectPositionCollection.deleteMany(eq("sessionId", id)).getDeletedCount();

    }
}
