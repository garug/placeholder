package br.com.garug.placeholder.placeholder.business;

import br.com.garug.placeholder.placeholder.integration.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobService {

    @Autowired
    private JobRepository repository;
}
