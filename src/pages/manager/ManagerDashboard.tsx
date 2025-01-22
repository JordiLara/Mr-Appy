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

interface Review {
  id_review: number;
  content: string;
  mood: number;
  created_at: string;
}

/*const mockReviews: Review[] = [
  { id_review: 1, content: "Buen día", mood: 5, created_at: "2025-01-20" },
  {
    id_review: 2,
    content: "Algo estresado",
    mood: 3,
    created_at: "2025-01-20",
  },
  {
    id_review: 3,
    content: "Colaboración productiva",
    mood: 4,
    created_at: "2025-01-21",
  },
  {
    id_review: 4,
    content: "Mucha carga de trabajo",
    mood: 2,
    created_at: "2025-01-21",
  },
  {
    id_review: 5,
    content: "Logramos avanzar",
    mood: 4,
    created_at: "2025-01-22",
  },
  {
    id_review: 6,
    content: "Día complicado",
    mood: 1,
    created_at: "2025-01-22",
  },
];*/

export default function ManagerDashboard() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [teamSize, setTeamSize] = useState(0);
  const [reviewsToday, setReviewsToday] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const moodColors: Record<number, string> = {
    5: "#22C55E", // Esmeralda
    4: "#10B981", // Verde
    3: "#EAB308", // Amarillo
    2: "#F97316", // Naranja
    1: "#EF4444", // Rojo
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Datos reales desde el backend
        const [realReviews, teamData] = await Promise.all([
          dashboardService.getReviews(),
          dashboardService.getTeamSize(),
        ]);

        setReviews(realReviews);
        setTeamSize(teamData.totalMembers);

        // Calcular reviews de hoy
        const today = new Date().toISOString().split("T")[0];
        const todayReviews = realReviews.filter((review: { created_at: string; }) =>
          review.created_at.startsWith(today)
        ).length;
        setReviewsToday(todayReviews);

        // Si necesito mock data, comentar las líneas reales arriba y descomentar estas
        //setReviews(mockReviews);
        //setTeamSize(10);
      } catch (error) {
        console.error("Error al cargar los datos del dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Gráfico de Barras
  const barData = {
    labels: ["Mood 5", "Mood 4", "Mood 3", "Mood 2", "Mood 1"],
    datasets: [
      {
        label: "Distribución de Moods",
        data: [5, 4, 3, 2, 1].map(
          (mood) => reviews.filter((review) => review.mood === mood).length
        ),
        backgroundColor: Object.values(moodColors),
      },
    ],
  };

  // Gráfico de Líneas
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
        label: "Promedio de moods por día",
        data: Array(7)
          .fill(0)
          .map((_, i) => {
            const dayReviews = reviews.filter((review) => {
              const reviewDate = new Date(review.created_at).getDay();
              return reviewDate === i;
            });

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
            Gráfico de Barras
          </h2>
          <Bar data={barData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Gráfico de Líneas
          </h2>
          <Line
            data={lineData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: "Promedio de estados por día",
                },
              },
            }}
          />
        </div>
      </div>

      {/* Últimos 5 mensajes */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Últimos 5 mensajes</h2>
        <ul className="space-y-4">
          {reviews.slice(0, 5).map((review) => (
            <li
              key={review.id_review}
              className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg"
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full`}
                style={{ backgroundColor: moodColors[review.mood] }}
              >
                <span className="text-white text-sm">{review.mood}</span>
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
