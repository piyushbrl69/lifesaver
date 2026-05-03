import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Phone,
  Heart,
  Activity,
  AlertCircle,
  User as UserIcon,
} from "lucide-react";
import "./UserPage.css";

export default function UserPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="status-screen">
        <div className="loader-pulse"></div>
        <p>Retrieving Vital Records...</p>
      </div>
    );

  if (!data)
    return (
      <div className="status-screen">
        <AlertCircle size={48} color="#ef4444" />
        <p>Profile not found or inaccessible.</p>
      </div>
    );

  return (
    <div className="user-viewport">
      <div className="bg-blur-circle circle-red"></div>
      <div className="bg-blur-circle circle-blue"></div>

      <div className="id-card-container content-slide-up">
        {/* Urgent Header */}
        <div className="emergency-banner">
          <div className="pulse-dot"></div>
          EMERGENCY MEDICAL INFORMATION
        </div>

        <main className="id-card-content">
          <section className="profile-header">
            <div className="avatar-circle">
              <UserIcon size={40} strokeWidth={1.5} />
            </div>
            <h1>{data.name}</h1>
            <div className="blood-badge">
              <Heart size={16} fill="currentColor" />
              <span>Blood Group: {data.bloodGroup || "Not Specified"}</span>
            </div>
          </section>

          <hr className="divider" />

          {/* Emergency Contacts */}
          <section className="info-section">
            <h3 className="section-title">
              <Phone size={18} /> Emergency Contacts
            </h3>
            <div className="contacts-list">
              {data.emergencyContacts.map((contact, index) => (
                <a key={index} href={`tel:${contact}`} className="contact-chip">
                  <span>{contact}</span>
                  <div className="call-icon">
                    <Phone size={14} />
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Medical Notes */}
          <section className="info-section">
            <h3 className="section-title">
              <Activity size={18} /> Medical Notes & Allergies
            </h3>
            <div className="notes-box">
              {data.medicalNotes || "No critical medical notes provided."}
            </div>
          </section>
        </main>

        <footer className="card-footer">
          Provided by LifeSaver Digital ID
        </footer>
      </div>
    </div>
  );
}
