import React from 'react'

export default function CartModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <h2 className="text-xl font-semibold">Your Cart</h2>
      <button className="text-gray-500 hover:text-red-500 text-2xl leading-none">&times;</button>
    </div>

    {/* Cart Items */}
    <div className="p-4 overflow-y-auto max-h-64 divide-y">
      {[1, 2, 3].map((item, index) => (
        <div key={index} className="flex items-center justify-between py-3">
          <div className="flex gap-4">
            <div className="w-14 h-14 bg-gray-200 rounded-md"></div>
            <div>
              <p className="font-medium">Product {item}</p>
              <p className="text-sm text-gray-500">Qty: 1</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">$19.99</p>
            <button className="text-xs text-red-500 hover:underline mt-1">Remove</button>
          </div>
        </div>
      ))}
    </div>

    {/* Price Summary */}
    <div className="px-6 py-4 border-t">
      <div className="flex justify-between text-sm mb-2">
        <span>Subtotal</span>
        <span>$59.97</span>
      </div>
      <div className="flex justify-between text-sm mb-4">
        <span>Tax</span>
        <span>$5.00</span>
      </div>
      <div className="flex justify-between font-semibold text-lg mb-4">
        <span>Total</span>
        <span>$64.97</span>
      </div>
      <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">Checkout</button>
    </div>
  </div>
</div>

  )
}
