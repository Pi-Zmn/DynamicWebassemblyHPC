'use client'

import {Card, CardBody, CardSubtitle, CardTitle, Button, ListGroup, ListGroupItem} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import {IResult, UAParser} from 'ua-parser-js';
import {Job, Status, Task} from "@/app/components/entities/job.entity";
import Image from "next/image";
import {AuthProps} from "@/app/components/auth";

export default function Client({jwt, user}: AuthProps) {
    /* Default Job if no Active Job */
    const noJob: Job = {
        id: 0,
        name: 'No Active Job',
        status: Status.PENDING,
        progress: 0,
        totalTasks: 0,
        taskBatchSize: 0,
        taskTimeOut: 0,
        language: 2,
        startTime: null,
        endTime: null,
        runTimeMS: 0
        //wasm: string,
        //finalResult?: any
    }

    const backendURL: string = 'http://' + process.env.NEXT_PUBLIC_BACKEND + ':' + process.env.NEXT_PUBLIC_WS_WORKER;

    const [activeJob, setActiveJob] = useState<Job>(noJob)
    const workerRef = useRef<Worker>()
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState<any>(null)
    const [deviceInfo, setDeviceInfo] = useState<IResult | undefined>(undefined)
    const [isComputing, setIsComputing] = useState(false)
    const [taskCounter, setTaskCounter] = useState(0)
    const [computingTime, setComputingTime] = useState(0)
    const [ready, setReady] = useState(false    )

    /* Read Browser and Client Information from UserAgent */
    const getClientInfo = () => {
        const parser = new UAParser();
        setDeviceInfo(parser.getResult());
    }

    /* Connect as Worker to Backend Socket */
    const connectSocket = () => {
        const newSocket = io(backendURL, {auth: {token: jwt}})
        newSocket.on("connect", () => {
            if (socket != null) {
                socket.disconnect()
                console.log("Disconnecting old Socket connection...")
            }
            setSocket(newSocket)
            setIsConnected(true)
            console.log("Socket connected")
            newSocket.emit("client-info", UAParser())
        })

        newSocket.on('disconnect', () => {
            console.log("Socket connection disconnected")
            setIsConnected(false)
        })

        newSocket.on('job-activated', (job: Job) => {
            console.log(`Job Activated: #${job.id}`)
            if (activeJob.id != job.id) {
                setActiveJob(job)
            }
        })

        newSocket.on('next-task', (task: Task) => {
            console.log(`Received Task: #${task.id}`)
            // TODO Check if task.jobId == activeJob.id | in this line activeJob is 'noJob'
            if (workerRef && workerRef.current) {
                workerRef.current.postMessage({
                    eventType: 'RUN',
                    eventData: task
                });
                setIsComputing(true)
            } else {
                console.log('Can Not Run Task')
            }
        })

        newSocket.on('no-task', (job: Job) => {
            console.log(`No Available Tasks for Job: #${job.id}`)
            /* Check if Job is DONE*/
            if (Status[job.status] === 'DONE') {
                // TODO: Display Job Done
                console.log(`Job #${job.id} is DONE`)
            } else {
                /* Request new Task after Job-Timeout (+ random sec between 1 - 10) */
                const delayInMS = (job.taskTimeOut + Math.floor(Math.random() * 10) + 1) * 1000
                console.log(`Waiting for ${delayInMS}ms`)
                setInterval(() => {
                    console.log(`Requesting new Task for Job: #${job.id}`)
                    newSocket.emit('request-task')
                }, delayInMS)
            }
        })
    }

    /* Omit through WebSocket Communication
    const fetchData = async () => {
        const res = await fetch(backendURL + '/job/active')
        if (res.ok) {
            const aJ = await res.json() as Job;
            setActiveJob(aJ)
            console.log("Active Job:", aJ)
        } else {
            setActiveJob(noJob)
            console.log("Failed to load active job")
        }
    } */

    /* Create Web Worker */
    const createWebWorker = () => {
        /* Only Create Worker if activeJob is set */
        if(activeJob.id !== noJob.id) {
            /* Terminate previous Worker */
            if (workerRef && workerRef.current) {
                workerRef.current.terminate()
            }
            /* Create Worker for Programming Language */
            switch (activeJob.language) {
                case 0:
                    /* C_CPP*/
                    workerRef.current = new Worker('wasm_worker_c.js')
                    break
                case 1:
                    /* GO */
                    workerRef.current = new Worker('wasm_exec.js')
                    break
                case 2:
                    /* PYTHON */
                    workerRef.current = new Worker('wasm_worker_py.js')
                    break
                default:
                    /* Default is GO */
                    workerRef.current = new Worker('wasm_exec.js')
                    break
            }
            /* Setup WASM environment with activeJob Files */
            console.log('Setup WASM environment for activeJob')
            workerRef.current.postMessage({
                eventType: 'INIT',
                eventData: backendURL + '/wasm/' + activeJob.name + '/' + activeJob.name
            });
            workerRef.current.onmessage = function(event) {
                const { eventType, eventData } = event.data;
                switch (eventType) {
                    case 'INIT':
                        /* Webworker successfully initialized and Socket connected */
                        if (eventData && socket) {
                            socket.emit('worker-ready')
                        }
                        setReady(true)
                        break;
                    case 'RUN':
                        setIsComputing(false)
                        setTaskCounter(taskCounter => taskCounter + 1)
                        if (eventData.runTime) {
                            setComputingTime(computingTime => computingTime + eventData.runTime)
                        }
                        /* WASM successfully executed and Socket connected */
                        if (eventData && socket) {
                            socket.emit('client-result', eventData)
                        }
                        break;
                    default:
                        console.log('Worker cant process given Event')
                }
            };
        }
    }

    useEffect(() => {
        getClientInfo()
        connectSocket()
    }, [])

    useEffect(() => {
        setReady(false)
        createWebWorker()
    }, [activeJob]);

    return (
        <Card className="slim-container">
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
                        {activeJob.name}
                        {/* TODO: Get current Status of Job (Do not use 'setActiveJob', because useEffect dependency)
                    :&emsp;&emsp;&emsp;
                    {Status[activeJob.status]}*/}
                    </ListGroupItem>
                    <ListGroupItem>
                        Wasm Worker:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        {
                            ready ?
                                "Ready" :
                                "NOT INITIALIZED"
                        }
                    </ListGroupItem>
                    <ListGroupItem>
                        Current State:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
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
                        Task completed:&emsp;&emsp;&emsp;&emsp;&emsp;
                        {taskCounter}
                    </ListGroupItem>
                    <ListGroupItem>
                        AVG Run Time:&emsp;&emsp;&emsp;&emsp;&emsp;
                        {computingTime / taskCounter} ms
                    </ListGroupItem>
                    <ListGroupItem>
                        Total Run Time:&emsp;&emsp;&emsp;&emsp;&emsp;
                        {computingTime} ms
                    </ListGroupItem>
                </ListGroup>
            </CardBody>
        </Card>
    )
}