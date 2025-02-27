import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Container, Card, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import "../../assets/styles/Register.css"
import "bootstrap/dist/css/bootstrap.min.css";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username || !password || !email) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5001/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, email }),
            });

            const data = await response.json();
            console.log("Register response:", data);

            if (response.ok) {
                alert("Registration Successful! You can now log in.");
                navigate("/login");
            } else {
                alert(data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("An error occurred during registration.");
        }
    };

    return (
        <Container className="register-container">
            <Card className="glass-card larger-card">
                <Card.Body>
                    <h2 className="text-center text-light">Create Account</h2>
                    <p className="text-center text-light">Join our coffee shop family</p>
                    <Form>
                        <Form.Group>
                            <Form.Label className="text-light">Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                size="lg"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="text-light">Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                size="lg"
                                required
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
                                    required
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

                        <Button className="mt-4 w-100 btn-lg" variant="warning" onClick={handleRegister}>
                            Register
                        </Button>
                    </Form>
                    <p className="mt-4 text-center text-light">
                        Already have an account? <a href="/login" className="text-warning">Login</a>
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Register;
