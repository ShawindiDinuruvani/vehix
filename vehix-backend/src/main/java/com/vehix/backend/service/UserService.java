package com.vehix.backend.service;

import com.vehix.backend.entity.User;
import com.vehix.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // User කෙනෙක්ව Ban කරන හෝ Active කරන කොටස
    public void toggleUserStatus(Long id) {
        // 1. ID එකෙන් User ව හොයනවා
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // 2. දැනට තියෙන Status එකේ අනිත් පැත්ත හරවනවා (True නම් False, False නම් True)
            user.setActive(!user.isActive());

            // 3. Database එකේ Save කරනවා
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }
}