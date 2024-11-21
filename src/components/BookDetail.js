import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const apiEndpoint = "https://672971846d5fa4901b6d2b72.mockapi.io/api/books";

function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`${apiEndpoint}/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };

        fetchBook();
    }, [id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-4">
            <h2>{book.Title}</h2>
            <p><strong>Author:</strong> {book.Author}</p>
            <p><strong>Year:</strong> {book.Year}</p>
            <p><strong>Genre:</strong> {book.Genre}</p>
            <p><strong>Pages:</strong> {book.Pages}</p>
        </div>
    );
}

export default BookDetail;
