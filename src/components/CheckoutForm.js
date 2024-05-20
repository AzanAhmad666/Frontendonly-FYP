import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/CheckoutForm.css";

const stripePromise = loadStripe(
  "pk_test_51PIXcOP2YsjtExUJkZaApVLqXUTFQ1eCQ0N6dp4oLQw3QWJxvhu8lmc0zh9lO2pvPHfUG7xUEVXSAefjNJnUspHf00UgbitRax"
);

function CheckoutForm() {
  const location = useLocation();
  const { budget, title, description, ProjectID } = location.state;
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    // Create PaymentIntent on the server
    axios
      .post("http://localhost:3000/api/v1/payment/create-payment-intent", {
        amount: budget * 100,
        projectId: ProjectID,
      })
      .then((response) => {
        setClientSecret(response.data.clientSecret);
        setPaymentIntentId(response.data.id);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await axios.post(
      "http://localhost:3000/api/v1/payment/capture-payment",
      { paymentIntentId: paymentIntentId }
    );

    console.log(response.data);
    navigate("/CompanyHome");

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="stripeBody">
      <main id="stripeContainer">
        <aside id="info">
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <form
                className=""
                id="payment-form"
                onSubmit={handleSubmit}
                style={{ marginTop: "35%" }}
              >
                <PaymentElement
                  id="payment-element"
                  options={paymentElementOptions}
                />

                <br />
                <button
                  className=" border-0 btna text-white "
                  disabled={isLoading || !stripe || !elements}
                  id="submit"
                  style={{
                    borderRadius: "3px",
                    padding: "5px 5px 5px 5px ",
                  }}
                >
                  <span id="button-text   ">
                    {isLoading ? <div>Loading...</div> : <div>Pay now</div>}
                  </span>
                </button>
                {message && <div id="payment-message">{message}</div>}
              </form>
            </Elements>
          )}
        </aside>
        <aside id="description">
          <h1>$ {budget}</h1>
          <h2>{title}</h2>
          <br />
          <h5>{description}</h5>
        </aside>
      </main>
    </div>
  );
}

export default CheckoutForm;
