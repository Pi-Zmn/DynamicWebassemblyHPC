import {Card, CardBody, CardHeader, CardSubtitle, CardText, CardTitle} from "react-bootstrap";

export default function Home() {
  return (
      <div style={{ margin: 30 }}>
          <Card>
              <CardHeader>
                  <CardTitle>Home Page</CardTitle>
                  <CardSubtitle>DOINC</CardSubtitle>
              </CardHeader>
              <CardBody>
                  <CardText>Some description</CardText>
              </CardBody>
          </Card>
      </div>
  );
}
