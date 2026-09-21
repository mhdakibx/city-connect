
import {Link} from "react-router";
import {
  MapPin,
  FileText,
  ArrowRight,
  ShieldCheck,
  Clock,
} from "lucide-react";

export default function Home() {
  return (
    <div>
      <div
        className="hero min-h-screen bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1625456824839-47810c880c72?w=1200&auto=format&fit=crop&q=80)",
        }}
      >
        {/* Light glass overlay */}
        <div className="hero-overlay bg-white/25"></div>

        <div className="hero-content relative w-full px-5 py-16 text-center">
          <div className="max-w-4xl rounded-3xl border border-white/50 bg-white/55 px-6 py-10 shadow-xl backdrop-blur-md sm:px-10">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-sm font-medium text-primary shadow-sm">
              <MapPin size={17} />
              <span>Building a Better City Together</span>
            </div>

            {/* Heading */}
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
              Report Problems.
              <br />
              <span className="text-primary">Improve Your City.</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base font-medium leading-7 text-gray-700 sm:text-lg">
              CityConnect makes it easy to report city problems, request
              services, and track your complaints. Together, we can make our
              communities cleaner, safer, and better.
            </p>

            {/* Buttons */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">

              <Link to={'/create-complaint'} className="btn btn-primary px-7 text-base font-semibold shadow-lg transition hover:scale-105">
                <FileText size={20} />
                Report a Complaint
                <ArrowRight size={18} />
              </Link>

            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">

              <div className="rounded-xl border border-white/60 bg-white/75 p-5 shadow-md backdrop-blur-sm">
                <div className="mb-2 flex justify-center text-primary">
                  <FileText size={25} />
                </div>

                <h3 className="font-semibold text-gray-900">
                  Easy Reporting
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  Submit complaints in just a few clicks.
                </p>
              </div>

              <div className="rounded-xl border border-white/60 bg-white/75 p-5 shadow-md backdrop-blur-sm">
                <div className="mb-2 flex justify-center text-primary">
                  <Clock size={25} />
                </div>

                <h3 className="font-semibold text-gray-900">
                  Track Progress
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  Stay updated on your complaint status.
                </p>
              </div>

              <div className="rounded-xl border border-white/60 bg-white/75 p-5 shadow-md backdrop-blur-sm">
                <div className="mb-2 flex justify-center text-primary">
                  <ShieldCheck size={25} />
                </div>

                <h3 className="font-semibold text-gray-900">
                  Trusted Service
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  Transparent and organized city services.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}