import React from 'react';
import { Card, Button } from 'react-bootstrap';

const BookCard = ({ book, onEdit, onDelete, onViewDetails, onFieldChange }) => {
    return (
        <Card style={{ width: '18rem', marginBottom: '20px' }}>
            <Card.Img variant="top" src={book.imageUrl} alt={book.Title} />
            <Card.Body>
                <Card.Title>{book.Title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{book.Author}</Card.Subtitle>
                <Card.Text>
                    <strong>Year:</strong> {book.Year}<br />
                    <strong>Genre:</strong> {book.Genre}<br />
                    <strong>Pages:</strong> {book.Pages}
                </Card.Text>
                <Button variant="info" className="me-2" onClick={onViewDetails}>
                    View Details
                </Button>
                <Button variant="warning" className="me-2" onClick={() => onEdit(book)}>
                    Edit
                </Button>
                <Button variant="danger" onClick={() => onDelete(book.id)}>
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
};


export default BookCard;
