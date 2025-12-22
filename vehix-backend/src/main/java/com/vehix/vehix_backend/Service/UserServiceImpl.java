package com.vehix.vehix_backend.Service;

import com.vehix.vehix_backend.Repository.UserRepository;
import com.vehix.vehix_backend.model.User;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserServiceImpl extends UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        super();
        this.userRepository = userRepository;
    }

    // ✅ Register
    @Override
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    // ✅ Login check
    @Override
    public boolean authenticate(String email, String password) {

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // password match check
            return user.getPassword().equals(password);
        }

        return false; // user not found
    }
}
