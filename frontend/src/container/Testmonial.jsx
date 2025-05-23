import { Star } from "lucide-react";
import { PiQuotesFill } from "react-icons/pi";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { client } from "../client";
import { useEffect, useState } from "react";
import { easeIn, motion } from "framer-motion";

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Testmonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const query = `*[_type == "testimonial"]{
        name, rating, designation, profile{asset->{url}}, message
      }`;
      const data = await client.fetch(query);
      setTestimonials(data);
    };

    fetchTestimonials();
  }, []);
  return (
    <motion.section
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: easeIn }}
      viewport={{ once: true }}
      className="mt-32 mx-auto w-full flex justify-center"
    >
      <div className="flex-col w-full max-w-7xl justify-center mx-auto">
        <h2 className="flex flex-col text-center text-3xl font-bold">
          <span className="text-accent text-base">Testmonials</span> What
          clients say about us
        </h2>
        <Carousel
          responsive={responsive}
          showDots={true}
          infinite={true}
          focusOnSelect={true}
          removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
          className="mt-4 py-6"
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className={`flex cursor-pointer relative mx-2 flex-col border py-4 px-6 rounded-md shadow gap-8 mt-16`}
            >
              <div className="flex justify-between gap-4">
                <div className="flex space-x-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="text-accent fill-accent w-5 h-5" />
                  ))}

                  {/* Render unfilled stars */}
                  {[...Array(5 - item.rating)].map((_, i) => (
                    <Star
                      key={i + item.rating}
                      className="text-gray-400 fill-transparent w-5 h-5"
                    />
                  ))}
                </div>

                <div className="bg-accent absolute text-primary -right-2 -top-2 rounded-full p-2 flex items-center justify-center">
                  <PiQuotesFill size={32} />
                </div>
              </div>
              <p className="leading-relaxed font-light text-gray-500 text-sm">
                {item.message}
              </p>
              <div className="flex gap-4 items-center">
                <div className="overflow-hidden rounded-full ring-offset-1 ring ring-accent">
                  <img
                    width={38}
                    src={item.profile.asset.url}
                    className="object-cover"
                    alt="default"
                  />
                </div>
                <p className="text-base font-bold flex flex-col">
                  {item.name}{" "}
                  <span className="text-gray-500 text-sm font-normal">
                    {item.designation}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </motion.section>
  );
};

export default Testmonial;
