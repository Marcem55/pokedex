import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div>
            <Link to='/home'>
            <h1>Page not found, please go home</h1>
            </Link>
        </div>
    )
}