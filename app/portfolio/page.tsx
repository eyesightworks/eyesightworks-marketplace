"use client";

import { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";

const API = "https://pharmacy-auto-realestate-backend.onrender.com/api";

export default function Portfolio() {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    fetch(API + "/properties")
      .then(res => res.json())
      .then(setProperties);
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        Portfolio
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </main>
  );
}