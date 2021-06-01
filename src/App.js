import React, {Component} from 'react' 
import Navigation from './components/Navigation/Navigation'; 
import Logo from './components/Logo/Logo'; 
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'; 
import FaceRecognition from './components/FaceRecognition/FaceRecognition'; 
import Rank from './components/Rank/Rank.js'; 
import Signin from './components/Signin/Signin.js'; 
import Register from './components/Register/Register.js'; 
import './App.css'; 
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';


const particlesOption = {
  particles : {
    number: {
      value: 80, 
      density: {
        enable: true, 
        value_area: 800,
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: '1556d68167a14d3ea18f8b3177b4f547'
})


class App extends Component {
  constructor() {
    super(); 
    this.state = {
      input: '',
      imageUrl: '', 
      box: {}, 
      route: 'signin', 
      isSignedIn: false,
      user : {
        id: '', 
        name: '', 
        email: '', 
        password: '', 
        entries: 0, 
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id, 
      name: data.name, 
      email: data.email, 
      password: data.password, 
      entries: data.entries, 
      joined: data.joined
    }})
  }



  
  calculateFaceLocation = (data) => {
    const calrifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; 
    const image = document.getElementById('inputimage'); 
    const width = Number(image.width);
    const height = Number(image.height); 
    console.log(width, height);  
    return {
      leftCol: calrifaiFace.left_col * width,
      topRow: calrifaiFace.top_row * height, 
      rightCol: width - (calrifaiFace.right_col * width),
      bottomRow: height - (calrifaiFace.bottom_row * height)

    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});  
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});  
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        if(response) {
          fetch("http://localhost:3000/image", {
            method: 'put', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then (count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }


  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render() {
    const {isSignedIn, imageUrl, route, box } = this.state; 
  return (
    <div className = "App">
      
      <Particles className = "particles" params = {particlesOption} /> 
      <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange}/> 
      {route === 'home' 
      ? <div> 
          <Logo />
          <Rank name = {this.state.user.name} entries = {this.state.user.entries}/> 
          <ImageLinkForm 
           onInputChange = {this.onInputChange} 
           onButtonSubmit={this.onButtonSubmit}
           />

          <FaceRecognition box={box} imageUrl = {imageUrl} /> 
      </div>
      :
      (
        route === 'signin' 
        ? <Signin onRouteChange = {this.onRouteChange}/>
        : <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
      )
      
      
      }
    </div>
  );
  }
}

export default App;
