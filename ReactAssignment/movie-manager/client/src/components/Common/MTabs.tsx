import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import 'bootstrap/dist/css/bootstrap.min.css';

import MovieList from '../MovieList/MovieList';

function MTabs() {
    const [key, setKey] = useState<string | null>('moviescoming');

    return (
        <Tabs
            defaultActiveKey="moviescoming"
            id="controlled"
            onSelect={(k) => { console.log(k); setKey(k); }}
            className="mb-3" 
        >
            <Tab eventKey="moviescoming" title="Coming Soon" >
                <MovieList movieType="/movies-coming" />
            </Tab>
            <Tab eventKey="moviesintheatres" title="Movies In Theatres">
                <MovieList movieType="/movies-in-theaters" />
            </Tab>
            <Tab eventKey="topratedindia" title="Top Rated Indian Movies" >
                <MovieList movieType="/top-rated-india" />
            </Tab>
            <Tab eventKey="topratedmovies" title="Top Rated Movies" >
                <MovieList movieType="/top-rated-movies" />
            </Tab>
            <Tab eventKey="favourite" title="My Favourites" unmountOnExit>
                <MovieList movieType="/favourite" />
            </Tab>
        </Tabs>
    );
}

export default MTabs;