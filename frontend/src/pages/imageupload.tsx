import axios from "axios";
import { ChangeEvent } from "react";
import { getSession } from 'next-auth/react'
import ImageView from "../components/imageview"
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';




async function uploadToS3(e: ChangeEvent<HTMLFormElement>) {
  const formData = new FormData(e.target);


  const file = formData.get("file");

  if (!file) {
    return null;
  }


  // @ts-ignore
  const fileType = encodeURIComponent(file.type);
  const { data } = await axios.get(`/api/auth/media?fileType=${fileType}`);
  const { uploadUrl, key } = data;
  await axios.put(uploadUrl, file);
  return key;
}

function Upload() {
  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const key = await uploadToS3(e);
  }
  return (
    <>
      <Container>
        <Row className="mt-5 text-center">
          <Col>
            <h5>Select the file to upload</h5>




            <Form onSubmit={handleSubmit}>
              <input type="file" accept="image/jpeg image/png" name="file" />
              <Button type="submit">Upload</Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <div>
        <ImageView />
      </div>
    </>
  );
}
export default Upload;

export async function getServerSideProps(context) {
  const { res } = context;
  const session = await getSession(context)

  if (!session) {
    res.writeHead(302, {
      Location: "/",
    });
    return res.end();
  }
  return {
    props: { session }
  }
}