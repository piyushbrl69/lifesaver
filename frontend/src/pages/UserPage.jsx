import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UserPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/user/${id}`)
      .then(res => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{data.name}</h1>
      <h2>Blood Group: {data.bloodGroup}</h2>
      <p>Contacts: {data.emergencyContacts.join(", ")}</p>
      <p>Medical Notes: {data.medicalNotes}</p>
    </div>
  );
}