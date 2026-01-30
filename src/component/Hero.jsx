import React from 'react';
import img from '../assets/img1.jpg'

const Hero = () => {
    return (
      <div className='pt-20'>
        <section className="grid md:grid-cols-2 grid-cols-1 ">
          <div className="flex-1">
            {/* left side  */}
            <h1 className="lg:text-5xl text-2xl font-bold  leading-10 md:leading-20">
              Manage Your Mess Meals{" "}
              <span className="text-primary">with Zero Stress</span>
            </h1>
            <p className='text-base-400'>
              Track daily meals, marketing costs, and member reports—all in one
              place.
            </p>
            <button className='bg-secondary btn text-white my-5 hover:bg-pink-300 '>Explore Now</button>
          </div>
          <div className="flex-1">{/* Right side  */}
            <img src={img} alt="image is coming " />
          </div>
        </section>
      </div>
    );
};

export default Hero;