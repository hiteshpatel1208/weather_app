import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function ZipInputForm(props) {
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(FormData);
    };

    return (
        <Form onSubmit={handleFormSubmit}>
            <FormGroup>
                <Label for='zipCode'>Zipcode</Label>
                <Input type='text' name='zipCode' placeholder='Enter zipcode' />
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    )
}
