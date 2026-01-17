package com.vehix.backend.repository;

import com.vehix.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUserEmail(String userEmail);
    List<Appointment> findByGarageName(String garageName);
}