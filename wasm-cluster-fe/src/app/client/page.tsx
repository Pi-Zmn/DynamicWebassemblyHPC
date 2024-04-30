'use client'

import {Card, CardBody, CardHeader, CardSubtitle, CardTitle} from "react-bootstrap";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {IResult, UAParser, UAParserInstance} from 'ua-parser-js';

export default function Client() {
    // TODO: Properly initialize variables
    const activeJob: string = "TestJob";
    const backendURL: string = 'http://' + process.env.NEXT_PUBLIC_BACKEND + ':' + process.env.NEXT_PUBLIC_WS_WORKER;
    //const backendURL: string = 'http://192.168.2.204:3000'

    const [isConnected, setIsConnected] = useState(false);
    let socket: any = null
    let deviceInfo: IResult | null = null


    const getClientInfo = () => {
        const parser = new UAParser();
        deviceInfo = parser.getResult();
        console.log(deviceInfo)
    }

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
            socket.emit("client-info", {
                os: deviceInfo?.os.name,
                device: deviceInfo?.browser.name
            })
        })
    }

    useEffect(() => {
        getClientInfo()
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
