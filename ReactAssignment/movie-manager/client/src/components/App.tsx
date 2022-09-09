import React from 'react';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MovieDetails from './MovieDetails/MoviesDetails';
import MTabs from './Common/MTabs'

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                <Route path="/moviedetails/:movieType/:movieTitle" element={<MovieDetails/>}></Route>                   
                    <Route path="/" element={<MTabs/>}></Route>
                </Routes>
            </BrowserRouter>
           
        </>
    );
};

export default App;