
import React from 'react';
var map;

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.renderMap = this.renderMap.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
        this.handleClick() //  $ is available here
    }, 4000)
  }

  renderMap() {


  

    const coords = { lat: -25.363, lng: 131.044}
    const myLatLng = { lat: -25.363, lng: 131.044 };
    const { data } = this.state;
    ;
    const el = document.getElementById("map");

    if (el) {
      map = new google.maps.Map(el, {
        zoom: 10,
        center: {
          lat: coords.lat,
          lng: coords.lng
        }
        
        
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
  
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });
  
  
 
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < marker.length; i++) {
     bounds.extend(marker[i]);
    }
    
    

      return map.fitBounds(bounds);
      
    } else {
      return null;
    }


  }



  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleClick() {
    const geocoder = new google.maps.Geocoder();
 
    this.codeAddress(geocoder);
  
  }



  // THIS CRASHES if you comment it out //


  codeAddress(geocoder) {
    
    var data = this.state.data;
    var address =  data?.data.map((d)=> (
    
        d?.place && d.place.country && (d?.place?.full_name) 
    
    ));
 
    
    console.log(address)
    geocoder.geocode({
      'address': address.join()
    }, function(results, status) {
      if (status === "OK") 
      {
        console.log(results)
     
        for (var i = 0; i < results.length; i++) {
          var location = results[i];
     
          var marker = new google.maps.Marker({
            position: results[i].geometry.location,
            map: map
          });
        
        }
        return marker;
      }
      else {
        return null
      } 
    });
}

  render() {
    const { data } = this.state;
    
  
    return (
        
      <div className="partial-book-slider"  onLoad={ () => this.handleClick()}>
       
    
     
     

     
          <div id="map" className='w-full h-80'/>
        
     
      </div>
    );
  }
  
}

/*
 * Render the above component into the div#app
 */
export default Maps