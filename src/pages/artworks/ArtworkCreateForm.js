import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Upload from "../../assets/upload.png";
import Asset from "../../components/Asset";

function ArtworkCreateForm() {

    const [errors, setErrors] = useState({});
    const [artworkData, setArtworkData] = useState({
        artwork_title: "",       
        artist_name: "", 
        style: "", 
        type: "",
        payment_method: "",
        price: "",
        image: "",
        alt_text: "", 
        contact: "",
        location: "",
        description: ""
    });

    const {
        artwork_title,       
        artist_name, 
        style, 
        type,
        payment_method,
        price,
        image,
        alt_text, 
        contact,
        location,
        description,
    } = artworkData;


    const textFields = (
        <div className="text-center">
        
        <Form.Group controlId="artwork_title">
            <Form.Label>
                Artwork title
            </Form.Label>
            <Form.Control 
                type="text" 
                placeholder="artwork title"
                name="artwork_title"
                value={artwork_title}
                // onChange={handleChange}
            />
        </Form.Group>
        <Form.Group controlId="artist_name">
            <Form.Label>
                Artist name
            </Form.Label>
            <Form.Control 
                type="text" 
                placeholder="artist name"
                name="artist_name"
                value={artist_name}
                // onChange={handleChange}
            />
        </Form.Group>
        
        <Form.Group controlId="style">
            <Form.Label >
                Style
            </Form.Label>
            <Form.Control 
                type="text" 
                placeholder="style"
                name="style"
                as="select"
                value={style}
                // onChange={handleChange}
            >
                <option value="Modern">Modern</option>
                <option value="Contemporary">Contemporary</option>
                <option value="Digital art">Digital art</option>
                <option value="Old Masters">Old Masters</option>
                <option value="Classical">Classical</option>
                <option value="Other">Other</option>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="type">
            <Form.Label >
                Type
            </Form.Label>
            <Form.Control 
                type="text" 
                placeholder="type"
                name="type"
                as="select"
                value={type}
                // onChange={handleChange}
            >
                <option value="Collage">Collage</option>
                <option value="Drawing">Drawing</option>
                <option value="Needlework">Needlework</option>
                <option value="Etching">Etching</option>
                <option value="Painting">Painting</option>
                <option value="Photography">Photography</option>
                <option value="Pottery">Pottery</option>
                <option value="Sculpture">Scultpure</option>
                <option value="Watercolour">Watercolour</option>
                <option value="Other">Other</option>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="payment_method">
            <Form.Label >
                Payment method
            </Form.Label>
            <Form.Control 
                type="text" 
                placeholder="payment method"
                name="payment_method"
                as="select"
                value={payment_method}
                // onChange={handleChange}
            >
                <option value="Paypal">Paypal</option>
                <option value="Cash">Cash</option>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="price">
            <Form.Label >
                Price
            </Form.Label>
            <Form.Control 
                type="number" 
                placeholder="price"
                name="price"
                value={price}
                // onChange={handleChange}
            />
        </Form.Group>
        <Form.Group controlId="alt_text">
            <Form.Label >
                Image title
            </Form.Label>
            <Form.Control 
                type="text" 
                placeholder="descriptive image title"
                name="alt_text"
                value={alt_text}
                // onChange={handleChange}
            />
        </Form.Group>
        <Form.Group controlId="contact">
            <Form.Label >
                Contact
            </Form.Label>
            <Form.Control 
                type="text" 
                placeholder="contact"
                name="contact"
                value={contact}
                // onChange={handleChange}
            />
        </Form.Group>
        <Form.Group controlId="location">
            <Form.Label >
                Location
            </Form.Label>
            <Form.Control 
                type="text" 
                placeholder="location"
                name="location"
                value={location}
                // onChange={handleChange}
            />
        </Form.Group>

        <Form.Group controlId="description">
            <Form.Label >
                Description
            </Form.Label>
            <Form.Control 
                type="text" 
                placeholder="description"
                name="description"
                as="textarea"
                value={description}
                // onChange={handleChange}
            />
        </Form.Group>

        <Button
            onClick={() => {}}
        >
            cancel
        </Button>
        <Button type="submit">
            create
        </Button>
        </div>
    );

    return (
        <Form>
        <Row>
            <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
            <Container
                className='d-flex flex-column justify-content-center'
            >
                <Form.Group className="text-center">
                
                    <Form.Label
                    className="d-flex justify-content-center"
                    htmlFor="image-upload"
                    >
                    <Asset
                        src={Upload} 
                        message="Click or tap to upload an image"
                    />
                    </Form.Label>

                </Form.Group>
                <div className="d-md-none">{textFields}</div>
            </Container>
            </Col>
            <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
            <Container>{textFields}</Container>
            </Col>
        </Row>
        </Form>
    );
}

export default ArtworkCreateForm;