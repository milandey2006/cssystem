import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react"; // Using a thematic icon

// Testimonial data array
const testimonials = [
  {
    quote: "Champion Security system is an excellent organisation having in depth and sound knowledge and experience in CCTV network and we at Malkauns CHS are extremely happy with their installation and commissioning of 21 cameras in our premises with 2 in elevator lifts.",
    author: "Chandrashekhar Saple",
    // role: "Small Business Owner"
  },
  {
    quote: "Owner of this store, Mr Rajesh Dey is very genuine. He will guide you as per your requirements. Provide you a quality service at very affordable rates. No cheating at all.. Definitely recommended for video door phone services..",
    author: "Sachin Giri",
    // role: "Homeowner"
  }
];

const Testimonials = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-white">
       <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
                <div className="elfsight-app-13ffe455-64fd-42a5-8966-7153d87beb9a" data-elfsight-app-lazy></div>
    </section>
  );
};

export default Testimonials;