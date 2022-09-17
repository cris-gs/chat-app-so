
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap";
import Login from "./components/Login";
import  Register  from './components/Register';

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>

      <Register />
      </div>



    </Container>


  );
}

export default App;
