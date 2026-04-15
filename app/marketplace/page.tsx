"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { img } from "@/lib/img";

const API = "https://pharmacy-auto-realestate-backend.onrender.com/api";

export default function Marketplace() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch(API + "/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        Marketplace
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-gray-900 p-4 rounded-xl">
            <Image
              src={img(p.imageUrl)}
              width={800}
              height={500}
              alt={p.name}
              className="rounded mb-4 w-full h-48 object-cover"
            />

            <h3 className="font-semibold">{p.name}</h3>

            <p className="text-blue-400">
              ₦{p.price?.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}