package com.vehix.vehix_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String Full_Name;
    private String email;

    private String password; // this is important

    // Default constructor
    public User() {}

    // Constructor with parameters
    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // ✅ GETTERS & SETTERS
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }   // ← must exist
    public void setPassword(String password) { this.password = password; }  // ← must exist
}

