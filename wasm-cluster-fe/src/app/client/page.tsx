'use client'

import {Card, CardBody, CardHeader, CardSubtitle, CardTitle} from "react-bootstrap";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {IResult, UAParser} from 'ua-parser-js';
import {Job} from "@/app/components/job.entity";
import {Button} from "@restart/ui";
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
    let deviceInfo: IResult | null = null

    const [wasmExports, setWasmExports] = useState<WebAssembly.Exports | undefined>(undefined)
    const [isComputing, setIsComputing] = useState(false)

    const getClientInfo = () => {
        const parser = new UAParser();
        deviceInfo = parser.getResult();
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

    const setupWASM = async () => {
        // TODO: Correct use of imprt Object Variable
        WebAssembly.instantiateStreaming(
            // Fetch the file and stream into the WebAssembly runtime
            //fetch(backendURL + '/job/wasm')
            //fetch('hello-world.wasm')
            fetch('test.wasm')
        ).then((result) => {
            setWasmExports(result.instance.exports);
        })
    }

    const runJob = () => {
        if(wasmExports) {
            console.log(wasmExports.main())
            setIsComputing(true)
        }
    }

    useEffect(() => {
        getClientInfo()
        connectSocket()
        fetchData()
        setupWASM()
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Worker Client</CardTitle>
                <CardSubtitle>Supporting Project <i>{activeJob.name}</i></CardSubtitle>
            </CardHeader>
            <CardBody>
                <p>
                    Status: { isConnected ? "connected" : "disconnected" }
                    {
                        isConnected ?
                            <Image
                                src="/connected.gif"
                                alt="isConnected"
                                width={35}
                                height={35}
                                unoptimized
                            /> :
                            <></>
                    }
                </p>
                <Button onClick={runJob}>Run Wasm</Button>
                {
                    isComputing ?
                        <Image
                            src="/computing.gif"
                            alt="isComputing"
                            width={50}
                            height={50}
                            unoptimized
                        /> :
                        <></>
                }
            </CardBody>
        </Card>
    )
}
