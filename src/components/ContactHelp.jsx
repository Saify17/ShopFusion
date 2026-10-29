import  { useState } from 'react';

const ContactHelp = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3 text-gray-900">Contact & Support</h1>
        <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
          Have questions about our collections, orders, or delivery? Reach out to our support team and we’ll get back to you promptly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Support Information */}
        <div className="space-y-6 bg-gray-50 p-8 rounded-xl border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Get in Touch</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Our customer care team is available Monday through Friday, 9:00 AM – 6:00 PM EST.
          </p>

          <div className="space-y-4 text-sm">
            <div>
              <span className="font-semibold block text-gray-900">Email:</span>
              <span className="text-gray-600">@shopefusion.com</span>
            </div>
            <div>
              <span className="font-semibold block text-gray-900">Phone:</span>
              <span className="text-gray-600">+92 304 7437115</span>
            </div>
            <div>
              <span className="font-semibold block text-gray-900">Location:</span>
              <span className="text-gray-600">Model Town, Multan </span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Send Us a Message</h2>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-sm">
              Thank you for reaching out! We have received your message and will respond shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm resize-none"
                  placeholder="How can we assist you today?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition text-sm font-medium"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactHelp;