import {Card, CardBody, CardTitle, CardSubtitle} from "react-bootstrap";
import {AuthForm} from "@/app/components/authform";

export default function LogIn() {
    return (
        <Card className="slim-container">
            <CardBody>
                <CardTitle>Distribute a Job To DOINC</CardTitle>
                <CardSubtitle>Define all Attributes of the Job</CardSubtitle>
                <CardBody>
                    <AuthForm />
                </CardBody>
            </CardBody>
        </Card>
    )
}
