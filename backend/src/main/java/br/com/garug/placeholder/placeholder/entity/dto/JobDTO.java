package br.com.garug.placeholder.placeholder.entity.dto;

import br.com.garug.placeholder.placeholder.entity.Job;
import br.com.garug.placeholder.placeholder.entity.Task;

import java.util.List;

public class JobDTO {

    private Long id;
    private String name;
    private Boolean active;
    private JobDTO parentJob;
    private List<Task> tasks;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public JobDTO getParentJob() {
        return parentJob;
    }

    public void setParentJob(JobDTO parentJob) {
        this.parentJob = parentJob;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}
