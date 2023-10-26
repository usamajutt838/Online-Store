import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const empty = (value) => value.trim() === "";
const notFive = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [formInputs, setFormInputs] = useState({
    name: true,
    address: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !empty(enteredName);
    const enteredAddressIsValid = !empty(enteredAddress);
    const enteredPostalCodeIsValid = !notFive(enteredPostalCode);
    const enteredCityIsValid = !empty(enteredCity);

    setFormInputs({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      postalCode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredAddressIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const nameErrorClasses = `${classes.control} ${
    formInputs.name ? "" : classes.invalid
  }`;
  const addressErrorClasses = `${classes.control}${
    formInputs.address ? "" : classes.invalid
  }`;
  const postalCodeErrorClasses = `${classes.control}${
    formInputs.postalCode ? "" : classes.invalid
  }`;
  const cityErrorClasses = `${classes.control}${
    formInputs.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameErrorClasses}>
        <label htmlFor="name">Name</label>
        <input type=" text" id="name" ref={nameInputRef} />
        {!formInputs.name && <p>Please enter name!</p>}
      </div>
      <div className={addressErrorClasses}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formInputs.address && <p>Please enter address!</p>}
      </div>
      <div className={postalCodeErrorClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputs.postalCode && (
          <p>Please enter Postal Code (5 Characters Long)</p>
        )}
      </div>
      <div className={cityErrorClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputs.city && <p>Please enter city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
