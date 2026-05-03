import { useState } from "react";
import axios from "axios";

export default function Form() {
  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    emergencyContacts: "",
    medicalNotes: "",
  });

  const [qr, setQr] = useState("");
  console.log(import.meta.env.VITE_API_URL);
  const handleSubmit = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/user/create`,
      {
        ...form,
        emergencyContacts: form.emergencyContacts.split(","),
      },
    );

    setQr(res.data.qr);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>LifeSaver Form</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <br />

      <input
        placeholder="Blood Group"
        onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
      />
      <br />

      <input
        placeholder="Contacts (comma separated)"
        onChange={(e) =>
          setForm({ ...form, emergencyContacts: e.target.value })
        }
      />
      <br />

      <textarea
        placeholder="Medical Notes"
        onChange={(e) => setForm({ ...form, medicalNotes: e.target.value })}
      />
      <br />

      <button onClick={handleSubmit}>Generate QR</button>

      {qr && (
        <div>
          <h3>Your QR Code:</h3>
          <img src={qr} alt="QR" />
        </div>
      )}
    </div>
  );
}
