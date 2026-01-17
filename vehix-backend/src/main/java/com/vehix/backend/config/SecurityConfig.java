package com.vehix.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. CSRF Disable කිරීම (Lambda විදියට)
                .csrf(csrf -> csrf.disable())

                // 2. CORS Disable කිරීම
                .cors(cors -> cors.disable())

                // 3. API වලට අවසර දීම
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").permitAll() // API වලට ඕනෑම කෙනෙක්ට එන්න දෙනවා
                        .anyRequest().permitAll()
                );

        return http.build();
    }
}