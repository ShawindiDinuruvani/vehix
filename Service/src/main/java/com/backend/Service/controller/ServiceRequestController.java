package com.backend.Service.controller;




import com.backend.Service.entity.ServiceRequest;
import com.backend.Service.service.ServiceRequestService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/service-requests")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
public class ServiceRequestController {

    private final ServiceRequestService service;

    public ServiceRequestController(ServiceRequestService service) {
        this.service = service;
    }

    // Create request
    @PostMapping
    public ResponseEntity<ServiceRequest> createRequest(@Valid @RequestBody ServiceRequest request) {
        return ResponseEntity.ok(service.saveRequest(request));
    }

    // Get requests with pagination & sorting
    @GetMapping
    public ResponseEntity<Page<ServiceRequest>> getRequests(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        return ResponseEntity.ok(service.getRequests(page, size, sortBy, sortDir));
    }
}

