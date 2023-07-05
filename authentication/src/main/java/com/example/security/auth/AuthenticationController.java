package com.example.security.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;
  private Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

  @PostMapping("/register")
  public ResponseEntity register(
      @RequestBody RegisterRequest request
  ) {
    try {
      if (request.getEmail().isEmpty() || request.getPassword().isEmpty()) {
        return ResponseEntity.badRequest().build();
      }
      return ResponseEntity.ok(service.register(request));
    }catch (Exception e){
      logger.error(e.getMessage());
      return ResponseEntity.badRequest().build();
    }
  }
  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request
  ) {
    return ResponseEntity.ok(service.authenticate(request));
  }

  @PostMapping("/validate")
  public ResponseEntity<Object> validate(
          @RequestBody ValidateRequest request
  ) {
    Boolean validate = service.validate(request.token);
    if (validate){
      return ResponseEntity.ok().build();
    }
    return ResponseEntity.badRequest().build();
  }

  @PostMapping("/refresh-token")
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response
  ) throws IOException {
    service.refreshToken(request, response);
  }

  @GetMapping("/logout")
  public void logout(
          HttpServletRequest request,
          HttpServletResponse response
  ){
    service.logout(request);
  }
}
