import {ActiveJob, Task, Language, Status} from "@/app/components/job.entity";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardSubtitle,
    CardTitle, ListGroup, ListGroupItem,
    ProgressBar
} from "react-bootstrap";

type ActiveJobProps = {
    activeJob: ActiveJob | undefined;
}

export default function Activejob({ activeJob }: ActiveJobProps) {
    let jobsDone = 0
    let jobsRunning = 0
    let totalRunningTime = 0
    activeJob?.tasks.forEach((t: Task) => {
        if (t.done) {
            jobsDone += 1
            totalRunningTime += t.runTime ? t.runTime : 0
        } else if (t.scheduledAt) {
            jobsRunning += 1
        }
    })

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
    return(
        <>{activeJob ?
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
                    <ProgressBar>
                        <ProgressBar animated striped variant="success"
                                     now={(activeJob.progress + jobsDone / activeJob.totalTasks) * 100} key={1}/>
                        <ProgressBar animated striped variant="warning" now={jobsRunning} key={2}/>
                    </ProgressBar>
                    <p>{activeJob.progress + jobsDone}/{activeJob.totalTasks}</p>
                    <Button variant="success" onClick={startjob}>Start</Button>
                    <Button variant="danger" onClick={stoptjob}>Stop</Button>
                    <Button variant="warning" onClick={resetJob}>Reset</Button>
                    <ListGroup style={{marginTop: '20px'}}>
                        <ListGroupItem>
                            Jobs Done:&emsp;&emsp;&emsp;
                            {jobsDone}
                        </ListGroupItem>
                        <ListGroupItem>
                            Jobs Running:&emsp;&emsp;&emsp;
                            {jobsRunning}
                        </ListGroupItem>
                        <ListGroupItem>
                            AVG Run Time:&emsp;&emsp;&emsp;
                            {totalRunningTime/jobsDone}
                        </ListGroupItem>
                        <ListGroupItem>
                            Total Run Time:&emsp;&emsp;&emsp;
                            {totalRunningTime}
                        </ListGroupItem>
                    </ListGroup>
                </CardBody>
            </Card> :
            <></>}
        </>
    )
}
