"use client";

import Image from "next/image";
import { img } from "@/lib/img";

type Property = {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
};

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl">
      <Image
        src={img(property.imageUrl)}
        width={800}
        height={500}
        alt={property.title}
        className="rounded mb-4 w-full h-48 object-cover"
      />

      <h3 className="font-semibold">{property.title}</h3>

      <p className="text-blue-400">
        ₦{property.price?.toLocaleString()}
      </p>
    </div>
  );
}