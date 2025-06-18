export default function Card({ title, count, action, icon }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-xl">+</span>
        </div>
        <p className="text-3xl font-bold mb-2">{count}</p>
        <div className="flex justify-between items-center">
          <button className="text-blue-600 hover:underline">{action}</button>
          <span>{icon}</span>
        </div>
      </div>
    );
  }