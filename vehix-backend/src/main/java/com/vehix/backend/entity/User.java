package com.vehix.backend.entity;



import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data // Lombok automatically generates Getters, Setters, ToString
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    private String password; // Will store Hashed Password

    private String role; // "CUSTOMER" or "GARAGE_OWNER"

    // Garage Owner Specific Fields
    private String businessName;
    private String businessAddress;
    private String locationLink;
}