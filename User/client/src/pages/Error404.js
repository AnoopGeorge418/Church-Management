import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Error404.css'
import Error from '../Img/404 Error.png'

function Error404() {
    const history = useNavigate();
    const submitHandler = () => {
        history("/")
    }
    return (
        <div className='Error404-Container'>

            <div className='Error404image'>
                <img src={Error} className="Error404-Image" alt="404 Error" height={400} />
            </div>

            <div className='Error404-msg'>
                Page not found
            </div>

            <div className="Error404-link_error1">
                The link you clicked may be broken or the page
            </div>

            <p className='Error404-link_error2'>
                may have been removed or renamed.
            </p>

            <button className='Error404_button' onClick={submitHandler}>
                ⬅Go back
            </button>

        </div>

    )
}

export default Error404