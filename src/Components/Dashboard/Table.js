import { useState } from "react";

export default function Table(props) {
  const [services, setServices] = useState([]);

  return (
    <table>
      <thead>
        <tr></tr>
      </thead>
      <tbody></tbody>
    </table>
  );
}
