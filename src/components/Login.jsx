import React from 'react'
import { Form, Button, Card } from "react-bootstrap"

const Login = () => {
  return (

    <>
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">PepeChat</h2>
        <h5 className="text-center mb-4 text-muted ">Login</h5>

        <Form>
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
        </Form>

      </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
      You don't have an account? Register
    </div>
  </>
  )
}

export default Login