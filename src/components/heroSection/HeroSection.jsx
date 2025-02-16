import React from "react";
import { Typewriter } from "react-simple-typewriter";
import CraftoLogo from "../../components/assets/biglogo3.jpg";
const HeroSection = () => {
  return (
    <div className="h-[25vh] md:h-[30vh] lg:h-[30vh] bg-orange-100 text-white flex flex-col justify-center items-center">
      <div className="text-orange-900 ">
        <img
          src={CraftoLogo}
          alt=""
          className="h-[50px] md:h-[100px] lg:h-[100px]"
          // style={{
          //   mixBlendMode: "multiply",
          // }}
        />
      </div>

      
      <div className="flex flex-col justify-center items-center lg:w-[40%] w-[85%]">
        <p className="lg:text-xl text-center text-black">
          Find the <span className="text-orange-900 font-bold">best deals</span> on the hottest trends in{' '}
          <span className="text-orange-900 font-bold">
            <Typewriter
              words={["fashion", "electronics", "home decor", "more"]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
          . Shop now and enjoy exclusive <span className="text-orange-900 font-bold">discounts</span> tailored just for you!
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
