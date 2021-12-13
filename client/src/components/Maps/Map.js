//
// import React from 'react';
// import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
// import Geocode from "react-geocode";
// import Autocomplete from 'react-google-autocomplete';
// import { Descriptions } from 'antd';
//
// const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
//
//
// Geocode.setApiKey("AIzaSyAP5Q5CXmnExXciK2oL-cn9_gTGgre1whs");
// Geocode.enableDebug();
//
// class LocationSearchModal extends React.Component {
//
//     state = {
//         address: '',
//         city: '',
//         area: '',
//         state: '',
//         zoom: 15,
//         height: 400,
//         mapPosition: {
//             lat: 0,
//             lng: 0,
//         },
//         markerPosition: {
//             lat: 0,
//             lng: 0,
//         }
//     }
//
//
//     componentDidMount() {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(position => {
//                 this.setState({
//                         mapPosition: {
//                             lat: position.coords.latitude,
//                             lng: position.coords.longitude,
//                         },
//                         markerPosition: {
//                             lat: position.coords.latitude,
//                             lng: position.coords.longitude,
//                         }
//                     },
//                     () => {
//                         Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
//                             response => {
//                                 console.log(response)
//                                 const address = response.results[0].formatted_address,
//                                     addressArray = response.results[0].address_components,
//                                     city = this.getCity(addressArray),
//                                     area = this.getArea(addressArray),
//                                     state = this.getState(addressArray);
//                                 console.log('city', city, area, state);
//                                 this.setState({
//                                     address: (address) ? address : '',
//                                     area: (area) ? area : '',
//                                     city: (city) ? city : '',
//                                     state: (state) ? state : '',
//                                 })
//                             },
//                             error => {
//                                 console.error(error);
//                             }
//                         );
//
//                     })
//             });
//         } else {
//             console.error("Geolocation is not supported by this browser!");
//         }
//     };
//
//     getCity = (addressArray) => {
//         let city = '';
//         for (let i = 0; i < addressArray.length; i++) {
//             if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
//                 city = addressArray[i].long_name;
//                 return city;
//             }
//         }
//     };
//
//     getArea = (addressArray) => {
//         let area = '';
//         for (let i = 0; i < addressArray.length; i++) {
//             if (addressArray[i].types[0]) {
//                 for (let j = 0; j < addressArray[i].types.length; j++) {
//                     if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
//                         area = addressArray[i].long_name;
//                         return area;
//                     }
//                 }
//             }
//         }
//     };
//
//     getState = (addressArray) => {
//         let state = '';
//         for (let i = 0; i < addressArray.length; i++) {
//             for (let i = 0; i < addressArray.length; i++) {
//                 if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
//                     state = addressArray[i].long_name;
//                     return state;
//                 }
//             }
//         }
//     };
//
//     onChange = (event) => {
//         this.setState({ [event.target.name]: event.target.value });
//     };
//
//     onInfoWindowClose = (event) => { };
//
//     onMarkerDragEnd = (event) => {
//         let newLat = event.latLng.lat(),
//             newLng = event.latLng.lng();
//
//         Geocode.fromLatLng(newLat, newLng).then(
//             response => {
//                 const address = response.results[0].formatted_address,
//                     addressArray = response.results[0].address_components,
//                     city = this.getCity(addressArray),
//                     area = this.getArea(addressArray),
//                     state = this.getState(addressArray);
//                 this.setState({
//                     address: (address) ? address : '',
//                     area: (area) ? area : '',
//                     city: (city) ? city : '',
//                     state: (state) ? state : '',
//                     markerPosition: {
//                         lat: newLat,
//                         lng: newLng
//                     },
//                     mapPosition: {
//                         lat: newLat,
//                         lng: newLng
//                     },
//                 })
//             },
//             error => {
//                 console.error(error);
//             }
//         );
//     };
//
//     onPlaceSelected = (place) => {
//         console.log('plc', place);
//         const address = place.formatted_address,
//             addressArray = place.address_components,
//             city = this.getCity(addressArray),
//             area = this.getArea(addressArray),
//             state = this.getState(addressArray),
//             latValue = place.geometry.location.lat(),
//             lngValue = place.geometry.location.lng();
//
//         console.log('latvalue', latValue)
//         console.log('lngValue', lngValue)
//
//         // Set these values in the state.
//         this.setState({
//             address: (address) ? address : '',
//             area: (area) ? area : '',
//             city: (city) ? city : '',
//             state: (state) ? state : '',
//             markerPosition: {
//                 lat: latValue,
//                 lng: lngValue
//             },
//             mapPosition: {
//                 lat: latValue,
//                 lng: lngValue
//             },
//         })
//     };
//
//     render() {
//         const AsyncMap = withScriptjs(
//             withGoogleMap(
//                 props => (
//                     <GoogleMap
//                         defaultZoom={this.state.zoom}
//                         defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
//                     >
//                         <Marker
//                             google={this.props.google}
//                             name={'Dolores park'}
//                             draggable={true}
//                             onDragEnd={this.onMarkerDragEnd}
//                             position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
//                         />
//                         <InfoWindow
//                             onClose={this.onInfoWindowClose}
//                             position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
//                         >
//                             <div>
//                                 <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
//                             </div>
//                         </InfoWindow>
//                         <Marker />
//
//                         <Autocomplete
//                             style={{
//                                 width: '100%',
//                                 height: '40px',
//                                 paddingLeft: '16px',
//                                 marginTop: '2px',
//                                 marginBottom: '2rem'
//                             }}
//                             onPlaceSelected={this.onPlaceSelected}
//                             types={['(regions)']}
//                         />
//                     </GoogleMap>
//                 )
//             )
//         );
//
//         return (
//             <div style={{ padding: '1rem', margin: '0 auto', maxWidth: 1000 }}>
//                 <h1>Google Map Basic</h1>
//                 <Descriptions bordered>
//                     <Descriptions.Item label="City">{this.state.city}</Descriptions.Item>
//                     <Descriptions.Item label="Area">{this.state.area}</Descriptions.Item>
//                     <Descriptions.Item label="State">{this.state.state}</Descriptions.Item>
//                     <Descriptions.Item label="Address">{this.state.address}</Descriptions.Item>
//                 </Descriptions>
//
//                 <AsyncMap
//                     googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAP5Q5CXmnExXciK2oL-cn9_gTGgre1whs&libraries=places"
//                     loadingElement={
//                         <div style={{ height: `100%` }} />
//                     }
//                     containerElement={
//                         <div style={{ height: this.state.height }} />
//                     }
//                     mapElement={
//                         <div style={{ height: `100%` }} />
//                     }
//                 />
//             </div>
//         )
//     }
// }
//
// export default LocationSearchModal;


