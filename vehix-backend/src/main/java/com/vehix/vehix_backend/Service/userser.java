package com.vehix.vehix_backend.Service;

import org.apache.catalina.User;

public interface userser {


    User registerUser(User user);
    boolean authenticate(String email, String password);
}
