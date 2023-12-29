package com.example.we_database.services;


import com.example.we_database.dtos.SessionDTO;
import com.example.we_database.repositories.SessionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionServiceImpl implements SessionService{
    private final SessionRepository sessionRepository;

    public SessionServiceImpl(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    @Override
    public SessionDTO get(String id) {
        return new SessionDTO(sessionRepository.get(id));
    }

    @Override
    public List<SessionDTO> getAll(){
        return sessionRepository.getAll().stream().map(SessionDTO::new).toList();
    }
    @Override
    public SessionDTO post(SessionDTO s) {
        return new SessionDTO(sessionRepository.post(s.toSession()));
    }

    @Override
    public SessionDTO put(SessionDTO s) {
        return new SessionDTO(sessionRepository.put(s.toSession()));

    }
    @Override
    public long delete(String id) {
        return sessionRepository.delete(id);
    }
}