import React, {Component} from 'react';
// import './MillionaireGame.css';

class MillionaireGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            displayedCountry: {},
            answerOptions: [],
            isUserWin: '',
            disableFieldset: false,
            goodAnswer: 0,
            bgColor: {backgroundColor: 'white'}
        }
        this.refreshAnswers = this.refreshAnswers.bind(this);
        this.checkWin = this.checkWin.bind(this);

        console.log(this.state.displayedCountry)
    }


    componentDidMount() {
        const apiUrl = "https://restcountries.com/v3.1/all";
        fetch(apiUrl)
            .then(data => data.json())
            .then(countries => this.setState({countries}))
            .then(this.refreshAnswers)
    }


    refreshAnswers() {
        const random = this.state.countries[Math.floor(Math.random()*this.state.countries.length)];
        const randomOpt1 = this.state.countries[Math.floor(Math.random()*this.state.countries.length)];
        const randomOpt2 = this.state.countries[Math.floor(Math.random()*this.state.countries.length)];
        const randomOpt3 = this.state.countries[Math.floor(Math.random()*this.state.countries.length)];
        const answerOptions = [random.name.common, randomOpt1.name.common, randomOpt2.name.common, randomOpt3.name.common];
        answerOptions.sort(() => { return 0.5 - Math.random() });
        this.setState({
            displayedCountry: random,
            answerOptions: answerOptions,
            isUserWin: '',
            disableFieldset: false
        })
    }

    checkWin(e) {
        this.setState({
            disableFieldset: true
        })
        const winCountry = this.state.displayedCountry.name;
        const userGuess = e.target.value;
        if (winCountry === userGuess) {
            this.setState({
                isUserWin: 'Win',
                goodAnswer: this.state.goodAnswer + 1,
                bgColor: {backgroundColor: '#81C784'}
            })
        } else {
            this.setState({
                isUserWin: 'Lose',
                bgColor: {backgroundColor: '#FF8A65'}
            })
        }
        setTimeout(()=>{
            this.refreshAnswers();
            this.setState({
                isUserWin: '',
                disableFieldset: false,
                bgColor: {backgroundColor: 'white'}
            })
            console.log(e.target)
        }, 2000)

    }



    render() {
        return (
            <div className="main" style={this.state.bgColor}>
                <div className="wrapper">
                    <h1>Win a million by answering this question</h1>
                    <button className="rnd mui-btn mui-btn--raised" onClick={this.refreshAnswers}>Start</button>
                    {this.state.displayedCountry.flag && (
                        <>
                            <p>Which country is it?</p>
                            <div className="img-container">
                                <img className="mui-panel" src={this.state.displayedCountry.flag} alt="Country flag" />
                            </div>
                        </>
                    )}
                    <h2>{this.state.isUserWin === 'Win' ? 'You are right! ' : ''}
                        {this.state.isUserWin === 'Lose' ? 'You are wrong. ' : ''}
                        Score:{this.state.goodAnswer}</h2>
                </div>
                <fieldset disabled={this.state.disableFieldset}>
                    <form onClick={e => this.checkWin(e)}>
                        <button className="mui-btn mui-btn--raised" value={this.state.answerOptions[0]}>{this.state.answerOptions[0]}</button>
                        <button className="mui-btn mui-btn--raised" value={this.state.answerOptions[1]}>{this.state.answerOptions[1]}</button>
                        <button className="mui-btn mui-btn--raised" value={this.state.answerOptions[2]}>{this.state.answerOptions[2]}</button>
                        <button className="mui-btn mui-btn--raised" value={this.state.answerOptions[3]}>{this.state.answerOptions[3]}</button>
                    </form>
                </fieldset>
            </div>
        )
    }
}

export default MillionaireGame;
