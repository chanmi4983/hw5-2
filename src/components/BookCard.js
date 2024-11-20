import React from 'react';
import { Card, Button } from 'react-bootstrap';

const BookCard = ({ book, onEdit, onDelete, onViewDetails }) => {
    return (
        <Card style={{ width: '18rem', marginBottom: '20px' }}>
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                <Card.Text>
                    <strong>Year:</strong> {book.year}<br />
                    <strong>Genre:</strong> {book.genre}<br />
                    <strong>Pages:</strong> {book.pages}
                </Card.Text>
                <Button variant="info" className="me-2" onClick={onViewDetails}>
                    View Details
                </Button>
                <Button variant="warning" className="me-2" onClick={onEdit}>
                    Edit
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
};

export default BookCard;
