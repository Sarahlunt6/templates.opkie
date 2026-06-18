import Link from "next/link";
import { clientMasterData } from "@/data/master";

const footerLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "Services" },
  { href: "#", label: "About Us" },
  { href: "#", label: "Reviews" },
  { href: "#", label: "Contact" },
];

export default function T1Footer() {
  const location = clientMasterData.locations[0];
  const { trustSignals } = clientMasterData;

  return (
    <footer className="py-16 px-8 lg:px-16 bg-brand-mainText text-brand-canvas">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Location NAP */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-serif">{location.practiceNameGBP}</h3>
            <address className="not-italic text-brand-canvas/80 leading-relaxed">
              <p>{location.addressGBP}</p>
              <p>{location.cityServed}, {location.stateServed}</p>
              <p className="mt-2">
                <a
                  href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-brand-accent transition-colors"
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
                  <a href={link.href} className="text-brand-canvas/70 hover:text-brand-accent text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4">Office Hours</h4>
            <ul className="text-brand-canvas/80 space-y-2">
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
            <p className="text-brand-canvas/80 leading-relaxed text-sm">
              {trustSignals.insuranceAcceptedText}
            </p>
            {trustSignals.membershipPlanSummary && (
              <p className="text-brand-canvas/80 leading-relaxed mt-4 text-sm">
                {trustSignals.membershipPlanSummary}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-brand-canvas/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-canvas/50 text-sm">
            © {new Date().getFullYear()} {location.practiceNameGBP}. All rights reserved.
          </p>
          <div className="flex gap-6 text-brand-canvas/50 text-sm">
            <a href="#" className="hover:text-brand-canvas transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-canvas transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
