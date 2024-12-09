import React from 'react';
import { useLoggedInUser } from '../../contexts/LoggedInUserContext';
import { Card, Media } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import appStyles from "../../App.module.css";
import { DropdownMenu } from '../../components/DropdownMenu';
import { axiosRes } from '../../api/AxiosDefaults';


const Artwork = (props) => {
    const {
        id,
        owner,
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
        // sold,
        updated_at,
        artworkPage,
        bid_count,

    } = props;

    const loggedInUser = useLoggedInUser();
    const is_owner = loggedInUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/artworks/${id}/edit`);
    }

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/artworks/${id}/`);
            history.goBack();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card>
            <Card.Body>
                <Media className='align-items-center justify-content-between'>
                    {owner}
                </Media>
                <div className='d-flex align-items-center'>
                    <span>{updated_at}</span>
                    {is_owner && artworkPage && <DropdownMenu
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        /> 
                    }
                </div>
            </Card.Body>
            <Link to={`/artworks/${id}`}>
                <Card.Img src={image} alt={alt_text} className={appStyles.Image}/>
            </Link>
            <Card.Body>
                {artwork_title && <Card.Title className='text-center'>{artwork_title}</Card.Title>}
                {artist_name && <Card.Text>Artist name: {artist_name}</Card.Text>}
                
                <div>
                    <p>Bid count: {bid_count}</p>
                </div>
                
                {style && <Card.Text>Style: {style}</Card.Text>}
                {type && <Card.Text>Type: {type}</Card.Text>}
                {payment_method && <Card.Text>Payment method: {payment_method}</Card.Text>}
                {price && <Card.Text>Price: {price}</Card.Text>}
                {contact && <Card.Text>Contact: {contact}</Card.Text>}
                {location && <Card.Text>Location: {location}</Card.Text>}
                {description && <Card.Text>Description: {description}</Card.Text>}
            </Card.Body>
        </Card>
    )
}

export default Artwork