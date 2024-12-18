import React from 'react';
import { useLoggedInUser } from '../../contexts/LoggedInUserContext';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import { DropdownMenu } from '../../components/DropdownMenu';

const Bid = (props) => {
    const {
        buyer,
        updated_at,
        bid_price,
        seller,
        // email,
        status,
        id,
        // setArtwork,
        // setComments
    } = props;
    const loggedInUser = useLoggedInUser();
    const is_seller = loggedInUser?.username === seller;

    const handleAcceptBid = () => {
        // history.push(`/artworks/${id}/edit`);
        console.log("accept bid");
    }

    const handleRejectBid = async () => {
        // try {
        //     await axiosRes.delete(`/bids/${id}/`);
        //     history.goBack();
        // } catch (error) {
        //     console.log(error);
        // }
        console.log("reject bid");
    };

    return (
        <div>
            <span>{buyer}</span> 
            <span>{updated_at}</span>
            <p > Bid placed: £{bid_price} Status: {status}</p>
            {/* {is_seller && (
                <DropdownMenu handleAcceptBid={handleAcceptBid}
                handleRejectBid={handleRejectBid}
            />
            )} */}
            {is_seller && (
                <>
                <button onChange={()=>{}}>Accept</button>
                <button onChange={()=>{}}>Reject</button>
                <button onChange={()=>{}}>Mark as sold</button>
                </>
            )}
        </div>
    )
}

export default Bid