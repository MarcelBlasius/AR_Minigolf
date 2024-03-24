package com.example.we_database.controllers;


import com.example.we_database.dtos.ObjectPositionDTO;
import com.example.we_database.services.ObjectPositionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
public class ObjectPositionController {


    private final static Logger LOGGER = LoggerFactory.getLogger(ObjectPositionController.class);
    private final ObjectPositionService objectPositionService;

    public ObjectPositionController(ObjectPositionService objectPositionService) {
        this.objectPositionService = objectPositionService;
    }

    @PostMapping("objectPositions")
    @ResponseStatus(HttpStatus.CREATED)
    public ObjectPositionDTO postObjectPosition(@RequestBody ObjectPositionDTO objectPositionDTO) {
        return this.objectPositionService.post(objectPositionDTO);
    }
    @GetMapping("objectPositions/{sessionId}")
    public List<ObjectPositionDTO> getObjectPosition(@PathVariable String sessionId) {

        return this.objectPositionService.getAll(sessionId);
    }
    @PutMapping("objectPositions")
    public ObjectPositionDTO putObjectPosition(@RequestBody ObjectPositionDTO ballPositionDTO) {

        return this.objectPositionService.put(ballPositionDTO);
    }

    @DeleteMapping("objectPositions/{id}")
    public Long deleteObjectPosition(@PathVariable String id) {
        return objectPositionService.delete(id);
    }
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}
