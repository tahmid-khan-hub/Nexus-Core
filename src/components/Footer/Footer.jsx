import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#afd1f3] text-black py-8 border-t border-gray-400 mt-10">
      <div className="max-w-[1300px] mx-auto px-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">
              <span>N</span>ex<span className="text-blue-600">US</span>Core
            </h2>
          </div>

          {/* Center Info */}
          <div className="text-center text-sm text-black mb-6 md:mb-0">
            <p><span className="font-semibold">Contact</span>: NexUSCore@gmail.com</p>
            <p><span className="font-semibold">Phone</span>: +880 123 456 7890</p>
            <div className="flex justify-center gap-6 mt-3">
              <a href="/about" className="hover:underline">About</a>
              <a href="/faq" className="hover:underline">FAQ</a>
              <a href="/terms" className="hover:underline">Terms & Conditions</a>
              <a href="/privacy" className="hover:underline">Privacy Policy</a>
            </div>
            <p className="mt-6 text-gray-700">
              © {new Date().getFullYear()} NexUSCore. All rights reserved.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 text-gray-700">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-black">
              <FaFacebookF size={18} />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-black">
              <FaTwitter size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black">
              <FaInstagram size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-black">
              <FaGithub size={18} />
            </a>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
