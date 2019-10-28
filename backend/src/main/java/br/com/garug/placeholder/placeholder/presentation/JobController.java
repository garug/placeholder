package br.com.garug.placeholder.placeholder.presentation;

import br.com.garug.placeholder.placeholder.business.JobService;
import br.com.garug.placeholder.placeholder.entity.Job;
import br.com.garug.placeholder.placeholder.entity.dto.JobDTO;
import br.com.garug.placeholder.placeholder.integration.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<?> addNew(@RequestBody JobDTO job) {
        return ResponseEntity.ok(service.save(job));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody JobDTO job) {
        job.setId(id);
        return ResponseEntity.ok(service.save(job));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        this.service.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
