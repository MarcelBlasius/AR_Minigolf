package com.example.we_database.dtos;


import com.example.we_database.models.CarEntity;
public record CarDTO(String brand, String model, Float maxSpeedKmH) {

    public CarDTO(CarEntity c) {
        this(c.getBrand(), c.getModel(), c.getMaxSpeedKmH());
    }

    public CarEntity toCarEntity() {
        return new CarEntity(brand, model, maxSpeedKmH);
    }
}
