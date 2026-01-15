package service ;


import com.vehix.Appoinment.Entity.user;
import com.vehix.Appoinment.repository.repo;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AppointmentService {

    private final repo repository;

    public AppointmentService(repo repository) {
        this.repository = repository;
    }

    public user save(user appointment) {
        return repository.save(appointment);
    }

    public <user> List<user> getAlluser() {
        return repository.findAll();
    }

    public void deleteAppointment(Long id) {
        repository.deleteById(id);
    }
}

