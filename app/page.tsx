"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";

const API = "https://pharmacy-auto-realestate-backend.onrender.com/api";

type Property = {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
};

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadAssets() {
    try {
      const res = await fetch(API + "/properties");

      if (!res.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await res.json();
      setProperties(data);

    } catch (err) {
      console.log("Error loading properties", err);
      setProperties([]); // ✅ prevent crash
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAssets();
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* HEADER */}
      <header className="flex justify-between items-center p-6 border-b border-gray-800">
        <h1 className="font-bold text-lg">
          Eyesightworks Infrastructure
        </h1>

        <nav className="flex gap-6 text-gray-400">
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/marketplace">Marketplace</Link>
        </nav>
      </header>

      {/* PROPERTIES */}
      <section className="max-w-6xl mx-auto p-10">
        <h2 className="text-2xl font-semibold mb-6">
          Residential & Commercial Portfolio
        </h2>

        {loading && <p>Loading properties...</p>}

        {!loading && properties.length === 0 && (
          <p>Unable to load assets. Please try again later.</p>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

    </main>
  );
}