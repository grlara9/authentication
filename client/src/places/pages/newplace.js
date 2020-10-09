import React from 'react'

import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_REQUIRE } from '../../shared/components/Utils/validators';

const newplace =()=>{ 


    return (
        <form className="place-form">
          <Input element="input" 
          type="text" 
          label="Title" 
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title." />

          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
          </form> 
      );
} 
export default newplace 