import React from 'react';
import { Button, Card } from 'react-bootstrap';

const BookCard = ({ book, onEdit, onDelete }) => {
    return (
        <Card style={{ width: '18rem', margin: '1rem' }}>
            <Card.Img variant="top" src={book.imageUrl} alt={book.Title} />
            <Card.Body>
                <Card.Title>{book.Title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{book.Author}</Card.Subtitle>
                <Card.Text>
                    <strong>Year:</strong> {book.Year} <br />
                    <strong>Genre:</strong> {book.Genre} <br />
                    <strong>Pages:</strong> {book.Pages}
                </Card.Text>
                <Button variant="warning" onClick={() => onEdit(book)} className="me-2">
                    <i className="bi bi-pencil"></i> 
                </Button>
                <Button variant="danger" onClick={() => onDelete(book.id)}>
                    <i className="bi bi-trash"></i> 
                </Button>
            </Card.Body>
        </Card>
    );
};

export default BookCard;
