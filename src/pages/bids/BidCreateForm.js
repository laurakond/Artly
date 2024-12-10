import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { axiosRes } from '../../api/AxiosDefaults';

function BidCreateForm(props) {
    const { artwork, setArtwork, setBids } = props;
    const [bidData, setBidData] = useState({
        email: "",
        bid_price: ""
    });
    const {bid_price, email} = bidData;

    const handleChange = (event) => {
        setBidData({
            ...bidData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const { data } = await axiosRes.post("/bids/", {
            bid_price,
            artwork,
            email,
        });
        setBids((prevBids) => ({
            ...prevBids,
            results: [data, ...prevBids.results],
        }));
        setArtwork((prevArtwork) => ({
            results: [
            {
                ...prevArtwork.results[0],
                bids_count: prevArtwork.results[0].bids_count + 1,
            },
            ],
        }));
        setBidData(
            {
                email: "",
                bid_price: "",
            }
        );
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <Form className="mt-2" onSubmit={handleSubmit}>
        <Form.Group>
            <InputGroup>
            {/* {owner} */}
            <Form.Control
                placeholder="my bid"
                name="bid_price"
                type="decimal"
                value={bid_price}
                onChange={handleChange}
                rows={2}
            />
            <Form.Control
                placeholder="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                rows={2}
            />
            </InputGroup>
        </Form.Group>
        <button
            className="btn d-block ml-auto"
            // disabled={!bidPrice.trim()}
            type="submit"
        >
            Send your bid
        </button>
        </Form>
    );
}

export default BidCreateForm;
