import React from 'react';
import { Navbar, Icon, NavItem, Container } from 'react-materialize';
import { firebaseApp } from '../../firebase';

export default ({ stage }) => {
    return (
        <div style={{ backgroundColor: "#3b5998" }}>
            <Container>
                <Navbar
                    alignLinks="right"
                    brand={<a className="brand-logo" style={{ fontWeight: 'bold' }} href="/">facebook</a>}
                    id="mobile-nav"
                    menuIcon={stage === 'loggedIn' && (<Icon>menu</Icon>)}
                    options={{
                        draggable: true,
                        edge: 'left',
                        inDuration: 250,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        outDuration: 200,
                        preventScrolling: true
                    }}
                    className="custom-navbar"
                >

                    {
                        stage === 'loggedIn' && (<NavItem href="" onClick={(event) => {
                            event.preventDefault()
                            firebaseApp.auth().signOut()
                        }}>
                            Log Out
                        </NavItem>)
                    }

                </Navbar>
            </Container>
        </div>
    )
}