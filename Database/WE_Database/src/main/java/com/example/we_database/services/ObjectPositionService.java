package com.example.we_database.services;


import com.example.we_database.dtos.ObjectPositionDTO;

import java.util.List;

public interface ObjectPositionService {
    ObjectPositionDTO get(String id);
    List<ObjectPositionDTO> getAll(String id);
    ObjectPositionDTO post(ObjectPositionDTO b);
    ObjectPositionDTO put(ObjectPositionDTO b);
    long delete(String id);
}
