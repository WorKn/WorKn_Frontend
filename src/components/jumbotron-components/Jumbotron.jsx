import React from 'react';

import './Jumbotron-Style.css';

const JumbotronComponent = ({params:{h1Text, pText, bText, imageUrl}}) => (
        
    
    <div className="jumbotron-container">

        
        <div className="jumbotron-text">
            
            <h1 className="jumbotron-title">{h1Text}</h1>
            <p className="jumbotron-content">{pText}</p>
            {bText ? <div className="button-style">{bText}</div> : null}
        
        </div>
        
        
        {imageUrl ? <div className="CTA-image">
            <img src={imageUrl} alt="A CTA"/>
        </div> : null}
    </div>
);

export default JumbotronComponent;