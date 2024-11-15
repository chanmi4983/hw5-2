import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import '../index.css';
import BookCard from './BookCard';
import AddBookModal from './AddBookModal';
import EditBookModal from './EditBookModal';
import BookCarousel from './BookCarousel';

const apiEndpoint = "https://672971846d5fa4901b6d2b72.mockapi.io/api/books";

function ShowList() {
    const [books, setBooks] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(apiEndpoint);
            console.log("Books data:", response.data);
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleEdit = (book) => {
        setSelectedBook(book);
        setShowEditModal(true);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${apiEndpoint}/${id}`);
        fetchBooks();
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Book Management</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                        <Nav.Link href="#contact">Contact</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="my-4">
                <BookCarousel />
            </Container>

            <Container className="my-4">
                <div className="App-title">Manage Your Book Collection</div>
                <Row className="mb-4 justify-content-center">
                    <Col xs="auto">
                        <Button 
                            variant="outline-info" 
                            onClick={fetchBooks} 
                            className="me-2 px-3 py-2"
                            style={{ fontWeight: 'bold', borderRadius: '20px' }}
                        >
                            <i className="bi bi-arrow-repeat me-2"></i> Refresh
                        </Button>
                        <Button 
                            variant="outline-success" 
                            onClick={() => setShowAddModal(true)}
                            className="px-3 py-2"
                            style={{ fontWeight: 'bold', borderRadius: '20px' }}
                        >
                            <i className="bi bi-plus-circle me-2"></i> Add Book
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {books.map((book) => (
                        <Col key={book.id} xs={12} md={6} lg={4}>
                            <BookCard book={book} onEdit={handleEdit} onDelete={handleDelete} />
                        </Col>
                    ))}
                </Row>
                <AddBookModal show={showAddModal} onHide={() => setShowAddModal(false)} onBookAdded={fetchBooks} />
                {selectedBook && (
                    <EditBookModal
                        show={showEditModal}
                        onHide={() => setShowEditModal(false)}
                        book={selectedBook}
                        onBookUpdated={fetchBooks}
                    />
                )}
            </Container>
        </div>
    );
}

export default ShowList;
