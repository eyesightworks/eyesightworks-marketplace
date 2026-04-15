"use client";

import { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";

const API = "https://pharmacy-auto-realestate-backend.onrender.com/api";

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadAssets() {
    try {
      const [propRes, vehRes, prodRes] = await Promise.all([
        fetch(API + "/properties"),
        fetch(API + "/vehicles"),
        fetch(API + "/products"),
      ]);

      const props = await propRes.json();
      const veh = await vehRes.json();
      const prod = await prodRes.json();

      setProperties(props);
      setVehicles(veh);
      setProducts(prod);
    } catch (err) {
      console.log("Error loading assets", err);
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
          <a href="/">Home</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/marketplace">Marketplace</a>
        </nav>
      </header>

      {/* PROPERTIES */}
      <section className="max-w-6xl mx-auto p-10">
        <h2 className="text-2xl font-semibold mb-6">
          Residential & Commercial Portfolio
        </h2>

        {loading && <p>Loading...</p>}

        <div className="grid md:grid-cols-3 gap-6">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

    </main>
  );
}