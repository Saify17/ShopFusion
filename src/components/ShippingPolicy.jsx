import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-5xl font-bold mb-2 text-gray-900 pb-4 md:pb-10">Shipping Policy</h1>
      

      <div className="space-y-6 text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">1. Order Processing Time</h2>
          <p>
            All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we experience a high volume of orders, shipments may be delayed by a few days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">2. Shipping Rates & Delivery Estimates</h2>
          <p className="mb-2">
            Shipping charges for your order are calculated and displayed at checkout based on your location and delivery method.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li><strong>Standard Shipping:</strong> 3-5 business days</li>
            <li><strong>Express Shipping:</strong> 1-2 business days</li>
            <li><strong>International Shipping:</strong> 7-14 business days (varies by destination)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">3. Shipment Confirmation & Tracking</h2>
          <p>
            You will receive a confirmation email containing your tracking number once your order has shipped. The tracking number will be active within 24 hours.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">4. Customs, Duties, and Taxes</h2>
          <p>
            Our store is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">5. Damaged or Lost Packages</h2>
          <p>
            If your order arrives damaged, please contact the shipment carrier to file a claim and retain all packaging materials and damaged goods.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;