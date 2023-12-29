package com.example.we_database.controllers;


import com.example.we_database.dtos.ScoreDTO;
import com.example.we_database.services.ScoreService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("")
public class ScoreController {
    private final static Logger LOGGER = LoggerFactory.getLogger(PersonController.class);
    private final ScoreService scoreService;

    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @PostMapping("score")
    @ResponseStatus(HttpStatus.CREATED)
    public ScoreDTO postScore(@RequestBody ScoreDTO scoreDTO) {
        return scoreService.post(scoreDTO);
    }

    @PutMapping("score")
    public ScoreDTO putScore(@RequestBody ScoreDTO scoreDTO) {
        return scoreService.put(scoreDTO);
    }
    @GetMapping("score/{id}")
    public List<ScoreDTO> getScore(@PathVariable String id) {
        return scoreService.getAll(id);
    }

    @DeleteMapping("score/{id}")
    public Long deleteScore(@PathVariable String id) {
        return scoreService.delete(id);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}
