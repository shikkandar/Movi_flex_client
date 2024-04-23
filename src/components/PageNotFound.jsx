import React from 'react';
import { Button, Image } from 'react-bootstrap';
import not from '../assets/blue.png';
import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <div className="bg-white">
      <div className='d-flex w-100 justify-content-center'>
        <Button variant='dark' className='mt-3'>
          <Link className='text-white text-decoration-none' to={'/'}>
            Back to Home
          </Link>
        </Button>
      </div>
      <Image src={not} fluid />
      
    </div>
  );
};
