package repository;


import Entity.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface AppointmentRepository extends JpaRepository<user, Long> { }