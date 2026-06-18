import Link from "next/link";
import { clientMasterData } from "@/data/master";

const footerLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "Services" },
  { href: "#", label: "First Visit" },
  { href: "#", label: "About Us" },
  { href: "#", label: "Contact" },
];

export default function T3Footer() {
  const location = clientMasterData.locations[0];
  const { trustSignals } = clientMasterData;

  return (
    <footer className="py-16 px-8 bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Practice Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{location.practiceNameGBP}</h3>
            <address className="not-italic text-gray-300 leading-relaxed">
              <p>{location.addressGBP}</p>
              <p>{location.cityServed}, {location.stateServed}</p>
              <p className="mt-2">
                <a href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`} className="hover:text-brand-accent transition-colors">
                  {location.phoneGBP}
                </a>
              </p>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-300 hover:text-brand-accent text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-white mb-4">Office Hours</h4>
            <ul className="text-gray-300 space-y-2">
              {location.hoursOfOperation.map((h, i) => (
                <li key={i} className="flex justify-between text-sm gap-4">
                  <span>{h.dayRange}</span>
                  <span>{h.structuralHours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Insurance */}
          <div>
            <h4 className="font-semibold text-white mb-4">Insurance</h4>
            <p className="text-gray-300 text-sm">{trustSignals.insuranceAcceptedText}</p>
            {clientMasterData.onlineBookingUrl !== "none" && (
              <a
                href={clientMasterData.onlineBookingUrl}
                className="inline-block mt-4 px-5 py-2.5 rounded-full bg-brand-primary text-white font-semibold text-sm hover:shadow-lg transition-all"
              >
                Schedule a Visit
              </a>
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
