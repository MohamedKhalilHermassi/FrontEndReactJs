import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { APIProvider,Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import React, { useState } from 'react'

function MapLocation() {
    const position = { lat: 36.80094430431895, lng: 10.185366067228507 };
    const [open, setOpen] = useState(false);
    const mapStyles = {
        height: "500px",
        width: "500px"
      };

    return (
        <APIProvider apiKey="AIzaSyBPwx5ddyom316WcWwoFAH70kXsqmOSvhs">
            <div style={mapStyles}>
                <Map zoom={9} center={position} mapId={"189a91bb52e7ea27"}>
                    <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                    <Pin/>
                    </AdvancedMarker>
                    {open && <InfoWindow position={position} onCloseClick={() => setOpen(false)}><p>test</p></InfoWindow>}
                </Map>
            </div>
        </APIProvider>
    );
}

export default MapLocation