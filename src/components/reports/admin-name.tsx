import React, { useState, useEffect } from 'react';

export const AdminName: React.FC<{ managerId: number }> = ({ managerId }) => {
  const [adminName, setAdminName] = useState<string>("Загрузка...");

  useEffect(() => {
    if (!managerId) {
      setAdminName("Н/Д");
      return;
    }

    fetch(`/api/admins/${managerId}`)
      .then((res) => res.json())
      .then((data) => setAdminName(data.name))
      .catch(() => setAdminName("Неизвестно"));
  }, [managerId]);

  return <span>{adminName}</span>;
};
