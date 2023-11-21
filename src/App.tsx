import { FormikProvider, useFormik } from 'formik';
import PayPalButton from './PayPalButton';
import './App.css';

const App = () => {
  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      console.log('submitted');
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