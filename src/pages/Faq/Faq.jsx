import React, { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import * as motion from "motion/react-client";
import PageLoading from "../../Hooks/PageLoading";

const Faq = () => {

  useEffect(()=>{document.title = "NexusCore | FaQ"},[])

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer:
        "To enroll in a course, simply click on the 'Enroll' button on the course page. You must be logged in to complete the enrollment.",
    },
    {
      question: "Can I view all the courses I’m enrolled in?",
      answer:
        "Yes, you can view your enrolled courses by navigating to the 'My Courses' section in your dashboard.",
    },
    {
      question: "Can I access the course materials after completion?",
      answer:
        "Yes, once you complete a course, you’ll retain access to the materials for future reference unless stated otherwise.",
    },
    {
      question: "Will I get a certificate after completing a course?",
      answer:
        "Courses that offer certificates will mention it on the course detail page. If available, you’ll receive the certificate upon completion.",
    },
    {
      question: "Can I unenroll from a course after enrolling?",
      answer:
        "Yes, you can unenroll from any course through your dashboard by clicking the 'Unenroll' button next to the course.",
    },
  ];

  return (
   <PageLoading>
     <section className="bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3 text-black">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Here are answers to some common questions about enrolling, accessing
          materials, and certificates.
        </p>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              animate={{ y: [0, -10] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              key={index}
              className="group bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                  {faq.question}
                </h3>
                <ChevronDown className="text-gray-400 group-hover:text-blue-500" />
              </div>
              <p className="mt-2 text-gray-600 leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
   </PageLoading>
  );
};

export default Faq;
