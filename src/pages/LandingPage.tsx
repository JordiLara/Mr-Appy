const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <header className="p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold">Mr.Appy Team Care</h1>
      </header>

      <section className="h-screen flex flex-col justify-center items-center bg-blue-50">
        <h2 className="text-4xl font-bold mb-4">
          Improve the well-being of your team and employees
        </h2>
        <p className="text-lg text-gray-700 mb-6 text-center px-4">
          Record, analyze and improve your employees' morale.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg">
          Start Now
        </button>
      </section>

      <section className="p-8 bg-white">
        <h3 className="text-3xl font-semibold mb-4 text-center">Features</h3>
        <div className="grid grid-cols-1 mid-grid-cols-3 gap-6">
          <div className="p-4 shadow-md rounded-lg bg-gray-50">
            <h4 className="font-bold">Use simple icons to record your mood</h4>
          </div>
          <div className="p-4 shadwor-md rounded-lg bg-gray-50">
            <h4 className="font-bold">Administration panel</h4>
          </div>
          <div className="p-4 shadwor-md rounded-lg bg-gray-50">
            <h4 className="font-bold">
              Motivate with unlockable achievements and badges.
            </h4>
          </div>
        </div>
      </section>

      <footer className="p-4 bg-gray-800 text-white text-center">
        <p>Copyright &copy; {new Date().getFullYear()} Mr.Appy</p>
      </footer>
    </div>
  );
};

export default LandingPage;
