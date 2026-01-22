package com.vehix.backend.controller;

import com.vehix.backend.entity.User;
import com.vehix.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // --- 1. USER REGISTRATION (SIGNUP) ---
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // අලුත් User කෙනෙක් හැමවෙලේම Active වෙන්න ඕනේ
        user.setActive(true);

        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully", "userId", savedUser.getId()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Optional<User> user = userRepository.findByEmail(email);

        // 1. User කෙනෙක් ඉන්නවද සහ Password මැච් වෙනවද බැලීම
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {

            // --- Step 4: වැදගත්ම කොටස (Ban Check) ---
            if (!user.get().isActive()) {
                // User Ban වෙලා නම් Login එක නවතනවා
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Account is Banned. Contact Admin."));
            }
            // ----------------------------------------


            return ResponseEntity.ok(user);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid Email or Password"));
    }

    // --- 3. GET GARAGE OWNERS LIST ---
    @GetMapping("/garages")
    public List<User> getAllGarages() {
        return userRepository.findByRole("GARAGE_OWNER");
    }



}