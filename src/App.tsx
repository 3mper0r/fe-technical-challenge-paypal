import { FormikProvider, useFormik } from 'formik';
import PayPalButton from './PayPalButton';
import './App.css';

const App = () => {
  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      setTimeout(() => {
        formik.setValues({ _paypal_token: 'fake_paypal_token' })
        formik.setSubmitting(false)
      }, 3000)
    },
  });

  return (
    <>
      <FormikProvider value={formik}>
        <PayPalButton />
      </FormikProvider>
    </>
  );
};

export default App;