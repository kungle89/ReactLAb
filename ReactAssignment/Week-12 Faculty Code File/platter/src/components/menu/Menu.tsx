import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, ToastContainer, Toast  } from 'react-bootstrap';
import AddMenuItem from '../add-menu-item/AddMenuItem';
import LoadingIndicator from '../common/LoadingIndicator';
import { getMenuForRestaurant } from '../../services/menu';
import IMenuItem from '../../models/IMenuItem';

type Props = {
    id: number
};

const Menu = ( { id, match } : Props & RouteComponentProps ) => {
    const [ loading, setLoading ] = useState<boolean>( true );
    const [ items, setItems ] = useState<IMenuItem[]>( [] );
    const [ error, setError ] = useState<string>( '' );
    const [ show, setShow ] = useState<boolean>( false );

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await getMenuForRestaurant( id );
                setItems( data );
            } catch( error ) {
                setError( error.response && error.response.data && error.response.data.message || error.message );
                setShow( true );
            } finally {
                setLoading( false );
            }
        };

        fetchMenu();
    }, [ ]);

    return (
        <>
            {
                loading && (
                    <LoadingIndicator
                        size="large"
                        message="We are fetching the menu for the restaurant. Please wait..."
                    />
                )
            }
            {
                items && (
                    <>
                        <div className="d-flex justify-content-between align-items-start my-4">
                            <h3>Menu</h3>
                            <Link
                                to={`${match.url}/add`}
                                className="btn btn-primary btn-sm"
                            >
                                Add to menu
                            </Link>
                        </div>
                        <hr />
                        {
                            items.map(
                                ( { id, restaurantId, name, price, description, imageUrl } ) => (
                                    <Row key={id} className="my-3">
                                        <Col xs={6} lg={3}>
                                            <img
                                                src={`${process.env.REACT_APP_API_BASE_URL}${imageUrl}`}
                                                alt={name}
                                                className="w-100"
                                            />
                                        </Col>
                                        <Col xs={6} lg={9}>
                                            <h5>{name}</h5>
                                            <div className="my-2 text-sm">Rs. {price}</div>
                                            <div className="my-2 text-sm">{description}</div>
                                        </Col>
                                    </Row>
                                )
                            )
                        }
                    </>
                )
            }
            {
                error && (
                    <ToastContainer className="p-3" position="top-end">
                        <Toast
                            bg="danger"
                            show={show}
                            autohide
                            delay={5000}
                            onClose={() => setShow( false )}
                        >
                            <Toast.Header closeButton={false}>
                                Error
                            </Toast.Header>
                            <Toast.Body>{error}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                )
            }
        </>
    );
};

export default Menu;