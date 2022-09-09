import axios from 'axios';
import IMovie from '../models/IMovies';

const getMovies = (movieType: string) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}${movieType}`;
    return axios.get<IMovie[]>(url)
        .then(response => response.data)
};

const getMovieDetails = (movieType: string | undefined, movieTitle: string | undefined) => {
    movieTitle = movieTitle != null ? movieTitle.replace(/\s/g, "%20") : '';
    const url = `${process.env.REACT_APP_API_BASE_URL}/${movieType}?title=${movieTitle}`;
    console.log(url);
    return axios.get<IMovie>(url)
        .then(response => response.data)
};

const addToFavourites = async (newItem: Omit<IMovie, 'id'>) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/favourite`;
    return axios.post<IMovie>(
        url,
        newItem,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(response => response.data)
};

const removeFromFavourites = (movieTitle: string) => {
    movieTitle = movieTitle != null ? movieTitle.replace(/\s/g, "%20") : '';
    const url = `${process.env.REACT_APP_API_BASE_URL}/favourite/${movieTitle}`;
    console.log(url);
    return axios.delete<IMovie[]>(url)
        .then(response => response.data)
};



export {
    getMovies,
    getMovieDetails,
    addToFavourites,
    removeFromFavourites
}