import React, { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const apiEndpoint = "https://672971846d5fa4901b6d2b72.mockapi.io/api/books";

const AddBookModal = ({ show, onHide, onBookAdded }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [pages, setPages] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    const titleRef = useRef(null);
    const authorRef = useRef(null);
    const yearRef = useRef(null);

    const handleAddBook = async () => {
        if (!title) {
            setError('Title is required');
            titleRef.current.focus();
            return;
        }
        if (!author) {
            setError('Author is required');
            authorRef.current.focus(); 
            return;
        }
        if (!year) {
            setError('Year is required');
            yearRef.current.focus(); 
            return;
        }

        try {
            await axios.post(apiEndpoint, {
                Title: title,
                Author: author,
                Year: parseInt(year),
                Genre: genre,
                Pages: parseInt(pages),
                imageUrl: imageUrl
            });

            setError('');
            onBookAdded();
            onHide();
            setTitle('');
            setAuthor('');
            setYear('');
            setGenre('');
            setPages('');
            setImageUrl('');
        } catch (error) {
            console.error("Error adding book:", error);
            setError("Failed to add the book. Please try again.");
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p style={{ color: 'red' }}>{error}</p>} 
                <Form>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            ref={titleRef} 
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter book title"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            ref={authorRef} 
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Enter author name"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            ref={yearRef} 
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            placeholder="Enter publication year"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control
                            type="text"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            placeholder="Enter genre"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPages">
                        <Form.Label>Pages</Form.Label>
                        <Form.Control
                            type="number"
                            value={pages}
                            onChange={(e) => setPages(e.target.value)}
                            placeholder="Enter number of pages"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formImageUrl">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Enter image URL"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAddBook}>
                    Add Book
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddBookModal;
