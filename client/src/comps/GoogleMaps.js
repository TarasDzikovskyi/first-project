// AIzaSyD4C8hJICPEgHM-rpa0sZ1WD0fMEnrBN0g

// import {
//     InfoWindow,
//     withGoogleMap,
//     GoogleMap,
//     Marker,
// } from "react-google-maps";
// import {useState} from "react";
//
// export default function GoogleMaps() {
//
//     const [data, setData] = useState({
//         address: '',
//         city: '',
//         area: '',
//         state: '',
//         zoom: 15,
//         height: 400,
//         mapPosition: {
//             lat: 0,
//             lng: 0
//         },
//         markerPosition: {
//             lat: 0,
//             lng: 0
//         }
//     })
//
//
//     const MapWithAMarker = withGoogleMap(props =>
//         <GoogleMap
//             defaultZoom={8}
//             defaultCenter={{lat: -34.397, lng: 150.644}}
//         >
//             <Marker
//                 position={{lat: -34.397, lng: 150.644}}
//             >
//                 <InfoWindow>
//                     <div>
//                         hello
//                     </div>
//                 </InfoWindow>
//             </Marker>
//         </GoogleMap>
//     );
//
//
//     return (
//         <div>
//             <MapWithAMarker
//                 googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAnrHDsMy1ldNwd4Rm5RZeRnKdpPtfaqZs&v=3.exp&libraries=geometry,drawing,places"
//                 loadingElement={<div style={{height: `100%`}}/>}
//                 containerElement={<div style={{height: `400px`, width: '500px'}}/>}
//                 mapElement={<div style={{height: `100%`}}/>}
//             />
//         </div>
//     )
// }

// import React, {useState} from 'react';
// import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
// import PlacesAutocomplete, {
//     geocodeByAddress,
//     getLatLng,
// } from 'react-places-autocomplete';
//
// export default function GoogleMaps(props){
//
//     const [data, setData] = useState({
//         address: '',
//         showingInfoWindow: false,
//         activeMarker: {},
//         selectedPlace: {},
//         mapCenter: {
//             lat: 49.2827291,
//             lng: -123.1207375
//         }})
//
//     const handleChange = (e) => {
//         e.preventDefault()
//
//         setData(e.target.value)
//     };
//
//    const handleSelect = (e) => {
//         setData(e.target.value);
//
//         geocodeByAddress(data.address)
//             .then(results => getLatLng(results[0]))
//             .then(latLng => {
//                 console.log('Success', latLng);
//
//                 // update center state
//                 setData({ mapCenter: latLng });
//             })
//             .catch(error => console.error('Error', error));
//     };
//
//     return(
//         <div id='googleMaps'>
//             <PlacesAutocomplete
//                 value={data.address}
//                 onChange={handleChange}
//                 onSelect={handleSelect}
//             >
//                 {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//                     <div>
//                         <input
//                             {...getInputProps({
//                                 placeholder: 'Search Places ...',
//                                 className: 'location-search-input',
//                             })}
//                         />
//                         <div className="autocomplete-dropdown-container">
//                             {loading && <div>Loading...</div>}
//                             {suggestions.map(suggestion => {
//                                 const className = suggestion.active
//                                     ? 'suggestion-item--active'
//                                     : 'suggestion-item';
//                                 // inline style for demonstration purpose
//                                 const style = suggestion.active
//                                     ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                                     : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                                 return (
//                                     <div
//                                         {...getSuggestionItemProps(suggestion, {
//                                             className,
//                                             style,
//                                         })}
//                                     >
//                                         <span>{suggestion.description}</span>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 )}
//             </PlacesAutocomplete>
//
//             <Map
//                 google={props.google}
//                 initialCenter={{
//                     lat: data.mapCenter.lat,
//                     lng: data.mapCenter.lng
//                 }}
//                 center={{
//                     lat: data.mapCenter.lat,
//                     lng: data.mapCenter.lng
//                 }}
//             >
//                 <Marker
//                     position={{
//                         lat: data.mapCenter.lat,
//                         lng: data.mapCenter.lng
//                     }} />
//             </Map>
//         </div>
//     )
// }

