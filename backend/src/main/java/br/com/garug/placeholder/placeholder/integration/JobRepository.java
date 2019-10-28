package br.com.garug.placeholder.placeholder.integration;

import br.com.garug.placeholder.placeholder.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
    Job findByName(String name);
}
