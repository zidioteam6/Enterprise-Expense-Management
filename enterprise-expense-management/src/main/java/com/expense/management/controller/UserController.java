package com.expense.management.controller;

import com.expense.management.dto.LoginRequest;
import com.expense.management.dto.SignupRequest;
import com.expense.management.model.User;
import com.expense.management.repository.UserRepository;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void testPasswordEncoderBean() {
        System.out.println(">>> PasswordEncoder loaded: " + passwordEncoder.getClass().getName());
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                response.put("success", true);
                response.put("message", "Login successful");
                return ResponseEntity.ok(response);
            }
        }

        response.put("success", false);
        response.put("message", "Invalid credentials");
        return ResponseEntity.status(401).body(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody SignupRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            response.put("success", false);
            response.put("message", "Email already registered");
            return ResponseEntity.status(400).body(response);
        }

        try {
            // Hash password before saving
            String encodedPassword = passwordEncoder.encode(request.getPassword());

            User newUser = new User();
            newUser.setFullName(request.getFullName());
            newUser.setEmail(request.getEmail());
            newUser.setPassword(encodedPassword);

            userRepository.save(newUser);
            
            response.put("success", true);
            response.put("message", "User registered successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error creating user: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
