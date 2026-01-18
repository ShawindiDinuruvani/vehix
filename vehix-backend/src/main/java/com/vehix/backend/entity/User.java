package com.vehix.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    // 👇 අපි AuthController එකේ පාවිච්චි කළේ මේ නමයි. ඒ නිසා mobileNumber වෙනුවට මේක දාන්න.
    private String contactNumber;

    private String password;
    private String role; // "CUSTOMER" or "GARAGE_OWNER"

    // Garage Owner Specific Fields
    private String businessName;
    private String businessAddress;

    // 👇 Location Data
    private Double latitude;
    private Double longitude;
}