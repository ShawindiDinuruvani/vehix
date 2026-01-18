package com.vehix.backend.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private String email;
    private String role;
    private String fullName;
    private String businessName;

    // 🔥 මෙන්න මේක අලුතින් එකතු කරන්න
    private Long id;
}