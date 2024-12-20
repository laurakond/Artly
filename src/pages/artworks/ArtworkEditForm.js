import React, { useState, useRef, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import {axiosReq} from "../../api/AxiosDefaults";
import appStyles from "../../App.module.css";


function ArtworkEditForm() {

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
        description: "",
        // sold: "",
    });

    const imageInput = useRef(null);
    const history = useHistory();
    const {id} = useParams();

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
        // sold
    } = artworkData;

    useEffect(() =>{
        const handleMount = async () => {
            try {
                const {data} = await axiosReq.get(`/artworks/${id}`);
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
                    is_owner,
                    // sold
                } = data;

                is_owner ? setArtworkData({
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
                    // sold
                }) : history.push('/');
            } catch (error) {
                console.log(error);
            }
        };
        handleMount();
    }, [history, id]);

    const handleChange = (event) => {
        setArtworkData({
            ...artworkData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setArtworkData({
                ...artworkData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("artwork_title", artwork_title)
        formData.append("artist_name", artist_name)
        // formData.append("sold", sold)
        formData.append("style", style)
        formData.append("type", type)
        formData.append("payment_method", payment_method)
        formData.append("price", price)
        formData.append("alt_text", alt_text)
        formData.append("contact", contact)
        formData.append("location", location)
        formData.append("description", description)
        if (imageInput?.current?.files[0]){
            formData.append("image", imageInput.current.files[0]);
        }

        try {
            await axiosReq.put(`/artworks/${id}/`, formData);
            history.push(`/artworks/${id}`);
        } catch (error) {
            console.log(error)
            if (error.response?.status !== 401){
                setErrors(error.response?.data)
            }
        }
    }

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
                onChange={handleChange}
            />
        </Form.Group>
        {errors.artwork_title?.map((message, index) => (
            <Alert key={index} variant="warning">
                {message}
            </Alert>
            ))}

        <Form.Group controlId="artist_name">
            <Form.Label>
                Artist name
            </Form.Label>
            <Form.Control 
                type="text" 
                placeholder="artist name"
                name="artist_name"
                value={artist_name}
                onChange={handleChange}
            />
        </Form.Group>
        {errors.artist_name?.map((message, index) => (
            <Alert key={index} variant="warning">
                {message}
            </Alert>
            ))}

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
                onChange={handleChange}
            >
                <option value="Modern">Modern</option>
                <option value="Contemporary">Contemporary</option>
                <option value="Digital art">Digital art</option>
                <option value="Old Masters">Old Masters</option>
                <option value="Classical">Classical</option>
                <option value="Other">Other</option>
            </Form.Control>
        </Form.Group>
        {errors.style?.map((message, index) => (
            <Alert key={index} variant="warning">
                {message}
            </Alert>
            ))}

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
                onChange={handleChange}
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
        {errors.type?.map((message, index) => (
            <Alert key={index} variant="warning">
                {message}
            </Alert>
            ))}

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
                onChange={handleChange}
            >
                <option value="Paypal">Paypal</option>
                <option value="Cash">Cash</option>
            </Form.Control>
        </Form.Group>
        {errors.payment_method?.map((message, index) => (
            <Alert key={index} variant="warning">
                {message}
            </Alert>
            ))}

        <Form.Group controlId="price">
            <Form.Label >
                Price
            </Form.Label>
            <Form.Control 
                type="number" 
                placeholder="price"
                name="price"
                value={price}
                onChange={handleChange}
            />
        </Form.Group>
        {errors.price?.map((message, index) => (
            <Alert key={index} variant="warning">
                {message}
            </Alert>
            ))}

        {/* <Form.Group controlId="price">
            <Form.Label >
                Artwork status
            </Form.Label>
            <Form.Control 
                type="checkbox" 
                // placeholder="price"
                name="sold"
                value={sold}
                onChange={handleChange}
            />
        </Form.Group>
        {errors.price?.map((message, index) => (
            <Alert key={index} variant="warning">
                {message}
            </Alert>
            ))} */}

        <Form.Group controlId="alt_text">
            <Form.Label >
                Image title
            </Form.Label>
            <Form.Control 
                type="text" 
                placeholder="descriptive image title"
                name="alt_text"
                value={alt_text}
                onChange={handleChange}
            />
        </Form.Group>
        {errors.alt_text?.map((message, index) => (
            <Alert key={index} variant="warning">
                {message}
            </Alert>
            ))}

        <Form.Group controlId="contact">
            <Form.Label >
                Contact
            </Form.Label>
            <Form.Control 
                type="text" 
                placeholder="contact"
                name="contact"
                value={contact}
                onChange={handleChange}
            />
        </Form.Group>
        {errors.contact?.map((message, index) => (
            <Alert key={index} variant="warning">
                {message}
            </Alert>
            ))}

        <Form.Group controlId="location">
            <Form.Label >
                Location
            </Form.Label>
            <Form.Control 
                type="text" 
                placeholder="location"
                name="location"
                value={location}
                onChange={handleChange}
            />
        </Form.Group>
        {errors.location?.map((message, index) => (
            <Alert key={index} variant="warning">
                {message}
            </Alert>
            ))}

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
                onChange={handleChange}
            />
        </Form.Group>
        {errors.description?.map((message, index) => (
            <Alert key={index} variant="warning">
                {message}
            </Alert>
            ))}

        <Button
            onClick={() => history.goBack()}
        >
            cancel
        </Button>
        <Button type="submit">
            update
        </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
        <Row>
            <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
            <Container
                className='d-flex flex-column justify-content-center'
            >
                <Form.Group className="text-center">
                    <figure>
                        <Image className={appStyles.Image} src={image} rounded />
                    </figure>
                    <div>
                        <Form.Label htmlFor="image-upload">
                            Change the image
                        </Form.Label>
                    </div>

                    <Form.File
                    id="image-upload"
                    accept="image/*"
                    onChange={handleChangeImage}
                    ref={imageInput}
                    />
                    {errors.image?.map((message, index) => (
                    <Alert key={index} variant="warning">
                        {message}
                    </Alert>
                    ))}
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

export default ArtworkEditForm;