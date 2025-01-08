import React, { useState } from "react";
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  isSameDay,
} from "date-fns";
import { es } from "date-fns/locale";

// Mock data - replace with real data from the backend when its ready
const moodEntries = [
  {
    date: new Date(2025, 0, 13),
    mood: "happy",
    color: "bg-green-400",
    message: "¡Excelente inicio de semana! Sprint planning muy productivo.",
  },
  {
    date: new Date(2025, 0, 14),
    mood: "good",
    color: "bg-blue-400",
    message: "Buen avance con el proyecto, reuniones efectivas.",
  },
  {
    date: new Date(2025, 0, 15),
    mood: "neutral",
    color: "bg-yellow-400",
    message: "Día normal, trabajando en tareas pendientes.",
  },
  {
    date: new Date(2025, 0, 16),
    mood: "down",
    color: "bg-orange-400",
    message: "Algo cansado, muchas reuniones hoy.",
  },
  {
    date: new Date(2025, 0, 17),
    mood: "good",
    color: "bg-blue-400",
    message: "¡Viernes productivo! Cerrando tareas para el sprint.",
  },
];

export default function Calendar() {
  const [selectedEntry, setSelectedEntry] = useState<
    (typeof moodEntries)[0] | null
  >(null);
  const today = new Date();
  const days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  const getMoodForDay = (date: Date) => {
    return moodEntries.find((entry) => isSameDay(entry.date, date));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {format(today, "MMMM yyyy", { locale: es })}
      </h1>

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
                      className={`w-12 h-12 rounded-full ${entry.color} opacity-50 hover:opacity-75 transition-opacity`}
                    />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Message Modal */}
        {selectedEntry && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {format(selectedEntry.date, "d 'de' MMMM, yyyy", {
                      locale: es,
                    })}
                  </h3>
                  <p className="text-gray-500">
                    Estado de ánimo: {selectedEntry.mood}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-700">{selectedEntry.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
