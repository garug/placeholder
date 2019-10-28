package br.com.garug.placeholder.placeholder.integration;

import br.com.garug.placeholder.placeholder.entity.Job;
import br.com.garug.placeholder.placeholder.entity.TaskJob;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskJobRepository extends JpaRepository<TaskJob, Long> {

    List<TaskJob> findAllByJob(Job job);
}
