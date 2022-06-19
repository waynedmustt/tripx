import * as React from "react"
import {
    Container,
    Button
  } from 'react-bootstrap'
  import {
    MapContainer,
    TileLayer,
    Marker,
    Popup 
} from 'react-leaflet'
import './map.css'
import {
    useNavigate
} from "react-router-dom"

const Map = () => {
    let navigate = useNavigate()
    // mock for now
    const userLocation = [
        -8.1739118, 115.035572
    ]
    const destinationLocation = [
        -8.160895388966777, 115.02439330846154
    ]

    const startTrip = (e, destination, coordinate) => {
        e.preventDefault()
        navigate('/start-trip', { state: { destination: destination, coordinate: coordinate } })
    }

    return (
        <Container className='pt-4 pb-4 background' fluid>
            <div className="map-box" style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{fontWeight: 'bold', fontSize: '24px'}}>Choose your destination</span>
                <span style={{fontWeight: '300', fontSize: '14px'}}>{`do trip and earn crypto!`}</span>
                <MapContainer center={userLocation} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={userLocation}>
                        <Popup>
                            You are here
                        </Popup>
                    </Marker>
                    <Marker position={destinationLocation}>
                        <Popup style={{height: '70px'}}>
                           Lovina Beach <br />
                           <Button variant="primary" type="submit" onClick={
                            (e) => startTrip(e, 'Lovina Beach', destinationLocation)}>
                                Start Trip!
                            </Button>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </Container>
    );
}

export default Map;