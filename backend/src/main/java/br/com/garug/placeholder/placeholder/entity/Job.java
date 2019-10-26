package br.com.garug.placeholder.placeholder.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "Jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private Boolean active;

    @ManyToOne
    @JoinColumn(name = "IDParentJob")
    @JsonIgnoreProperties({"parentJob", "children", "tasks"})
    private Job parentJob;

    @OneToMany(mappedBy="parentJob")
    @JsonIgnoreProperties({"parentJob", "children", "tasks"})
    private List<Job> children;

    @ManyToMany
    @JoinTable(
            name = "Tasks_of_Job",
            joinColumns = {@JoinColumn(name = "IDJob")},
            inverseJoinColumns = {@JoinColumn(name =" IDTask")}
    )
    @JsonManagedReference
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

    public Job getParentJob() {
        return parentJob;
    }

    public void setParentJob(Job parentJob) {
        this.parentJob = parentJob;
    }

    public List<Job> getChildren() {
        return children;
    }

    public void setChildren(List<Job> children) {
        this.children = children;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}
