import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Reseñas from "./Menu";
import Inventario from "./Inventario";
// import PanelControl from "./PanelControl";

const Dashboard = () => {
    return (
        <Container fluid>
            <Row>
                <Col xs={2} className="sidebar mb-4">
                    {/* <PanelControl /> */}
                    <Reseñas />
                </Col>
                <Col xs={10} className="dashboard-content">
                    <Inventario />
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
