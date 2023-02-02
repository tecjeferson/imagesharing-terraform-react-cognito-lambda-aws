
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { signIn, signOut, useSession } from 'next-auth/react'
import { Row, Container, Col, Button } from "react-bootstrap"

function ColorSchemesExample() {
  const { data: session } = useSession()
  return (
    <>

      {!session &&
        <>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">IMG SHARING</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Container>
            <Row className="mt-5">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to upload and view images
              </h2>
            </Row>
            <Row className='text-center'>
              <Col>
                <Button
                  variant="dark"
                  type="submit"
                  className="inline-flex items-center justify-center border px-5 py-3 font-medium text-white shadow"

                  onClick={() => signIn('cognito', {
                    callbackUrl: `${window.location.origin}/imageupload`
                  })}
                >
                  Sign In
                </Button>
              </Col>
            </Row>
          </Container>
        </>
      }

      {session &&
        <>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">IMG SHARING</Navbar.Brand>
              <Nav className="me-auto">

                <Nav.Link href="/imageupload">Image upload</Nav.Link>
              </Nav>
              <Navbar.Text>
                Signed in as: {session.user.name ?? session.user.email} <span>  </span>
                <Button
                  variant="light"
                  type="submit"
                  className="shadow"

                  onClick={() => signOut({
                    callbackUrl: `${window.location.origin}`
                  })}
                >
                  Sign Out
                </Button>
              </Navbar.Text>
            </Container>
          </Navbar>
        </>
      }

    </>
  );
}

export default ColorSchemesExample;