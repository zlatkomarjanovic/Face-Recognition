import React from 'react'
import './Face.css'; 

const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div className = 'center ma'>
            <div className = "absolute mt2">
                <img 
                id = 'inputimage'
                alt = "Displays your image" 
                src = {imageUrl}
                width='500px' 
                height="auto"
                />
                <div style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}} 
                className = 'bounding-box'>

                </div>
            </div>
            
        </div>
    )
}

export default FaceRecognition
