package br.com.garug.placeholder.placeholder.business;

import br.com.garug.placeholder.placeholder.core.exception.BusinessException;
import br.com.garug.placeholder.placeholder.entity.Job;
import br.com.garug.placeholder.placeholder.entity.Task;
import br.com.garug.placeholder.placeholder.entity.dto.TaskDTO;
import br.com.garug.placeholder.placeholder.integration.TaskRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;

    public Task save(TaskDTO dto) {
        Task task = new Task();
        BeanUtils.copyProperties(dto, task);
        return this.save(task);
    }

    public Task save(Task task) {
        if (task.getId() == null && repository.findByName(task.getName()) != null)
            throw new BusinessException("Already have a task with name \"" + task.getName() + "\"");
        return repository.save(task);
    }

    public void deleteById(Long id) {
        this.repository.findById(id).ifPresent(task -> {
            if (!task.getJobs().isEmpty())
                throw new BusinessException("Can't delete a task already in use");

            this.repository.deleteById(id);
        });
    }

    public Task findById(Long id) {
        Task task = repository.findById(id).get();
        return task;
    }

    public TaskDTO entityToDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setName(task.getName());
        dto.setWeight(task.getWeight());
        dto.setJobs(task.getJobs().stream().map(e -> e.getJob()).collect(Collectors.toList()));
        return dto;
    }
}
