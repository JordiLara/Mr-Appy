import { useAuth } from "../hooks/useAuth";

const Dashboard: React.FC = () => {
  const { user } = useAuth(); // Usar el contexto para obtener el usuario

  if (!user) {
    return <p>No estás identificado correctamente</p>;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg mb-6">Hola, {user.name || "User"}!</p>
        <div className="text-left">
          <p>
            <strong>Nombre:</strong> {user.name || "N/A"}
          </p>
          <p>
            <strong>Apellido:</strong> {user.surname || "N/A"}
          </p>
          <p>
            <strong>Correo electrónico:</strong> {user.email || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
