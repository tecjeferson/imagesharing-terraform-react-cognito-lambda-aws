import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';



function ListImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    AWS.config.update({
      apiVersion: "2006-03-01",
      accessKeyId: "YOUR KEY ID",
      secretAccessKey: "YOUR SECRETE KEY",
      region: process.env.REGION,
      signatureVersion: 'v4',
    });


    const s3 = new AWS.S3();
    s3.listObjectsV2({ Bucket: 'BUCKET NAME', Prefix: 'input/images/' }, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      setImages(data.Contents.map((image) => image.Key));
    });
  }, []);

  return (
    <Container className="mt-5" >
      <Row className='text-center mb-5'>
        <Col>
          <h2 >Image list</h2>
        </Col>
      </Row>
      <Row>
        <>


          {images.map((image) => (

            <Col key={image}>
              <div>
                <Col md={3}>

                  <Row>

                    <Image src={`BUCKET URL/${image}`} rounded height={120} width={120}
                    />
                    <p />
                    <Button variant="dark" size="sm" href={`BUCKET URL/${image}`}>Download</Button>

                  </Row>

                </Col>
              </div>

            </Col>
          ))

          }

        </>
      </Row >
    </Container >
  );
}

export default ListImages;
