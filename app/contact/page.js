"use client";
import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa"; // Uncomment if you want to use icons
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

const page = () => {
  const contactCards = [
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      content: [
        "6/338 Andheri Subway",
        "Andheri West, Mumbai 400058",
        "Maharashtra, India",
      ],
    },
    {
      icon: FaPhone,
      title: "Call Us",
      content: [
        "Sales: +91 8080806288",
        "Support: +91 8080808109",
        "Landline: 022-31476838",
      ],
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      content: [
        // "Sales: sales@securevision.com",
        "Support: cctvservices@gmail.com",
        "Info: info@championsecuritysystem.com",
      ],
    },
    {
      icon: FaClock,
      title: "Business Hours",
      content: [
        "Monday-Friday: 10am-7pm",
        "Saturday: 10am-2pm",
        "Sunday: Closed",
      ],
    },
  ];

  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqData = [
    {
      question: "How quickly can you install a security system?",
      answer:
        "For standard residential installations, we can typically complete the job within 1-2 business days after your consultation. Commercial installations may take 2-5 days depending on the complexity and size of the system.",
    },
    {
      question: "Do you offer emergency service calls?",
      answer:
        "Yes, we provide 24/7 emergency service for our maintenance plan customers. For non-plan customers, emergency services are available at an additional fee.",
    },
    {
      question: "What areas do you service?",
      answer:
        "We currently service the greater metropolitan area and surrounding suburbs within a 50-mile radius of our main office. For locations outside this area, please contact us for special arrangements.",
    },
    {
      question: "Do you offer free consultations?",
      answer:
        "Yes, we offer free on-site security consultations for both residential and commercial properties. Our security experts will assess your needs and provide recommendations tailored to your specific situation.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, checks, and electronic bank transfers. We also offer financing options for larger installations with approved credit.",
    },
    {
      question: "Do your systems require a monthly subscription?",
      answer:
        "While our basic systems function without a subscription, we offer optional monitoring and cloud storage plans that require a monthly fee. These services provide enhanced security features and peace of mind.",
    },
  ];

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue, watch } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        alert("Form submitted successfully!");
        reset();
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Have questions or need a quote? Our team is here to help with all
            your security needs.
          </p>
          <div className="flex justify-center gap-4"></div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-6 flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-4">
                      <IconComponent className="h-6 w-6 text-[#101828]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                    <div className="text-sm text-gray-500 space-y-1">
                      {card.content.map((line, lineIndex) => (
                        <p key={lineIndex}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full min-h-screen flex items-center justify-center py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* LEFT FORM */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter">
                  Contact Us
                </h2>
                <p className="text-gray-500 mt-2">
                  Fill out the form below and one of our security experts will
                  get back to you as soon as possible.
                </p>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                      id="first-name"
                      {...register("firstName")}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input
                      id="last-name"
                      {...register("lastName")}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    {...register("email")}
                    type="email"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="(555) 123-4567"
                    type="tel"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inquiryType">Inquiry Type</Label>
                  <Select onValueChange={(val) => setValue("inquiryType", val)}>
                    <SelectTrigger id="inquiryType">
                      <SelectValue placeholder="Select an inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="installation">
                        Installation Services
                      </SelectItem>
                      <SelectItem value="quote">Request a Quote</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Please provide details about your inquiry..."
                    className="min-h-[150px]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Submit"}
                </Button>
              </form>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter">
                  Our Locations
                </h2>
                <p className="text-gray-500 mt-2">
                  Visit one of our showrooms to see our products in action and
                  speak with our security experts.
                </p>
              </div>
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d396.2326147966675!2d72.84663797966506!3d19.12426868836465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce22f2c547b5%3A0x8cbc117b429754f9!2sChampion%20Security%20System%2C%20Honeywell%2C%20Matrix%2C%20Panasonic%20CCTV%20Camera%20%26%20VDP%20Installation%20and%20services%20in%20mumbai%20And%20Local%20Area!5e0!3m2!1sen!2sin!4v1749404213115!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Why Choose Champion Security System?</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-start gap-2">
                    {/* <CheckCircle className="h-5 w-5 text-primary mt-0.5" /> */}
                    Expert consultation tailored to your specific security needs
                  </div>
                  <div className="flex items-start gap-2">
                    {/* <CheckCircle className="h-5 w-5 text-primary mt-0.5" /> */}
                    Professional installation by certified technicians
                  </div>
                  <div className="flex items-start gap-2">
                    {/* <CheckCircle className="h-5 w-5 text-primary mt-0.5" /> */}
                    Ongoing support and maintenance services
                  </div>
                  <div className="flex items-start gap-2">
                    {/* <CheckCircle className="h-5 w-5 text-primary mt-0.5" /> */}
                    Competitive pricing with flexible payment options
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our products and
              services
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openItems[index] ? (
                      <FaChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <FaChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>

                {openItems[index] && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          {/* <div className="text-center mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Our security experts are here to help. Contact us for personalized assistance.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium">
            Contact Us Today
          </button>
        </div> */}
        </div>
      </section>
    </div>
  );
};

export default page;
