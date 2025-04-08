import React from "react";

const ImageCarousel = () => {
    return (
        <div className="w-[80%] h-[800px] relative">
            <div className="flex flex-col animate-[looping-reverse_10s_linear_infinite]">
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image5.jpg" alt="Medical equipment" />
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image6.jpg" alt="Doctor consultation" />
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image7.jpg" alt="Patient care" />
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image8.jpg" alt="Healthcare team" />
                {/* Duplicate images for seamless looping */}
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image5.jpg" alt="Medical equipment" />
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image6.jpg" alt="Doctor consultation" />
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image7.jpg" alt="Patient care" />
                <img className="w-full h-full object-cover m-5 rounded-[30px]" src="/imagecarousel/image8.jpg" alt="Healthcare team" />
            </div>
        </div>
    );
};

export default ImageCarousel;