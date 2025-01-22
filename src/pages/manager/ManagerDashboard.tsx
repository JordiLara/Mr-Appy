import { useState, useEffect } from "react";
import { dashboardService } from "../../services/api/dashboardService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface MoodData {
  [key: number]: number;
}

interface Review {
  id_review: number;
  content: string;
  mood: number;
  created_at: string;
}

export default function ManagerDashboard() {
  const [moods, setMoods] = useState<MoodData>({});
  const [reviews, setReviews] = useState<Review[]>([]);
  const [teamSize, setTeamSize] = useState(0);
  const [reviewsToday, setReviewsToday] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const moodColors: Record<number, string> = {
    5: "#22C55E", // Esmeralda
    4: "#10B981", // Verde
    3: "#EAB308", // Amarillo
    2: "#F97316", // Naranja
    1: "#EF4444", // Rojo
  };

  const moodEmojis: Record<number, string> = {
    5: "😊",
    4: "🙂",
    3: "😐",
    2: "😕",
    1: "🙁",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [moodsData, reviewsData, teamData] = await Promise.all([
          dashboardService.getMoods(),
          dashboardService.getReviews(),
          dashboardService.getTeamSize(),
        ]);

        setMoods(moodsData);
        setReviews(reviewsData);
        setTeamSize(teamData.totalMembers);

        // Calcular reviews de hoy
        const today = new Date().toISOString().split("T")[0];
        const todayReviews = reviewsData.filter(
          (review: { created_at: string }) =>
            review.created_at.startsWith(today)
        ).length;
        setReviewsToday(todayReviews);
      } catch (err) {
        setError("Error al cargar los datos del dashboard");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const barData = {
    labels: Object.keys(moods).map((key) => `Mood ${key}`),
    datasets: [
      {
        label: "Moods",
        data: Object.values(moods),
        backgroundColor: Object.values(moodColors),
      },
    ],
  };

  const lineData = {
    labels: [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ],
    datasets: [
      {
        label: "Promedio de estado",
        data: Array(7)
          .fill(0)
          .map((_, i) => {
            // Filtrar las reviews para el día específico de la semana
            const dayReviews = reviews.filter((review) => {
              const reviewDay = new Date(review.created_at).getDay();
              return reviewDay === i;
            });

            // Calcular el promedio del mood para el día
            const totalMood = dayReviews.reduce(
              (sum, review) => sum + review.mood,
              0
            );
            return dayReviews.length ? totalMood / dayReviews.length : 0;
          }),
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
      },
    ],
  };

  if (isLoading) {
    return <div className="text-center py-8">Cargando Dashboard...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-center mb-6">Manager Dashboard</h1>

      {/* Marcador de reviews recibidas */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-lg font-semibold mb-4">Estado del Día</h2>
        <p className="text-2xl font-bold">
          {reviewsToday}/{teamSize} reviews recibidas
        </p>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Gráfico de control de estados
          </h2>
          <Bar data={barData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Gráfico de ánimo
          </h2>
          <Line
            data={lineData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Evolución del estado de ánimo por Semana" },
              },
            }}
          />
        </div>
      </div>

      {/* Actividad Reciente */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Actividad Reciente</h2>
        <ul className="space-y-4">
          {reviews.slice(0, 5).map((review) => (
            <li
              key={review.id_review}
              className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg"
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full text-white`}
                style={{ backgroundColor: moodColors[review.mood] }}
              >
                {moodEmojis[review.mood]}
              </div>
              <div>
                <p className="text-gray-700">{review.content}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.created_at).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
