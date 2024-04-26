'use server'

import {Job} from "@/app/components/job.entity";
import {Card, CardBody, CardHeader, CardSubtitle, CardTitle} from "react-bootstrap";
import Joblist from "@/app/components/joblist";
import Clientlist from "@/app/components/clientlist";
import {Client} from "@/app/components/client.entity";

export default async function Dashboard() {
    // TODO: Connect Websocket
    // TODO: Retrieve and Updadate Client Data
    // TODO: Retrieve Job Data (websocket?)

    const jobs: Job[] =[]
    jobs.push({
        id: 1,
        name: 'Job-1',
        wasm: "wasm.file"
    })
    jobs.push({
        id: 2,
        name: 'Job-2',
        wasm: "wasm-2.file"
    })

    const clients: Client[] = [];
    clients.push({
        id: '1-999xxxfd',
        os: 'Linux',
        device: 'Laptop',
    })
    clients.push({
        id: '2-999xxxfd',
        os: 'Linux',
        device: 'Laptop',
    })

    return (
        <Card className='page-container'>
            <CardHeader>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardSubtitle>Overview all available Job</CardSubtitle>
            </CardHeader>
            <CardBody className="flex-container">
                <Joblist jobs={jobs} />
                <Clientlist clients={clients}/>
            </CardBody>
        </Card>
    )
}
