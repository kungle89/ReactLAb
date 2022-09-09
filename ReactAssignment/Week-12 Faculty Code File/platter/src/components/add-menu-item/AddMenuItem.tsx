import React, { Component } from 'react';
import { Row, Col, Form, Button, Toast, ToastContainer } from 'react-bootstrap';
import { addItemToMenu } from '../../services/menu';

type Props = {
    id: number
};

type State = {
    values: {
        name: string,
        price: string,
        description: string,
        imageUrl: string
    },
    errors: {
        name: string[],
        price: string[],
        description: string[],
        imageUrl: string[]
    },
    isValid: boolean,
    responseState: 'initial' | 'success' | 'error',
    toastMessage: string,
    show: boolean
};

class AddMenuItem extends Component<Props, State> {
    state: State = {
        values: {
            name: '',
            price: '0',
            description: '',
            imageUrl: ''
        },
        errors: {
            name: [],
            price: [],
            description: [],
            imageUrl: []
        },
        isValid: false,
        responseState: 'initial',
        toastMessage: '',
        show: false
    };

    validate( nameOfInput? : keyof State['values'] ) {
        const errors : State['errors'] = {
            name: [],
            price: [],
            description: [],
            imageUrl: []
        };
        let isValid = true;

        const {
            name,
            price,
            description,
            imageUrl
        } = this.state.values;

        if( name.trim() === '' ) {
            errors.name.push( 'Name cannot be empty' );
            isValid = false;
        }

        if( description.trim().length < 50 ) {
            errors.description.push( 'Description should have at least 50 characters' );
            isValid = false;
        }

        if( imageUrl.trim() === '' ) {
            errors.imageUrl.push( 'Image URL cannot be empty' );
            isValid = false;
        }
        
        if( price === '' ) {
            errors.price.push( 'Price cannot be empty' );
            isValid = false;
        }
        
        const pricePat = /^\d+(\.\d{1,2})?$/;
        if( !pricePat.test( price ) ) {
            errors.price.push( 'Price needs to be a valid currency value' );
            isValid = false;
        }

        if( nameOfInput ) {
            this.setState(
                state => {
                    return {
                        errors: {
                            ...state.errors,
                            [nameOfInput]: errors[nameOfInput]
                        },
                        isValid
                    };
                }
            );

            return errors[nameOfInput].length === 0;
        } else {
            this.setState(
                {
                    errors,
                    isValid
                }
            );

            return isValid;
        }
    }

    updateValue = ( event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { name, value } = event.target;

        this.setState(
            state => {
                return {
                    values: {
                        ...state.values,
                        [name]: value
                    }
                };
            },
            () => {
                this.validate( name as keyof State['values'] );
            }
        )
    }

    addItemToMenu = async ( event : React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();

        if( !this.validate() ) {
            return;
        }

        const menuItem = {
            ...this.state.values,
            restaurantId: this.props.id,
            price: parseFloat( this.state.values.price )
        };

        try {
            this.setState({
                responseState: 'initial'
            });

            const data = await addItemToMenu( menuItem );
            this.setState({
                responseState: 'success',
                toastMessage: `A menu item with id=${data.id} has been added successfully`,
                show: true
            });
        } catch( error ) {
            this.setState({
                responseState: 'error',
                toastMessage: error.message,
                show: true
            });
        }
    }

    render() {
        const {
            name,
            price,
            description,
            imageUrl
        } = this.state.values;

        const {
            name : nameErrs,
            price : priceErrs,
            description : descriptionErrs,
            imageUrl : imageUrlErrs
        } = this.state.errors;

        const isValid = this.state.isValid;
        const { responseState, toastMessage, show } = this.state;

        return (
            <>
                <Row>
                    <Col xs={12}>
                        <h3>Add a menu item</h3>
                        <hr />
                    </Col>
                    <Col xs={12}>
                        <Form onSubmit={this.addItemToMenu}>
                            <Form.Group
                                as={Row}
                                className="my-3"
                                controlId="name"
                            >
                                <Form.Label column sm={3}>Name</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={this.updateValue}
                                        aria-describedby="nameHelp"
                                        isInvalid={nameErrs.length !== 0}
                                    />
                                    <Form.Text id="nameHelp" muted>
                                        Name of the menu item
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        {
                                            nameErrs.map(
                                                err => <div key={err}>{err}</div>
                                            )
                                        }
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="my-3"
                                controlId="price"
                            >
                                <Form.Label column sm={3}>Price</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        name="price"
                                        value={price}
                                        onChange={this.updateValue}
                                        aria-describedby="priceHelp"
                                        isInvalid={priceErrs.length !== 0}
                                    />
                                    <Form.Text id="priceHelp" muted>
                                        Price should be in Indian Rupees (a currency value)
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        {
                                            priceErrs.map(
                                                err => <div key={err}>{err}</div>
                                            )
                                        }
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="my-3"
                                controlId="description"
                            >
                                <Form.Label column sm={3}>Description</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        as="textarea"
                                        name="description"
                                        value={description}
                                        onChange={this.updateValue}
                                        aria-describedby="descriptionHelp"
                                        isInvalid={descriptionErrs.length !== 0}
                                    />
                                    <Form.Text id="descriptionHelp" muted>
                                        Describe the menu item in at least 50 characters
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        {
                                            descriptionErrs.map(
                                                err => <div key={err}>{err}</div>
                                            )
                                        }
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="my-3"
                                controlId="imageUrl"
                            >
                                <Form.Label column sm={3}>Image URL</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        name="imageUrl"
                                        value={imageUrl}
                                        onChange={this.updateValue}
                                        aria-describedby="imageUrlHelp"
                                        isInvalid={imageUrlErrs.length !== 0}
                                    />
                                    <Form.Text id="imageUrlHelp" muted>
                                        The path to the image of this menu item in the server
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        {
                                            imageUrlErrs.map(
                                                err => <div key={err}>{err}</div>
                                            )
                                        }
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="my-3"
                                controlId="imageUrl"
                            >
                                <Col sm={{ offset: 3, span: 9 }}>
                                    <Button type="submit" disabled={!isValid}>Add menu item</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>

                {
                    responseState !== 'initial' && (
                        <ToastContainer className="p-3" position="top-end">
                            <Toast
                                bg={responseState === 'success' ? 'success' : 'danger'}
                                show={show}
                                autohide
                                delay={5000}
                                onClose={() => this.setState( { show: false } )}
                            >
                                <Toast.Header closeButton={false}>
                                    { responseState === 'success' ? 'Success' : 'Error'}
                                </Toast.Header>
                                <Toast.Body>
                                    {toastMessage}
                                </Toast.Body>
                            </Toast>
                        </ToastContainer>
                    )
                }
            </>
        )
    }
}

export default AddMenuItem;