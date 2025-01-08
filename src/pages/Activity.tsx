import React, { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const moods = [
  {
    id: 1,
    emoji: "🙁",
    color: "text-red-500",
    bg: "bg-red-100",
    label: "Muy mal",
  },
  {
    id: 2,
    emoji: "😕",
    color: "text-orange-500",
    bg: "bg-orange-100",
    label: "Mal",
  },
  {
    id: 3,
    emoji: "😐",
    color: "text-yellow-500",
    bg: "bg-yellow-100",
    label: "Regular",
  },
  {
    id: 4,
    emoji: "🙂",
    color: "text-green-500",
    bg: "bg-green-100",
    label: "Bien",
  },
  {
    id: 5,
    emoji: "😊",
    color: "text-emerald-500",
    bg: "bg-emerald-100",
    label: "Muy bien",
  },
];

type MoodEntry = {
  date: Date;
  mood: number;
  note: string;
  isPrivate: boolean;
};

export default function Activity() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    const newEntry = {
      date: new Date(),
      mood: selectedMood,
      note,
      isPrivate,
    };

    setEntries([newEntry, ...entries]);
    setSelectedMood(null);
    setNote("");
    setIsPrivate(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          {`${
            localStorage.getItem("userName") || "Usuario"
          }, ¿cómo ha ido hoy el día?`}
        </h2>

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
              disabled={!selectedMood}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:bg-blue-600 transition-colors"
            >
              Enviar estado
            </button>
          </div>
        </form>
      </div>

      {entries.map((entry, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">
              {format(entry.date, "EEEE, d 'de' MMMM", { locale: es })}
            </h3>
            <button className="text-blue-500 hover:text-blue-600">
              Editar
            </button>
          </div>
          <div className="flex gap-2 mb-4">
            {moods.map((mood) => (
              <div
                key={mood.id}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl
                  ${entry.mood === mood.id ? mood.bg : "bg-gray-100"}`}
              >
                {mood.emoji}
              </div>
            ))}
          </div>
          {entry.note && <p className="text-gray-600">«{entry.note}»</p>}
        </div>
      ))}
    </div>
  );
}
