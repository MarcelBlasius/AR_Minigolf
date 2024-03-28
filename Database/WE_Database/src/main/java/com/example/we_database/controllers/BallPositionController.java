package com.example.we_database.controllers;


import com.example.we_database.dtos.BallPositionDTO;
import com.example.we_database.services.BallPositionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
public class BallPositionController {


    private final static Logger LOGGER = LoggerFactory.getLogger(BallPositionController.class);
    private final BallPositionService ballPositionService;

    public BallPositionController(BallPositionService ballPositionService) {
        this.ballPositionService = ballPositionService;
    }

    @PostMapping("positions")
    @ResponseStatus(HttpStatus.CREATED)
    public BallPositionDTO postBallPosition(@RequestBody BallPositionDTO ballPositionDTO) {
        return ballPositionService.post(ballPositionDTO);
    }
    @GetMapping("positions/{sessionId}")
    public List<BallPositionDTO> getBallPosition(@PathVariable String sessionId) {

        return ballPositionService.getAll(sessionId);
    }
    @PutMapping("positions")
    public BallPositionDTO putBallposition(@RequestBody BallPositionDTO ballPositionDTO) {

        return ballPositionService.put(ballPositionDTO);
    }

    @DeleteMapping("positions/{id}")
    public Long deleteBallPosition(@PathVariable String id) {
        return ballPositionService.delete(id);
    }
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}
