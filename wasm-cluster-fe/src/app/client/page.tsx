'use client'

import {Card, CardBody, CardHeader, CardSubtitle, CardTitle} from "react-bootstrap";
import {useEffect, useState} from "react";
import { io } from "socket.io-client";

export default function Client() {
    // TODO: Properly initialize variables
    const activeJob: string = "TestJob";
    const os: string = 'My OS'
    const device: string = 'My Device'
    const backendURL: string = 'http://localhost:3000'

    const [isConnected, setIsConnected] = useState(false);
    let socket: any = null

    const connectSocket = () => {
        const newSocket = io(backendURL)
        newSocket.on("connect", () => {
            if (socket != null) {
                socket.disconnect()
                console.log("Disconnecting old Socket connection...")
            }
            socket = newSocket
            setIsConnected(true)
            console.log("Socket connected")
            // TODO: EMIT Client Info

            // TODO: Fix double Socket connection
        })
    }

    useEffect(() => {
        connectSocket();
    }, [])

    return (
        <Card className='page-container'>
            <CardHeader>
                <CardTitle>Worker Client</CardTitle>
                <CardSubtitle>Supporting Project <i>{activeJob}</i></CardSubtitle>
            </CardHeader>
            <CardBody>
                <p>Status: { isConnected ? "connected" : "disconnected" }</p>
            </CardBody>
        </Card>
    )
}
