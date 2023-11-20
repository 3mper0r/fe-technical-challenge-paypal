# Frontend Engineer: Technical Challenge PayPal Button

## Task

Take a look at the component `PayPalButton`, located in `/src/PayPalButton.tsx`.

1. What issues with it can you spot?

    *Answer*:
    - onApprove is left empty with a placeholder
    - there is a hardcoded value for the environment prop of the Button
    - when the button is in Submitting state the whole button will go away because of the 'display:none' that stands in paret element of the button. I think it's not a good user experience (if submitting may take a bit longer, it may scare the user because it would dissapear for a longer time)
    - "Window[paypal]" is used directly in codebase. Window is a global browser object and it is not recommended to be used directly, I think it's a bad practice. We can use TypeScript for some type safety.
    - there is almost no error handling, no error is shown to the user nor it is logged to the console.
    - sleepUntilSubmitted method is used with while loop. For such cases we should use Promises. We can use async and await. This way is more efficient.
    - createOrderOrBillingAgreement method modifies the formik state while is asynchronous. The submitForm() is asynchronous but when is called it sends the submission and the function doesnt wait for that to complete. We have then a sleepUntilSubmitted method inside which waits for the submission and uses the if statement to check, which is a loop in practice, so it checks several time until conditions returns true. So while this is running the submitting form passes and gets executed and it sets the form to true(submits) while the sleepUntilSubmitted didn't finish. If async submission takes a bit more time, the state won't change 
    - normally type 'any' it's not prefered to use even though in some special cases it's totally fine 

2. Re-factor the class component into a functional component, while applying improvements regarding the problems you noted before and any other optimizations.
3. Bonus: Get rid of the HOC connect component (perhaps by utilising other available APIs).
4. Bonus: There is an issue with running the current implementation in `React.StrictMode` - the PayPal button will be duplicated, how would you go about solving this problem?

    *Answer*: ...

### Additional notes

- The component uses [PayPal SDK](https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-reference/). Keep in mind that due to the mock returning a fake value, `onAccept` will never be executed in this demo and the expected result is the SDK failing with `500` while trying to call `https://www.sandbox.paypal.com/smart/api/payment/fake_paypal_token/ectoken`
- The component also utilises [formik](https://formik.org/) as form/state management library.

## Submit your solution

You can provide your solution either

- as a zipped file containing the code or
- as a link to a fork of this repository.
