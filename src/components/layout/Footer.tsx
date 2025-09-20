import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-10 pb-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Column 1: Exclusive & Subscribe */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold">Exclusive</h3>
          <h4 className="text-xl">Subscribe</h4>
          <p>Get 10% off your first order</p>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border border-gray-300 rounded-md py-2 px-4 w-full"
            />
            
          </div>
        </div>

        {/* Column 2: Support */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">Support</h3>
          <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>

        {/* Column 3: Account */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">Account</h3>
          <Link href="" >My Account</Link>
          <Link href="/login">Login / Register</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/products">Shop</Link>
        </div>

        {/* Column 4: Quick Link */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">Quick Link</h3>
          <Link href="" >Privacy Policy</Link>
          <Link href="">Terms Of Use</Link>
          <Link href="" >FAQ</Link>
          <Link href="" >Contact</Link>
        </div>

        {/* Column 5: Download App */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">Download App</h3>
          <p className="text-xs text-gray-400">
            Save $3 with App new users only
          </p>
         
          <div className="flex gap-6 mt-4">
            {/* Social Media Icons */}

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-16">
        &copy; Copyright mohamed 2022. All right reserved
      </div>
    </footer>
  );
}
