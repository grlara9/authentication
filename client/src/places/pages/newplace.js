import React, { useCallback, useReducer } from 'react'

import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/components/Utils/validators';
import { useForm } from '../../shared/components/hooks/form-hook'

const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
  };

    return (
        <form className="place-form" onSubmit={placeSubmitHandler}>
          <Input 
           id="title"
           element="input"
           type="text"
           label="Title"
           validators={[VALIDATOR_REQUIRE()]}
           errorText="Please enter a valid title."
           onInput={inputHandler}
          />

          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
          />
          <button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </button>
          </form> 
      );
} 
export default NewPlace 