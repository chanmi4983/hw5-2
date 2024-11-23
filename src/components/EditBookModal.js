import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const apiEndpoint = "https://672971846d5fa4901b6d2b72.mockapi.io/api/books";

const EditBookModal = ({ show, onHide, book, onBookUpdated }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [pages, setPages] = useState('');
    const [updateCount, setUpdateCount] = useState(0); 

    useEffect(() => {
        if (book) {
            setTitle(book.Title);
            setAuthor(book.Author);
            setYear(book.Year);
            setGenre(book.Genre);
            setPages(book.Pages);
            setUpdateCount(0); // 초기화
        }
    }, [book]);

    const handleFieldChange = async (field, value) => {
        try {
            if (field === 'title') setTitle(value);
            if (field === 'author') setAuthor(value);
            if (field === 'year') setYear(value);
            if (field === 'genre') setGenre(value);
            if (field === 'pages') setPages(value);

            await axios.put(`${apiEndpoint}/${book.id}`, {
                Title: field === 'title' ? value : title,
                Author: field === 'author' ? value : author,
                Year: field === 'year' ? parseInt(value) : year,
                Genre: field === 'genre' ? value : genre,
                Pages: field === 'pages' ? parseInt(value) : pages,
            });

            // 수정 횟수 증가
            setUpdateCount((prevCount) => prevCount + 1);
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
                            value={title}
                            onChange={(e) => handleFieldChange('title', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            value={author}
                            onChange={(e) => handleFieldChange('author', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            type="number"
                            value={year}
                            onChange={(e) => handleFieldChange('year', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control
                            type="text"
                            value={genre}
                            onChange={(e) => handleFieldChange('genre', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPages">
                        <Form.Label>Pages</Form.Label>
                        <Form.Control
                            type="number"
                            value={pages}
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
                <Button variant="primary" onClick={onBookUpdated}>Finish Editing</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditBookModal;

