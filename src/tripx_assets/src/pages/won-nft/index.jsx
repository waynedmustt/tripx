import * as React from "react"
import {
    Container,
    Row,
    Form,
    Spinner,
    Button,
    Alert
} from 'react-bootstrap'
import './won-nft.css'
import {
    useNavigate,
    useLocation
} from "react-router-dom"
import { tripx } from "../../../../declarations/tripx"
import { Principal } from '@dfinity/principal'
import { coreService } from '../../core/service'
import Confetti from 'react-confetti'

const WonNFT = () => {
    let navigate = useNavigate()
    let location = useLocation()
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('')
    const [showAlert, setShowAlert] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const [showSpinner, setShowSpinner] = React.useState(false)
    const [userPrincipal, setUserPrincipal] = React.useState(null)
    const [won, setWon] = React.useState(false)

    React.useEffect(() => {
        if (!location || !location.state) {
            navigate('/map')
            return
        }
        async function init() {
            const storedPrincipal = coreService.getObjectItem('_scApp')
            if (!storedPrincipal?.principal) {
                return
            }

            setUserPrincipal(storedPrincipal?.principal)
        }
        init()
    }, [])

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

    const findEligibleNFT = async () => {
        const userAID = await tripx.getAccountIdentifier(Principal.fromText(userPrincipal))
        const registries = await tripx.getRegistry()

        return registries.filter((registry) => registry[1] !== userAID)
    }

    const backToMap = (e) => {
        e.preventDefault()
        navigate('/map')
    }

    const transfer = async (e) => {
        e.preventDefault()
        setDisabled(true)
        setShowSpinner(true)
        const eligibleNFT = await findEligibleNFT()
        let tokenIds = []
        for (let i = 0; i < eligibleNFT?.length; i += 1) {
            tokenIds.push(eligibleNFT[i][0])
        }

        tokenIds.sort()
        const minTokenId = tokenIds[0]
        const maxTokenId = tokenIds[tokenIds?.length - 1]
        const choosenTokenId = coreService.getRndInteger(minTokenId, maxTokenId)
        const ParsedTokenIdentifier = tokenIdentifier(coreService.getConfig('minterPrincipal'), choosenTokenId)
        const payload = {
            to: {principal: Principal.fromText(userPrincipal)},
            token: ParsedTokenIdentifier,
            notify: false,
            from: {principal: Principal.fromText(coreService.getConfig('minterPrincipal'))},
            memo : [],
            subaccount: [],
            amount : 1,
          }
        const response = await tripx.transfer(payload)
        if (response?.err) {
            setShowAlert(true)
            setShowSpinner(false)
            setError('error occurred when transfer NFT!')
            return
        }
        setShowAlert(true)
        setShowSpinner(false)
        setDisabled(false)
        setSuccess('Congratulations, you won treasure!!')
        setWon(true)
    }

    return (
        <Container className='pt-4 pb-4 background' fluid>
            <Row className='px-4 pt-4 won-nft-box' style={{display: 'block', margin: 'auto'}}>
                {showAlert ? 
                <Alert className="mt-4" key={error ? 'danger': 'success'} variant={error ? 'danger': 'success'}>
                    {error ? error : success}
                </Alert> : null
                }
                {showSpinner ? <Spinner animation="grow" className='dashboard-pulse' /> : null}
                {!won ? <Form style={{flexDirection: 'column', alignItems: 'center', marginTop: '3rem'}} className='text-center'>                    
                    <Button variant="primary" type="submit" onClick={transfer}
                    disabled={disabled}
                    >
                        {`Click to win treasure (hidden NFT)!`}
                    </Button>
                </Form> : <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                />}
                {won && <Button variant="primary" type="submit" onClick={backToMap}
                    disabled={disabled}>
                        {`Back to Map!`}    
                    </Button>}
            </Row>
        </Container>
    )
}

export default WonNFT