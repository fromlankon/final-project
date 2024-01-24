import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function NotFound() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='notFound'>
            <div className='notFoundContent'>
                <img src="https://dash-ui-admin-template.vercel.app/images/error/404-error-img.png" />
                <p className='notFoundText1'> Oops! The page not found. </p>
                <p className='notFoundText2'> Or simply leverage the expertise of our consultation team. </p>
                <Link to={"/home"}> <button> GO TO HOMEPAGE </button> </Link>
            </div>
        </div>
    )
}