
import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  Globe,
} from "lucide-react";
import { Link, Links } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-content flex items-center justify-center font-bold text-lg">
                C
              </div>

              <h2 className="text-2xl font-bold">
                City<span className="text-primary">Connect</span>
              </h2>
            </div>

            <p className="text-base-content/70 leading-7 max-w-sm">
              A simple and transparent platform for reporting city problems
              and connecting citizens with local services.
            </p>

            <div className="flex gap-3 mt-6">
              <Link
                to={'/signup'}
                className="btn btn-sm btn-outline btn-primary gap-2"
              >
                <Globe size={16} />
                Connect
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-base-content/70">
              <li>
                <Link className="hover:text-primary transition"
                 to={'/'}>Home</Link>
              </li>

              <li>
                <Link className="hover:text-primary transition" to={"/my-complaints"}>My Complaints</Link>
              </li>

              <li>
                <Link className="hover:text-primary transition" to={'/create-complaint'}>
                Create Complaint
                </Link>
              </li>

              <li>
                <Link className="hover:text-primary transition" to={"/profile"}>profile</Link>
              </li>
            </ul>
          </div>

          {/* City Services */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              City Services
            </h3>

            <ul className="space-y-3 text-base-content/70">
              <li className="flex items-center gap-2">
                <ArrowUpRight size={15} />
                Road & Traffic
              </li>

              <li className="flex items-center gap-2">
                <ArrowUpRight size={15} />
                Waste Management
              </li>

              <li className="flex items-center gap-2">
                <ArrowUpRight size={15} />
                Water & Drainage
              </li>

              <li className="flex items-center gap-2">
                <ArrowUpRight size={15} />
                Public Safety
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Get in Touch
            </h3>

            <div className="space-y-4 text-base-content/70">

              <div className="flex items-start gap-3">
                <MapPin
                  size={19}
                  className="text-primary mt-1 shrink-0"
                />

                <span>
                  Chittagong, Bangladesh
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={19}
                  className="text-primary shrink-0"
                />

                <span className="break-all">
                  support@cityconnect.com
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={19}
                  className="text-primary shrink-0"
                />

                <span>
                  +880 1234-567890
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-base-300 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-base-content/60">

          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} CityConnect. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="#"
              className="hover:text-primary transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="hover:text-primary transition"
            >
              Terms of Service
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

