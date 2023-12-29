package com.example.we_database.dtos;

public record AverageAgeDTO(double averageAge) {

    public AverageAgeDTO(double averageAge) {
        this.averageAge = averageAge;
    }
}
