package br.com.garug.placeholder.placeholder.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@RequestMapping("users")
public class UserController {

    @GetMapping("login")
    public ResponseEntity<?> retrieveInfo(Principal p) {
        return ResponseEntity.ok(p);
    }
}
