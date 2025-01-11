import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import { axiosRes } from "../../api/AxiosDefaults";
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/BidCreateForm.module.css";

function BidCreateForm(props) {
  const [errors, setErrors] = useState({});
  const { artwork, setArtwork, setBids, profile_image, profile_id } = props;
  const [bidData, setBidData] = useState({
    email: "",
    bid_price: "",
  });
  const { bid_price, email } = bidData;

  const handleChange = (event) => {
    setBidData({
      ...bidData,
      [event.target.name]: event.target.value,
    });
    // This part of code was appropriated from medium.com. Full credit is
    // noted in the Readme file.
    if (errors[event.target.name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [event.target.name]: null,
      }));
    }
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
      setBidData({
        email: "",
        bid_price: "",
      });
      toast.success("Your bid submitted!");
    } catch (error) {
      if (error.response?.status !== 401) {
        setErrors(error.response?.data);
      }
      toast.error("Something went wrong while attempting to submit your bid");
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <div className={styles.InputFormStyles}>
        <Form.Group>
          <InputGroup className="justify-content-start align-items-center">
            <div>
              <Form.Control
                placeholder="£0.00"
                name="bid_price"
                type="decimal"
                value={bid_price}
                onChange={handleChange}
                rows={2}
                className={`mt-3 ${styles.BidPriceStyle}`}
              />
            </div>
            {errors.bid_price?.map((message, index) => (
              <Alert key={index} variant="warning">
                {message}
              </Alert>
            ))}
            <div>
              <Form.Control
                placeholder="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                rows={2}
                className={` mt-3 ${styles.EmailInputStyle}`}
              />
            </div>
            {errors.email?.map((message, index) => (
              <Alert key={index} variant="warning">
                {message}
              </Alert>
            ))}
          </InputGroup>
        </Form.Group>

        <button
          className={`${btnStyles.ButtonStyles} ${styles.ButtonMargin}`}
          type="submit"
        >
          Bid
        </button>
      </div>
    </Form>
  );
}

export default BidCreateForm;
