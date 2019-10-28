package br.com.garug.placeholder.placeholder;

import br.com.garug.placeholder.placeholder.business.JobService;
import br.com.garug.placeholder.placeholder.core.exception.BusinessException;
import br.com.garug.placeholder.placeholder.entity.Job;
import br.com.garug.placeholder.placeholder.entity.Task;
import br.com.garug.placeholder.placeholder.entity.dto.JobDTO;
import br.com.garug.placeholder.placeholder.integration.JobRepository;
import br.com.garug.placeholder.placeholder.integration.TaskJobRepository;
import org.junit.Before;
import org.hamcrest.core.Is;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

public class JobServiceTest {


    private JobRepository repository = Mockito.mock(JobRepository.class);
    private TaskJobRepository tjRepository = Mockito.mock(TaskJobRepository.class);

    private JobService service = new JobService(repository, tjRepository);

    @Test
    public void save_should_be_ok() {
        JobDTO job = new JobDTO();
        job.setActive(true);
        job.setName("Test purpouse");
        List<Task> list = new ArrayList<>();
        Task t = new Task();
        t.setName("Test task");
        t.setWeight(2);
        t.setId(1L);
        list.add(t);
        job.setTasks(list);

        Job j = new Job();

        Mockito.doReturn(j).when(repository).saveAndFlush(ArgumentMatchers.any());

        assertThat("Returning job saved from repository", service.save(job), is(j));
    }

    @Test
    public void save_with_already_save_name() {

        JobDTO job = new JobDTO();
        job.setActive(true);
        job.setName("Test purpouse");
        List<Task> list = new ArrayList<>();
        Task t = new Task();
        t.setName("Test task");
        t.setWeight(2);
        t.setId(1L);
        list.add(t);
        job.setTasks(list);

        Job j = new Job();

        Mockito.doReturn(j).when(repository).findByName(ArgumentMatchers.anyString());

        try {
            service.save(job);
        } catch (BusinessException ex) {
            assertThat(ex.getMessage(), is("Already have a job with name \"Test purpouse\""));
        }
    }
}
