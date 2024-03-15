import { APIProvider,Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react'
import { fetchLocations } from '../../../service/locationService';

function LocationList() {

  const position = { lat: 36.80094430431895, lng: 10.185366067228507 };
  const [open, setOpen] = useState(false);
  const [locations, setLocations] = useState();
  const mapStyles = {
      height: "100%",
      width: "100%"
    };

    useEffect(() => {
      fetchData();
  },[])
  useEffect(() => {
  }, [locations]);

    const fetchData = async () => {
      try {
          const locationsData = await fetchLocations();
          console.log(locationsData);

          setLocations(locationsData);
      } catch (error) {
          console.error(error.message);
      }
  };

  return (
    <APIProvider apiKey="AIzaSyBPwx5ddyom316WcWwoFAH70kXsqmOSvhs">
    <div style={mapStyles}>
        <Map zoom={9} center={position} mapId={"189a91bb52e7ea27"}>
        {locations?.map((location, index) => (
          <div key={index}>
            <AdvancedMarker
              position={{ lat: parseFloat(location.coordinates.lat), lng: parseFloat(location.coordinates.lng) }}
              onClick={() => setOpen(true)}
            >
              <Pin />
            </AdvancedMarker>
            {open && <InfoWindow position={position} onCloseClick={() => setOpen(false)}><p>{location.address}</p></InfoWindow>}
            </div>
          ))}


            
            

        </Map>
    </div>
</APIProvider>  )
}

export default LocationList