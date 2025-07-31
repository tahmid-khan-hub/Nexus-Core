import React from 'react';
import UseAuth from '../../Hooks/UseAuth';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useLoaderData, useNavigate } from 'react-router';

const PaymentForm = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const courseData = useLoaderData();
  
    return (
        <div>
            
        </div>
    );
};

export default PaymentForm;