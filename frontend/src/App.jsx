import { useState } from "react";

import "./App.css";
import { Button, Container } from "react-bootstrap";

function App() {
  return (
    <Container className="mt-4">
      <h1>Welcome to My React App with React Bootstrap!</h1>
      <Button variant="primary">React Bootstrap Button</Button>
    </Container>
  );
}

export default App;
