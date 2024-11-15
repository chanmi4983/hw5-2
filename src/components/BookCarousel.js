import React from 'react';
import { Carousel } from 'react-bootstrap';

const BookCarousel = () => {
    return (
        <Carousel style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791162890936.jpg"
                    alt="First slide"
                    style={{ height: '400px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                    <h3>이달의 베스트 셀러</h3>
                    <p>한동대학교 김광 교수님의 문제부터 풀자! C Programming</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSge9CgoZXCF808oyBmL_SSQ2sxkn6FeGxSpw&s"
                    alt="Second slide"
                    style={{ height: '400px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                    <h3>한국 최초 노벨문학상</h3>
                    <p>한강의 채식 주의자</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://i.namu.wiki/i/bDgDXYacwX0K5YpC8ku3DeA_7_ZJmg45Shp_m4iCBjSWHHXl3rfyoL4bkArNba4hnAKz1IflkfXe7_fmVuhW8A.webp"
                    alt="Third slide"
                    style={{ height: '400px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                    <h3>비극적인 사랑, The Great Gatsby</h3>
                    <p>F. Scott Fitzgerald's story of the Jazz Age.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default BookCarousel;
