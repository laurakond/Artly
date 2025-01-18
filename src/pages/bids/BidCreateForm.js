import React, { useState } from "react";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import { axiosRes } from "../../api/AxiosDefaults";
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/BidCreateForm.module.css";

function BidCreateForm(props) {
  const [errors, setErrors] = useState({});
  const { artwork, setArtwork, setBids } = props;
  const [bidData, setBidData] = useState({
    email: "",
    bid_price: "",
  });
  const { bid_price, email } = bidData;

  // Handle changing bid data(price and email)
  const handleChange = (event) => {
    setBidData({
      ...bidData,
      [event.target.name]: event.target.value,
    });
    /*This part of the code was appropriated from medium.com. Full credit is
    noted in the used code section in the Readme.md.*/
    if (errors[event.target.name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [event.target.name]: null,
      }));
    }
  };

  // Manages bid submission functionality for the buyer and counts the bids
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
        <Form.Group className="mb-0">
          <InputGroup
            className={`justify-content-start align-items-center ${styles.InputGroupCustom}`}
          >
            <div
              className={
                errors.bid_price || errors.email
                  ? styles.AlertMarginWithError
                  : null
              }
            >
              {errors.bid_price?.map((message, index) => (
                <Alert
                  key={index}
                  variant="warning"
                  className={`p-2 ${styles.Alert} ${styles.AlertPrice}`}
                >
                  {message}
                </Alert>
              ))}
              <Form.Control
                placeholder="£0.00"
                name="bid_price"
                type="decimal"
                value={bid_price}
                onChange={handleChange}
                rows={2}
                className={`${styles.BidPriceStyle}`}
              />
            </div>
            <div
              className={
                errors.bid_price || errors.email
                  ? styles.AlertMarginWithError
                  : null
              }
            >
              {errors.email?.map((message, index) => (
                <Alert
                  key={index}
                  variant="warning"
                  className={`p-2 ${styles.Alert} ${styles.AlertEmail}`}
                >
                  {message}
                </Alert>
              ))}
              <Form.Control
                placeholder="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                rows={2}
                className={` ${styles.EmailInputStyle}`}
              />
            </div>
          </InputGroup>
        </Form.Group>

        <button
          className={`${btnStyles.ButtonStyles} ${
            errors.bid_price || errors.email
              ? styles.ButtonMarginWithError
              : styles.ButtonMargin
          }`}
          type="submit"
        >
          Bid
        </button>
      </div>
    </Form>
  );
}

export default BidCreateForm;
