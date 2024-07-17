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
import {useEffect, useState} from "react";

type ActiveJobProps = {
    activeJob: ActiveJob;
}

export default function Activejob({ activeJob }: ActiveJobProps) {
    const [jobsDone, setJobsDone] = useState<number>(0);
    const [jobsRunning, setJobsRunning] = useState<number>(0);
    const [totalRunningTime, setTotalRunningTime] = useState<number>(0);
    const [result, setResult] = useState<string>("");


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
        let jD = 0
        let jR = 0
        let tRT = 0
        activeJob.tasks.forEach((t: Task) => {
            if (t.done) {
                jD += 1
                tRT += t.runTime ? t.runTime : 0
            } else if (t.scheduledAt) {
                jR += 1
            }
        })
        setJobsDone(jD)
        setJobsRunning(jR)
        setTotalRunningTime(tRT)
    }

    const getResults = async () => {
        console.log('get result')
        const res = await fetch(backendURL + '/wasm/' + activeJob.name + '/result.txt')
        if (res.ok) {
            setResult(await res.text())
        }
    }

    useEffect(() => {
        calculateValues()
        getResults()
    }, []);

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
                        {totalRunningTime / jobsDone}
                    </ListGroupItem>
                    <ListGroupItem>
                        Total Run Time:&emsp;&emsp;&emsp;
                        {totalRunningTime}
                    </ListGroupItem>
                </ListGroup>
                <h2>Results:</h2>
                <textarea
                    cols={30}
                    rows={10}
                    value={result}
                    readOnly={true}
                    style={{marginTop: 15, width: "50%"}}
                ></textarea>
            </CardBody>
        </Card>
    )
}
