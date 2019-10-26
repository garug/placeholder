package br.com.garug.placeholder.placeholder.presentation;

import br.com.garug.placeholder.placeholder.business.JobService;
import br.com.garug.placeholder.placeholder.entity.Job;
import br.com.garug.placeholder.placeholder.integration.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@RequestMapping(value = "jobs")
public class JobController {

    @Autowired
    private JobService service;

    @Autowired
    private JobRepository repository;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(this.repository.findAll());
    }
}
