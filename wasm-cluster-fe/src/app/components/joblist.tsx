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
                {jobs.map((job: Job) => (
                    <Card key={job.id} className='list-item'>
                        <CardTitle>#{job.id} {job.name}</CardTitle>
                        <CardSubtitle>{job.wasm}</CardSubtitle>
                    </Card>
                ))}
            </CardBody>
        </Card>
    )
}
