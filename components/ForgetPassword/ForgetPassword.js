import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Alert
} from "reactstrap";

import { validateEmail } from "./../../utils/validate";
import { base_url } from "./../../utils/constants";

const ForgetPassword = props => {
  const handleSubmit = async e => {
    e.preventDefault();
    if (validateEmail(email)) {
      // Here it will make the request to backend
      setRequesting(true);
      try {
        const res = await fetch(base_url + "/forget-password", {
          method: "POST",
          body: JSON.stringify({
            email
          }),
          headers: {
            "content-type": "application/json"
          }
        });
        const data = await res.json();
        if (res.status !== 200)
          throw Error(
            data.message || "Unknwon error has occurred, please contact us!"
          );
        setResponse({
          message: data.message,
          status: 200
        });
      } catch (err) {
        setResponse({
          message: err.message,
          status: 400
        });
        resetResponse();
      }
      setRequesting(false);
    } else {
      setResponse({
        message: email + " is not a valid email id",
        status: 400
      });
      resetResponse();
    }
  };

  const resetResponse = (time = 3000) => {
    setTimeout(() => {
      setResponse({});
    }, time);
  };

  const [response, setResponse] = useState({
    message: "",
    status: 0
  });

  const [requesting, setRequesting] = useState(false);
  const [email, setEmail] = useState("");

  const { message, status } = response;

  return (
    <Row>
      <Col sm="8" md="9" lg="6" className="m-auto">
        <Card>
          <CardBody>
            <h4 className="text-center mb-3">
              <span className="text-success">Forgot</span> Password
            </h4>
            {message && (
              <Alert color={status === 200 ? "success" : "danger"}>
                {message}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <FormGroup row>
                <Label for="email" sm={3}>
                  Email
                </Label>
                <Col sm={9}>
                  <Input
                    type="email"
                    id="email"
                    required
                    onChange={e => setEmail(e.target.value)}
                    autoFocus
                  />
                </Col>
              </FormGroup>

              <Col sm={12} className="text-center mt-3">
                <Button color="success" disabled={requesting}>
                  {requesting ? "Requesting..." : "Request Reset Link"}
                </Button>
              </Col>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ForgetPassword;
