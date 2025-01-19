import { useState, useEffect } from "react";
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  isSameDay,
} from "date-fns";
import { es } from "date-fns/locale";
import { calendarService } from "../services/api/calService";

interface CalendarEntry {
  date: string;
  moodColor: string;
  content: string;
  mood: number;
}

export default function Calendar() {
  const [selectedEntry, setSelectedEntry] = useState<CalendarEntry | null>(
    null
  );
  const [calendarData, setCalendarData] = useState<CalendarEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const today = new Date();
  const days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  const fetchCalendarData = async () => {
    try {
      setIsLoading(true);
      const data = await calendarService.getUserCalendarData();
      console.log("Datos recibidos del backend:", data); // Log para verificar los datos recibidos
      setCalendarData(data);
    } catch (err) {
      setError("Error al cargar los datos del calendario");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getMoodForDay = (date: Date) => {
    const entry = calendarData.find((entry) =>
      isSameDay(new Date(entry.date), date)
    );
    console.log("Entrada encontrada para el día:", date, entry); // Log para verificar las entradas para cada día
    return entry;
  };

  useEffect(() => {
    fetchCalendarData();
  }, []);

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
            const entry = getMoodForDay(day); // Encuentra la entrada del día
            console.log("Día actual:", day, "Entrada encontrada:", entry); // Log para verificar el día actual y su entrada
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
                      className={`w-12 h-12 rounded-full ${entry.moodColor} opacity-50 hover:opacity-75 transition-opacity`}
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
                    {format(new Date(selectedEntry.date), "d 'de' MMMM, yyyy", {
                      locale: es,
                    })}
                  </h3>
                  <p className="text-gray-500 flex items-center gap-2">
                    <span>Estado de ánimo:</span>
                    <span className="text-xl">{selectedEntry.mood}</span>{" "}
                    {/* Aquí podrías cambiar por getMoodEmoji si necesitas mostrar el emoji */}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-700">{selectedEntry.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
