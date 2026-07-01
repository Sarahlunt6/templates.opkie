"use client";

interface GoogleMapEmbedProps {
  mapUrl: string;
  practiceName: string;
  className?: string;
}

export function GoogleMapEmbed({ mapUrl, practiceName, className = "" }: GoogleMapEmbedProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map to ${practiceName}`}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
