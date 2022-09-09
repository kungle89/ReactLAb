import axios from 'axios';
import IRestaurant from '../models/IRestaurant';

const getRestaurants = () => {
    return axios.get<IRestaurant[]>( `${process.env.REACT_APP_API_BASE_URL}/restaurants` )
            .then( response => response.data )
};

const getRestaurantById = ( id : number ) => {
    return axios.get<IRestaurant>( `${process.env.REACT_APP_API_BASE_URL}/restaurants/${id}` )
            .then( response => response.data )
};

export {
    getRestaurants,
    getRestaurantById
};