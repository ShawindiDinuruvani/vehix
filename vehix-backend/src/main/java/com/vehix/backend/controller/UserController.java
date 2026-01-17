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
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 2. Add this GET method to fetch only garages
    @GetMapping("/garages")
    public ResponseEntity<List<User>> getGarages() {
        List<User> garages = userRepository.findByRole("GARAGE_OWNER");
        return ResponseEntity.ok(garages);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
        }

        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save user
        User savedUser = userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User registered successfully", "userId", savedUser.getId()));
    }
}