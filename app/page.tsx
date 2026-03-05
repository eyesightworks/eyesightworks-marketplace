"use client"

import { useEffect, useState } from "react"

const API = "http://localhost:3000/api"

export default function Home() {

  const [properties,setProperties] = useState([])
  const [vehicles,setVehicles] = useState([])
  const [products,setProducts] = useState([])

  async function loadData(endpoint,setter){
    try{
      const res = await fetch(API + endpoint)
      const data = await res.json()
      setter(data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    loadData("/properties",setProperties)
    loadData("/vehicles",setVehicles)
    loadData("/products",setProducts)
  },[])

  return (
    <main className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Multi-domain Real Estate Asset Management Infrastructure
      </h1>

      <p className="mb-10 text-gray-500">
        Enterprise platform managing real estate, fleet assets, and income-generating infrastructure.
      </p>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Residential & Commercial Portfolio</h2>

        <div className="grid grid-cols-3 gap-6">
          {properties.map((p)=>(
            <div key={p.id} className="border p-4 rounded-xl">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-blue-600">₦{p.price}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Fleet Infrastructure</h2>

        <div className="grid grid-cols-3 gap-6">
          {vehicles.map((v)=>(
            <div key={v.id} className="border p-4 rounded-xl">
              <h3 className="font-semibold">{v.brand}</h3>
              <p className="text-blue-600">₦{v.price}</p>
            </div>
          ))}
        </div>
      </section>


      <section>
        <h2 className="text-2xl font-semibold mb-4">Income Generating Facilities</h2>

        <div className="grid grid-cols-3 gap-6">
          {products.map((p)=>(
            <div key={p.id} className="border p-4 rounded-xl">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-blue-600">₦{p.price}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}