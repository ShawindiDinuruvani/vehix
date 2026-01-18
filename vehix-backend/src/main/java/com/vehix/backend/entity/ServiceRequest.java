package com.vehix.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "service_requests")
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ownerName;
    private String vehicleNumber;
    private String vehicleModel;
    private String issue;
    private String additionalNotes;

    private Double latitude;
    private Double longitude;

    private LocalDateTime requestTime;

    private String status; // "Pending"

    // 🔥 අලුතින් එකතු කළ කොටස: ගරාජ් එකේ ID එක
    private Long garageId;
}