package br.com.garug.placeholder.placeholder.integration;

import br.com.garug.placeholder.placeholder.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    Task findByName(String name);
}
