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

const Map = () => {
    // mock for now
    const userLocation = [
        -8.1739118, 115.035572
    ]
    const destinationLocation = [
        -8.160895388966777, 115.02439330846154
    ]

    const startTrip = () => {
        console.log('start trip!')
    }

    return (
        <Container className='pt-4 pb-4' style={{minHeight: '100vh', background: '#eeeeee'}} fluid>
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
                           <Button variant="primary" type="submit" onClick={startTrip}>
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