package BACKEND.BACKEND.auth.controller;

import BACKEND.BACKEND.auth.dto.ApiResponse;
import BACKEND.BACKEND.auth.dto.AuthResponse;
import BACKEND.BACKEND.auth.dto.LoginRequest;
import BACKEND.BACKEND.auth.dto.RegisterRequest;
import BACKEND.BACKEND.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(ApiResponse.success(response, "User registered successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(ApiResponse.success(response, "User logged in successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(ApiResponse.error(e.getMessage()));
        }
    }
}
