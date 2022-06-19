import * as React from "react"
import { StoicIdentity } from "ic-stoic-identity"
import {
    Container,
    Row,
    Form,
    Button
  } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './login.css'

const Login = () => {
    let navigate = useNavigate()

    const loginStoic = async (e) => {
        e.preventDefault()
        StoicIdentity.load().then(async identity => {
            if (identity !== false) {
                //ID is a already connected wallet!
            } else {
                //No existing connection, lets make one!
                identity = await StoicIdentity.connect();
            }
            
            //Lets display the connected principal!
            // identity.getPrincipal().toText()
            navigate('/map')
        })
    }

    return (
        <Container className='pt-4 background' fluid>
            <Row className='px-4 pt-4 login-box' style={{display: 'block', margin: 'auto'}}>
                <Form>
                    <Form.Group className="mb-3 text-center">
                        <Form.Label><span style={{fontWeight: 'bold', fontSize: '24px'}}>Welcome to TripX</span></Form.Label>
                        <Form.Label><span style={{fontWeight: '300', fontSize: '14px'}}>{`The new way to experience your trip!`}</span></Form.Label>
                    </Form.Group>
                    <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
                        <Button style={{width: '100%', display: 'block', margin: 'auto'}}
                        variant="primary" type="submit" onClick={loginStoic}
                        >
                            Stoic Connect 
                        </Button>
                    </div>
                </Form>
            </Row>
        </Container>
    );
}

export default Login;