"use client";
import React, { useState, useEffect } from "react";
import ImageCarousel1 from "../components/imageCarousel/ImageCarousel1";
import ImageCarousel2 from "../components/imageCarousel/ImageCarousel2";
import ImageCarousel3 from "../components/imageCarousel/ImageCarousel2";
import { BsPostcardHeart } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import Ribbons from '../components/animations/Ribbons';
import DecryptedText from "../components/animations/DecryptedText";
import { Link } from "react-router-dom";

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
        <div className="relative min-h-screen">
            {/* Ribbon Background */}
            <div className="fixed inset-0 -z-10">
                <Ribbons
                    baseThickness={30}
                    colors={['#ff0000', '#ff4d4d']}
                    speedMultiplier={0.5}
                    maxAge={500}
                    enableFade={true}
                    enableShaderEffect={true}
                    backgroundColor={[0, 0, 0, 0]}
                />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <section className="flex bg-[#f9f9f9]/80 relative overflow-hidden pb-[60px] md:flex-row flex-col">
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
                        <DecryptedText
                                text="Connecting"
                                animateOn="view"
                                revealDirection="center"
                                speed={100}
                                maxIterations={10}
                                className="text-[#555]"
                                encryptedClassName="text-gray-400"
                            />{" "}
                            <span className="bg-gradient-to-r from-[#ff0000] to-[#ff4d4d] bg-clip-text text-transparent font-bold">
                            <DecryptedText
                                text="Donors"
                                animateOn="view"
                                revealDirection="center"
                                speed={100}
                                maxIterations={10}
                                encryptedClassName="text-gray-400"
                            />  <br/>
                            </span>{" "}
                            <DecryptedText
                                text="with those in need"
                                animateOn="view"
                                revealDirection="center"
                                speed={100}
                                maxIterations={10}
                                className="text-[#555]"
                                encryptedClassName="text-gray-400"
                            />
                        </h1>
                        <div className="text-[18px] mb-[30px] text-[#555]">
                            <DecryptedText 
                                text="Join our mission to save lives through efficient blood donation and management"
                                animateOn="view"
                                revealDirection="center"
                                speed={100}
                                maxIterations={10}
                                className="text-[#555]"
                                encryptedClassName="text-gray-400"
                            />
                        </div>

                        {/* Search Bar */}
                        <div className="absolute z-10 mt-[60px] w-[1200px] h-[100px] left-[150px] gap-[10px] bg-white/90 p-[20px] rounded-[10px] shadow-md md:flex hidden">
                            <div className="relative flex items-center flex-1">
                                <IoMdSearch className="absolute left-[15px] text-[18px] text-[#525252] z-[1]" />
                                <input
                                    type="text"
                                    placeholder="Blood Type"
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
                                <select
                                    className="flex-1 p-[10px] border border-[#ccc] rounded-[5px] pl-[45px] h-[60px] relative appearance-none bg-white cursor-pointer"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Donor or Receiver</option>
                                    <option value="donor">I am a Donor</option>
                                    <option value="recipient">I am a Recipient</option>
                                </select>
                                <div className="absolute right-[15px] pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            <Link to="/login" className="h-full items-center flex hover:scale-105">
                                <button className="flex items-center p-[10px_20px] bg-gradient-to-r from-[#ff0000] to-[#ff4d4d] text-white border-none rounded-[5px] cursor-pointer w-[140px] gap-[10px] hover:from-[#ff3333] hover:to-[#ff6666] hover:-translate-y-[2px] transition-all">
                                    <IoMdSearch className="text-[18px]" />
                                    Find now
                                </button>
                            </Link>
                        </div>

                        {/* Mobile Search Bar */}
                        <div className="relative z-10 mt-[20px] w-full h-auto gap-[10px] bg-white p-[20px] rounded-[10px] shadow-md flex flex-col md:hidden">
                            <div className="relative flex items-center flex-1">
                                <IoMdSearch className="absolute left-[15px] text-[18px] text-[#525252] z-[1]" />
                                <input
                                    type="text"
                                    placeholder="Blood Type"
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
                                <select
                                    className="w-full p-[10px] bg-[#f0f0f0] border border-[#ccc] rounded-[5px] pl-[45px] h-[50px] relative appearance-none cursor-pointer"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Donor or Receiver</option>
                                    <option value="donor">I am a Donor</option>
                                    <option value="recipient">I am a Recipient</option>
                                </select>
                                <div className="absolute right-[15px] pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
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
            </div>
        </div>
    );
};

export default HeroSection;

