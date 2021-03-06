package br.com.garug.placeholder.placeholder.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.engine.internal.Cascade;
import org.hibernate.engine.spi.CascadingAction;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "Tasks_of_Job")
public class TaskJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "IDTask")
    private Task task;

    @ManyToOne
    @JoinColumn(name = "IDJob")
    @JsonIgnore
    private Job job;

    @Column
    private LocalDateTime created;

    @Column
    private Boolean completed;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TaskJob taskJob = (TaskJob) o;
        return task.equals(taskJob.task) &&
                job.equals(taskJob.job);
    }

    @Override
    public int hashCode() {
        return Objects.hash(task, job);
    }
}
