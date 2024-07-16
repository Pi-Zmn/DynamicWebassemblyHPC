'use client'

import {Card, CardBody, CardSubtitle, CardTitle, Button, ListGroup, ListGroupItem} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import {IResult, UAParser} from 'ua-parser-js';
import {Job, Status} from "@/app/components/job.entity";
import Image from "next/image";

export default function Client() {
    /* Default Job if no Active Job */
    const noJob: Job = {
        id: 0,
        name: 'No Active Job',
        status: 5,
        progress: 0,
        totalTasks: 0,
        taskBatchSize: 0,
        taskTimeOut: 0,
        language: 2,
        //wasm: string,
        //finalResult?: any
    }

    const backendURL: string = 'http://' + process.env.NEXT_PUBLIC_BACKEND + ':' + process.env.NEXT_PUBLIC_WS_WORKER;

    const [activeJob, setActiveJob] = useState<Job>(noJob)
    const workerRef = useRef<Worker>()
    const [isConnected, setIsConnected] = useState(false);
    let socket: any = null
    const [deviceInfo, setDeviceInfo] = useState<IResult | undefined>(undefined)
    const [isComputing, setIsComputing] = useState(false)

    /* Read Browser and Client Information from UserAgent */
    const getClientInfo = () => {
        const parser = new UAParser();
        setDeviceInfo(parser.getResult());
    }

    /* Connect as Worker to Backend Socket */
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
            socket.emit("client-info", UAParser())
        })
    }

    const fetchData = async () => {
        // TODO: Get Data from Socket (?)
        const res = await fetch(backendURL + '/job/active')
        if (res.ok) {
            const aJ = await res.json() as Job;
            setActiveJob(aJ)
            console.log("Active Job:", aJ)
        } else {
            setActiveJob(noJob)
            console.log("Failed to load active job")
        }
    }

    const createWebWorker = () => {
        /* Create Web Worker */
        workerRef.current = new Worker('wasm_worker_c.js')
        //workerRef.current = new Worker('wasm_exec.js')
        workerRef.current.onmessage = function(event) {
            console.log('Message received from worker:', event.data);
        };
        if(activeJob.id !== noJob.id) {
            /* Setup WASM environment woth activeJob Files */
            console.log('Setup WASM environment woth activeJob Files')
            workerRef.current.postMessage({
                eventType: 'INIT',
                eventData: backendURL + '/wasm/' + activeJob.name,
                eventId: 1
            });
        }
    }

    const initializeWebWorker = () => {
        if(activeJob.id !== noJob.id && workerRef.current) {
            /* Setup WASM environment woth activeJob Files */
            console.log('Setup WASM environment with activeJob Files')
            workerRef.current.postMessage({
                eventType: 'INIT',
                eventData: backendURL + '/wasm/' + activeJob.name + '/' + activeJob.name,
                eventId: 1
            });
        }
    }

    const runJob = async () => {
        if(workerRef.current) {
            workerRef.current.postMessage({
                eventType: 'MUL',
                eventData: 5,
                eventId: 1
            });
        }
    }

    useEffect(() => {
        getClientInfo()
        connectSocket()
        //fetchData()
        //createWebWorker()
    }, [])

    return (
        <Card style={{width: '50%', marginLeft: '25%'}}>
            <CardBody>
                <CardTitle>DOINC Worker</CardTitle>
                <CardSubtitle>Your Device is part of the DOINC cluster and will be used for crowd computing.</CardSubtitle>
                <ListGroup style={{marginTop: '20px'}}>
                    <ListGroupItem className="bg-info">Status of your Client</ListGroupItem>
                    <ListGroupItem>
                        Detected Client:&emsp;&emsp;&emsp;&emsp;
                        {
                            deviceInfo ?
                                <span style={{
                                    fontFamily: 'monospace',
                                    backgroundColor: '#eee',
                                    borderRadius: '5px',
                                    display: 'inline-block',
                                    padding: '8px'
                                }}>{deviceInfo.browser.name + " @ " + deviceInfo.os.name}</span> :
                                "No Information Found"
                        }
                    </ListGroupItem>
                    <ListGroupItem>
                        Connection Status:&emsp;&emsp;&emsp;
                        {
                            isConnected ?
                                <>
                                    <Image
                                        src="/connected.gif"
                                        alt="isConnected"
                                        width={35}
                                        height={35}
                                        unoptimized
                                    />
                                    &emsp;Connected
                                </> :
                                "Connection to Server Failed"
                        }
                    </ListGroupItem>
                    <ListGroupItem>
                        Supported Project:&emsp;&emsp;&emsp;
                        {activeJob.name}:&emsp;&emsp;&emsp;
                        {Status[activeJob.status]}
                    </ListGroupItem>
                    <ListGroupItem>
                        Current State:&emsp;&emsp;&emsp;&emsp;&emsp;
                        {
                            isComputing ?
                                <>
                                    <Image
                                        src="/computing.gif"
                                        alt="isComputing"
                                        width={35}
                                        height={35}
                                        unoptimized
                                    />
                                    &emsp;Work in Progress
                                </> :
                                "Waiting for Task"
                        }
                    </ListGroupItem>
                    <ListGroupItem>
                        Task completed:&emsp;&emsp;&emsp;&emsp;
                        42
                    </ListGroupItem>
                </ListGroup>
                <Button onClick={initializeWebWorker}>load Wasm</Button>
                <Button onClick={runJob}>Run Wasm</Button>
            </CardBody>
        </Card>
    )
}
