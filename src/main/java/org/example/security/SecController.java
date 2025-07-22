package org.example.security;

import org.example.security.dto.LoginRequestDTO;
import org.example.security.dto.LoginResponseDTO;
import org.example.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class SecController {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/hello/all")
    public String getEverybody() {
        return "Hello everybody";
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/hello/user")
    public String getUser() {
        return "Hello user";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/hello/admin")
    public String getAdmin() {
        return "Hello admin";
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequestDTO loginRequestDTO) {
        Authentication authentication;
        try {
            authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(), loginRequestDTO.getPassword()));
        } catch (AuthenticationException exception) {
            Map<String, Object> map = new HashMap<>();
            map.put("message", "Bad credentials");
            map.put("status", false);
            return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);

        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        LoginResponseDTO responseDTO = new LoginResponseDTO(userDetails.getUsername(), jwtToken, roles);

        return ResponseEntity.ok(responseDTO);
    }
}
