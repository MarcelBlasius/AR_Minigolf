package com.example.we_database.controllers;


import com.example.we_database.dtos.SessionDTO;
import com.example.we_database.services.SessionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
public class SessionController {
    private final static Logger LOGGER = LoggerFactory.getLogger(SessionController.class);
    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("session")
    @ResponseStatus(HttpStatus.CREATED)
    public SessionDTO postSession(@RequestBody SessionDTO sessionDTO) {
        return sessionService.post(sessionDTO);
    }

    @PutMapping("session")
    public SessionDTO putSession(@RequestBody SessionDTO sessionDTO) {
        return sessionService.put(sessionDTO);
    }
    @GetMapping("session")
    public List<SessionDTO> getSessions() {
        return sessionService.getAll();
    }

    @DeleteMapping("session/{id}")
    public Long deleteSession(@PathVariable String id) {
        return sessionService.delete(id);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }

}
