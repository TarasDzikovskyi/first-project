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
