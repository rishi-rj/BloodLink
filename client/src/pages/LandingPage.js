"use client";
import React, { useState, useEffect } from "react";
import ImageCarousel1 from "../components/imageCarousel/ImageCarousel1";
import ImageCarousel2 from "../components/imageCarousel/ImageCarousel2";
import ImageCarousel3 from "../components/imageCarousel/ImageCarousel2";
import { BsPostcardHeart } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";

const HeroSection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            
            <section className="flex bg-[#f9f9f9] relative overflow-hidden pb-[60px] md:flex-row flex-col">
                {/* Image Carousel Section */}
                <div className="flex md:w-[80%] max-w-[700px] justify-between">
                    {isMobile ? (
                        <div className="flex-1 w-full h-[100px] overflow-hidden">
                            <ImageCarousel3 />
                        </div>
                    ) : (
                        <>
                            <div className="flex-1 ml-[80px] mt-[30px] p-[10px] max-h-[700px] overflow-hidden">
                                <ImageCarousel1 />
                            </div>
                            <div className="flex-1 mt-[30px] p-[10px] max-h-[700px] overflow-hidden">
                                <ImageCarousel2 />
                            </div>
                        </>
                    )}
                </div>

                {/* Text and Search Section */}
                <div className="flex-1 pt-[150px] pr-[30px]">
                    <h1 className="text-[65px] leading-[1.2] mb-[20px]">
                        Book an appointment with{" "}
                        <span className="bg-gradient-to-r from-[#0088ff] to-[#02d5ff] bg-clip-text text-transparent font-bold">
                            lifestyle medicine
                        </span>{" "}
                        experts
                    </h1>
                    <p className="text-[18px] mb-[30px] text-[#555]">
                        Optimize your lifestyle and reverse chronic diseases.
                    </p>

                    {/* Search Bar */}
                    <div className="absolute z-10 mt-[60px] w-[1200px] h-[100px] left-[150px] gap-[10px] bg-white/90 p-[20px] rounded-[10px] shadow-md md:flex hidden">
                        <div className="relative flex items-center flex-1">
                            <IoMdSearch className="absolute left-[15px] text-[18px] text-[#525252] z-[1]" />
                            <input
                                type="text"
                                placeholder="Condition, procedure, speciality..."
                                className="flex-1 p-[10px] border border-[#ccc] rounded-[5px] pl-[45px] h-[60px] relative"
                            />
                        </div>
                        <div className="relative flex items-center flex-1">
                            <MdLocationOn className="absolute left-[15px] text-[18px] text-[#525252] z-[1]" />
                            <input
                                type="text"
                                placeholder="City, state, or zipcode"
                                className="flex-1 p-[10px] border border-[#ccc] rounded-[5px] pl-[45px] h-[60px] relative"
                            />
                        </div>
                        <div className="relative flex items-center flex-1">
                            <BsPostcardHeart className="absolute left-[15px] text-[18px] text-[#525252] z-[1]" />
                            <input
                                type="text"
                                placeholder="Insurance carrier"
                                className="flex-1 p-[10px] border border-[#ccc] rounded-[5px] pl-[45px] h-[60px] relative"
                            />
                        </div>
                        <button className="flex items-center p-[10px_20px] bg-gradient-to-r from-[#007d79] to-[#0063a4] text-white border-none rounded-[5px] cursor-pointer w-[140px] gap-[10px] hover:from-[#0077cc] hover:to-[#0296c0] hover:-translate-y-[2px] transition-all">
                            <IoMdSearch className="text-[18px]" />
                            Find now
                        </button>
                    </div>

                    {/* Mobile Search Bar */}
                    <div className="relative z-10 mt-[20px] w-full h-auto gap-[10px] bg-white p-[20px] rounded-[10px] shadow-md flex flex-col md:hidden">
                        <div className="relative flex items-center flex-1">
                            <IoMdSearch className="absolute left-[15px] text-[18px] text-[#525252] z-[1]" />
                            <input
                                type="text"
                                placeholder="Condition, procedure, speciality..."
                                className="w-full p-[10px] bg-[#f0f0f0] border border-[#ccc] rounded-[5px] pl-[45px] h-[50px] relative"
                            />
                        </div>
                        <div className="relative flex items-center flex-1">
                            <MdLocationOn className="absolute left-[15px] text-[18px] text-[#525252] z-[1]" />
                            <input
                                type="text"
                                placeholder="City, state, or zipcode"
                                className="w-full p-[10px] bg-[#f0f0f0] border border-[#ccc] rounded-[5px] pl-[45px] h-[50px] relative"
                            />
                        </div>
                        <div className="relative flex items-center flex-1">
                            <BsPostcardHeart className="absolute left-[15px] text-[18px] text-[#525252] z-[1]" />
                            <input
                                type="text"
                                placeholder="Insurance carrier"
                                className="w-full p-[10px] bg-[#f0f0f0] border border-[#ccc] rounded-[5px] pl-[45px] h-[50px] relative"
                            />
                        </div>
                        <button className="flex justify-center items-center text-center bg-gradient-to-r from-[#007d79] to-[#0063a4] text-[#e0e0e0] border-none rounded-[5px] cursor-pointer w-full h-[50px] gap-[10px] hover:from-[#0077cc] hover:to-[#0296c0] hover:-translate-y-[2px] transition-all">
                            <IoMdSearch className="text-[18px]" />
                            Find now
                        </button>
                    </div>
                </div>

                {/* Tilted Gradient Rectangle */}
                <div className="absolute top-[700px] left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[356deg] w-[102%] h-[60px] bg-gradient-to-r from-[#ff50a1] to-[#ffb547] z-0 shadow-md md:block hidden"></div>
                <div className="absolute top-[400px] left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[356deg] w-[102%] h-[60px] bg-gradient-to-r from-[#ff50a1] to-[#ffb547] z-0 shadow-md md:hidden block"></div>
            </section>
        </>
    );
};

export default HeroSection;

