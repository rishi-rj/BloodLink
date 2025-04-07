// components/ImageCarousel.js
import React from "react";

const ImageCarousel = () => {
    return (
        <div className="w-[80%] h-[800px] relative">
            <div className="flex flex-col animate-[looping_30s_linear_infinite]">
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image1.jpg" alt="Blood donation" />
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image2.jpg" alt="Medical staff" />
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image3.jpg" alt="Hospital" />
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image4.jpg" alt="Healthcare" />
                {/* Duplicate images for seamless looping */}
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image1.jpg" alt="Blood donation" />
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image2.jpg" alt="Medical staff" />
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image3.jpg" alt="Hospital" />
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image4.jpg" alt="Healthcare" />
            </div>
        </div>
    );
};

export default ImageCarousel;