import { useAuth } from "../contexts/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg mb-6">Hola, {user.name || "User"}!</p>
        <div className="text-left">
          <p>
            <strong>Nombre:</strong>
            {user?.name}
          </p>
          <p>
            <strong>Apellido:</strong>
            {user?.surname}
          </p>
          <p>
            <strong>Correo electrónico:</strong>
            {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
