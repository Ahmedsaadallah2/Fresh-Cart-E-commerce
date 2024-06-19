import React from "react";
import amazonPay from "../../images/amazon-pay.png";
import american from "../../images/American-Express-Color.png";
import paypal from "../../images/paypal.png";
import mastercard from "../../images/mastercard.webp";

export default function Footer() {
  return (
    <>
      <footer className=" bg-slate-100 p-5 absolute bottom-0 left-0 right-0">
        <div className="container">
          <div>
            <h3 className=" text-3xl font-light">Get The FreshCart app</h3>
            <p className="text-xl font-light text-slate-500 my-3">
              We Will Send You a link, open it on your phone to download the
              app.
            </p>
          </div>
          <div className=" md:flex items-center gap-2">
            <input
              type="email"
              placeholder="Email..."
              className="outline-none border-2 border-slate-200 w-full md:w-0 my-2 md:my-0 md:flex-grow p-2 rounded-md"
            />
            <button className="py-2 px-7 text-white text-lg bg-primary rounded-md">
              Share App Link
            </button>
          </div>
          <div className=" flex items-center gap-4 my-3">
            <span className="md:text-xl">Payment Partnars</span>
            <div className=" flex gap-2 items-center">
            <img src={amazonPay} alt="amazon payment" className="w-12 md:w-16 object-contain"/>
            <img src={american} alt="american payment" className="w-12 md:w-16 object-contain"/>
            <img src={mastercard} alt="mastercard payment"className="w-12 md:w-16 object-contain" />
            <img src={paypal} alt="paypal payment"className="w-12 md:w-16 object-contain" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
