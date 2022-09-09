import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    return (
        <main>
            <section className="my-5">
                <header>
                    <h1>
                        <FontAwesomeIcon
                            icon={faPizzaSlice}
                            rotation={270}
                            className="me-2"
                        />
                        Platter
                    </h1>
                </header>
                <hr />
                <p>
                    Welcome to Platter. You can find restaurants in your locality and check  their menus.

                    <div className="my-3">
                        <small>
                            <strong>NOTE</strong>: You can even add an item - this should really be an admin feature but is add here to demonstrate handling HTTP POST requests.
                        </small>
                    </div>
                </p>
            </section>
        </main>
    )
};

export default Home;