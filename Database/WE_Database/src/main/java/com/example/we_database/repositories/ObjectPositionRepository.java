package com.example.we_database.repositories;


import com.example.we_database.models.ObjectPosition;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ObjectPositionRepository {
    ObjectPosition get(String id);

    List<ObjectPosition> getAll(String id);
    ObjectPosition post(ObjectPosition objectPosition);
    ObjectPosition put(ObjectPosition objectPosition);
    long delete(String id);
}
