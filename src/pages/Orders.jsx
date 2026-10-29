import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

const Orders = () => {
  const ordersStore = useSelector((state) => state.ordersStore);

  if (ordersStore.orders.length === 0) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-4 text-center">
        <Package size={64} className="text-gray-300" />
        <h2 className="text-2xl font-bold text-gray-800">No orders yet</h2>
        <Link to="/products" className="text-blue-600 font-semibold hover:underline">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-5">
        {ordersStore.orders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex justify-between items-start flex-wrap gap-2 border-b border-gray-100 pb-3 mb-3">
              <div>
                <p className="text-xs text-gray-400">Order ID</p>
                <p className="font-mono text-sm font-semibold">#{order.id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Placed on</p>
                <p className="text-sm font-semibold">
                  {new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Total</p>
                <p className="text-lg font-black text-blue-700">${order.total.toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <img src={item.thumbnail} alt={item.title} className="w-10 h-10 object-contain bg-gray-50 rounded-lg" />
                    <span className="text-gray-700">{item.title} × {item.quantity || 1}</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 mt-3 pt-3 text-xs text-gray-500 space-y-1">
              <div className="flex justify-between"><span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${order.shipping.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Platform Fee</span><span>${order.platformFee.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>${order.tax.toFixed(2)}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Orders;