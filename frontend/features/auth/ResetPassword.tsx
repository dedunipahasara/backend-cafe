import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import "../../assets/styles/Login.css";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const email = new URLSearchParams(location.search).get("email");

    const handleResetPassword = () => {
        if (!newPassword || !confirmPassword) {
            alert("Please fill in both fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        alert(`Password changed successfully for ${email}`);
        navigate("/login");
    };

    return (
        <Container className="login-container">
            <Card className="glass-card larger-card">
                <Card.Body>
                    <h2 className="text-center text-light">Reset Password</h2>
                    <p className="text-center text-light">
                        Set a new password for your account.
                    </p>
                    <Form>
                        <Form.Group>
                            <Form.Label className="text-light">New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                size="lg"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="text-light">Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                size="lg"
                            />
                        </Form.Group>

                        <Button className="mt-4 w-100 btn-lg" variant="warning" onClick={handleResetPassword}>
                            Change Password
                        </Button>
                    </Form>
                    <p className="mt-4 text-center text-light">
                        <a href="/login" className="text-warning">Back to Login</a>
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ResetPassword;
