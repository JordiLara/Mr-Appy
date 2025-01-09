import React, { useState, useEffect } from "react";
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  isSameDay,
  subDays,
} from "date-fns";
import { es } from "date-fns/locale";
import { moodService } from "../services/api/moodService";

interface MoodEntry {
  id: string;
  created_at: string;
  mood_type: string;
  note: string;
  is_anonymous: boolean;
}

export default function Calendar() {
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const today = new Date();
  const days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await moodService.getUserMoods({
          startDate: startOfMonth(today).toISOString(),
          endDate: endOfMonth(today).toISOString(),
        });
        setMoodEntries(response);
      } catch (err) {
        setError("Error al cargar los estados de ánimo");
        // Datos de respaldo en caso de error
        const backupData: MoodEntry[] = [
          {
            id: "1",
            created_at: subDays(today, 5).toISOString(),
            mood_type: "amazing",
            note: "¡Excelente día! Sprint planning muy productivo.",
            is_anonymous: false,
          },
          {
            id: "2",
            created_at: subDays(today, 4).toISOString(),
            mood_type: "good",
            note: "Buen avance con el proyecto, reuniones efectivas.",
            is_anonymous: false,
          },
          {
            id: "3",
            created_at: subDays(today, 3).toISOString(),
            mood_type: "neutral",
            note: "Día normal, trabajando en tareas pendientes.",
            is_anonymous: false,
          },
          {
            id: "4",
            created_at: subDays(today, 2).toISOString(),
            mood_type: "down",
            note: "Algo cansado, muchas reuniones hoy.",
            is_anonymous: false,
          },
          {
            id: "5",
            created_at: subDays(today, 1).toISOString(),
            mood_type: "good",
            note: "¡Viernes productivo! Cerrando tareas para el sprint.",
            is_anonymous: false,
          },
        ];
        setMoodEntries(backupData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoods();
  }, []);

  const getMoodColor = (moodType: string) => {
    const colors = {
      amazing: "bg-green-400",
      good: "bg-blue-400",
      neutral: "bg-yellow-400",
      down: "bg-orange-400",
      rough: "bg-red-400",
    };
    return colors[moodType as keyof typeof colors] || "bg-gray-400";
  };

  const getMoodForDay = (date: Date) => {
    return moodEntries.find((entry) =>
      isSameDay(new Date(entry.created_at), date)
    );
  };

  if (isLoading) {
    return <div className="text-center py-8">Cargando calendario...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {format(today, "MMMM yyyy", { locale: es })}
      </h1>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-7 gap-4">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
            <div key={day} className="text-center font-medium text-gray-500">
              {day}
            </div>
          ))}

          {days.map((day) => {
            const entry = getMoodForDay(day);
            return (
              <div
                key={day.toString()}
                className="aspect-square flex items-center justify-center relative"
              >
                <span className="text-sm text-gray-600">
                  {format(day, "d")}
                </span>
                {entry && (
                  <button
                    onClick={() => setSelectedEntry(entry)}
                    className="absolute inset-1 flex items-center justify-center"
                  >
                    <div
                      className={`w-12 h-12 rounded-full ${getMoodColor(
                        entry.mood_type
                      )} opacity-50 hover:opacity-75 transition-opacity`}
                    />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {selectedEntry && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {format(
                      new Date(selectedEntry.created_at),
                      "d 'de' MMMM, yyyy",
                      {
                        locale: es,
                      }
                    )}
                  </h3>
                  <p className="text-gray-500">
                    Estado de ánimo: {selectedEntry.mood_type}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-700">{selectedEntry.note}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
