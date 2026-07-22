"use client";

import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="not-found" role="alert">
      <AlertTriangle size={34} aria-hidden="true" />
      <span>VISION EXPERIENCE ERROR</span>
      <h1>This view needs a fresh start.</h1>
      <p>The product vision is still available. Retry this view or return to the main story.</p>
      <div>
        <button className="primary-button" type="button" onClick={reset}><RotateCcw size={17} /> Retry this view</button>
        <Link href="/">Return to the vision</Link>
      </div>
    </section>
  );
}
