import * as React from "react"
import {
    Container,
    Row,
    Form,
    Spinner,
    Button,
    Alert
} from 'react-bootstrap'
import './quest.css'
import {
    useNavigate
} from "react-router-dom"

const Quest = () => {
    let navigate = useNavigate()
    const [url, setUrl] = React.useState('')
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('')
    const [showAlert, setShowAlert] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const [showSpinner, setShowSpinner] = React.useState(false)

    const completeQuest = (e) => {
        e.preventDefault()
        setDisabled(true)
        setShowAlert(false)
        if (!url) {
            setShowAlert(true)
            setDisabled(false)
            setError('url is empty!')
            return
        }
        setShowAlert(true)
        setShowSpinner(true)
        setSuccess('Please waiting for confirmation if you eligible to win treasure!')
        setTimeout(() => {
            // navigate('/won-nft', {wonNFT: true})
        }, 5000)
    }

    return (
        <Container className='pt-4 pb-4' style={{minHeight: '100vh', background: '#eeeeee'}} fluid>
            <Row className='px-4 pt-4 start-trip-box' style={{display: 'block', margin: 'auto'}}>
                {showAlert ? 
                <Alert className="mt-4" key={error ? 'danger': 'success'} variant={error ? 'danger': 'success'}>
                    {error ? error : success}
                </Alert> : null
                }
                {showSpinner ? <Spinner animation="grow" className='dashboard-pulse' /> : null}
                <Form style={{flexDirection: 'column', alignItems: 'center', marginTop: '3rem'}} className='text-center'>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            <span style={{fontWeight: 'bold', fontSize: '24px'}}>
                                Please do selfie here, upload it on your social media, and 
                                please provide us the link! 
                            </span>
                        </Form.Label>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicUrl">
                        <Form.Label>URL</Form.Label>
                        <Form.Control type="text" placeholder="Enter URL of your social media!" 
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={disabled}
                        />
                        <Form.Text className="text-muted">
                            Please input URL
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={completeQuest}
                    disabled={disabled}
                    >
                        Submit
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}

export default Quest