import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { moodService } from "../services/api";

type MoodEntry = {
  id: string;
  created_at: string;
  mood_type: "amazing" | "good" | "neutral" | "down" | "rough";
  note: string;
  is_anonymous: boolean;
};

const moods = [
  {
    id: 1,
    emoji: "🙁",
    color: "text-red-500",
    bg: "bg-red-100",
    label: "Muy mal",
    type: "rough" as const,
  },
  {
    id: 2,
    emoji: "😕",
    color: "text-orange-500",
    bg: "bg-orange-100",
    label: "Mal",
    type: "down" as const,
  },
  {
    id: 3,
    emoji: "😐",
    color: "text-yellow-500",
    bg: "bg-yellow-100",
    label: "Regular",
    type: "neutral" as const,
  },
  {
    id: 4,
    emoji: "🙂",
    color: "text-green-500",
    bg: "bg-green-100",
    label: "Bien",
    type: "good" as const,
  },
  {
    id: 5,
    emoji: "😊",
    color: "text-emerald-500",
    bg: "bg-emerald-100",
    label: "Muy bien",
    type: "amazing" as const,
  },
];

export default function Activity() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await moodService.getUserMoods();
      setEntries(response);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Error al cargar los estados de ánimo"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const selectedMoodData = moods[selectedMood - 1];
      await moodService.create({
        mood_type: selectedMoodData.type,
        note,
        is_anonymous: isPrivate,
        created_at: new Date().toISOString(),
      });

      setSuccess("¡Estado de ánimo registrado correctamente!");
      setSelectedMood(null);
      setNote("");
      setIsPrivate(false);
      fetchEntries();
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Error al guardar el estado de ánimo"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getMoodFromType = (type: string) => {
    return moods.find((mood) => mood.type === type) || moods[2];
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          {`${
            localStorage.getItem("userName") || "Usuario"
          }, ¿cómo ha ido hoy el día?`}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <p className="text-gray-600 mb-4">
              Selecciona qué estado representa mejor cómo te sientes hoy:
            </p>
            <div className="flex justify-between gap-4">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setSelectedMood(mood.id)}
                  className={`w-16 h-16 text-3xl rounded-full transition-all flex items-center justify-center
                    ${
                      selectedMood === mood.id
                        ? `${mood.bg} ring-2 ring-offset-2 ${mood.color.replace(
                            "text",
                            "ring"
                          )}`
                        : "hover:bg-gray-50"
                    }`}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-2">
              Por favor, detalla aquí qué factores hacen que te sientas así hoy:
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Tareas o proyectos en el trabajo, relaciones con compañeros, temas personales..."
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-600">Visible solo por mi manager</span>
            </label>

            <button
              type="submit"
              disabled={!selectedMood || isLoading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:bg-blue-600 transition-colors"
            >
              {isLoading ? "Enviando..." : "Enviar estado"}
            </button>
          </div>
        </form>
      </div>

      {entries.map((entry) => {
        const moodData = getMoodFromType(entry.mood_type);
        return (
          <div key={entry.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">
                {format(new Date(entry.created_at), "EEEE, d 'de' MMMM", {
                  locale: es,
                })}
              </h3>
            </div>
            <div className="flex gap-2 mb-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${moodData.bg}`}
              >
                {moodData.emoji}
              </div>
            </div>
            {entry.note && <p className="text-gray-600">«{entry.note}»</p>}
          </div>
        );
      })}
    </div>
  );
}
