package com.backend.Service.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String ownerName;

    @NotBlank
    private String vehicleNumber;

    @NotBlank
    private String vehicleModel;

    @NotBlank
    private String issue;

    private String additionalNotes;

    // Getters and setters
}
