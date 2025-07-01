import React, { useEffect } from "react";

const Privacy = () => {
  useEffect(()=>{document.title = "NexusCore | Privacy & Policy"},[])
  return (
    <div className=" px-4 py-12 mb-24">
      <div className="">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-9 text-gray-500">
          Your privacy is important to us. This policy outlines how NexUSCore collects, uses, and
          protects your personal data.
        </p>

        <section className="space-y-6 text-lg">
          <div>
            <h2 className="font-semibold text-xl mb-1">1. Information We Collect</h2>
            <p className="text-gray-500 mb-11">
              We collect user information such as your name, email address, enrolled courses,
              activity logs, and preferences.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-1">2. How We Use Information</h2>
            <p className="text-gray-500 mb-11">
              Your data is used to personalize your learning experience, provide support, and
              improve the platform’s functionality.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-1">3. Data Security</h2>
            <p className="text-gray-500 mb-11">
              We use encryption, access controls, and secure servers to ensure your data is safe and
              protected from unauthorized access.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-1">4. Authentication & Tokens</h2>
            <p className="text-gray-500 mb-11">
              NexUSCore uses secure tokens (e.g., firebase accessToken) to verify your identity and maintain session
              security. Tokens are stored securely and expire automatically.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-1">5. Third-Party Tools</h2>
            <p className="text-gray-500 mb-11">
              We may use trusted third-party tools (e.g., analytics or email services), but we do
              not sell or rent your personal data.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-1">6. Data Retention</h2>
            <p className="text-gray-500 mb-11">
              We retain your information only for as long as necessary to fulfill our service
              obligations and comply with legal requirements.
            </p>
          </div>
        </section>

        <p className="text-sm text-gray-500 mt-10">Last updated: July 1, 2025</p>
      </div>
    </div>
  );
};

export default Privacy;
