import * as React from "react"
import {
    Container,
    Row,
    Form,
    Spinner,
    Button
} from 'react-bootstrap'
import './start-trip.css'
import {
    useLocation,
    useNavigate
} from "react-router-dom"

const StartTrip = () => {
    let location = useLocation()
    let navigate = useNavigate()
    const [hasArrived, setHasArrived] = React.useState(false)

    React.useEffect(() => {
        if (!location || !location.state) {
            navigate('/map')
            return
        }

        setTimeout(() => {
            setHasArrived(true)
        }, 5000)
    }, [])

    const OnTheWay = () => {
        return (
            <React.Fragment>
                <Form.Group className="mb-3">
                    <Form.Label>
                        <span style={{fontWeight: 'bold', fontSize: '24px'}}>You choose {location?.state?.destination}</span>
                    </Form.Label>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        <span style={{fontWeight: 'bold', fontSize: '18px'}}>
                            Enjoy your trip and you will be notified once you have arrived at destination!
                        </span>
                    </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>
                        <span className='text-center mt-4' style={{fontWeight: '300', fontSize: '14px'}}>
                            <a href={`https://google.com/maps?q=@${location?.state?.coordinate[0]},${location?.state?.coordinate[1]}`}
                            target='_blank'
                            >
                                Show Direction
                            </a>
                        </span>
                    </Form.Label>
                </Form.Group>
                <Spinner animation="grow" className='dashboard-pulse' />
            </React.Fragment>
        )
    }

    const doQuest = (e) => {
        e.preventDefault()
        navigate('/quest')
    }

    const Arrived = () => {
        return (
            <React.Fragment>
                <Form.Group className="mb-3">
                    <Form.Label>
                        <span style={{fontWeight: 'bold', fontSize: '24px'}}>You have arrived at {location?.state?.destination}!</span>
                    </Form.Label>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        <span style={{fontWeight: 'bold', fontSize: '18px'}}>
                            Start your adventure, raise your Trip Power (TPO) Experience, and 
                            have a chance to win treasure (hidden NFT)! 
                        </span>
                    </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button variant="primary" type="submit" onClick={doQuest}>
                        Complete Quest!
                    </Button>
                </Form.Group>
            </React.Fragment>
        )
    }

    return (
        <Container className='pt-4 pb-4' style={{minHeight: '100vh', background: '#eeeeee'}} fluid>
            <Row className='px-4 pt-4 start-trip-box' style={{display: 'block', margin: 'auto'}}>
                <Form style={{flexDirection: 'column', alignItems: 'center', marginTop: '3rem'}} className='text-center'>
                    {!hasArrived ?
                        OnTheWay() : Arrived()
                    }
                </Form>
            </Row>
        </Container>
    )
}

export default StartTrip