"use client";

type Property = {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
};

function img(url?: string) {
  if (!url) {
    return "https://via.placeholder.com/600x400";
  }

  return url.replace(
    "/upload/",
    "/upload/w_800,q_auto,f_auto/"
  );
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl">

      <img
        src={img(property.imageUrl)}
        alt={property.title}
        className="rounded mb-4 w-full h-48 object-cover"
        onError={(e: any) => {
          e.target.src = "https://via.placeholder.com/600x400";
        }}
      />

      <h3 className="font-semibold">
        {property.title || "Untitled Property"}
      </h3>

      <p className="text-blue-400">
        ₦{property.price?.toLocaleString() || "0"}
      </p>

    </div>
  );
}