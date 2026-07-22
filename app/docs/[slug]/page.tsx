import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShell } from "@/components/docs/DocsExperience";
import { docs, getDoc } from "@/content/docs";

export function generateStaticParams() { return docs.map((doc) => ({ slug: doc.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const doc = getDoc(slug);
  return doc ? { title: `${doc.title} | Hanaply Docs`, description: doc.summary, alternates: { canonical: `/docs/${doc.slug}` } } : {};
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const doc = getDoc(slug); if (!doc) notFound(); return <DocsShell doc={doc} />;
}
