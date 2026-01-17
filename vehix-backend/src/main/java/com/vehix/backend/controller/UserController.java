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
@CrossOrigin("*") // 1. Frontend එකට සම්බන්ධ වීමට මෙය අත්‍යවශ්‍යයි
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // --- 1. USER REGISTRATION (SIGNUP) ---
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // Email එක කලින් තියෙනවද බලනවා
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
        }

        // Password එක Hash කරලා Save කරනවා
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // User Save කරනවා
        User savedUser = userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User registered successfully", "userId", savedUser.getId()));
    }

    // --- 2. GET GARAGE OWNERS LIST ---
    // 👇 Appointment Page එකේ ගරාජ් පෙන්වන්න මේ කොටස අනිවාර්යයෙන්ම ඕනේ
    @GetMapping("/garages")
    public List<User> getAllGarages() {
        return userRepository.findByRole("GARAGE_OWNER");
    }
}