import Card from '../components/Card';

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Inventory</h1>
      <p className="mb-8">List of medicines available for sales.</p>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card 
          title="Medicines Available" 
          count="298" 
          action="View Full List" 
          icon="❤️"
        />
        <Card 
          title="Medicine Groups" 
          count="02" 
          action="View Groups" 
          icon="❤️"
        />
        <Card 
          title="Medicine Shortage" 
          count="01" 
          action="Resolve Now" 
          icon="❤️"
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Add New Item</h2>
        {/* Add form elements here */}
      </div>
    </div>
  );
}