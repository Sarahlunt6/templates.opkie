import Link from "next/link";
import Image from "next/image";
import { clientMasterData } from "@/data/master";

const footerLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "Technology" },
  { href: "#", label: "Services" },
  { href: "#", label: "About" },
  { href: "#", label: "Contact" },
];

export default function T2Footer() {
  const location = clientMasterData.locations[0];
  const { trustSignals } = clientMasterData;

  return (
    <footer className="py-12 px-8 bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
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
                <a href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`} className="hover:text-brand-accent transition-colors">
                  {location.phoneGBP}
                </a>
              </p>
            </address>
            <div className="flex gap-3 mt-4">
              {footerLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-gray-400 hover:text-brand-accent text-sm transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Hours</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              {location.hoursOfOperation.map((h, i) => (
                <li key={i}>{h.dayRange}: {h.structuralHours}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Insurance</h4>
            <p className="text-gray-300 text-sm">{trustSignals.insuranceAcceptedText}</p>
            <a
              href={clientMasterData.onlineBookingUrl}
              className="inline-block mt-4 px-5 py-2.5 rounded-lg bg-brand-primary text-white font-semibold text-sm hover:brightness-110 transition-all"
            >
              Book Online
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {location.practiceNameGBP}. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
