package com.expense.management.dto;

public class SignupRequest {
    
    private String fullName;
    private String email;
    private String password;

    public SignupRequest() {}

    public SignupRequest(String email, String password) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
    }

    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
