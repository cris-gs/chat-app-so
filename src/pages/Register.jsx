import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { auth, storage, db } from "../firebase";

import { doc, setDoc } from "firebase/firestore";


 import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  // loading 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {

    setLoading(true);
    e.preventDefault();
    // obtener datos del form
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();

      const storageRef = ref(storage, `${displayName + date}`);


      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {

            // actualizar perfil del usuario
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL
            });

            // crear usuario en firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // crear chat vacio para usuario en firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});

            // home page
            navigate("/");

          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });

    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <>
    <div style={{backgroundColor: "#F8F9FB"}}>
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">PepeChat</h2>
          <h5 className="text-center mb-4 text-muted ">Register</h5>

          <Form onSubmit={handleSubmit}>

            <Form.Group id="userName" className="mb-2">
              <Form.Label>Display Name</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>

            <Form.Group id="email" className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required />
            </Form.Group>

            <Form.Group id="password" className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required />
            </Form.Group>

            <Form.Group id="file" >
              <Form.Label>Upload Image </Form.Label>
              <Form.Control type="file" required />
            </Form.Group>

            <Button className="w-100 mt-4" type="submit" disabled={loading}>
              Sign Up
            </Button>
            {loading && "Uploading and compressing the image please wait..."}
            {err && <span>Something went wrong</span>}

          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Login</Link>
      </div>

      </div>
            </Container>

            </div>
    </>
  );
};

export default Register;
