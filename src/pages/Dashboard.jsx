import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  Search, 
  User, 
  ChevronDown,
  Download,
  ArrowRight,
  Plus,
  Edit,
  Trash2,
  Filter
} from 'lucide-react';

// Dashboard Component
const Dashboard = () => {
  const stats = [
    { title: 'Inventory Status', value: 'Good', color: 'green', action: 'View Detailed Report' },
    { title: 'Revenue', value: 'Rs. 8,55,875', subtitle: 'Jan 2022', color: 'yellow', action: 'View Detailed Report' },
    { title: 'Medicines Available', value: '298', color: 'blue', action: 'Visit Inventory' },
    { title: 'Medicine Shortage', value: '01', color: 'red', action: 'Resolve Now' }
  ];

  const sections = [
    {
      title: 'Inventory',
      items: ['298 Total no of Medicines', '24 Medicine Groups'],
      action: 'Go to Configuration',
      actionColor: 'blue'
    },
    {
      title: 'Quick Report',
      subtitle: 'January 2022',
      items: ['70,856 Qty of Medicines Sold', '5,288 Invoices Generated'],
      action: null
    },
    {
      title: 'My Pharmacy',
      items: ['04 Total no of Suppliers', '05 Total no of Users'],
      action: 'Go to User Management',
      actionColor: 'blue'
    },
    {
      title: 'Customers',
      items: ['845 Total no of Customers', 'Adalimumab Frequently bought item'],
      action: 'Go to Customers Page',
      actionColor: 'blue'
    }
  ];

  const handleStatAction = (action) => {
    console.log('Stat action clicked:', action);
    // Add your action handling logic here
  };

  const handleSectionAction = (action) => {
    console.log('Section action clicked:', action);
    // Add your action handling logic here
  };

  return (
    <div className="min-h-screen bg-white ">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-600">A quick data overview of the inventory.</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
            <Download size={16} />
            Download Report
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const colorClasses = {
              green: {
                bg: 'bg-green-50 border-green-200',
                text: 'text-green-800',
                button: 'text-green-700 hover:text-green-800'
              },
              yellow: {
                bg: 'bg-yellow-50 border-yellow-200',
                text: 'text-yellow-800',
                button: 'text-orange-600 hover:text-orange-700'
              },
              blue: {
                bg: 'bg-blue-50 border-blue-200',
                text: 'text-blue-800',
                button: 'text-blue-600 hover:text-blue-700'
              },
              red: {
                bg: 'bg-red-50 border-red-200',
                text: 'text-red-800',
                button: 'text-red-600 hover:text-red-700'
              }
            };

            const currentColor = colorClasses[stat.color] || colorClasses.blue;

            return (
              <div key={`stat-${index}`} className={`p-6 rounded-lg border ${currentColor.bg}`}>
                <div className="mb-4">
                  <h3 className={`text-2xl font-bold ${currentColor.text}`}>
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 font-medium">{stat.title}</p>
                  {stat.subtitle && <p className="text-sm text-gray-500">{stat.subtitle}</p>}
                </div>
                <button 
                  onClick={() => handleStatAction(stat.action)}
                  className={`text-sm font-medium flex items-center gap-1 transition-colors ${currentColor.button}`}
                >
                  {stat.action} <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <div key={`section-${index}`} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                  {section.subtitle && <p className="text-sm text-gray-500">{section.subtitle}</p>}
                </div>
                {section.action && (
                  <button 
                    onClick={() => handleSectionAction(section.action)}
                    className={`text-sm font-medium flex items-center gap-1 transition-colors ${
                      section.actionColor === 'blue' ? 'text-blue-600 hover:text-blue-700' : 'text-gray-600 hover:text-gray-700'
                    }`}
                  >
                    {section.action} <ArrowRight size={14} />
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <p key={`item-${index}-${itemIndex}`} className="text-gray-700">{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;