import React, { useState } from 'react';
import { Button, Form, Label, Input, Col, FormGroup, FormFeedback, Card, CardBody } from 'reactstrap';

export default function ZipInputForm(props) {

    const [zip, setZip] = useState('');
    const [unit, setUnit] = useState('');
    const [validZip, setValidZip] = useState();
    const [inValidZip, setInvalidZip] = useState();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (validZip) {
            props.formSubmit(zip, unit);
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
        <Col md={4} xs={12}>
            <Card>
                <CardBody>
                    <Form onSubmit={(e) => {
                        handleFormSubmit(e);
                    }}
                    >
                        <FormGroup>
                            <Label for='zipCode'>Zipcode</Label>
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
                            <FormFeedback invalid>Please enter valid zipcode.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for='unit'>Select Unit: </Label>
                            <Input style={{position: 'relative', marginInlineStart: 10, marginInlineEnd: 10}}
                                type='radio'
                                name='unit'
                                value='metric'
                                onChange={(e) => {
                                    setUnit(e.target.value);
                                }}
                                required
                            />
                            <Label>Metric</Label>
                            <Input style={{position: 'relative', marginInlineStart: 10, marginInlineEnd: 10}}
                                type='radio'
                                name='unit'
                                value='imperial'
                                onChange={(e) => {
                                    setUnit(e.target.value);
                                }}
                                required
                            />
                            <Label>Imperial</Label>
                        </FormGroup>
                        <Button type='submit'>Check Weather</Button>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    )
}
