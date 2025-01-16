import { useState, useEffect } from "react";
import { dashboardService } from "../../services/dashboardService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Chart.js en versiones recientes requiere registrar explícitamente las escalas, herramientas y otros componentes necesarios.
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MoodData {
  [key: number]: number;
}

interface Review {
  User: {
    name: string;
    surname: string;
  };
  id_review: number;
  content: string;
  mood: number;
  created_at: string;
}

interface Activity {
  created_at: string;
  content: string;
  mood: number;
}

export default function ManagerDashboard() {
  const [moods, setMoods] = useState<MoodData>({});
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [moodsData, reviewsData, activityData] = await Promise.all([
          dashboardService.getMoods(),
          dashboardService.getReviews(),
          dashboardService.getActivity(),
        ]);
        setMoods(moodsData);
        setReviews(reviewsData);
        setActivity(activityData);
      } catch (err) {
        setError("Error al cargar los datos del dashboard");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const moodLabels = Object.keys(moods).map((key) => `Mood ${key}`);
  const moodValues = Object.values(moods);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Estados de Ánimo del Equipo",
      },
    },
  };

  const chartData = {
    labels: moodLabels,
    datasets: [
      {
        label: "Estados de ánimo",
        data: moodValues,
        backgroundColor: [
          "#10B981", // Mood 5
          "#22C55E", // Mood 4
          "#EAB308", // Mood 3
          "#F97316", // Mood 2
          "#EF4444", // Mood 1
        ],
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
      <h1 className="text-2xl font-bold">Manager Dashboard</h1>

      {/* Gráfico de estados de ánimo */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Estados de Ánimo</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Reseñas recientes */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Reseñas Recientes</h2>
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id_review} className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-semibold">
                {review.mood}
              </div>
              <div>
                <p className="font-medium">
                  {review.User.name} {review.User.surname}
                </p>
                <p className="text-gray-600">{review.content}</p>
                <p className="text-gray-400 text-sm">
                  {new Date(review.created_at).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Actividad reciente */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Actividad Reciente</h2>
        <ul className="space-y-4">
          {activity.map((item, index) => (
            <li key={index} className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-semibold">
                {item.mood}
              </div>
              <div>
                <p className="text-gray-600">{item.content}</p>
                <p className="text-gray-400 text-sm">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
