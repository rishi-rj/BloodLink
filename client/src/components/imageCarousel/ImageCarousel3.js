// components/ImageCarousel.js
import React from "react";

const ImageCarousel = () => {
    return (
        <div className="w-[80%] h-[800px] relative">
            <div className="flex flex-col animate-[looping_10s_linear_infinite]">
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image9.jpg" alt="Medical research" />
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image10.jpg" alt="Healthcare facility" />
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image11.jpg" alt="Medical technology" />
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image12.jpg" alt="Patient support" />
                {/* Duplicate images for seamless looping */}
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image9.jpg" alt="Medical research" />
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image10.jpg" alt="Healthcare facility" />
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image11.jpg" alt="Medical technology" />
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image12.jpg" alt="Patient support" />
            </div>
        </div>
    );
};

export default ImageCarousel;