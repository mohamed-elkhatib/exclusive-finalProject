import React from "react";

export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <div className="section-title mb-14">
        <h2 className="text-[#DB4444] font-semibold mb-5 relative ps-9">{title}</h2>
        <span className="font-semibold text-4xl mb-">{subtitle}</span>
      </div>
    </>
  );
}
