package com.vehix.backend.controller;

import com.vehix.backend.entity.ServiceRequest;
import com.vehix.backend.repository.ServiceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map; // 🔥 Map එක import කරන්න අමතක කරන්න එපා

@RestController
@RequestMapping("/api/service")
@CrossOrigin("*")
public class ServiceRequestController {

    @Autowired
    private ServiceRequestRepository repository;

    // 1. Customer අලුත් Request එකක් දාන තැන
    @PostMapping("/request")
    public ServiceRequest createRequest(@RequestBody ServiceRequest request) {
        request.setRequestTime(LocalDateTime.now());
        request.setStatus("Pending");
        return repository.save(request);
    }

    // 2. Customer ගේ History එක බලන තැන (By Name)
    @GetMapping("/history/{name}")
    public List<ServiceRequest> getMyRequests(@PathVariable String name) {
        return repository.findByOwnerName(name);
    }

    // ---------------------------------------------------------
    // 🔥 පහත කොටස් අලුතින් එකතු කළා (Garage Dashboard එක සඳහා)
    // ---------------------------------------------------------

    // 3. Garage එකට අදාළ Requests ටික ගන්න API එක
    @GetMapping("/garage/{garageId}")
    public List<ServiceRequest> getRequestsByGarage(@PathVariable Long garageId) {
        return repository.findByGarageId(garageId);
    }

    // 4. Status Update කරන API එක (Accept / Reject කරන්න)
    @PutMapping("/status/{id}")
    public ServiceRequest updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        ServiceRequest request = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found with id: " + id));

        request.setStatus(body.get("status")); // අලුත් status එක දානවා
        return repository.save(request);
    }
}