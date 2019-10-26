package br.com.garug.placeholder.placeholder.entity.dto;

import br.com.garug.placeholder.placeholder.entity.Job;

import java.util.List;

public class TaskDTO {

    private String name;
    private Integer weight;
    private List<Job> inJobs;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public List<Job> getInJobs() {
        return inJobs;
    }

    public void setInJobs(List<Job> inJobs) {
        this.inJobs = inJobs;
    }
}
