import React, { useState, useEffect } from 'react';
import { Alert, Stack, Table, Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import LoadingIndicator from '../Common/LoadingIndicator';
import { LoadingStatus } from '../../models/types';
import IMovie from '../../models/IMovies';

import { getMovieDetails } from '../../services/movies';


import 'bootstrap/dist/css/bootstrap.min.css';

const MovieDetails = () => {
    let { movieType, movieTitle } = useParams();
    const [status, setStatus] = useState<LoadingStatus>('LOADING');
    const [movie, setMovie] = useState<IMovie | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(
        () => {
            const fetchMovie = async () => {
                try {
                    const data = await getMovieDetails(movieType, movieTitle);
                    setMovie(data[0]);
                    setStatus('LOADED');
                } catch (err: any) {
                    setError(err);
                    setStatus('ERROR_LOADING');
                }
            };

            fetchMovie();
        },
        []
    );

    let el;

    switch (status) {
        case 'LOADING':
            el = (
                <LoadingIndicator
                    size="large"
                    message="We are fetching the details of the movie. Please wait..."
                />
            );
            break;
        case 'LOADED':
            console.log('loaded');
            const {
                id,
                title,
                year,
                genres,
                ratings,
                poster,
                contentRating,
                duration,
                releaseDate,
                averageRating,
                originalTitle,
                storyline,
                actors,
                imdbRating,
                posterurl
            } = movie as IMovie;

            el = (
                <Container>
                    <Stack className="mb-5">
                        <Link to={`/`}>Back to Home</Link>
                    </Stack>
                    <Stack direction="horizontal">
                        <div>
                            <Card style={{ width: '20rem' }}><img
                                src={`${process.env.REACT_APP_API_BASE_URL}${poster}`}
                                alt={title}
                                className="w-100 h-100"
                            />
                            </Card>
                        </div>
                        <div>
                            <Table borderless>
                                <thead>
                                    <tr>
                                        <th colSpan={2}>{title} ({year})</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Imdb Rating</td>
                                        <td>{imdbRating}</td>
                                    </tr>
                                    <tr>
                                        <td>Content Rating</td>
                                        <td>{contentRating}</td>
                                    </tr>
                                    <tr>
                                        <td>Average Rating</td>
                                        <td>{averageRating}</td>
                                    </tr>
                                    <tr>
                                        <td>Duration</td>
                                        <td>{duration}</td>
                                    </tr>
                                    <tr>
                                        <td>Genres</td>
                                        <td>{genres.map(item => item).join(', ')}</td>
                                    </tr>
                                    <tr>
                                        <td>Actors</td>
                                        <td>{actors.map(item => item).join(', ')}</td>
                                    </tr>
                                    <tr>
                                        <td>Release Date</td>
                                        <td>{releaseDate}</td>
                                    </tr>
                                    <tr>
                                        <td>Story Line</td>
                                        <td>{storyline}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Stack>

                </Container>
            );
            break;
        case 'ERROR_LOADING':
            el = (
                <Alert variant="danger my-3">
                    {error?.message}
                </Alert>
            );
            break;
    }

    return el;
}

export default MovieDetails;