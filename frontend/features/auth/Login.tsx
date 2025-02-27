import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redxs/authSlice.ts";
import { Form, Button, Container, Card, InputGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import "../../assets/styles/Login.css";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (username && password) {
            try {
                const response = await axios.post("http://localhost:5001/auth/login", {
                    username: username,
                    password: password,
                });

                if (response.data.success) {
                    dispatch(login(username));
                    alert("Login Successful!");
                    navigate("/dashboard");
                } else {
                    alert(response.data.message || "Login failed.");
                }
            } catch (error) {
                console.error("Login error:", error);
                alert("An error occurred during login.");
            }
        } else {
            alert("Please enter both username and password.");
        }
    };

    const handleSendResetEmail = async () => {
        if (email) {
            try {
                const response = await axios.post("http://localhost:5000/auth/reset-password", {
                    email: email,
                });

                if (response.data.success) {
                    alert(`Password reset link sent to ${email}`);
                    setShowModal(false);
                } else {
                    alert(response.data.message || "Failed to send reset email.");
                }
            } catch (error) {
                console.error("Reset email error:", error);
                alert("An error occurred while sending the reset email.");
            }
        } else {
            alert("Please enter your email.");
        }
    };

    return (
        <Container className="login-container">
            <Card className="glass-card larger-card">
                <Card.Body>
                    <h2 className="text-center text-light">Welcome Back</h2>
                    <p className="text-center text-light">Login to your coffee account</p>
                    <Form>
                        <Form.Group>
                            <Form.Label className="text-light">Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                size="lg"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="text-light">Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    size="lg"
                                />
                                <Button
                                    variant="outline-light"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="password-toggle-btn"
                                >
                                    {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                                </Button>
                            </InputGroup>
                        </Form.Group>

                        <p className="text-right text-light">
                            <span
                                className="text-warning"
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowModal(true)}
                            >
                                Forgot Password?
                            </span>
                        </p>

                        <Button
                            className="mt-2 w-100 btn-lg"
                            variant="warning"
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Form>
                    <p className="mt-4 text-center text-light">
                        Don't have an account? <a href="/register" className="text-warning">Register</a>
                    </p>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Forgot Password?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Enter your email to receive a password reset link.</p>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="warning" onClick={handleSendResetEmail}>
                        Send Reset Link
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Login;