import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const apiEndpoint = "https://672971846d5fa4901b6d2b72.mockapi.io/api/books";

function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`${apiEndpoint}/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error("Error fetching book:", error);
                setError("Failed to fetch book details. Please try again.");
            }
        };

        fetchBook();
    }, [id]);

    if (!book && !error) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center my-4 text-danger">
                <h3>Error</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container my-4">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h2>{book.Title}</h2>
                </div>
                <div className="card-body text-center">
                    <img 
                        src={book.imageUrl || "https://via.placeholder.com/150"} 
                        alt={book.Title} 
                        className="img-fluid mb-3" 
                        style={{ maxHeight: '300px', objectFit: 'cover' }}
                    />
                    <p><strong>Author:</strong> {book.Author}</p>
                    <p><strong>Year:</strong> {book.Year}</p>
                    <p><strong>Genre:</strong> {book.Genre}</p>
                    <p><strong>Pages:</strong> {book.Pages}</p>
                </div>
            </div>
        </div>
    );
}

export default BookDetail;
