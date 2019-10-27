-- Data Definition Language (DDL)
DROP TABLE IF EXISTS Jobs;
CREATE TABLE Jobs (
    ID INT IDENTITY NOT NULL,
    Name VARCHAR(1000) NOT NULL,
    Active BIT NOT NULL,
    IDParentJob INT,
    CONSTRAINT PK_Job PRIMARY KEY (Id),
    CONSTRAINT FK_Job_Job FOREIGN KEY (IDParentJob) REFERENCES Jobs(ID)
);

DROP TABLE IF EXISTS Tasks;
CREATE TABLE IF NOT EXISTS Tasks (
    ID INT IDENTITY NOT NULL,
    Name VARCHAR(1000) NOT NULL,
    Weight INT NOT NULL,
    CONSTRAINT PK_Task PRIMARY KEY(ID)
);

DROP TABLE IF EXISTS Tasks_of_Job;
CREATE TABLE IF NOT EXISTS Tasks_of_Job (
    ID INT IDENTITY NOT NULL,
    Created DATETIME DEFAULT CURRENT_TIMESTAMP,
    Completed BIT,
    IDJob INT NOT NULL,
    IDTask INT NOT NULL,
    CONSTRAINT PK_Task_Job PRIMARY KEY (ID),
    CONSTRAINT FK_Job_Task FOREIGN KEY (IDJob) REFERENCES Jobs(ID),
    CONSTRAINT FK_Task_Job FOREIGN KEY (IDTask) REFERENCES Tasks(ID)
);

-- Data Manipulation Language (DML)
INSERT INTO Jobs
    (ID, Name, Active, IDParentJob)
VALUES
    (1, 'New job', true, null),
    (2, 'Another Job', true, null),
    (3, 'Just another job', false, 2);

INSERT INTO Tasks
    (id, name, weight)
VALUES
    (1, 'New Task', 1),
    (2, 'Another Task', 5),
    (3, 'Just another Task', 8);

INSERT INTO Tasks_of_Job
    (ID, idJob, idTask, Completed)
VALUES
    (1, 1, 1, false),
    (2, 1, 2, false),
    (3, 2, 1, false),
    (4, 3, 1, false),
    (5, 3, 2, false),
    (6, 3, 3, false);
