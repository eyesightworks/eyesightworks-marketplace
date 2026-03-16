"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const API = "https://pharmacy-auto-realestate-backend.onrender.com/api"

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

const props = await propRes.json()
const veh = await vehRes.json()
const prod = await prodRes.json()

setProperties(props)
setVehicles(veh)
setProducts(prod)

}catch(err){

console.log("Error loading assets",err)

}finally{

setLoading(false)

}

}

useEffect(()=>{
loadAssets()
},[])

function img(url:string){

 if(!url || url === ""){
  return "https://res.cloudinary.com/demo/image/upload/sample.jpg"
 }

 return url.replace(
  "/upload/",
  "/upload/w_800,q_auto,f_auto/"
 )

}

return(

<main className="min-h-screen bg-gray-950 text-white">

<header className="flex justify-between items-center p-6 border-b border-gray-800">

<h1 className="font-bold text-lg">
Eyesightworks Infrastructure
</h1>

<nav className="flex gap-6 text-gray-400">

<a href="/">Home</a>
<a href="/marketplace">Marketplace</a>

</nav>

</header>

<section className="max-w-6xl mx-auto p-10">

<h2 className="text-2xl font-semibold mb-6">
Residential & Commercial Portfolio
</h2>

{loading && <p>Loading properties...</p>}

<div className="grid md:grid-cols-3 gap-6">

{properties.map((p:any)=>(

<div key={p.id} className="bg-gray-900 p-4 rounded-xl">

<Image
src={img(p.imageUrl)}
width={800}
height={500}
alt={p.title}
className="rounded mb-4 w-full h-48 object-cover"
/>

<h3>{p.title}</h3>

<p className="text-blue-400">
₦{p.price}
</p>

</div>

))}

</div>

</section>

</main>

)

}