import Link from "next/link";
import Image from "next/image";
import { clientMasterDataOrtho } from "@/data/master-ortho";

const footerLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "Treatments" },
  { href: "#", label: "First Visit" },
  { href: "#", label: "About Us" },
  { href: "#", label: "Contact" },
];

export default function T3OrthoFooter() {
  const location = clientMasterDataOrtho.locations[0];
  const { trustSignals } = clientMasterDataOrtho;

  return (
    <footer className="py-16 px-8 bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Practice Info */}
          <div>
            <Image
              src="/images/logo-ortho.png"
              alt={location.practiceNameGBP}
              width={180}
              height={40}
              className="h-10 w-auto mb-4"
            />
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
            <h4 className="font-semibold text-white mb-4">Insurance & Financing</h4>
            <p className="text-gray-300 text-sm">{trustSignals.insuranceAcceptedText}</p>
            {clientMasterDataOrtho.onlineBookingUrl !== "none" && (
              <a
                href={clientMasterDataOrtho.onlineBookingUrl}
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
