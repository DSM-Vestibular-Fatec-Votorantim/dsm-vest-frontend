"use client"; // caso esteja usando App Router

import { useState } from "react";
import { AdminPageTemplate } from "../../components/templates/AdminTemplate";

export default function AdminPage() {
  const [admins, setAdmins] = useState([
    { id: 1, name: "Administrador 1" },
    { id: 2, name: "Administrador 2" },
  ]);

  const handleAdd = () => {
    const newId = admins.length + 1;
    setAdmins([...admins, { id: newId, name: `Administrador ${newId}` }]);
  };

  const handleDelete = (id: number) => {
    setAdmins(admins.filter((a) => a.id !== id));
  };

  const handleChangePassword = (id: number) => {
    alert(`Trocar senha do Administrador ${id}`);
  };

  return (
    <AdminPageTemplate
      admins={admins}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onChangePassword={handleChangePassword}
    />
  );
}