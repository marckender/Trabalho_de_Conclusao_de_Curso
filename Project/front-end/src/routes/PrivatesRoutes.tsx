import React from "react"
import { Route, Routes } from "react-router-dom";
import Carts from "../components/pages/Home/Carts";
import Orders from "../components/pages/Home/Orders";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe("pk_test_51OLUqoIVMkhNhXaS6fOemKLnPIoUraTrAJ7kWrWCJXoOxZJEbZuucpnZG9fmgQIFaRGSOYQkNxLw28gOBAnihenJ00A5G8JleZ");

const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/carts" element={
          <Elements stripe={stripePromise}>
            <Carts />
          </Elements>
        }/>

   <Route path="/orders" element={<Orders />}/>
     {/* <Route path="/*" element={<NotFound />} />  */}
    
  </Routes>
  )
}

export default PrivateRoutes;