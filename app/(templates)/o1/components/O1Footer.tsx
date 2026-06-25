import Link from "next/link";
import Image from "next/image";
import { clientMasterData } from "@/data/master";

const footerLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "Services" },
  { href: "#", label: "About Us" },
  { href: "#", label: "Reviews" },
  { href: "#", label: "Contact" },
];

export default function O1Footer() {
  const location = clientMasterData.locations[0];
  const { trustSignals } = clientMasterData;

  return (
    <footer className="py-16 px-8 lg:px-16 bg-slate-800 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Location NAP */}
          <div>
            <Image
              src="/images/logo-dental.png"
              alt={location.practiceNameGBP}
              width={180}
              height={40}
              className="h-14 w-auto mb-4"
            />
            <address className="not-italic text-gray-300 leading-relaxed">
              <p>{location.addressGBP}</p>
              <p>{location.cityServed}, {location.stateServed}</p>
              <p className="mt-2">
                <a
                  href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-sky-400 transition-colors"
                >
                  {location.phoneGBP}
                </a>
              </p>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-300 hover:text-sky-400 text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4">Office Hours</h4>
            <ul className="text-gray-300 space-y-2">
              {location.hoursOfOperation.map((hours, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span>{hours.dayRange}</span>
                  <span>{hours.structuralHours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Insurance */}
          <div>
            <h4 className="font-semibold mb-4">Insurance & Payment</h4>
            <p className="text-gray-300 leading-relaxed text-sm">
              {trustSignals.insuranceAcceptedText}
            </p>
            {trustSignals.membershipPlanSummary && (
              <p className="text-gray-300 leading-relaxed mt-4 text-sm">
                {trustSignals.membershipPlanSummary}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {location.practiceNameGBP}. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
