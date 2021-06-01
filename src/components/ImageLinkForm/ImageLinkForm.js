import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className = "center f3">
                {'This Magic Brain will detect faces in your pictures. Give it a shot !'}
            </p>
            <div className = "center">
                <div className = "center form pa4 br3 shadow-5">
                    <input className = " center f4 pa2 w-70 center" type ='text' onChange={onInputChange} />
                    <button onClick = {onButtonSubmit} className = "w-30 grow f4 link ph3 pv2 dib white bg-light-purple" > Detect it</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm
