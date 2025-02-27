import { useState } from "react";
import { Container, Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch, FaBars, FaShoppingCart, FaUtensils, FaMoneyBill, FaUser, FaChartLine } from "react-icons/fa";
import Sidebar from "../comoponents/Sidebar";
import "../assets/styles/dashboard.css";

const Dashboard: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    return (
        <div className={`dashboard-container ${sidebarOpen ? "sidebar-open" : ""}`}>
            {/* Sidebar Toggle Button */}
            <Button className="menu-button" variant="dark" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <FaBars size={24} />
            </Button>

            {/* Sidebar (Hidden by Default, Appears on Click) */}
            <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

            <main className="dashboard-content">
                {/* Top Navbar with Search Bar */}
                <div className="top-navbar">
                    <h2>Dashboard</h2>
                    <InputGroup className="search-bar">
                        <Form.Control type="text" placeholder="Search..." />
                        <InputGroup.Text>
                            <FaSearch />
                        </InputGroup.Text>
                    </InputGroup>
                </div>

                <Container>
                    {/* Small Cards */}
                    <Row className="mt-4">
                        <Col md={3}>
                            <Card className="dashboard-card">
                                <Card.Body>
                                    <FaUtensils className="icon" />
                                    <h5>Menu Items</h5>
                                    <p>150 Items</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="dashboard-card">
                                <Card.Body>
                                    <FaShoppingCart className="icon" />
                                    <h5>Orders</h5>
                                    <p>200 Pending</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="dashboard-card">
                                <Card.Body>
                                    <FaMoneyBill className="icon" />
                                    <h5>Income</h5>
                                    <p>$5000 This Month</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="dashboard-card">
                                <Card.Body>
                                    <FaUser className="icon" />
                                    <h5>Customers</h5>
                                    <p>1200 Users</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Large Card */}
                    <Row className="mt-4">
                        <Col md={12}>
                            <Card className="large-card">
                                <Card.Body>
                                    <FaChartLine className="icon" style={{ fontSize: "40px" }} />
                                    <h4>Overall Performance</h4>
                                    <p>Get insights on sales, revenue, and user engagement trends.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </main>
        </div>
    );
};

export default Dashboard;
