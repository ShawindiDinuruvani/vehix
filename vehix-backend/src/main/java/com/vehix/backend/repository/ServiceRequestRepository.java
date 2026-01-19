package com.vehix.backend.repository;

import com.vehix.backend.entity.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {

    List<ServiceRequest> findByOwnerName(String ownerName);
    List<ServiceRequest> findByGarageId(Long garageId);
}