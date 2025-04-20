import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Bell, PlusCircle, LogOut, Menu, User, FileText, BarChart2, Settings, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Dummy data - would come from API in real implementation
  const expenseData = {
    totalExpenses: 35000,
    pendingApprovals: 5,
    approvedRequests: 12,
    rejectedRequests: 2
  };
  
  const recentExpenses = [
    { id: 1, date: '2023-04-12', category: 'Travel', amount: 2500, status: 'Pending' },
    { id: 2, date: '2023-04-10', category: 'Food', amount: 1000, status: 'Approved' },
    { id: 3, date: '2023-04-08', category: 'Office Supplies', amount: 1500, status: 'Approved' },
    { id: 4, date: '2023-04-05', category: 'Travel', amount: 5000, status: 'Rejected' },
    { id: 5, date: '2023-04-01', category: 'Food', amount: 800, status: 'Approved' },
  ];
  
  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1>Expense Management</h1>
        </div>
        
        <nav className="sidebar-navigation">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Home className="icon" size={20} />
            Dashboard
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'expenses' ? 'active' : ''}`}
            onClick={() => setActiveTab('expenses')}
          >
            <FileText className="icon" size={20} />
            My Expenses
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <BarChart2 className="icon" size={20} />
            Reports
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="icon" size={20} />
            Settings
          </button>
          
          <button 
            className="nav-item logout"
            onClick={handleLogout}
          >
            <LogOut className="icon" size={20} />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <button className="toggle-sidebar" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          
          <div className="user-profile">
            <button className="action-button">
              <Bell size={20} />
            </button>
            <div className="profile-avatar">
              <User size={18} />
            </div>
            <span>{user?.fullName || 'User'}</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="dashboard-content">
          <div className="card-header">
            <h1 className="card-title">Dashboard</h1>
            <button className="action-button primary">
              <PlusCircle size={10} />
              New Expense
            </button>
          </div>
          
          {/* Metrics Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon purple">
                <FileText size={24} />
              </div>
              <div className="stat-info">
                <p className="stat-label">Total Expenses</p>
                <h3 className="stat-value">₹{expenseData.totalExpenses.toLocaleString()}</h3>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon yellow">
                <Bell size={24} />
              </div>
              <div className="stat-info">
                <p className="stat-label">Pending Approvals</p>
                <h3 className="stat-value">{expenseData.pendingApprovals}</h3>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon green">
                <Bell size={24} />
              </div>
              <div className="stat-info">
                <p className="stat-label">Approved Requests</p>
                <h3 className="stat-value">{expenseData.approvedRequests}</h3>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon red">
                <Bell size={24} />
              </div>
              <div className="stat-info">
                <p className="stat-label">Rejected Requests</p>
                <h3 className="stat-value">{expenseData.rejectedRequests}</h3>
              </div>
            </div>
          </div>
          
          {/* Charts Section */}
          <div className="charts-container">
            <div className="dashboard-card">
              <h2 className="card-title">Monthly Spending</h2>
              <div className="chart-container">
                <Bar
                  data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                      {
                        label: 'Expenses',
                        data: [5000, 7000, 4500, 8500, 6000, 9000],
                        backgroundColor: '#6366f1',
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
            </div>
            
            <div className="dashboard-card">
              <h2 className="card-title">Expense Categories</h2>
              <div className="chart-container">
                <Pie
                  data={{
                    labels: ['Travel', 'Food', 'Office Supplies', 'Utilities', 'Others'],
                    datasets: [
                      {
                        data: [8000, 3500, 2500, 1500, 1000],
                        backgroundColor: ['#6366f1', '#f97316', '#10b981', '#0ea5e9', '#8b5cf6'],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Recent Expenses Table */}
          <div className="dashboard-card">
            <h2 className="card-title">Recent Expenses</h2>
            <div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.date}</td>
                      <td>{expense.category}</td>
                      <td>₹{expense.amount}</td>
                      <td>
                        <span className={`status-badge ${expense.status.toLowerCase()}`}>
                          {expense.status}
                        </span>
                      </td>
                      <td>
                        <button className="action-button">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
