import React, { useEffect } from "react";
import Animation from "../../Hooks/Animation";

const Terms = () => {
    useEffect(()=>{document.title = "NexusCore | Terms & Conditions"
      window.scrollTo(0,0)
    },[])
  return (
    <div className="max-w-[1300px] mx-auto py-12 mb-24 mt-11 min-h-screen">
      <Animation><div data-aos="fade-up">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

        <p className="mb-9 text-gray-500">
          By accessing and using NexUSCore, you accept and agree to be bound by the terms and
          conditions of this agreement. Please read them carefully.
        </p>

        <section className="space-y-6 text-lg">
          <div>
            <h2 className="font-semibold text-xl mb-1">1. Use of Platform</h2>
            <p className="text-gray-500 mb-11">
              NexUSCore grants you a limited, non-exclusive, non-transferable license to access and
              use the platform for educational purposes only.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-1">2. User Responsibilities</h2>
            <p className="text-gray-500 mb-11">
              You are responsible for maintaining the confidentiality of your account and all
              activities under your account. Any misuse of the platform can result in suspension or
              termination.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-1">3. Course Content</h2>
            <p className="text-gray-500 mb-11">
              All course materials are the property of NexUSCore or respective instructors and are
              protected by intellectual property laws.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-1">4. Modifications</h2>
            <p className="text-gray-500 mb-11">
              We reserve the right to update, modify, or remove any part of the platform or its
              terms at any time without prior notice.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-1">5. Account Termination</h2>
            <p className="text-gray-500 mb-11">
              NexUSCore may suspend or terminate accounts found violating policies, misusing the
              platform, or engaging in fraudulent behavior.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-1">6. Content Accuracy</h2>
            <p className="text-gray-500 mb-11">
              While we strive for accuracy, we do not guarantee that all course content or platform
              data is always up-to-date or error-free.
            </p>
          </div>
        </section>

        <p className="text-sm text-gray-500 mt-10">Last updated: July 1, 2025</p>
      </div></Animation>
    </div>
  );
};

export default Terms;
