import React from 'react';
import { Button, Image } from 'react-bootstrap';
import not from '../assets/blue.png';
import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <div className="bg-white">
      <Image src={not} fluid className="position-relative" />
      <div className="text-center">
        <Button variant='dark' className='mt-3'>
          <Link className='text-white text-decoration-none' to={'/'}>
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};
