import React from "react";
import silde1 from "../../images/slider-image-3.jpeg";
import silde2 from "../../images/slider-image-2.jpeg";
import silde3 from "../../images/slider-image-1.jpeg";
import { SwiperSlide } from "swiper/react";
export default function SliderProduct() {
  return (
    <>
      <div className=" grid grid-cols-12 mb-5">
        <div className=" col-span-12 md:col-span-8">
          <swiper-container loop={true} style={{ height: "100%" }}>
            <Swiper-slide style={{ height: "100%" }}>
              <img src={silde1} className="object-cover w-full h-full" alt="" />
            </Swiper-slide>
            <Swiper-slide style={{ height: "100%" }}>
              <img src={silde2} className="object-cover w-full h-full" alt="" />
            </Swiper-slide>
            <Swiper-slide style={{ height: "100%" }}>
              <img src={silde3} className="object-cover w-full h-full" alt="" />
            </Swiper-slide>
          </swiper-container>
        </div>
        <div className="col-span-4 hidden md:block">
          <div className="h-1/2">
            <img src={silde2} alt="" className="bg-black h-full object-cover" />
          </div>
          <div className="h-1/2">
            <img src={silde3} alt="" className="bg-black h-full object-cover" />
          </div>
        </div>
      </div>
    </>
  );
}
