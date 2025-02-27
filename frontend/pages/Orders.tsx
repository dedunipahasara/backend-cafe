// orders.tsx
import  { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Table, Button, Form, Card } from 'react-bootstrap';
import Sidebar from "../comoponents/Sidebar";
import { FaBars } from 'react-icons/fa';
import "../assets/styles/order.css";

interface CartItem {
    name: string;
    price: number;
    image: string;
}

const Orders = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const cartItems = location.state?.cartItems as CartItem[] || [];
    const [customerName, setCustomerName] = useState('');
    const [tableNumber, setTableNumber] = useState('');
    const [quantities, setQuantities] = useState<number[]>(cartItems.map(() => 1));
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [savedOrders, setSavedOrders] = useState<any[]>([]); // State for saved orders

    const handleQuantityChange = (index: number, value: number) => {
        const newQuantities = [...quantities];
        newQuantities[index] = value;
        setQuantities(newQuantities);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item, index) => total + item.price * quantities[index], 0);
    };

    const handlePlaceOrder = () => {
        const now = new Date();
        const localDateTime = now.toLocaleString();
        const orderData = {
            customerName,
            tableNumber,
            items: cartItems.map((item, index) => ({
                name: item.name,
                price: item.price,
                quantity: quantities[index],
            })),
            total: calculateTotal(),
            orderDateTime: localDateTime,
        };

        // Simulated order saving (replace with your actual saving logic)
        saveOrder(orderData);

        alert("Order is placed. Please enjoy!");
    };

    // Simulated order saving function (replace with your actual saving logic)
    const saveOrder = (order: any) => {
        console.log('Order saved:', order);
        setSavedOrders((prevOrders) => [...prevOrders, order]); // Add order to saved orders
        // In a real application, you would save the order to a database or API
    };

    return (
        <div className="orders-container black-theme">
            <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <FaBars />
            </button>
            <div className="top-navbar">
                <h2 className="orders-title">Orders</h2>
            </div>
            <Container className="d-flex justify-content-center align-items-start" style={{ paddingTop: '200px' }}>
                <Card className="order-card">
                    <Card.Body>
                        <Card.Title className="order-card-title">Order Details</Card.Title>
                        <Form>
                            <Form.Group controlId="customerName">
                                <Form.Label className="order-form-label">Customer Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter customer name"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="order-form-control"
                                />
                            </Form.Group>
                            <Form.Group controlId="tableNumber">
                                <Form.Label className="order-form-label">Table Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter table number"
                                    value={tableNumber}
                                    onChange={(e) => setTableNumber(e.target.value)}
                                    className="order-form-control"
                                />
                            </Form.Group>
                            <Table striped bordered hover variant="dark" className="order-table">
                                <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                min="1"
                                                value={quantities[index]}
                                                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                                className="order-form-control"
                                            />
                                        </td>
                                        <td>${(item.price * quantities[index]).toFixed(2)}</td>
                                    </tr>
                                ))}
                                </tbody>
                                <tfoot>
                                <tr>
                                    <td colSpan={3} style={{ textAlign: 'right' }}><strong>Total:</strong></td>
                                    <td>${calculateTotal().toFixed(2)}</td>
                                </tr>
                                </tfoot>
                            </Table>
                            <Button variant="light" className="order-button" onClick={handlePlaceOrder}>Place Order</Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Card className="saved-orders-card">
                    <Card.Body>
                        <Card.Title>Saved Orders</Card.Title>
                        <Table striped bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Table Number</th>
                                <th>Order Date/Time</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {savedOrders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.customerName}</td>
                                    <td>{order.tableNumber}</td>
                                    <td>{order.orderDateTime}</td>
                                    <td>${order.total.toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Orders;