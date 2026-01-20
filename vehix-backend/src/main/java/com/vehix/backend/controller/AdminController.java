package com.vehix.backend.controller;

import com.vehix.backend.entity.User;
import com.vehix.backend.entity.Appointment;
import com.vehix.backend.entity.ServiceRequest;
import com.vehix.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired private UserRepository userRepository;
    @Autowired private AppointmentRepository appointmentRepository;
    @Autowired private ServiceRequestRepository serviceRequestRepository;

    @GetMapping("/customers")
    public List<User> getCustomers() {
        return userRepository.findAll().stream().filter(u -> "USER".equals(u.getRole()) || "CUSTOMER".equals(u.getRole())).toList();
    }

    @GetMapping("/garages")
    public List<User> getGarages() {
        return userRepository.findAll().stream().filter(u -> "GARAGE_OWNER".equals(u.getRole())).toList();
    }

    @PutMapping("/toggle-status/{id}")
    public User toggleStatus(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setActive(!user.isActive());
        return userRepository.save(user);
    }

    @DeleteMapping("/delete/{id}")
    public Map<String,String> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return Map.of("message", "Deleted");
    }

    @GetMapping("/user-history/{id}")
    public ResponseEntity<?> getHistory(@PathVariable Long id) {
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