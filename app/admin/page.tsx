"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const API = "https://pharmacy-auto-realestate-backend.onrender.com/api"

export default function AdminDashboard(){

const [properties,setProperties] = useState<any[]>([])
const [vehicles,setVehicles] = useState<any[]>([])
const [products,setProducts] = useState<any[]>([])

const [loading,setLoading] = useState(true)

async function loadAssets(){

try{

const [p,v,pr] = await Promise.all([

fetch(API + "/properties"),
fetch(API + "/vehicles"),
fetch(API + "/products")

])

const propertiesData = await p.json()
const vehiclesData = await v.json()
const productsData = await pr.json()

setProperties(propertiesData)
setVehicles(vehiclesData)
setProducts(productsData)

}catch(err){

console.log("Failed loading assets")

}

setLoading(false)

}


async function deleteAsset(type:string,id:string){

const confirmDelete = confirm("Delete this asset?")

if(!confirmDelete) return

await fetch(API + "/" + type + "/" + id,{
method:"DELETE"
})

loadAssets()

}


useEffect(()=>{

loadAssets()

},[])


function imageOf(item:any){

return (
item.image ||
item.imageUrl ||
item.cloudinaryUrl ||
"https://via.placeholder.com/600x400"
)

}



return(

<main className="min-h-screen bg-gray-950 text-white">

{/* HEADER */}

<header className="flex justify-between items-center px-8 py-6 border-b border-gray-800">

<h1 className="font-bold text-lg">
Eyesightworks Admin
</h1>

<nav className="flex gap-6 text-gray-400">

<Link href="/">
Public Site
</Link>

</nav>

</header>



{/* TITLE */}

<section className="px-8 py-10 max-w-6xl mx-auto">

<h1 className="text-3xl font-bold mb-3">
Enterprise Asset Administration
</h1>

<p className="text-gray-400">
Manage infrastructure assets across the portfolio ecosystem.
</p>

</section>



{loading && (

<p className="text-center text-gray-400">
Loading assets...
</p>

)}



{/* PROPERTIES */}

<section className="px-8 py-10 max-w-6xl mx-auto">

<h2 className="text-xl font-semibold mb-6">
Properties
</h2>

<div className="grid md:grid-cols-3 gap-6">

{properties.map((p:any)=>(
<div key={p.id} className="bg-gray-900 p-4 rounded-xl">

<img
src={imageOf(p)}
className="rounded mb-3 w-full h-44 object-cover"
/>

<h3 className="font-semibold">
{p.title}
</h3>

<p className="text-blue-400 mb-3">
₦{p.price}
</p>

<button
onClick={()=>deleteAsset("properties",p.id)}
className="bg-red-600 px-3 py-1 rounded text-sm"
>
Delete
</button>

</div>
))}

</div>

</section>



{/* VEHICLES */}

<section className="px-8 py-10 max-w-6xl mx-auto">

<h2 className="text-xl font-semibold mb-6">
Fleet Vehicles
</h2>

<div className="grid md:grid-cols-3 gap-6">

{vehicles.map((v:any)=>(
<div key={v.id} className="bg-gray-900 p-4 rounded-xl">

<img
src={imageOf(v)}
className="rounded mb-3 w-full h-44 object-cover"
/>

<h3 className="font-semibold">
{v.brand}
</h3>

<p className="text-blue-400 mb-3">
₦{v.price}
</p>

<button
onClick={()=>deleteAsset("vehicles",v.id)}
className="bg-red-600 px-3 py-1 rounded text-sm"
>
Delete
</button>

</div>
))}

</div>

</section>



{/* PRODUCTS */}

<section className="px-8 py-10 max-w-6xl mx-auto">

<h2 className="text-xl font-semibold mb-6">
Facilities / Products
</h2>

<div className="grid md:grid-cols-3 gap-6">

{products.map((p:any)=>(
<div key={p.id} className="bg-gray-900 p-4 rounded-xl">

<img
src={imageOf(p)}
className="rounded mb-3 w-full h-44 object-cover"
/>

<h3 className="font-semibold">
{p.name}
</h3>

<p className="text-blue-400 mb-3">
₦{p.price}
</p>

<button
onClick={()=>deleteAsset("products",p.id)}
className="bg-red-600 px-3 py-1 rounded text-sm"
>
Delete
</button>

</div>
))}

</div>

</section>



<footer className="text-center text-gray-500 py-10 border-t border-gray-800">

Enterprise Infrastructure Management Console

</footer>

</main>

)

}