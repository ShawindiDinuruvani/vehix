package com.vehix.backend.controller;

import com.vehix.backend.entity.User;
import com.vehix.backend.repository.AppointmentRepository;
import com.vehix.backend.repository.ServiceRequestRepository;
import com.vehix.backend.repository.UserRepository;
import com.vehix.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*") // React එකට සම්බන්ධ වෙන්න
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ServiceRequestRepository serviceRequestRepository;

    // අලුතින් එකතු කළ කොටස: Service එක inject කරගන්න
    @Autowired
    private UserService userService;

    // --- (Customers සහ Garages ගන්න methods වෙනසක් නෑ) ---
    @GetMapping("/customers")
    public List<User> getCustomers() {
        return userRepository.findAll().stream().filter(u -> "USER".equals(u.getRole()) || "CUSTOMER".equals(u.getRole())).toList();
    }

    @GetMapping("/garages")
    public List<User> getGarages() {
        return userRepository.findAll().stream().filter(u -> "GARAGE_OWNER".equals(u.getRole())).toList();
    }

    // --- වෙනස් කළ කොටස (Ban Logic එක Service එකට යැවීම) ---
    @PutMapping("/toggle-status/{id}")
    public ResponseEntity<?> toggleStatus(@PathVariable Long id) {
        try {
            // Controller එක දන්නේ නෑ බෑන් කරන්නේ කොහොමද කියලා. එයා ඒක Service එකට කියනවා.
            userService.toggleUserStatus(id);
            return ResponseEntity.ok("User status updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating status");
        }
    }

    // --- (අනිත් methods - deleteUser, getHistory වෙනසක් නෑ) ---
    @DeleteMapping("/delete/{id}")
    public Map<String,String> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return Map.of("message", "Deleted");
    }

    @GetMapping("/user-history/{id}")
    public ResponseEntity<?> getHistory(@PathVariable Long id) {
        // (කලින් code එකම තියන්න)
        User user = userRepository.findById(id).orElseThrow();
        Map<String, Object> resp = new HashMap<>();

        if ("GARAGE_OWNER".equals(user.getRole())) {
            resp.put("appointments", appointmentRepository.findByGarageName(user.getBusinessName()));
            resp.put("requests", serviceRequestRepository.findByGarageId(id));
        } else {
            resp.put("appointments", appointmentRepository.findByUserEmail(user.getEmail()));
            resp.put("requests", serviceRequestRepository.findByOwnerName(user.getFullName()));
        }
        return ResponseEntity.ok(resp);
    }
}