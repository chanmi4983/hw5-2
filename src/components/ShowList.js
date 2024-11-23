function ShowList() {
    const [books, setBooks] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const navigate = useNavigate(); 

    // Fetch books from the API
    const fetchBooks = async () => {
        try {
            const response = await axios.get(apiEndpoint);
            console.log("Books data:", response.data);
            setBooks(response.data); // Update state
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    // Handle field changes directly
    const handleFieldChange = async (id, field, value) => {
        try {
            // Update server
            const updatedBook = await axios.put(`${apiEndpoint}/${id}`, {
                ...books.find(book => book.id === id),
                [field]: field === 'year' || field === 'pages' ? parseInt(value) : value,
            });

            // Update local state
            setBooks(books.map(book => (book.id === id ? updatedBook.data : book)));
        } catch (error) {
            console.error("Error updating field:", error);
        }
    };

    const handleEdit = (book) => {
        setSelectedBook(book);
        setShowEditModal(true);
    };

    const handleViewDetails = (id) => {
        navigate(`/detail/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            setBooks(books.filter(book => book.id !== id)); // Remove from local state
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Book Management</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/list">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="my-4">
                <BookCarousel />
            </Container>

            <Container className="my-4">
                <div className="App-title">Manage Your Book Collection</div>
                <Row className="mb-4 justify-content-center">
                    <Col xs="auto">
                        <Button 
                            variant="outline-info" 
                            onClick={fetchBooks} 
                            className="me-2 px-3 py-2"
                            style={{ fontWeight: 'bold', borderRadius: '20px' }}
                        >
                            <i className="bi bi-arrow-repeat me-2"></i> Refresh
                        </Button>
                        <Button 
                            variant="outline-success" 
                            onClick={() => setShowAddModal(true)}
                            className="px-3 py-2"
                            style={{ fontWeight: 'bold', borderRadius: '20px' }}
                        >
                            <i className="bi bi-plus-circle me-2"></i> Add Book
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {books.map((book) => (
                        <Col key={book.id} xs={12} md={6} lg={4}>
                            <BookCard 
                                book={book} 
                                onEdit={handleEdit} 
                                onDelete={handleDelete} 
                                onViewDetails={() => handleViewDetails(book.id)} 
                                onFieldChange={handleFieldChange} // Pass to BookCard
                            />
                        </Col>
                    ))}
                </Row>
                <AddBookModal show={showAddModal} onHide={() => setShowAddModal(false)} onBookAdded={fetchBooks} />
                {selectedBook && (
                    <EditBookModal
                        show={showEditModal}
                        onHide={() => setShowEditModal(false)}
                        book={selectedBook}
                        onFieldChange={handleFieldChange} // Pass to EditBookModal
                    />
                )}
            </Container>
        </div>
    );
}
