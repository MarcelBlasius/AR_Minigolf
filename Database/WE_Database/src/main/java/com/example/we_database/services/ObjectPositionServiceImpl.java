package com.example.we_database.services;


import com.example.we_database.dtos.ObjectPositionDTO;
import com.example.we_database.repositories.ObjectPositionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ObjectPositionServiceImpl implements ObjectPositionService {

    private final ObjectPositionRepository objectPositionRepository;

    public ObjectPositionServiceImpl(ObjectPositionRepository objectPositionRepository) {
        this.objectPositionRepository = objectPositionRepository;
    }

    @Override
    public ObjectPositionDTO get(String id) {
        return new ObjectPositionDTO(objectPositionRepository.get(id));

    }

    @Override
    public List<ObjectPositionDTO> getAll(String id) {
        return objectPositionRepository.getAll(id).stream().map(ObjectPositionDTO::new).toList();

    }

    @Override
    public ObjectPositionDTO post(ObjectPositionDTO b) {
        return new ObjectPositionDTO(this.objectPositionRepository.post(b.toObjectPosition()));
    }

    @Override
    public ObjectPositionDTO put(ObjectPositionDTO b) {
        return new ObjectPositionDTO(this.objectPositionRepository.put(b.toObjectPosition()));
    }

    @Override
    public long delete(String id) {
        return this.objectPositionRepository.delete(id);
    }
}
