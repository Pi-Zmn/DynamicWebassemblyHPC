import {Card, CardBody, CardSubtitle, CardTitle} from "react-bootstrap";
import {Client} from "@/app/components/client.entity";

type ClientListProps = {
    clients: Client[];
}

export default function Clientlist({ clients }: ClientListProps) {
    return(
        <Card className='list-container'>
            <CardTitle>Connected Clients</CardTitle>
            <CardBody>
                {clients.map((client: Client) => (
                    <Card key={client.id} className='list-item'>
                        <CardTitle>{client.device} | <i>{client.os}</i></CardTitle>
                        <CardSubtitle>{client.id}</CardSubtitle>
                    </Card>
                ))}
            </CardBody>
        </Card>
    )
}
