package br.com.garug.placeholder.placeholder.presentation;

import br.com.garug.placeholder.placeholder.business.TaskService;
import br.com.garug.placeholder.placeholder.entity.Task;
import br.com.garug.placeholder.placeholder.entity.dto.TaskDTO;
import br.com.garug.placeholder.placeholder.integration.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "tasks")
public class TaskController {

    @Autowired
    private TaskRepository repository;

    @Autowired
    private TaskService service;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(service.entityToDTO(service.findById(id)));
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<Task> addNew(@RequestBody Task task) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(task));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Task> update(@RequestBody TaskDTO task, @PathVariable Long id) {
        task.setId(id);
        return ResponseEntity.ok(service.save(task));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
