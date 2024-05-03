'use client'

import {Job} from "@/app/components/job.entity";
import {Card, CardBody, CardHeader, CardSubtitle, CardTitle} from "react-bootstrap";
import Joblist from "@/app/components/joblist";
import Clientlist from "@/app/components/clientlist";
import {Client} from "@/app/components/client.entity";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";

export default function Dashboard() {
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

        // TODO: Active Job(s)
    }

    useEffect(() => {
        connectSocket();
    }, [])

    return (
        <Card>
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
