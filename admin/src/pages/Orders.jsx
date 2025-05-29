import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  const fetcAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: event.target.value,
        },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetcAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  const downloadImage = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeOrder = async (orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/remove",
        { orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetcAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove order");
    }
  };

  useEffect(() => {
    fetcAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Order page</h3>

      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-50 cursor-pointer p-4"
        >
          <img
            src={modalImage}
            alt="Zoomed"
            className="max-h-[80vh] max-w-[90vw] rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => downloadImage(modalImage)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download Image
          </button>
          <button
            onClick={() => setModalImage(null)}
            className="mt-2 text-white underline"
          >
            Close
          </button>
        </div>
      )}

      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="border-2 border-gray-300 p-5 md:p-8 my-5 space-y-4 text-xs sm:text-sm text-gray-800"
          >
            {/* Produse + Remove Order */}
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              {/* Produse individuale */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 border p-3 rounded shadow-sm bg-gray-50"
                  >
                    <img
                      src={
                        item.image
                          ? Array.isArray(item.image)
                            ? item.image[0]
                            : item.image
                          : assets.parcel_icon
                      }
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded cursor-pointer"
                      onClick={() =>
                        setModalImage(
                          Array.isArray(item.image) ? item.image[0] : item.image
                        )
                      }
                      title="Click to zoom"
                    />

                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p>
                        Size: {item.size} {item.gender && `(${item.gender})`}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Remove Order */}
              <div
                className="flex flex-col items-center justify-start cursor-pointer select-none"
                onClick={() => removeOrder(order._id)}
                title="Remove Order"
              >
                <img
                  src={assets.bin_icon}
                  alt="Remove Order"
                  className="w-6 h-6 mb-1"
                />
                <span className="text-xs text-red-600 font-semibold text-center">
                  Remove Order
                </span>
              </div>
            </div>

            {/* Detalii comandă */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t pt-4 mt-4">
              <div>
                <p className="font-medium">Customer:</p>
                <p>{order.address.firstName + " " + order.address.lastName}</p>
                <p> Phone Nr:{order.address.phone}</p>
              </div>

              <div>
                <p className="font-medium">Address:</p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>

              <div>
                <p className="font-medium">Order Info:</p>
                <p>Items: {order.items.length}</p>
                <p>Payment Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>

              <div>
                <p className="font-medium text-lg">
                  Total: {currency} {order.amount}
                </p>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className="mt-2 p-2 font-semibold border rounded w-full"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
