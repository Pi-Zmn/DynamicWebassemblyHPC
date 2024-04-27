import {Job} from "@/app/components/job.entity";
import {Card, CardBody, CardSubtitle, CardTitle} from "react-bootstrap";

type JobListProps = {
    jobs: Job[];
}

export default function Joblist({ jobs }: JobListProps) {
    return(
        <Card className='list-container'>
            <CardTitle>All Jobs</CardTitle>
            <CardBody>
                {jobs.length == 0 ?
                    <p>No Jobs distributed</p> :
                    jobs.map((job: Job) => (
                    <Card key={job.id} className='list-item'>
                        <CardTitle>#{job.id} {job.name}</CardTitle>
                        <CardSubtitle>{job.wasm}</CardSubtitle>
                    </Card>
                ))}
            </CardBody>
        </Card>
    )
}
