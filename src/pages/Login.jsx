import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // home page
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <>

      <Container fluid style = {{paddingLeft : 0}}>
        <Row>

          <Col xs={6} md={7} className="d-none d-md-block p-0">
            <Container style={{backgroundColor: "#132836", minHeight: "100vh"}} className="d-flex align-items-center justify-content-center" >
            <div className="text-white" >
              <h1 className="text-center mb-4">
              We are more than just a simple chat
              </h1>
              <h5 className="text-center mb-4 text-muted "> 
              Choose our website is better than whatsapp web, 
              we have a responsive design, reminders and bots!
              </h5>
              </div>
            </Container>
          </Col>

          <Col xs={12} md={5} className="p-0">
            <Container fluid className="d-flex align-items-center justify-content-center" style={{backgroundColor: "#F8F9FB", minHeight: "100vh"  }}>
            <div className="w-100 " style={{ maxWidth: "400px" }}>
              <Card>
                <Card.Body>
                  <h2 className="text-center mb-4">PepeChat</h2>
                  <h5 className="text-center mb-4 text-muted ">Login</h5>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" required />
                    </Form.Group>

                    <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" required />
                    </Form.Group>

                    <Button className="w-100 mt-4" type="submit">
                      Sign in
                    </Button>
                    {err && <span>Something went wrong</span>}
                  </Form>
                </Card.Body>
              </Card>
              <div className="w-100 text-center mt-2">
                You don't have an account? <Link to="/register">Register</Link>
              </div>
            </div>
            </Container>
          </Col>
        </Row>
      </Container>
      {/* </div> */}
    </>
  );
};

export default Login;
