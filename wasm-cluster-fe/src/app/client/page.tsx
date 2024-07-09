'use client'

import {Card, CardBody, CardSubtitle, CardTitle, Button, ListGroup, ListGroupItem} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import {IResult, UAParser} from 'ua-parser-js';
import {Job} from "@/app/components/job.entity";
import Image from "next/image";

export default function Client() {
    const [activeJob, setActiveJob] = useState<Job>({
        id: 1,
        name: 'Test job',
        wasm: '/wasm/primes-1/a.out.wasm'
    })
    const backendURL: string = 'http://' + process.env.NEXT_PUBLIC_BACKEND + ':' + process.env.NEXT_PUBLIC_WS_WORKER;

    const [isConnected, setIsConnected] = useState(false);
    let socket: any = null
    const [deviceInfo, setDeviceInfo] = useState<IResult | undefined>(undefined)

    const [wasmExports, setWasmExports] = useState<WebAssembly.Exports | undefined>(undefined)
    const [isComputing, setIsComputing] = useState(false)

    const workerRef = useRef<Worker>()

    const getClientInfo = () => {
        const parser = new UAParser();
        setDeviceInfo(parser.getResult());
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
                //cpu: deviceInfo?.cpu.name
            })
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
            console.log("Failed to load active job")
        }
    }

    const initializeWebWorker = () => {
        /* Web Worker Test */
        workerRef.current = new Worker('wasm_worker.js')
        workerRef.current.onmessage = function(event) {
            console.log('Message received from worker:', event.data);
        };
        workerRef.current.postMessage({
            eventType: 'INIT',
            eventData: 5,
            eventId: 1
        }); // Sending data to the worker
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
        //getClientInfo()
        //connectSocket()
        //fetchData()
        initializeWebWorker()
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
                        {activeJob.name}
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
                <Button onClick={runJob}>Run Wasm</Button>
            </CardBody>
        </Card>
    )
}
