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

        // Garage Owner නම් Business විස්තර සහ Location Save කරනවා
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

    // ✅ 2. USER LOGIN (Updated)
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Password Match වෙනවද බලනවා
            if (passwordEncoder.matches(password, user.getPassword())) {

                // Frontend එකට යවන Data ටික Map එකකට දානවා
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Login Successful");
                response.put("token", UUID.randomUUID().toString()); // Mock Token

                // 🔥 වැදගත්ම කොටස: 'id' කියන නමින් User ID එක යවනවා
                // Frontend එකේ response.data.id කියලා ඉල්ලන නිසා මේ නම ඕනේ.
                response.put("id", user.getId());
                response.put("userId", user.getId()); // පරණ ක්‍රමයටත් තියෙන්න අරිනවා (Safety එකට)

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