'use client'

import {ActiveJob, Job} from "@/app/components/job.entity";
import {Card, CardBody, CardHeader, CardSubtitle, CardTitle} from "react-bootstrap";
import Clientlist from "@/app/components/clientlist";
import {Client} from "@/app/components/client.entity";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import Jobview from "@/app/components/jobview";

export default function Dashboard() {
    const [activeJob, setActiveJob ] = useState<ActiveJob | undefined>();
    const [jobs, setJobs ] = useState<Job[]>([]);
    const [clients, setClients] = useState<Client[]>([])

    const backendURL: string = 'http://' + process.env.NEXT_PUBLIC_BACKEND + ':' + process.env.NEXT_PUBLIC_WS_DASHBOARD;
    let socket: any = null

    const connectSocket = () => {
        const newSocket = io(backendURL)
        newSocket.on("connect", () => {
            if (socket != null) {
                socket.disconnect()
                console.log("Disconnecting old Socket connection...")
            }
            socket = newSocket
            console.log("Socket connected")
        })

        newSocket.on('client-update', (data: Client[]) => {
            setClients(data);
        })
        newSocket.on('job-update', (data: Job[]) => {
            setJobs((data));
        })
        newSocket.on('activeJob-update', (data: ActiveJob) => {
            setActiveJob((data));
        })
    }

    useEffect(() => {
        connectSocket();
    }, [])

    return (
        <Card>
            <CardBody>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardSubtitle>Overview of available Jobs and Connected Workers</CardSubtitle>
                <CardBody className="flex-container">
                    <Jobview jobs={jobs} activeJob={activeJob}/>
                    <Clientlist clients={clients}/>
                </CardBody>
            </CardBody>
        </Card>
    )
}
