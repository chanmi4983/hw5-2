import React from 'react';
import { Carousel } from 'react-bootstrap';

const BookCarousel = () => {
    return (
        <Carousel style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://covers.openlibrary.org/b/id/8228691-L.jpg"
                    alt="First slide"
                    style={{ height: '400px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                    <h3>To Kill a Mockingbird</h3>
                    <p>Harper Lee's classic novel of courage and morality.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://covers.openlibrary.org/b/id/7222246-L.jpg"
                    alt="Second slide"
                    style={{ height: '400px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                    <h3>1984</h3>
                    <p>George Orwell's dystopian masterpiece.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://covers.openlibrary.org/b/id/7355045-L.jpg"
                    alt="Third slide"
                    style={{ height: '400px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                    <h3>The Great Gatsby</h3>
                    <p>F. Scott Fitzgerald's story of the Jazz Age.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default BookCarousel;
