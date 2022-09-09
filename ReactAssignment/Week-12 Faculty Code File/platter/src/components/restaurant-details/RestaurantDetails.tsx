import React, { useState, useEffect } from 'react';
import { Row, Col, Alert, Badge } from 'react-bootstrap';
import { Route, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import Rating from '../common/Rating';
import LoadingIndicator from '../common/LoadingIndicator';
import Menu from '../menu/Menu';
import AddMenuItem from '../add-menu-item/AddMenuItem';
import IRestaurant from '../../models/IRestaurant';
import { LoadingStatus } from '../../models/types';

import { getRestaurantById } from '../../services/restaurants';

const RestaurantDetails = ( { match } : RouteComponentProps<{ id: string }> ) => {
    const [ status, setStatus ] = useState<LoadingStatus>( 'LOADING' );
    const [ restaurant, setRestaurant ] = useState<IRestaurant | null>( null );
    const [ error, setError ] = useState<Error | null>( null );

    useEffect(
        () => {
            const fetchRestaurant = async () => {
                try {
                    const data = await getRestaurantById( +match.params.id );
                    setRestaurant( data );
                    setStatus( 'LOADED' );
                } catch( error ) {
                    setError( error );
                    setStatus( 'ERROR_LOADING' );
                }
            };

            fetchRestaurant();
        },
        [ ]
    );

    let el;

    switch( status ) {
        case 'LOADING':
            el = (
                <LoadingIndicator
                    size="large"
                    message="We are fetching the details of the restaurant. Please wait..."
                />
            );
            break;
        case 'LOADED':
            const {
                id,
                name,
                description,
                cuisines,
                opens,
                closes,
                rating,
                numRatings,
                costForTwo,
                imageUrl
            } = restaurant as IRestaurant;

            el = (
                <>
                    <Row>
                        <Col xs={12}>
                            <h1>{name}</h1>
                            <hr />
                        </Col>
                        <Col xs={12} lg={4} className="my-2">
                            <img 
                                src={`${process.env.REACT_APP_API_BASE_URL}${imageUrl}`}
                                alt={name}
                                className="w-100"
                            />
                        </Col>
                        <Col xs={12} lg={8} className="my-2">
                            <div>
                                {
                                    cuisines.map(
                                        cuisine => (
                                            <Badge
                                                bg="primary me-2"
                                                key={cuisine}
                                            >
                                                {cuisine}
                                            </Badge>
                                        )
                                    )
                                }
                            </div>
                            <div className="fs-5 my-2">{description}</div>
                            <Row xs={3} className="text-sm">
                                <Col>
                                    <FontAwesomeIcon icon={faClock} />
                                    <span className="ms-2">{opens} - {closes}</span>
                                </Col>
                                <Col>
                                    <Rating value={rating} className="me-2" />
                                    {rating} ({numRatings} ratings)
                                </Col>
                                <Col>
                                    Cost for two: Rs. {costForTwo}
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Route
                        path={match.path}
                        render={( props : RouteComponentProps ) => <Menu {...props} id={id} />}
                        exact
                    />
                    <Route
                        path={`${match.path}/add`}
                        render={( props : RouteComponentProps ) => <AddMenuItem {...props} id={id} />}
                    />
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

export default RestaurantDetails;