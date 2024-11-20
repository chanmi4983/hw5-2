import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiEndpoint = "https://672971846d5fa4901b6d2b72.mockapi.io/api/books";

function EditBookPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        author: '',
        year: '',
        genre: '',
        pages: '',
    });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`${apiEndpoint}/${id}`);
                setForm(response.data);
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };

        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`${apiEndpoint}/${id}`, form);
            navigate('/list');
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    return (
        <div className="container my-4">
            <h2>Edit Book</h2>
            <form>
                <div className="mb-3">
                    <label>Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={form.title} 
                        onChange={handleChange} 
                        className="form-control" 
                    />
                </div>
                <div className="mb-3">
                    <label>Author</label>
                    <input 
                        type="text" 
                        name="author" 
                        value={form.author} 
                        onChange={handleChange} 
                        className="form-control" 
                    />
                </div>
                <div className="mb-3">
                    <label>Year</label>
                    <input 
                        type="number" 
                        name="year" 
                        value={form.year} 
                        onChange={handleChange} 
                        className="form-control" 
                    />
                </div>
                <div className="mb-3">
                    <label>Genre</label>
                    <input 
                        type="text" 
                        name="genre" 
                        value={form.genre} 
                        onChange={handleChange} 
                        className="form-control" 
                    />
                </div>
                <div className="mb-3">
                    <label>Pages</label>
                    <input 
                        type="number" 
                        name="pages" 
                        value={form.pages} 
                        onChange={handleChange} 
                        className="form-control" 
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
            </form>
        </div>
    );
}

export default EditBookPage;
