import Link from "next/link";
import { ArrowLeft, Radar } from "lucide-react";

export default function NotFound() { return <div className="not-found"><Radar size={42} /><span>SIGNAL NOT FOUND</span><h1>This route is outside the radar.</h1><p>The product vision is still available. Return to the main experience or open the structured documentation.</p><div><Link className="primary-button" href="/"><ArrowLeft size={16} />Back to the vision</Link><Link href="/docs">Open documentation</Link></div></div>; }
