import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavigationMenu from './NavigationMenu';
import Home from './Home';
import About from './About';

import RestaurantsList from './restaurants-list/RestaurantsList';
import RestaurantDetails from './restaurant-details/RestaurantDetails';

const App = () => {
    return (
        <>
            <NavigationMenu />
            
            <Container>
                <Switch>
                    <Route path="/about" component={About} />
                    <Route path="/restaurants/:id" component={RestaurantDetails} />
                    <Route path="/restaurants" component={RestaurantsList} />
                    <Route path="/" component={Home} />
                </Switch>
            </Container>
        </>
    );
};

export default App;