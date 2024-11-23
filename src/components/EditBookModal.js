import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const apiEndpoint = "https://672971846d5fa4901b6d2b72.mockapi.io/api/books";

const EditBookModal = ({ show, onHide, book, onBookUpdated }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        year: '',
        genre: '',
        pages: '',
    });
    const [updateCount, setUpdateCount] = useState(0); 

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.Title,
                author: book.Author,
                year: book.Year,
                genre: book.Genre,
                pages: book.Pages,
            });
            setUpdateCount(0); 
        }
    }, [book]);

    const handleFieldChange = async (field, value) => {
        try {
            const updatedData = {
                ...formData,
                [field]: field === 'year' || field === 'pages' ? parseInt(value) : value,
            };

            setFormData(updatedData); 

            await axios.put(`${apiEndpoint}/${book.id}`, {
                Title: updatedData.title,
                Author: updatedData.author,
                Year: updatedData.year,
                Genre: updatedData.genre,
                Pages: updatedData.pages,
            });

            setUpdateCount((prevCount) => prevCount + 1);

            onBookUpdated(); 
        } catch (error) {
            console.error("Error updating field:", error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleFieldChange('title', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.author}
                            onChange={(e) => handleFieldChange('author', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.year}
                            onChange={(e) => handleFieldChange('year', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.genre}
                            onChange={(e) => handleFieldChange('genre', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPages">
                        <Form.Label>Pages</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.pages}
                            onChange={(e) => handleFieldChange('pages', e.target.value)}
                        />
                    </Form.Group>
                </Form>
                <p className="text-muted">
                    Total Updates: <strong>{updateCount}</strong>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={onHide}>Finish Editing</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditBookModal;
