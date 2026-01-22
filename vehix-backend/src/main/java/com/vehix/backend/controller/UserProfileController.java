package com.vehix.backend.controller;

import com.vehix.backend.entity.User;
import com.vehix.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin("*")
public class UserProfileController {

    @Autowired
    private UserRepository userRepository;

    // 1. Profile දත්ත ලබා ගැනීම (GET) - "Failed to load" දෝෂය මෙය විසඳයි
    @GetMapping("/{email}")
    public ResponseEntity<?> getUserProfile(@PathVariable String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }
    }

    // 2. Profile දත්ත යාවත්කාලීන කිරීම (PUT) - Image & Details
    @PutMapping("/update")
    public ResponseEntity<?> updateUserProfile(@RequestBody User updatedUser) {
        Optional<User> existingUserOp = userRepository.findByEmail(updatedUser.getEmail());

        if (existingUserOp.isPresent()) {
            User existingUser = existingUserOp.get();

            // නම, දුරකථන අංකය, ලිපිනය Update කිරීම
            existingUser.setFullName(updatedUser.getFullName());
            existingUser.setContactNumber(updatedUser.getContactNumber());

            // Garage Owner කෙනෙක් නම් Business Details Update කිරීම
            if(updatedUser.getBusinessName() != null) existingUser.setBusinessName(updatedUser.getBusinessName());
            if(updatedUser.getBusinessAddress() != null) existingUser.setBusinessAddress(updatedUser.getBusinessAddress());

            // අලුත් පින්තූරයක් එවා ඇත්නම් පමණක් Update කරන්න
            if (updatedUser.getProfileImage() != null && !updatedUser.getProfileImage().isEmpty()) {
                existingUser.setProfileImage(updatedUser.getProfileImage());
            }

            userRepository.save(existingUser);
            return ResponseEntity.ok(Map.of("message", "Profile Updated Successfully"));
        }
        return ResponseEntity.status(404).body("User not found");
    }
}