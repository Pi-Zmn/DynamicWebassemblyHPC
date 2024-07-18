import {Card, CardBody, CardHeader, CardSubtitle, CardText, CardTitle} from "react-bootstrap";

export default function Home() {
  return (
      <Card>
          <CardHeader>
              <CardTitle>Home Page</CardTitle>
              <CardSubtitle>DOINC</CardSubtitle>
          </CardHeader>
          <CardBody>
              <CardText>Some description</CardText>
              <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/dashboard">Dashboard</a></li>
                  <li><a href="/client">Client Page</a></li>
                  <li><a href="/client-video">Client Video Page</a></li>
                  <li><a href="/distribute">Distribute Page</a></li>
              </ul>
          </CardBody>
      </Card>
  );
}
