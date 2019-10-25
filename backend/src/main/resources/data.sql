-- Data Definition Language (DDL)
CREATE TABLE Job (
    ID INT IDENTITY NOT NULL,
    Name VARCHAR(1000) NOT NULL,
    Active BIT NOT NULL,
    IDParentJob INT,
    CONSTRAINT PK_Job PRIMARY KEY (Id),
    CONSTRAINT FK_Job_Job FOREIGN KEY (IDParentJob) REFERENCES Job(ID)
);

CREATE TABLE Task (
    ID INT IDENTITY NOT NULL,
    Name VARCHAR(1000) NOT NULL,
    Weight INT NOT NULL,
    CONSTRAINT PK_Task PRIMARY KEY(ID)
);

CREATE TABLE Tasks_of_Job (
    Created DATE NOT NULL,
    Completed DATE,
    IDJob INT NOT NULL,
    IDTask INT NOT NULL,
    CONSTRAINT PK_Task_Job PRIMARY KEY (IDJob, IDTask),
    CONSTRAINT FK_Job_Task FOREIGN KEY (IDJob) REFERENCES Job(ID),
    CONSTRAINT FK_Task_Job FOREIGN KEY (IDTask) REFERENCES Task(ID)
);

-- Data Manipulation Language (DML)
INSERT INTO Job
    (ID, Name, Active, IDParentJob)
VALUES
    (1, 'New job', true, null),
    (2, 'Another Job', true, null),
    (3, 'Just another job', false, 2);

INSERT INTO Task
    (id, name, weight)
VALUES
    (1, 'New Task', 1),
    (2, 'Another Job', 5),
    (3, 'Just another job', 8);

INSERT INTO Tasks_of_Job
    (idJob, idTask, Created, Completed)
VALUES
    (1, 1, CURRENT_DATE, null),
    (1, 2, CURRENT_DATE, null),
    (2, 1, CURRENT_DATE, null),
    (3, 1, CURRENT_DATE, null),
    (3, 2, CURRENT_DATE, null),
    (3, 3, CURRENT_DATE, null);
