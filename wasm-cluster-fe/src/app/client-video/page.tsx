'use client'

import {useEffect, useRef, useState} from "react";
import {YouTubeEmbed} from '@next/third-parties/google'
import {Card, CardBody} from "react-bootstrap";
import {Job, Task} from "@/app/components/job.entity";
import {IResult, UAParser} from "ua-parser-js";
import {io} from "socket.io-client";

export default function ClientVideo() {
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
        startTime: null,
        endTime: null,
        runTimeMS: 0
        //wasm: string,
        //finalResult?: any
    }

    const backendURL: string = 'http://' + process.env.NEXT_PUBLIC_BACKEND + ':' + process.env.NEXT_PUBLIC_WS_WORKER;

    const [activeJob, setActiveJob] = useState<Job>(noJob)
    const workerRef = useRef<Worker>()
    const [socket, setSocket] = useState<any>(null)

    /* Read Browser and Client Information from UserAgent */
    const getClientInfo = () => {
        const parser = new UAParser();
    }

    /* Connect as Worker to Backend Socket */
    const connectSocket = () => {
        const newSocket = io(backendURL)
        newSocket.on("connect", () => {
            if (socket != null) {
                socket.disconnect()
                console.log("Disconnecting old Socket connection...")
            }
            setSocket(newSocket)
            console.log("Socket connected")
            newSocket.emit("client-info", UAParser())
        })

        newSocket.on('job-activated', (job: Job) => {
            console.log(`Job Activated: #${job.id}`)
            if (activeJob.id != job.id) {
                setActiveJob(job)
            }
        })

        newSocket.on('next-task', (task: Task) => {
            console.log(`Received Task: #${task.id}`)
            if (workerRef && workerRef.current) {
                workerRef.current.postMessage({
                    eventType: 'RUN',
                    eventData: task
                });
            } else {
                console.log('Can Not Run Task')
            }
        })
    }

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
                        break;
                    case 'RUN':
                        /* WASM successfully executed and Socket connected */
                        if (eventData && socket) {
                            socket.emit('client-result', eventData)
                        }
                        break;
                    default:
                        console.log('Work cant process given Event')
                }
            };
        }
    }

    useEffect(() => {
        getClientInfo()
        connectSocket()
    }, [])

    useEffect(() => {
        createWebWorker()
    }, [activeJob]);
    return (
        <Card className="client-container">
            <CardBody>
                <YouTubeEmbed videoid="L_LUpnjgPso" params="controls=0&start=50&autoplay=1" />
            </CardBody>
        </Card>
    )
}
