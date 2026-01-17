package com.vehix.backend.controller;

import com.vehix.backend.entity.Appointment;
import com.vehix.backend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin("*") // Frontend Connection එකට අත්‍යවශ්‍යයි
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // 1. Booking එකක් දාන්න
    @PostMapping("/book")
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        appointment.setStatus("Pending");
        return appointmentRepository.save(appointment);
    }

    // 2. Customer ගේ History ගන්න
    @GetMapping("/my-appointments/{email}")
    public List<Appointment> getMyAppointments(@PathVariable String email) {
        return appointmentRepository.findByUserEmail(email);
    }

    // 3. Garage Owner ගේ Bookings ගන්න
    @GetMapping("/garage/{garageName}")
    public List<Appointment> getGarageAppointments(@PathVariable String garageName) {
        return appointmentRepository.findByGarageName(garageName);
    }

    // 4. Booking Delete කරන්න
    @DeleteMapping("/delete/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentRepository.deleteById(id);
    }
}