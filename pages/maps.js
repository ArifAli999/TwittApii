
import React from 'react';
var map;
var marker;
var directionsService;
var directionsRenderer;

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.renderMap = this.renderMap.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      input: "",
      data: null,
    };
  }



  componentDidMount() {


    fetch('api/twitter/')
      .then(response => response.json())
      .then(data => this.setState({ data })
      );


    // ADD API KEY HERE
    if (
      !document.querySelectorAll(
        `[src="${"https://maps.googleapis.com/maps/api/js?key=AIzaSyBDjrEvzcrnMQLq7eY6c2TgOdfK9l5a4JQ"}"]`
      ).length
    ) {
      document.body.appendChild(
        Object.assign(document.createElement("script"), {
          type: "text/javascript",
          // ADD API KEY HERE
          src:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyBDjrEvzcrnMQLq7eY6c2TgOdfK9l5a4JQ",
          onload: () => this.renderMap()

        })

      );

    }
    setTimeout(() => {
      this.handleClick()

      //  delay so that the DOM can totally load and 'google' will not return as undefined. 
    }, 4000)
  }


  // Map function.
  renderMap() {

    const coords = { lat: -25.363, lng: 131.044 }
    const myLatLng = { lat: -25.363, lng: 131.044 };
    var pointA = new google.maps.LatLng(51.7519, -1.2578);
    var pointB = new google.maps.LatLng(50.8429, -0.1313);
    const { data } = this.state;
    const el = document.getElementById("map");
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
    if (el) {
      map = new google.maps.Map(el, {
        zoom: 10,
        center: pointA,


      });

      const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        "<p><b>Uluru</b>Test data.</p>" +
        "<p> More tweet details</p>" +
        "</div>" +
        "</div>";
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      const marker = new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Uluru (Ayers Rock)",
      });
      const markerA = new google.maps.Marker({
        position: pointA,
        title: "point A",
        label: "A",
        map: map
      });
      const markerB = new google.maps.Marker({
        position: pointB,
        title: "point B",
        label: "B",
        map: map
      });

      marker.addListener("click", () => {



        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });




      directionsRenderer.setPanel(document.getElementById('directionsPanel'));


      directionsRenderer.setMap(map);
      return map;

    } else {
      return null;
    }


  }





  handleClick() {
    const geocoder = new google.maps.Geocoder();

    this.codeAddress(geocoder);

  }




  // Geocoding the geolocated tweets using Geocode API provided by Google.


  codeAddress(geocoder) {

    var data = this.state.data;
    var address = data?.data.map((d) => (

      d?.place && d.place.country && (d?.place?.full_name)

    ));



    geocoder.geocode({
      'address': address.join()
    }, function (results, status) {
      if (status === "OK") {
        console.log(results)

        for (var i = 0; i < results.length; i++) {
          var location = results[i].formatted_address;
          var endpt

          console.log(location)
          var marker = new google.maps.Marker({
            position: results[i].geometry.location,
            map: map
          });

          marker.addListener("click", () => {



            setTimeout(() => {
              var pointA = new google.maps.LatLng(51.7519, -1.2578);
              var pointB = new google.maps.LatLng(51.5390261, -0.1425516);

              var request = {
                origin: pointA,
                destination: location,
                travelMode: 'DRIVING'
              };
              directionsService.route(request, function (result, status) {
                if (status == 'OK') {
                  directionsRenderer.setDirections(result);
                }
              });


            }, 4000)
          });

        }


      }
      else {
        return null
      }
    });
  }



  // Rendering the here.

  render() {
    const { data } = this.state;


    return (

      <div className="partial-book-slider" onLoad={() => this.handleClick()}>






        <div id="map" className='w-full h-80' />
        <div id="directionsPanel" className='float-right w-30 h-full text-white'></div>

        <br />

        <button >Route</button>
      </div>
    );
  }

}


export default Maps