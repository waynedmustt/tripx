import * as React from "react"
import { StoicIdentity } from "ic-stoic-identity"
import { tripx } from "../../../../declarations/tripx"
import { Principal } from '@dfinity/principal'
import { coreService } from '../../core/service'
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
    React.useEffect(() => {
        async function init() {
            const storedPrincipal = coreService.getObjectItem('_scApp')
            if (!storedPrincipal?.principal) {
                return
            }
        }
        init()
    }, [])

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

    const to32bits = num => {
        let b = new ArrayBuffer(4);
        new DataView(b).setUint32(0, num);
        return Array.from(new Uint8Array(b));
    }

    const tokenIdentifier = (principal, index) => {
        const padding = Buffer("\x0Atid");
        const array = new Uint8Array([
            ...padding,
            ...Principal.fromText(principal).toUint8Array(),
            ...to32bits(index),
        ]);
        return Principal.fromUint8Array(array).toText();
    };

    // const transfer = async () => {
    //     const ParsedTokenIdentifier = tokenIdentifier(coreService.getConfig('minterPrincipal'), 0)
    //     const payload = {
    //         to: {principal: Principal.fromText(userPrincipal)},
    //         token: ParsedTokenIdentifier,
    //         notify: false,
    //         from: {principal: Principal.fromText(coreService.getConfig('minterPrincipal'))},
    //         memo : [],
    //         subaccount: [],
    //         amount : 1,
    //       }
    //     const response = await tripx.transfer(payload)
    //     console.log(response, 'test')
    // }

    return (
        <Container className='pt-4' style={{minHeight: '100vh', background: '#eeeeee'}} fluid>
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