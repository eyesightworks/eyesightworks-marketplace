"use client"

import { useEffect, useState } from "react"

const API = process.env.NEXT_PUBLIC_API_URL

export default function Home() {

  const [properties,setProperties] = useState<any[]>([])
  const [vehicles,setVehicles] = useState<any[]>([])
  const [products,setProducts] = useState<any[]>([])

  const [loading,setLoading] = useState(true)

  async function loadAssets(){

    try{

      const propRes = await fetch(API + "/properties")
      const vehRes = await fetch(API + "/vehicles")
      const prodRes = await fetch(API + "/products")

      // Error handling
      if(!propRes.ok) throw new Error("Failed to load properties")
      if(!vehRes.ok) throw new Error("Failed to load vehicles")
      if(!prodRes.ok) throw new Error("Failed to load products")

      const props = await propRes.json()
      const veh = await vehRes.json()
      const prod = await prodRes.json()

      setProperties(props)
      setVehicles(veh)
      setProducts(prod)

    }catch(err){

      console.error("Error loading assets:",err)

    }finally{

      setLoading(false)

    }

  }

  useEffect(()=>{
    loadAssets()
  },[])

  // Cloudinary optimization
  function img(url:string){

    if(!url){
      return "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    }

    return url.replace(
      "/upload/",
      "/upload/w_800,q_auto,f_auto/"
    )
  }

  return (

<main className="min-h-screen bg-gray-950 text-white">

<header className="flex justify-between items-center p-6 border-b border-gray-800">

<h1 className="font-bold text-lg">
Eyesightworks Infrastructure
</h1>

<nav className="flex gap-6 text-gray-400">

<a href="/portfolio" className="hover:text-white">
Portfolio
</a>

<a href="/marketplace" className="hover:text-white">
Marketplace
</a>

<a href="/enterprise" className="hover:text-white">
Enterprise
</a>

<a
href="https://frontend-eight-mocha-89.vercel.app/"
target="_blank"
className="hover:text-white"
>
Admin
</a>

</nav>

</header>


<section className="max-w-5xl mx-auto p-10">

<h1 className="text-4xl font-bold mb-6">
Multi-domain Real Estate Asset Management Infrastructure
</h1>

<p className="text-gray-400 mb-10">
Enterprise platform managing residential properties,
commercial real estate, logistics fleets and
income-generating infrastructure within a unified
digital ecosystem.
</p>

<div className="flex gap-10 text-center">

<div>
<h3 className="text-2xl font-bold text-white">
₦12B+
</h3>
<p className="text-gray-500">
Assets Managed
</p>
</div>

<div>
<h3 className="text-2xl font-bold text-white">
250+
</h3>
<p className="text-gray-500">
Active Listings
</p>
</div>

<div>
<h3 className="text-2xl font-bold text-white">
98%
</h3>
<p className="text-gray-500">
Occupancy Rate
</p>
</div>

</div>

</section>


<section className="max-w-6xl mx-auto p-10">

<h2 className="text-2xl font-semibold mb-6">
Residential & Commercial Portfolio
</h2>

{loading && <p className="text-gray-500">Loading properties...</p>}

<div className="grid md:grid-cols-3 gap-6">

{properties.map((p:any)=>(

<div key={p.id} className="bg-gray-900 p-4 rounded-xl">

<img
src={img(p.imageUrl)}
className="rounded mb-4 w-full h-48 object-cover"
/>

<h3 className="font-semibold mb-1">
{p.title}
</h3>

<p className="text-blue-400">
₦{p.price}
</p>

</div>

))}

</div>

</section>


<section className="max-w-6xl mx-auto p-10">

<h2 className="text-2xl font-semibold mb-6">
Fleet & Operational Infrastructure
</h2>

<div className="grid md:grid-cols-3 gap-6">

{vehicles.map((v:any)=>(

<div key={v.id} className="bg-gray-900 p-4 rounded-xl">

<img
src={img(v.imageUrl)}
className="rounded mb-4 w-full h-48 object-cover"
/>

<h3 className="font-semibold mb-1">
{v.brand}
</h3>

<p className="text-blue-400">
₦{v.price}
</p>

</div>

))}

</div>

</section>


<section className="max-w-6xl mx-auto p-10">

<h2 className="text-2xl font-semibold mb-6">
Income-Generating Facilities
</h2>

<div className="grid md:grid-cols-3 gap-6">

{products.map((p:any)=>(

<div key={p.id} className="bg-gray-900 p-4 rounded-xl">

<img
src={img(p.imageUrl)}
className="rounded mb-4 w-full h-48 object-cover"
/>

<h3 className="font-semibold mb-1">
{p.name}
</h3>

<p className="text-blue-400">
₦{p.price}
</p>

</div>

))}

</div>

</section>


<footer className="text-center text-gray-500 p-10 border-t border-gray-800">

© 2026 Eyesightworks — Multi-domain Real Estate Infrastructure Platform

</footer>

</main>

  )
}