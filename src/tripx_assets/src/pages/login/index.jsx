import * as React from "react";
import {
    Button
  } from 'react-bootstrap';
import { StoicIdentity } from "ic-stoic-identity";
import { tripx } from "../../../../declarations/tripx";
import { Principal } from '@dfinity/principal';
import { coreService } from '../../core/service'

const Login = () => {
    const [userPrincipal, setUserPrincipal] = React.useState('')

    React.useEffect(() => {
        async function init() {
            const storedPrincipal = coreService.getObjectItem('_scApp')
            if (storedPrincipal?.principal) {
                setUserPrincipal(storedPrincipal?.principal)
            }
            const AID = await tripx.getAccountIdentifier(Principal.fromText(storedPrincipal?.principal))
            console.log(AID, 'test')
        }
        init()
    }, [])

    const loginStoic = async () => {
        StoicIdentity.load().then(async identity => {
            if (identity !== false) {
                //ID is a already connected wallet!
            } else {
                //No existing connection, lets make one!
                identity = await StoicIdentity.connect();
            }
            
            //Lets display the connected principal!
            setUserPrincipal(identity.getPrincipal().toText());
        })
    }

    const logout = () => {
        //Disconnect after
        StoicIdentity.disconnect();
        setUserPrincipal('')
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

    const transfer = async () => {
        const ParsedTokenIdentifier = tokenIdentifier('fucqx-yitaz-ukmrj-vzyr4-b4v4n-molxb-f7ejl-mggj6-zgo2l-uxjsv-eae', 0)
        const payload = {
            to: {principal: Principal.fromText(userPrincipal)},
            token: ParsedTokenIdentifier,
            notify: false,
            from: {principal: Principal.fromText('fucqx-yitaz-ukmrj-vzyr4-b4v4n-molxb-f7ejl-mggj6-zgo2l-uxjsv-eae')},
            memo : [],
            subaccount: [],
            amount : 1,
          }
        const response = await tripx.transfer(payload)
        console.log(response, 'test')
    }

    return (
        <React.Fragment>
            <Button variant="primary" type="submit" onClick={loginStoic}>
                {userPrincipal ? userPrincipal : 'Login with Stoic Wallet'}
            </Button>
            {userPrincipal && <Button variant="primary" type="submit" onClick={logout}>
                {'Logout'}
            </Button>}
            {userPrincipal && <Button variant="primary" type="submit" onClick={transfer}>
                {'transfer NFT!'}
            </Button>}
        </React.Fragment>
    );
}

export default Login;