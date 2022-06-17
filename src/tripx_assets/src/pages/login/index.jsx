import * as React from "react";
import {
    Button
  } from 'react-bootstrap';
import { StoicIdentity } from "ic-stoic-identity";

const Login = () => {
    const [principal, setPrincipal] = React.useState('')

    const loginStoic = async () => {
        StoicIdentity.load().then(async identity => {
            if (identity !== false) {
                //ID is a already connected wallet!
            } else {
                //No existing connection, lets make one!
                identity = await StoicIdentity.connect();
            }
            
            //Lets display the connected principal!
            setPrincipal(identity.getPrincipal().toText());
        })
    }

    const logout = () => {
        //Disconnect after
        StoicIdentity.disconnect();
        setPrincipal('')
    }

    return (
        <React.Fragment>
            <Button variant="primary" type="submit" onClick={loginStoic}>
                {principal ? principal : 'Login with Stoic Wallet'}
            </Button>
            {principal && <Button variant="primary" type="submit" onClick={logout}>
                {'Logout'}
            </Button>}
        </React.Fragment>
    );
}

export default Login;