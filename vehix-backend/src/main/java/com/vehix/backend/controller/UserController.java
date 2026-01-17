package com.vehix.backend.controller;

import com.vehix.backend.entity.User;
import com.vehix.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 1. SIGNUP API (JSON Data Only)
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        // Check Email
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
        }

        // Hash Password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save User
        User savedUser = userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User registered successfully", "userId", savedUser.getId()));
    }

    // 2. GET GARAGES API
    @GetMapping("/garages")
    public List<User> getAllGarages() {
        return userRepository.findByRole("GARAGE_OWNER");
    }
}