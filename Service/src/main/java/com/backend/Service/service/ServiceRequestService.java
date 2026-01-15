package com.backend.Service.service;


import com.backend.Service.entity.ServiceRequest;
import com.backend.Service.repository.ServiceRequestRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ServiceRequestService {

    private final ServiceRequestRepository repository;

    public ServiceRequestService(ServiceRequestRepository repository) {
        this.repository = repository;
    }

    public ServiceRequest saveRequest(ServiceRequest request) {
        return repository.save(request);
    }

    public Page<ServiceRequest> getRequests(int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        return repository.findAll(PageRequest.of(page, size, sort));
    }
}
