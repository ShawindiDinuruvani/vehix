package com.vehix.backend.entity;



import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data // Lombok automatically generates Getters, Setters, ToString
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    private String password; // Will store Hashed Password

    private String role; // "CUSTOMER" or "GARAGE_OWNER"

    // Garage Owner Specific Fields
    private String businessName;
    private String businessAddress;
    private String locationLink;


    private Double latitude;
    private Double longitude;

    // Add getters and setters if you aren't using @Data (Lombok)
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
}