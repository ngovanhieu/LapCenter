import React from 'react';
import Navbar from '../../components/navbar/navbar';
import './notFound.scss';

function NotFoundPage() {
  return (
    <div>
      <Navbar />
      <div className="not-found-container">
        <h1>404</h1>
        <p>Page Not Found</p>
        <span>Woops. Looks like this page doesn't exist.</span>
        <div className="boxShadow"></div>
      </div>
    </div>
  )
}
export default NotFoundPage;