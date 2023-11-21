import React from 'react';
import  ReactDOM from 'react-dom';
import type PayPal from '@paypal/paypal-js';
import { ErrorMessage, useFormik } from 'formik';

const buttonStyle = {
  color: 'gold',
  fundingicons: false,
  label: 'checkout',
  shape: 'rect',
  size: 'responsive',
  tagline: false,
} as PayPal.PayPalButtonsComponentOptions['style'];

type PayPalButtonComponent = React.ComponentType<
  PayPal.PayPalButtonsComponentOptions & { commit: boolean; env: string }
>

const ENV = 'sandbox'

declare global {
  interface PayPalWindow {
    Buttons: any;
    paypal?: 'paypal'
  }
}

const PayPalButton = () => {
  const formik = useFormik({
    initialValues: {_paypal_token: '', isSubmitting: false},
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      formik.setValues({ _paypal_token: 'fake_paypal_token', isSubmitting: true });
      formik.setSubmitting(false);
    },
  });

  const createOrderOrBillingAgreement = async () => {
    await formik.submitForm();
    await sleepUntilSubmitted();
    if (formik.isValid) {
      formik.setSubmitting(true)
    };
    return formik.values._paypal_token!;
  };

  const sleepUntilSubmitted = async () => {
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    
    const waitingForSubmission = () => {
      return new Promise<void>((resolve) => {
        const submission = async () => {
          try{
            if (!formik.isSubmitting) {
              resolve()
            } else {
              await sleep(100)
          }
        } catch(err) {
          console.log(err); 
          }
        }
        submission()
    })
  }
  await Promise.all([sleep(100), waitingForSubmission()])
  }

  const onApprove = async () => {
    console.log('approved');    
  };

  const paypal = window.paypal as PayPalWindow;
  if (!paypal) return null;

  const Button = (paypal.Buttons as any).driver('react', {
    React,
    ReactDOM,
  }) as PayPalButtonComponent
  
  return (
    <div>
      <div className={`${formik.isSubmitting ? 'disabled' : ''}`}>
        <Button 
          commit
          env={ENV}        
          createBillingAgreement={createOrderOrBillingAgreement}
          onApprove={onApprove}
          onCancel={() => formik.setSubmitting(false)}
          onError={() => {
            console.log(formik.errors)
            formik.setSubmitting(false)
          }}
          style={buttonStyle}
        />
        <ErrorMessage name='_paypal_token' component="button"/>
        {formik.errors._paypal_token && <div>{formik.errors._paypal_token}</div> }
      </div>
    </div>
  );
};

export default PayPalButton;