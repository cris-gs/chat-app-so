import React, { useState, useContext} from 'react';
import {Button, Card, InputGroup, Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { db } from "../../firebase";
import { deleteField, doc,  updateDoc, onSnapshot} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { v4 as uuid } from "uuid";


export const Reminders = () => {

    const [todos, setTodos] = useState([]);

    const { currentUser } = useContext(AuthContext);

    const [input , setInput] = useState('');

    const [date, setDate] = useState(new Date());

    // crear reminder a user 
    const createReminder = async (e) => {  
        const id = uuid();
        e.preventDefault();
        if(input === '') {
            return;
        }

        await updateDoc(doc(db, 'reminders', currentUser.uid), {
            ["reminders" + `.${id}`]: {
                id,
                text: input,
                completed: false,
                date
              }
          });
        setInput('');

    } 

    // cargar los reminderes del user
    const loadReminder = async () => { 
        await onSnapshot(doc(db, "reminders", currentUser.uid), (doc) => {
            let remindersArr = []; 
            if(doc.exists() && doc.data().reminders) {
                remindersArr = Object.values(doc.data().reminders);
                setTodos(remindersArr);
            } else {
                setTodos([]);
            }
        });
    }
    
    // eliminar reminder del user
    const deleteReminder = async (id) => {
        await updateDoc(doc(db, 'reminders', currentUser.uid), {
            ["reminders" + `.${id}`]: deleteField()
            });
    };

    // actualizar estado completed del reminder
    const updateReminder = async (todo) => { 
        await updateDoc(doc(db, 'reminders', currentUser.uid), { 
            ["reminders" + `.${todo.id}` + ".completed"]: !todo.completed
        });
    }



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = () => { 
        loadReminder();
        setShow(true);
    }

    return (
        <>
          <Button variant="primary" onClick={handleShow}>
            <i className="fa-regular fa-bell"></i>
          </Button>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Reminders</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form onSubmit={createReminder}> 
                <InputGroup className="mb-3">
                    <Form.Control
                    type="datetime-local"
                    name="duedate"
                    placeholder="Due date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    />

                    <Form.Control 
                    value={input} 
                    onChange = {(e) => setInput(e.target.value)}
                    placeholder="ej. Terminar proyecto so"
                    />
                    <Button variant="outline-success" type="submit" ><i className="fa-regular fa-plus"></i></Button>
                </InputGroup>
            </Form>

                {todos.map((todo, index) => ( 
                        <Card key = {index} bg = {!todo.completed ? 'light' : 'secondary'} >
                            <Card.Body>
                                <Row>  
                                    <Col sm={1}>
                                    <Form.Check type="checkbox" aria-label="Checkbox for following text input" checked={todo.completed ? 'checked' : ''} disabled/>
                                    </Col>
                                    <Col sm={9}> 
                                    <p onClick= {() => updateReminder(todo) }> {todo.text} </p>
                                    </Col>
                                    <Col sm={2}> 
                                    <Button variant="outline-danger" onClick={ () => deleteReminder(todo.id)}><i className="fa-regular fa-trash-can"></i></Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>

            </Modal.Footer>
          </Modal>
        </>
      );
}
