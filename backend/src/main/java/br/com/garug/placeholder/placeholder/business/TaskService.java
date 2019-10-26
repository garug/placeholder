package br.com.garug.placeholder.placeholder.business;

import br.com.garug.placeholder.placeholder.entity.Task;
import br.com.garug.placeholder.placeholder.entity.dto.TaskDTO;
import br.com.garug.placeholder.placeholder.integration.TaskRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;

    public Task save(TaskDTO dto) {
        Task task = new Task();
        BeanUtils.copyProperties(dto, task);
        return repository.save(task);
    }
}
