"use client"

import { useEffect,useState } from "react"

const API="https://pharmacy-auto-realestate-backend.onrender.com/api"

export default function Marketplace(){

const [products,setProducts]=useState([])

useEffect(()=>{

fetch(API+"/products")
.then(res=>res.json())
.then(data=>setProducts(data))

},[])

return(

<main className="min-h-screen bg-gray-950 text-white p-10">

<h1 className="text-4xl font-bold mb-8">
Infrastructure Marketplace
</h1>

<div className="grid md:grid-cols-3 gap-6">

{products.map((p)=>(

<div key={p.id} className="bg-gray-900 p-4 rounded-xl">

<img
src={p.imageUrl || "https://via.placeholder.com/600x400"}
className="rounded mb-4"
/>

<h3 className="font-semibold">
{p.name}
</h3>

<p className="text-blue-400">
₦{p.price}
</p>

</div>

))}

</div>

</main>

)

}