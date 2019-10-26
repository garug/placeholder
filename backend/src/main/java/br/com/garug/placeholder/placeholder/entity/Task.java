package br.com.garug.placeholder.placeholder.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private Integer weight;

    @ManyToMany(mappedBy = "tasks", fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Job> inJobs;

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
