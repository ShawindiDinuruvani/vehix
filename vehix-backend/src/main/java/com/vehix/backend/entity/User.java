package com.vehix.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Full Name is required")
    private String fullName;

    @Column(unique = true, nullable = false)
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private String role; // "CUSTOMER", "GARAGE_OWNER", "ADMIN"

    // Garage Owner Data
    private String businessName;
    private String businessAddress;
    private String contactNumber;
    private Double latitude;
    private Double longitude;

    @Column(columnDefinition = "boolean default true")
    private boolean isActive = true;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String profileImage;
}