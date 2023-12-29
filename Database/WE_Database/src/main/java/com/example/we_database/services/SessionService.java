package com.example.we_database.services;


import com.example.we_database.dtos.SessionDTO;
import java.util.List;

public interface SessionService {
    SessionDTO get(String id);

    List<SessionDTO> getAll();
    SessionDTO post(SessionDTO s);
    SessionDTO put(SessionDTO s);
    long delete(String id);
}
