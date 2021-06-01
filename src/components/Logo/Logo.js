import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css' 


const Logo = () => {
    return (
        <div className = "ma4 mt0">
            <Tilt className="Tilt " options={{ max : 50 }} style={{ height: 250, width: 250 }} >
                 <div className="Tilt-inner pa2">
                      <i style = {{paddingTop: '5px'}} className="fa fa-brain fa-10x"></i>
                 </div>
            </Tilt>
            
        </div>
    )
}

export default Logo
