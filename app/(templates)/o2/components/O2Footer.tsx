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

export default function O2Footer() {
  const location = clientMasterData.locations[0];
  const { trustSignals } = clientMasterData;

  return (
    <footer className="py-16 px-8 bg-zinc-900 border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Image
              src="/images/logo-dental.png"
              alt={location.practiceNameGBP}
              width={180}
              height={40}
              className="h-14 w-auto invert mb-6"
            />
            <address className="not-italic text-white/50 leading-relaxed text-sm">
              <p>{location.addressGBP}</p>
              <p>{location.cityServed}, {location.stateServed}</p>
              <p className="mt-3">
                <a href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`} className="text-brand-primary hover:text-brand-primary/80 transition-colors font-medium">
                  {location.phoneGBP}
                </a>
              </p>
            </address>
            <div className="flex gap-4 mt-6">
              {footerLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-white/40 hover:text-brand-primary text-sm transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Hours Column */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide">Office Hours</h4>
            <ul className="text-white/50 text-sm space-y-2">
              {location.hoursOfOperation.map((h, i) => (
                <li key={i} className="flex justify-between">
                  <span>{h.dayRange}</span>
                  <span className="text-white/70">{h.structuralHours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Insurance & CTA Column */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide">Insurance</h4>
            <p className="text-white/50 text-sm leading-relaxed">{trustSignals.insuranceAcceptedText}</p>
            <a
              href={clientMasterData.onlineBookingUrl}
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:bg-brand-primary/90 transition-all"
            >
              Book Online
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} {location.practiceNameGBP}. All rights reserved.
          </p>
          <div className="flex gap-6 text-white/30 text-sm">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
