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
        handleAcceptBid,
        // setArtwork,
        // setComments
    } = props;
    const loggedInUser = useLoggedInUser();
    const is_seller = loggedInUser?.username === seller;

    return (
        <div>
            <span>{buyer} -- </span> 
            <span>{updated_at}</span>
            <p > Bid placed: £{bid_price} Status: {status}</p>
            {/* {is_seller && (
                <DropdownMenu handleAcceptBid={()=>{}}
                handleRejectBid={handleRejectBid}
            />
            )} */}
            {is_seller && (
                <>
                <button onClick={()=>handleAcceptBid(id)}>Approve</button>
                <button onClick={()=>{}}>Reject</button>
                <button onClick={()=>{}}>Mark as sold</button>
                </>
            )}
        </div>
    )
}

export default Bid;