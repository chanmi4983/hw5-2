import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const apiEndpoint = "https://672971846d5fa4901b6d2b72.mockapi.io/api/books";

const BookCard = ({ book, onDelete }) => {
    const [formData, setFormData] = useState({
        title: book.Title,
        author: book.Author,
        year: book.Year,
        genre: book.Genre,
        pages: book.Pages,
    });

    const handleFieldChange = async (field, value) => {
        try {
            setFormData((prevData) => ({
                ...prevData,
                [field]: value,
            }));

            await axios.put(`${apiEndpoint}/${book.id}`, {
                Title: field === 'title' ? value : formData.title,
                Author: field === 'author' ? value : formData.author,
                Year: field === 'year' ? parseInt(value) : formData.year,
                Genre: field === 'genre' ? value : formData.genre,
                Pages: field === 'pages' ? parseInt(value) : formData.pages,
            });

            console.log(`Updated ${field} to ${value}`);
        } catch (error) {
            console.error("Error updating field:", error);
        }
    };

    return (
        <Card style={{ width: '18rem', marginBottom: '20px' }}>
            <Card.Img variant="top" src={book.imageUrl} alt={formData.title} />
            <Card.Body>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleFieldChange('title', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.author}
                            onChange={(e) => handleFieldChange('author', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.year}
                            onChange={(e) => handleFieldChange('year', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.genre}
                            onChange={(e) => handleFieldChange('genre', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPages">
                        <Form.Label>Pages</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.pages}
                            onChange={(e) => handleFieldChange('pages', e.target.value)}
                        />
                    </Form.Group>
                </Form>
                <Button variant="danger" onClick={() => onDelete(book.id)}>
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
};

export default BookCard;
