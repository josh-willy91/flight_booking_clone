import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Landing() {
    const [user, setUser] = useState({});
    const { userId }  = useParams();


    return (
        <div>
            <div>
                Landing page
            </div>
        </div>
    )
}

export default Landing;
