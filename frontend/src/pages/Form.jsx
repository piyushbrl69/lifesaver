import { useState } from "react";
import axios from "axios";
import {
  User,
  Heart,
  Phone,
  FileText,
  QrCode,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import "./Form.css";

export default function Form() {
  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    emergencyContacts: "",
    medicalNotes: "",
  });
  const [qr, setQr] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when user types
  };

  const validateForm = () => {
    const contacts = form.emergencyContacts.split(",").map((c) => c.trim());
    const allValid = contacts.every((num) => /^\d{10}$/.test(num));

    if (!allValid) {
      setError("Please ensure all emergency contacts are exactly 10 digits.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/create`,
        {
          ...form,
          emergencyContacts: form.emergencyContacts
            .split(",")
            .map((c) => c.trim()),
        },
      );
      setQr(res.data.qr);
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = qr;
    link.download = `LifeSaver-${form.name || "ID"}.png`;
    link.click();
  };

  return (
    <div className="app-viewport">
      <div className="bg-blur-circle circle-1"></div>
      <div className="bg-blur-circle circle-2"></div>

      <main className="glass-card">
        {!qr ? (
          <div className="content-fade-in">
            <header className="hero-section">
              <div className="brand-badge">LifeSaver 2.0</div>
              <h1>Create Your ID</h1>
              <p>
                Enter your details to generate a scan-ready medical profile.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="premium-form">
              {/* Primary Info Grid */}
              <div className="field-grid">
                <div className="input-wrapper">
                  <label>
                    <User size={14} /> Full Name
                  </label>
                  <input
                    name="name"
                    placeholder="John Doe"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-wrapper">
                  <label>
                    <Heart size={14} /> Blood Group
                  </label>
                  <input
                    name="bloodGroup"
                    placeholder="e.g. O+"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="input-wrapper">
                <label>
                  <Phone size={14} /> Emergency Contacts (10 Digits)
                </label>
                <input
                  name="emergencyContacts"
                  placeholder="Enter 10-digit numbers"
                  onChange={handleChange}
                  required
                />
                <span className="helper-text">
                  Separate multiple numbers with commas
                </span>
              </div>

              {/* Medical Notes */}
              <div className="input-wrapper">
                <label>
                  <FileText size={14} /> Medical Notes
                </label>
                <textarea
                  name="medicalNotes"
                  placeholder="Allergies, chronic conditions, or medications..."
                  rows="3"
                  onChange={handleChange}
                />
              </div>

              {error && (
                <div className="error-message">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <button type="submit" className="glow-button" disabled={loading}>
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <QrCode size={18} />
                )}
                {loading ? "Generating..." : "Generate Secure QR"}
              </button>
            </form>
          </div>
        ) : (
          /* Result View */
          <div className="qr-result-view content-fade-in">
            <div className="success-icon">
              <CheckCircle size={40} color="#22c55e" />
            </div>
            <div className="qr-frame">
              <img src={qr} alt="Your QR Code" />
            </div>
            <h2>Identity Card Ready</h2>
            <p>
              Save this image. In an emergency, anyone can scan it to see your
              medical profile.
            </p>

            <div className="button-group">
              <button onClick={downloadQR} className="glow-button">
                Download Identity
              </button>
              <button onClick={() => setQr("")} className="ghost-button">
                Create New Profile
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
