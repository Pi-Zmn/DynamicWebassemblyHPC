import {ActiveJob, Task, Language, Status} from "@/app/components/job.entity";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardSubtitle, CardText,
    CardTitle, ListGroup, ListGroupItem,
    ProgressBar
} from "react-bootstrap";
import {useEffect, useState} from "react";

type ActiveJobProps = {
    activeJob: ActiveJob;
    jobResults: string;
}

export default function Activejob({ activeJob, jobResults }: ActiveJobProps) {
    const [jobsDone, setJobsDone] = useState<number>(0);
    const [jobsRunning, setJobsRunning] = useState<number>(0);


    const backendURL: string = 'http://' + process.env.NEXT_PUBLIC_BACKEND + ':' + process.env.NEXT_PUBLIC_WS_WORKER;
    const startjob = async () => {
        const res = await fetch(backendURL + '/job/start')
        if (res.ok) {
            // TODO: Spawn toast -Job#ID activated
        }
    }
    const stoptjob = async () => {
        const res = await fetch(backendURL + '/job/stop')
        if (res.ok) {
            // TODO: Spawn toast -Job#ID activated
        }
    }
    const resetJob = async () => {
        const res = await fetch(backendURL + '/job/reset')
        if (res.ok) {
            // TODO: Spawn toast -Job#ID activated
        }
    }

    const calculateValues = () => {
        if (activeJob.tasks){
            let jD = 0
            let jR = 0
            activeJob.tasks.forEach((t: Task) => {
                if (t.done) {
                    jD += 1
                } else if (t.scheduledAt) {
                    jR += 1
                }
            })
            setJobsDone(jD)
            setJobsRunning(jR)
        }
    }

    useEffect(() => {
        calculateValues()
    }, [activeJob]);

    return(
        <Card style={{marginBottom: "20px"}}>
            <CardHeader>
                <CardTitle>{activeJob.name}</CardTitle>
                <CardSubtitle>
                    {Status[activeJob.status]}
                    &emsp;
                    <Badge bg="info">{Language[activeJob.language]}</Badge>
                </CardSubtitle>
            </CardHeader>
            <CardBody>
                {
                    activeJob.status == 4 ?
                        <>
                            <ProgressBar variant="primary" now={100} key={1}/>
                            <p className="progress-label">{activeJob.progress}/{activeJob.totalTasks}</p>
                            <ListGroup style={{marginTop: '20px'}}>
                                <ListGroupItem>
                                    Run Time:&emsp;&emsp;&emsp;
                                    {activeJob.runTimeMS / 60000} min
                                </ListGroupItem>
                                <ListGroupItem>
                                    Run Time:&emsp;&emsp;&emsp;
                                    {activeJob.runTimeMS / 1000} s
                                </ListGroupItem>
                                <ListGroupItem>
                                    Run Time:&emsp;&emsp;&emsp;
                                    {activeJob.runTimeMS} ms
                                </ListGroupItem>
                            </ListGroup>
                        </>
                        :
                        <>
                            <ListGroup style={{marginTop: '20px'}}>
                                <ListGroupItem>
                                    Jobs Done:&emsp;&emsp;&emsp;
                                    {activeJob.progress + jobsDone}
                                </ListGroupItem>
                                <ListGroupItem>
                                    Jobs Running:&emsp;&emsp;&emsp;
                                    {jobsRunning}
                                </ListGroupItem>
                            </ListGroup>
                            <br></br>
                            <ProgressBar>
                                <ProgressBar striped variant="success"
                                             min={0}
                                             max={activeJob.totalTasks}
                                             now={activeJob.progress + jobsDone}
                                             key={1}/>
                                <ProgressBar animated variant="info"
                                             min={0}
                                             max={activeJob.totalTasks}
                                             now={jobsRunning} key={2}/>
                            </ProgressBar>
                            <p className="progress-label">{activeJob.progress + jobsDone}/{activeJob.totalTasks}</p>
                        </>
                }
                <div className="button-container">
                    <div className="button-float-left">
                        <Button variant="success" onClick={startjob} disabled={activeJob.status == 4 || activeJob.status == 2}>Start</Button>
                        <Button variant="danger" onClick={stoptjob} disabled={activeJob.status == 4 || activeJob.status == 3}>Stop</Button>
                    </div>
                    <Button variant="warning" onClick={resetJob} className="button-float-right" disabled={activeJob.status == 2}>Reset</Button>
                </div>
                <br></br>
                <CardText>
                    Some description about this awesome task and whats its purpose! Lorem ipsum etc..
                </CardText>
                <h2>Results:</h2>
                <textarea
                    cols={30}
                    rows={10}
                    value={jobResults}
                    readOnly={true}
                    style={{marginTop: 15, width: "50%"}}
                ></textarea>
            </CardBody>
        </Card>
    )
}
