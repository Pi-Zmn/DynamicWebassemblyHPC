"use client"

import {Container, Navbar, NavbarBrand, NavbarCollapse, NavbarText, NavbarToggle, NavDropdown} from "react-bootstrap";
import {Nav} from "@restart/ui";

export default function Navigation() {
    return(
        <Navbar>
            <Container>
                <NavbarBrand href="/">DOINC</NavbarBrand>
                <NavbarToggle />
                <NavbarText>
                    <b>D</b>armstadt <b>O</b>pen <b>I</b>nfrastructure for <b>N</b>etwork <b>C</b>omputing
                </NavbarText>
                <NavbarCollapse className="justify-content-end">
                    <Nav>
                        {/*<Nav.Item href="/">Home</Nav.Item>
                        <Nav.Item href="/dashboard">Dashboard</Nav.Item>
                        <Nav.Item href="/client">Client Page</Nav.Item>
                        <Nav.Item href="/distribute">Distribute Page</Nav.Item>*/}
                        <NavDropdown title="Pages">
                            <NavDropdown.Item href="/dashboard">Dashboard Page</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/client">Client Page</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/distribute">Distribute Page</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    )
}
