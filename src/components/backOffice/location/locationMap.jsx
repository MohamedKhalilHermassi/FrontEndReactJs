import React, { useCallback, useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';


function LocationMap(props) {

    const [location, setLocation] = useState();
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
      console.log(Object.keys(props));
      if(Object.keys(props) == 'getlocation'){
        props.getlocation(location);
      }else {
        setLocations(props.locations);
        console.log(props.locations);
      }
    },[location, locations])

    const containerStyle = {
        height: "500px",
        width: "100%"
      };
      
      const center = {
        lat: 36.80094430431895, lng: 10.185366067228507
      };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBPwx5ddyom316WcWwoFAH70kXsqmOSvhs"
      })
    
      const [map, setMap] = useState(null)
    
      /*const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])*/
    
      const onUnmount = useCallback(function callback(map) {
        setMap(null)
      }, [])

            // Handle map click event
    const onMapClick = useCallback((event) => {
        setLocation({lat: event.latLng.lat(), lng: event.latLng.lng()})
    }, []);
    
      return isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={9}
            onUnmount={onUnmount}
            onClick={onMapClick}
          >
        <Marker position={location} />
        {locations.map(location => (
        <Marker
          key={location._id}
          position={{ lat: location.lat, lng: location.lng }}
          title={location.address}
          onClick={() => {console.log(location.city);
          navigate('/admin/location');}}
        />
      ))}
          </GoogleMap>
      ) : <></>
}

export default LocationMap