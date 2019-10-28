package br.com.garug.placeholder.placeholder.business;

import br.com.garug.placeholder.placeholder.core.exception.BusinessException;
import br.com.garug.placeholder.placeholder.entity.Job;
import br.com.garug.placeholder.placeholder.entity.TaskJob;
import br.com.garug.placeholder.placeholder.entity.dto.JobDTO;
import br.com.garug.placeholder.placeholder.integration.JobRepository;
import br.com.garug.placeholder.placeholder.integration.TaskJobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class JobService {

    private JobRepository repository;
    private TaskJobRepository tjRepository;

    @Autowired
    public JobService(JobRepository repository, TaskJobRepository tjRepository) {
        this.repository = repository;
        this.tjRepository = tjRepository;
    }

    @Transactional
    public Job save(JobDTO dto) {
        if (dto.getId() == null && repository.findByName(dto.getName()) != null)
            throw new BusinessException("Already have a job with name \"" + dto.getName() +"\"");

        Job job = this.dtoToEntity(dto);
        job = this.safeForSave(job);
        return repository.saveAndFlush(job);
    }

    public Job dtoToEntity(JobDTO dto) {
        Job job = this.initialConvertDTO(dto);

        if (dto.getTasks() != null)
            this.syncTaskJob(dto, job);

        if (dto.getParentJob() != null)
            this.syncParentJob(dto, job);

        return job;
    }

    private Job initialConvertDTO(JobDTO dto) {
        Job job = dto.getId() == null ? new Job() : repository.findById(dto.getId()).get();
        job.setId(dto.getId());
        job.setName(dto.getName());
        job.setActive(dto.getActive());
        return job;
    }

    private void syncTaskJob(JobDTO dto, Job job) {
        List<TaskJob> actualTasks = dto.getTasks().stream().map(task -> {
            TaskJob tj = new TaskJob();
            tj.setTask(task);
            tj.setCreated(LocalDateTime.now());
            tj.setCompleted(false);
            tj.setJob(job);
            return tj;
        }).collect(Collectors.toList());

        List<TaskJob> previousTasks = job.getTasks() == null ? new ArrayList<>() : job.getTasks();

        for (TaskJob tj : previousTasks) {
            if (actualTasks.contains(tj)) {
                actualTasks.remove(tj);
                actualTasks.add(tj);
            } else {
                tjRepository.deleteById(tj.getId());
            }
        }

        job.setTasks(actualTasks);
    }

    private void syncParentJob(JobDTO dto, Job job) {
        job.setParentJob(dto.getParentJob().getId() == null ? null : this.initialConvertDTO(dto.getParentJob()));
        if (job.getParentJob() != null) {
            List<Job> treeFamily = new ArrayList<>();
            Job currentRoot = job;

            while(currentRoot.getParentJob() != null) {
                Optional<Job> maybeANewRoot = repository.findById(currentRoot.getParentJob().getId());
                currentRoot = maybeANewRoot.get();
                treeFamily.add(currentRoot);
                if (treeFamily.contains(job))
                    break;
            }

            if (treeFamily.contains(job))
                throw new BusinessException("Not possible assign this parent for this job, cross references between jobs not allowed in any levels");
        }
    }

    private Job safeForSave(Job job) {
        if (job.getActive() == null)
            job.setActive(false);

        return job;
    }

    public Job findById(Long id) {
        Job job = repository.findById(id).get();
        job.setTasks(tjRepository.findAllByJob(job));
        return job;
    }

    public void deleteById(Long id) {
        this.repository.findById(id).ifPresent(job -> {
            if (!job.getChildren().isEmpty())
                throw new BusinessException("This job is parent of another job(s)");

            job.getTasks().stream().forEach(t -> tjRepository.delete(t));
            this.repository.deleteById(id);
        });
    }
}
