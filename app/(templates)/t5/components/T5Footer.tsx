import Link from "next/link";
import Image from "next/image";
import { clientMasterData } from "@/data/master";

const footerLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "Philosophy" },
  { href: "#", label: "Services" },
  { href: "#", label: "Your Provider" },
  { href: "#", label: "Contact" },
];

export default function T5Footer() {
  const location = clientMasterData.locations[0];
  const { trustSignals } = clientMasterData;

  return (
    <footer className="py-16 px-8 bg-brand-canvas border-t border-neutral-border">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact */}
          <div>
            <Image
              src="/images/logo-dental.png"
              alt={location.practiceNameGBP}
              width={180}
              height={40}
              className="h-14 w-auto mb-6 invert"
            />
            <address className="not-italic text-neutral-muted leading-relaxed space-y-1 text-sm">
              <p>{location.addressGBP}</p>
              <p>{location.cityServed}, {location.stateServed}</p>
            </address>
            <p className="mt-4">
              <a
                href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="text-brand-primary hover:underline text-sm"
              >
                {location.phoneGBP}
              </a>
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-medium text-brand-mainText mb-6">Hours</h4>
            <ul className="text-neutral-muted space-y-2">
              {location.hoursOfOperation.map((h, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span>{h.dayRange}</span>
                  <span>{h.structuralHours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-medium text-brand-mainText mb-6">Navigate</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-neutral-muted hover:text-brand-primary text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Insurance Note */}
        <div className="mt-12 pt-8 border-t border-neutral-border">
          <p className="text-sm text-neutral-muted">
            {trustSignals.insuranceAcceptedText}
          </p>
          {trustSignals.membershipPlanSummary && (
            <p className="text-sm text-neutral-muted mt-2">
              {trustSignals.membershipPlanSummary}
            </p>
          )}
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-muted/60 text-xs">
            © {new Date().getFullYear()} {location.practiceNameGBP}
          </p>
          <div className="flex gap-6 text-neutral-muted/60 text-xs">
            <a href="#" className="hover:text-brand-mainText transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-mainText transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
