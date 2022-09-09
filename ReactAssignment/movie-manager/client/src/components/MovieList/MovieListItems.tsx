import React, { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

import Rating from '../Common/Rating';
import IMovie from '../../models/IMovies';



type Props = {
    movie: IMovie,
    movieType: string | undefined
};


const MoviesListItem = ({ movie: movie, movieType: movieType }: Props) => {
    const {
        title,
        ratings,
        poster,
    } = movie;

    const [movieData, setMovieData] = useState<IMovie | null>(null);

    function calculate(ratings) {
        var sum = 0;
        for (var i = 0; i < ratings.length; i++) {
            sum = sum + ratings[i];
        }
        return sum;
    }

    const sum = calculate(ratings) / ratings.length;

    const data = {
        movieType: movieType,
        movieTitle: title
    };

    return (
        <>
            <Container>
                <Card style={{ width: '18rem', height: '24rem' }} className='border-0'>
                    <Link to={`/moviedetails${movieType}/${title}`}>
                        <Card.Img variant="top" src={`${process.env.REACT_APP_API_BASE_URL}${poster}`} style={{ cursor: "pointer", height: '18rem' }} />
                    </Link>
                    <Card.Body>
                        <Card.Title className="d-flex justify-content-between">
                            <div>
                                {title}
                                <div className="text-xs">
                                    <Rating value={sum / 2} className="me-2" />
                                </div>
                            </div>
                        </Card.Title>
                    </Card.Body>
                </Card>
            </Container>

        </>
    );
}

export default MoviesListItem;