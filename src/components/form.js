import React, { useState } from 'react';
import { Button, Form, Input, FormGroup, FormFeedback, InputGroup, InputGroupAddon } from 'reactstrap';

export default function ZipInputForm(props) {

    const [zip, setZip] = useState('');
    const [validZip, setValidZip] = useState();
    const [inValidZip, setInvalidZip] = useState();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (validZip) {
            props.formSubmit(zip);
        }
    };

    const validateZip = (val) => {
        const zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        if (zipRegex.test(val)) {
            setValidZip(true);
            setInvalidZip(false);
        } else {
            setValidZip(false);
            setInvalidZip(true);
        }
    };

    return (
        <Form onSubmit={(e) => {
            handleFormSubmit(e);
        }}
        >
            <FormGroup>
                <InputGroup>
                    <Input
                        type='text'
                        name='zipCode'
                        placeholder='Enter zipcode to search weather'
                        value={zip}
                        valid={validZip}
                        invalid={inValidZip}
                        onChange={(e) => {
                            setZip(e.target.value);
                            validateZip(e.target.value);
                        }}
                        maxLength={5}
                    />
                    <InputGroupAddon addonType='append'>
                        <Button style={{backgroundColor:'#f15d46', border:0}} type='submit'>&#x1f50d;</Button>
                    </InputGroupAddon>
                    <FormFeedback invalid>Please enter valid zipcode.</FormFeedback>
                </InputGroup>
            </FormGroup>
        </Form>
    )
}
