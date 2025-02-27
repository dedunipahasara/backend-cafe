import React, { useState } from "react";
import { Container, Row, Col, Card, Form, InputGroup, Button, Modal, Table } from "react-bootstrap";
import {
    FaSearch,
    FaBars,
    FaCoffee,
    FaGlassWhiskey,
    FaCookie,
    FaUtensils,
    FaIceCream,
    FaUpload,
    FaTrash,
    FaEdit,
    FaPlus,
    FaShoppingCart
} from "react-icons/fa";
import Sidebar from "../comoponents/Sidebar";
import "../assets/styles/menu.css";
import { useNavigate } from 'react-router-dom';

// Import images from assets
import caramelFrappuccino from "../assets/image/aromatic-frappuccino-table.jpg";
import chocolateFrappuccino from "../assets/image/Frappuccino.jpeg";
import orangeJuice from "../assets/image/orange-juice.png";
import sandwich from "../assets/image/sandwich.png";
import milkshake from "../assets/image/milkshake.png";
import friedRice from "../assets/image/fried-rice.png";
import iceCream from "../assets/image/ice-cream.png";

const coffeeItems = [
    { name: "Caramel Frappuccino", price: 3.95, image: caramelFrappuccino  ,quantity :89},
    { name: "Chocolate Frappuccino", price: 4.51, image: chocolateFrappuccino, quantity :90 },
];

const juiceItems = [
    { name: "Orange Juice", price: 2.50, image: orangeJuice, quantity :50},
];

const snackItems = [
    { name: "Sandwich", price: 5.00, image: sandwich , quantity :80},
];

const milkBasedItems = [
    { name: "Milkshake", price: 3.75, image: milkshake , quantity :50},
];

const riceItems = [
    { name: "Fried Rice", price: 6.50, image: friedRice, quantity :50},
];

const dessertItems = [
    { name: "Ice Cream", price: 4.00, image: iceCream , quantity :50},
];

const categories = [
    { name: "All", icon: <FaUtensils /> },
    { name: "Coffee", icon: <FaCoffee /> },
    { name: "Juice", icon: <FaGlassWhiskey /> },
    { name: "Milk Based", icon: <FaGlassWhiskey /> },
    { name: "Snack", icon: <FaCookie /> },
    { name: "Rice", icon: <FaUtensils /> },
    { name: "Dessert", icon: <FaIceCream /> },
];

