import { useEffect, useState } from "react";

// Интерфейс для локации
interface Location {
  id: number;
  name: string;
  deliveryPrice: number;
}

// Хук для загрузки локаций
export function useLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/locations");
        if (response.ok) {
          const data = await response.json();
          setLocations(data);
        } else {
          console.error("Ошибка загрузки локаций");
        }
      } catch (error) {
        console.error("Ошибка при запросе локаций:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return { locations, loading };
}
