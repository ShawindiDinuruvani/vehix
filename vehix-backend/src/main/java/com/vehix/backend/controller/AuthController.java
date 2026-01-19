package com.vehix.backend.controller;

import com.vehix.backend.entity.User;
import com.vehix.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ 1. USER REGISTRATION
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already in use!");
        }

        User newUser = new User();
        newUser.setFullName(user.getFullName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setRole(user.getRole());

        // 🔥 අලුත් User කෙනෙක් හැමවෙලේම Active (වැඩ කරන) තත්ත්වයෙන් තියන්න ඕනේ
        newUser.setActive(true);

        // Garage Owner නම් Business Details & Location Save
        if ("GARAGE_OWNER".equals(user.getRole())) {
            newUser.setBusinessName(user.getBusinessName());
            newUser.setBusinessAddress(user.getBusinessAddress());
            newUser.setContactNumber(user.getContactNumber());
            newUser.setLatitude(user.getLatitude());
            newUser.setLongitude(user.getLongitude());
        }

        userRepository.save(newUser);
        return ResponseEntity.ok(Map.of("message", "User registered successfully!"));
    }

    // ✅ 2. USER LOGIN (Updated with Admin & Ban Logic)
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        // 🔥 1. විශේෂ ADMIN LOGIC (Hardcoded Admin Login)
        // Database check නොකර කෙලින්ම Admin විදියට යවනවා
        if ("sha123@gmail.com".equals(email) && "sha123".equals(password)) {
            Map<String, Object> adminResponse = new HashMap<>();
            adminResponse.put("message", "Admin Login Successful");
            adminResponse.put("token", "ADMIN_TOKEN_12345");
            adminResponse.put("userId", 0); // Admin ට ID එකක් නෑ
            adminResponse.put("email", email);
            adminResponse.put("fullName", "Super Admin");
            adminResponse.put("role", "ADMIN"); // Frontend එකට 'ADMIN' කියලා යවනවා
            return ResponseEntity.ok(adminResponse);
        }

        // සාමාන්‍ය Users ලා සඳහා Login Logic
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // 🔥 2. Ban Check: Admin විසින් Ban කරලා නම් Login වෙන්න දෙන්න බැහැ
            // (user.isActive() false නම් එළියට දානවා)
            if (!user.isActive()) {
                return ResponseEntity.status(403).body(Map.of("message", "Your account has been BANNED by Admin!"));
            }

            // Password Match වෙනවද බලනවා
            if (passwordEncoder.matches(password, user.getPassword())) {

                Map<String, Object> response = new HashMap<>();
                response.put("message", "Login Successful");
                response.put("token", UUID.randomUUID().toString()); // Mock Token

                response.put("id", user.getId());
                response.put("userId", user.getId());
                response.put("email", user.getEmail());
                response.put("fullName", user.getFullName());
                response.put("role", user.getRole());

                // Garage Owner නම් Business Name එකත් යවනවා
                if ("GARAGE_OWNER".equals(user.getRole())) {
                    response.put("businessName", user.getBusinessName());
                }

                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
    }
}