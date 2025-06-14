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
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Headings */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Trusted by Businesses & Homeowners
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
            See what our customers have to say about our security solutions
          </p>
        </div>

        {/* Testimonials Grid */}
        {/* This grid is responsive: 1 column on small screens, 2 on medium screens and up */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                      <ShieldCheck className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                  
                  {/* Quote and Author */}
                  <div>
                    <blockquote className="text-lg text-gray-700 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <footer className="mt-4 text-sm text-gray-600">
                      - <span className="font-semibold">{testimonial.author}</span> {testimonial.role}
                    </footer>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;