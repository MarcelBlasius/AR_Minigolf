package com.example.we_database.repositories;


import com.example.we_database.models.Session;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionRepository {
    Session get(String id);

    List<Session> getAll();
    Session post(Session s);

    Session put(Session s);
    long delete(String id);
}
