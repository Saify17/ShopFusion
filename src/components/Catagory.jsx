import React from 'react'

const Catagory = () => {
  return (
    <div><ul className="flex flex-wrap items-center gap-3 text-[13px]">
  <li>
    <button
      onClick={() => goCategory("beauty")}
      className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-[#00f5ff] hover:shadow-[0_0_12px_rgba(0,245,255,0.25)] active:scale-95 transition-all duration-200 text-left font-medium"
    >
      Beauty & Fragrances
    </button>
  </li>

  <li>
    <button
      onClick={() => goCategory("furniture")}
      className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-[#00f5ff] hover:shadow-[0_0_12px_rgba(0,245,255,0.25)] active:scale-95 transition-all duration-200 text-left font-medium"
    >
      Furniture & Decor
    </button>
  </li>

  <li>
    <button
      onClick={() => goCategory("groceries")}
      className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-[#00f5ff] hover:shadow-[0_0_12px_rgba(0,245,255,0.25)] active:scale-95 transition-all duration-200 text-left font-medium"
    >
      Groceries
    </button>
  </li>

  <li>
    <button
      onClick={() => goCategory("laptops")}
      className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-[#00f5ff] hover:shadow-[0_0_12px_rgba(0,245,255,0.25)] active:scale-95 transition-all duration-200 text-left font-medium"
    >
      Laptop / Electronics
    </button>
  </li>
</ul></div>
  )
}

export default Catagory