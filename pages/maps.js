
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
    this.codeAddress = this.codeAddress.bind(this);


    this.state = {
      data: null,
      results: null,
    };


  }



  componentDidMount() {

    // twitter geolocated tweets fetch

    fetch('api/twitter/')
      .then(response => response.json())
      .then(data => this.setState({ data })
      );










    if (
      !document.querySelectorAll(
        `[src="${"https://maps.googleapis.com/maps/api/js?key=AIzaSyBDjrEvzcrnMQLq7eY6c2TgOdfK9l5a4JQ"}"]`
      ).length
    ) {
      document.body.appendChild(
        Object.assign(document.createElement("script"), {
          type: "text/javascript",

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

    var pointA = new google.maps.LatLng(54.976713, -1.60728);


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
        '<h1 id="firstHeading" class="firstHeading">Sustainable North East</h1><br>' +
        '<div id="bodyContent">' +
        "<p><b>Newcastle, NE8</b></p>" +
        "</div>" +
        "</div>";
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      const marker = new google.maps.Marker({
        position: pointA,
        map,
        title: "Sustainable North East (NE8)",
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
    var marker;
    var data = this.state.data;
    var address = data?.data.map((d) => {
      geocoder.geocode({
        'address': d?.place?.full_name
      }, function (results, status) {
        if (status === "OK") {


          // Looping over the geocode results and redering markers based on it.
          for (var i = 0; i < results.length; i++) {
            var location = results[i].formatted_address;
            var endpt

            var climateIcon = 'https://i.imgur.com/LAQn67u.png';
            var combinedIcon = 'https://i.imgur.com/DxF4udF.png';
            var netZero = 'https://i.imgur.com/JQZfZGn.png';



            // Setting custom marker icons - 




            if (d?.text.includes('#netzero')) {
              marker = new google.maps.Marker({

                position: results[i].geometry.location,
                map: map,
                title: d?.user.name,
                icon: climateIcon
              });


            }


            else if (d?.text.includes('#climatechange')) {
              marker = new google.maps.Marker({
                position: results[i].geometry.location,
                map: map,
                title: d?.user.name,
                icon: netZero
              });

            }



            else {
              return null
            }



            google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {

              return function () {

                infowindow.open(map, marker);
              }

            })(marker, i));

            google.maps.event.addListener(marker, 'mouseout', (function (marker, i) {

              return function () {

                infowindow.close();
              }

            })(marker, i));



            const infowindow = new google.maps.InfoWindow({
              content: `<p><b>${d?.user.name}</b></p><br/>` +
                `<p>${d?.text}</p>`

            });





            // Directions & Distance

            marker.addListener("click", () => {






              setTimeout(() => {
                var pointA = new google.maps.LatLng(54.976713, -1.60728);




                var request = {
                  origin: location,
                  destination: pointA,
                  travelMode: 'DRIVING'
                };
                directionsService.route(request, function (result, status) {
                  if (status == 'OK') {
                    directionsRenderer.setDirections(result);
                  }
                });


              }, 2000)
            });

          }
          return marker


        }
        else {
          return null
        }
      }


      );





    });
  }



  // Rendering the here.

  render() {
    const { data } = this.state;


    return (

      <div className="partial-book-slider" onLoad={() => this.handleClick()}>






        <div id="map" className='w-full h-80' />
        <div id="directionsPanel" className='h-full text-white'></div>

        <br />


      </div>
    );
  }

}


export default Maps