const Menu = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [newItem, setNewItem] = useState({
        name: "",
        price: "",
        category: "coffee",
        image: null,
        quantity: 1, // Add quantity to newItem state
    });
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [showCartModal, setShowCartModal] = useState(false);
    const navigate = useNavigate();

    let itemsToDisplay = [];
    if (selectedCategory === "coffee") {
        itemsToDisplay = coffeeItems;
    } else if (selectedCategory === "juice") {
        itemsToDisplay = juiceItems;
    } else if (selectedCategory === "snack") {
        itemsToDisplay = snackItems;
    } else if (selectedCategory === "milk based") {
        itemsToDisplay = milkBasedItems;
    } else if (selectedCategory === "rice") {
        itemsToDisplay = riceItems;
    } else if (selectedCategory === "dessert") {
        itemsToDisplay = dessertItems;
    } else {
        itemsToDisplay = [
            ...coffeeItems,
            ...juiceItems,
            ...snackItems,
            ...milkBasedItems,
            ...riceItems,
            ...dessertItems,
        ];
    }

    const filteredItems = itemsToDisplay.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const newItemToAdd = {
            name: editItem ? editItem.name : newItem.name,
            price: parseFloat(newItem.price),
            category: editItem ? editItem.category : newItem.category,
            image: editItem ? editItem.image : URL.createObjectURL(newItem.image),
            quantity: newItem.quantity, // Include quantity in newItemToAdd
        };

        if (editItem) {
            const itemIndex = (selectedCategory === "coffee" ? coffeeItems :
                selectedCategory === "juice" ? juiceItems :
                    selectedCategory === "snack" ? snackItems :
                        selectedCategory === "milk based" ? milkBasedItems :
                            selectedCategory === "rice" ? riceItems : dessertItems).findIndex(item => item.name === editItem.name);

            if (itemIndex !== -1) {
                const categoryItems = (selectedCategory === "coffee" ? coffeeItems :
                    selectedCategory === "juice" ? juiceItems :
                        selectedCategory === "snack" ? snackItems :
                            selectedCategory === "milk based" ? milkBasedItems :
                                selectedCategory === "rice" ? riceItems : dessertItems);

                categoryItems[itemIndex].price = newItemToAdd.price;
                categoryItems[itemIndex].quantity = newItemToAdd.quantity;
            }

            setEditItem(null);
        } else {
            switch (newItem.category) {
                case "coffee":
                    coffeeItems.push(newItemToAdd);
                    break;
                case "juice":
                    juiceItems.push(newItemToAdd);
                    break;
                case "snack":
                    snackItems.push(newItemToAdd);
                    break;
                case "milk based":
                    milkBasedItems.push(newItemToAdd);
                    break;
                case "rice":
                    riceItems.push(newItemToAdd);
                    break;
                case "dessert":
                    dessertItems.push(newItemToAdd);
                    break;
                default:
                    break;
            }
        }

        setNewItem({ name: "", price: "", category: "coffee", image: null, quantity:1 });
        setShowModal(false);
    };

    const handleDelete = (item) => {
        const categoryItems = (selectedCategory === "coffee" ? coffeeItems :
            selectedCategory === "juice" ? juiceItems :
                selectedCategory === "snack" ? snackItems :
                    selectedCategory === "milk based" ? milkBasedItems :
                        selectedCategory === "rice" ? riceItems : dessertItems);

        const updatedItems = categoryItems.filter(i => i.name !== item.name);

        switch (selectedCategory) {
            case "coffee":
                coffeeItems.length = 0; coffeeItems.push(...updatedItems);
                break;
            case "juice":
                juiceItems.length = 0; juiceItems.push(...updatedItems);
                break;
            case "snack":
                snackItems.length = 0; snackItems.push(...updatedItems);
                break;
            case "milk based":
                milkBasedItems.length = 0; milkBasedItems.push(...updatedItems);
                break;
            case "rice":
                riceItems.length = 0; riceItems.push(...updatedItems);
                break;
            case "dessert":
                dessertItems.length = 0; dessertItems.push(...updatedItems);
                break;
            default:
                break;
        }
    };

    const handleAddToCart = (item) => {
        setCartItems([...cartItems, item]);
    };
    const handleRemoveFromCart = (index) => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
    };

    const handleContinueToOrder = () => {
        navigate('/orders', { state: { cartItems } });
        setShowCartModal(false);
    };

    return (
        <div className="menu-container">
            <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <FaBars />
            </button>
            <div className="top-navbar">
                <h2 className="menu-title">Choose Category</h2>
                <InputGroup className="search-bar">
                    <Form.Control
                        type="text"
                        placeholder="Search category or menu..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <InputGroup.Text><FaSearch /></InputGroup.Text>
                </InputGroup>
                <div className="cart-icon-container" onClick={() => setShowCartModal(true)}>
                    <FaShoppingCart className="cart-icon" />
                    {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
                </div>
            </div>
            <div className="category-container">
                <div className="category-buttons">
                    {categories.map(category => (
                        <Button
                            key={category.name}
                            variant={selectedCategory === category.name.toLowerCase() ? "dark" : "light"}
                            onClick={() => setSelectedCategory(category.name.toLowerCase())}
                            className="category-button"
                        >
                            {category.icon} {category.name}
                        </Button>
                    ))}
                </div>
            </div>
            <Button className="add-item-button" variant="primary" onClick={() => setShowModal(true)}>
                <FaPlus /> Add
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editItem ? "Edit Item" : "Add New Item"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="itemName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                disabled={editItem ? true : false}
                                required={!editItem}
                            />
                        </Form.Group>
                        <Form.Group controlId="itemPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                value={newItem.price}
                                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="itemCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={newItem.category}
                                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                disabled={editItem ? true : false}
                                required={!editItem}
                            >
                                {categories.map((category) => (
                                    <option key={category.name} value={category.name.toLowerCase()}>
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="itemImage">
                            <Form.Label>Upload Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setNewItem({ ...newItem, image: e.target.files![0] })}
                                required={!editItem}
                            />
                        </Form.Group>
                        <Form.Group controlId="itemQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                value={newItem.quantity}
                                onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            <FaUpload /> {editItem ? "Update Price" : "Upload Item"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Container>
                <h3 className="menu-section-title">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Menu</h3>
                <div className="menu-item-list" style={{ overflowY: "auto", maxHeight: "500px" }}>
                    <Row>
                        {filteredItems.map((item, index) => (
                            <Col key={index} md={3} className="menu-item-card">
                                <Card className="menu-card">
                                    <div className="menu-item-content">
                                        <Card.Img src={item.image} alt={item.name} className="menu-item-img" />
                                        <div className="menu-item-details">
                                            <h5>{item.name}</h5>
                                            <p>${item.price.toFixed(2)}</p>
                                            <p>Qty: {item.quantity}</p>
                                            <Button variant="dark" onClick={() => handleAddToCart(item)}>Add to Billing</Button>
                                            <div className="action-buttons">
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleDelete(item)}
                                                    className="action-button"
                                                >
                                                    <FaTrash />
                                                </Button>
                                                <Button
                                                    variant="warning"
                                                    onClick={() => { setEditItem(item); setNewItem(item); setShowModal(true); }}
                                                    className="action-button"
                                                >
                                                    <FaEdit />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
            <Modal show={showCartModal} onHide={() => setShowCartModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cart Items</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cartItems.length > 0 ? (
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td><img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                    <td>{item.name}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => handleRemoveFromCart(index)}>
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p>Cart is empty</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCartModal(false)}>
                        Close
                    </Button>
                    {cartItems.length > 0 && (
                        <Button variant="primary" onClick={handleContinueToOrder}>
                            Continue to Order
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default Menu;