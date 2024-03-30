import { APIProvider,Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react'
import { fetchLocations } from '../../../service/locationService';
import LocationMap from './locationMap';

function LocationList() {

  const [locations, setLocations] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetchData();
  },[])
  useEffect(() => {
  }, [locations]);

  const fetchData = async () => {
      try {
          const locationsData = await fetchLocations();
          //console.log(locationsData);

          setLocations(locationsData);
          setLoading(false);
      } catch (error) {
          console.error(error.message);
      }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className='mt-4 h-auto'>
    <LocationMap locations = {locations}></LocationMap>
    </div>
    </>
    );
}

export default LocationList