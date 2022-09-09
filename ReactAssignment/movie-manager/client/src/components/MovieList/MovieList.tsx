import React, { Component } from 'react';
import { Row, Col, Alert, Card } from 'react-bootstrap';
import MoviesListItem from './MovieListItems';
import LoadingIndicator from '../Common/LoadingIndicator';
import { LoadingStatus } from '../../models/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken, faMagnifyingGlass, faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';


import { getMovies } from '../../services/movies';
import { addToFavourites, removeFromFavourites } from '../../services/movies';
import IMovie from '../../models/IMovies';

import 'bootstrap/dist/css/bootstrap.min.css';


type Props = {
    movieType: string;
    searchValue?: string
};

type State = {
    status: LoadingStatus,
    movies: IMovie[],
    filteredMovies: IMovie[],
    error?: Error
};

class MovieList extends Component<Props, State> {
    state: State = {
        status: 'LOADING',
        movies: [],
        filteredMovies: []
    };

    constructor(props: Props) {
        super(props);
    }

    render() {
        let el;
        const { status, movies: movies, filteredMovies: filteredMovies, error } = this.state;
        const favDisplay = this.props.movieType === '/favourite' ? 'Remove From Favourites' : 'Add to Favourites';
        const faIcon = this.props.movieType === '/favourite' ? faHeartBroken : faHeart;

        switch (status) {
            case 'LOADING':
                el = (
                    <LoadingIndicator
                        size="large"
                        message="We are fetching the list of movies. Please wait..."
                    />
                );
                break;
            case 'LOADED':
                el = (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'right',
                                justifyContent: 'right'
                            }}
                        >
                            <input type="text" placeholder="Search" aria-label="Search" value={this.props.searchValue} onChange={this.filterMoviesOnChange} />
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                        <Row xs={1} md={2} lg={4}>
                            {
                                filteredMovies?.map(
                                    movie => (
                                        <Col key={movie.title + movie.id} className="d-flex align-items-stretch my-3">
                                            <Card><Card.Body>
                                                <MoviesListItem
                                                    movie={movie}
                                                    movieType={this.props.movieType}
                                                />
                                                <Card.Text onClick={() => this.updateFavouritesList(movie)} style={{ cursor: "pointer" }}>{favDisplay + '  '}<FontAwesomeIcon icon={faIcon} style={{ color: 'red' }} /> </Card.Text>
                                            </Card.Body></Card>

                                        </Col>
                                    )
                                )
                            }
                        </Row>
                    </>
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

    updateFavouritesList = async (movie) => {
        if (this.props.movieType === '/favourite') {
            const data = await removeFromFavourites(movie.title)
                .then(() => {
                    toast.success('Removed from Favourites!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    this.fetchMovies();
                }
                )
                .catch((error) => {
                    toast.error('Could not delete from Favourites!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        } else {
            const data = await addToFavourites(movie)
                .then((responseData) => {
                    console.log('success');
                    toast.success('Added to Favourites!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    this.fetchMovies();
                }
                )
                .catch((error) => {
                    console.log('error');
                    toast.error('Already exists in Favourites!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        }

    }

    filterMoviesOnChange = (event) => {
        console.log(event.target.value);
        const data = this.state.movies.filter(movie => {
            return movie.title.toLowerCase().includes(event.target.value.toLowerCase())
        });
        this.setState({
            status: 'LOADED',
            filteredMovies: data
        });
    }

    async componentDidMount() {
        this.setState({
            status: 'LOADING'
        });

        try {
            this.fetchMovies();
        } catch (error) {
            this.setState({
                status: 'ERROR_LOADING'
            });
        }
    }

    fetchMovies = async () => {
        const data = await getMovies(this.props.movieType);
        this.setState({
            status: 'LOADED',
            movies: data,
            filteredMovies: data
        });
    }
}

export default MovieList;