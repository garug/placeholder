package br.com.garug.placeholder.placeholder.business;

import br.com.garug.placeholder.placeholder.entity.Job;
import br.com.garug.placeholder.placeholder.entity.TaskJob;
import br.com.garug.placeholder.placeholder.entity.dto.JobDTO;
import br.com.garug.placeholder.placeholder.integration.JobRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {

    @Autowired
    private JobRepository repository;

    public Job save(JobDTO dto) {
        Job job = this.dtoToEntity(dto);
        job = this.safeForSave(job);
        return repository.save(job);
    }

    public Job save(JobDTO dto, Long id) {
        Job job = this.dtoToEntity(dto);
        job.setId(id);
        job = this.safeForSave(job);
        return repository.save(job);
    }

    private Job dtoToEntity(JobDTO dto) {
        Job job = new Job();
        BeanUtils.copyProperties(dto, job);
        job.setActive(dto.getActive());
        if (dto.getTasks() != null) {
            List<TaskJob> tasks = dto.getTasks().stream().map(e -> {
                TaskJob tj = new TaskJob();
                tj.setTask(e);
                tj.setCreated(LocalDateTime.now());
                tj.setCompleted(false);
                tj.setJob(job);
                return tj;
            }).collect(Collectors.toList());
            job.setTasks(tasks);
        }
        if (dto.getParentJob() != null)
            job.setParentJob(dto.getParentJob().getId() == null ? null : this.dtoToEntity(dto.getParentJob()));
        return job;
    }

    private Job safeForSave(Job job) {

        if (job.getActive() == null)
            job.setActive(false);

        return job;
    }

}
