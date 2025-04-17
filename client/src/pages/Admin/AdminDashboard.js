import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import API from '../../services/API';
import { FaSearch, FaTint, FaCalendarAlt, FaUserFriends, FaCheck, FaTimes, FaPlus } from 'react-icons/fa';

const AdminDashboard = () => {
  const [bloodInventory, setBloodInventory] = useState([]);
  const [bloodRequests, setBloodRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTab, setSelectedTab] = useState('inventory');
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [campaignForm, setCampaignForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
  });

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch blood inventory
      const { data: inventoryData } = await API.get('/api/inventory/admin-inventory');
      if (inventoryData?.success) {
        setBloodInventory(inventoryData.inventory);
      }

      // Fetch blood requests
      const { data: requestsData } = await API.get('/api/inventory/admin-requests');
      if (requestsData?.success) {
        setBloodRequests(requestsData.requests);
      }

      // Fetch all campaigns for admin
      const { data: campaignsData } = await API.get('/api/campaigns/admin-campaigns');
      if (campaignsData?.success) {
        setCampaigns(campaignsData.campaigns || []);
      } else {
        console.error('Failed to fetch campaigns:', campaignsData?.message);
      }

      // Always fetch initial users (latest 10)
      const { data: userData } = await API.get('/api/admin/users');
      if (userData?.success) {
        setUsers(userData.users);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 404) {
        console.error('Campaign endpoint not found. Check API route.');
      }
    }
  };

  const handleRequestAction = async (requestId, action) => {
    try {
      const { data } = await API.post('/api/inventory/handle-request', {
        requestId,
        status: action
      });
      
      if (data?.success) {
        alert(`Request ${action}ed successfully!`);
        // Update the request status locally
        setBloodRequests(prevRequests =>
          prevRequests.map(request =>
            request._id === requestId
              ? { ...request, status: action }
              : request
          )
        );
      }
    } catch (error) {
      console.error('Error handling request:', error);
      const errorMessage = error.response?.data?.message || error.message;
      alert('Error handling request: ' + errorMessage);
    }
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      // Validate all fields are filled
      const fields = ['title', 'description', 'date', 'time', 'location'];
      const emptyFields = fields.filter(field => !campaignForm[field]);
      
      if (emptyFields.length > 0) {
        alert(`Please fill in all fields: ${emptyFields.join(', ')}`);
        return;
      }

      // Format date and time properly
      const campaignDate = new Date(`${campaignForm.date}T${campaignForm.time}`);
      if (isNaN(campaignDate.getTime())) {
        alert('Invalid date or time format');
        return;
      }
      
      const campaignData = {
        title: campaignForm.title,
        description: campaignForm.description,
        date: campaignDate.toISOString(),
        location: campaignForm.location,
        organisation: user._id // Add the organisation ID from the logged-in user
      };

      console.log('Sending campaign data:', campaignData); // Debug log

      const { data } = await API.post('/api/campaigns/create', campaignData);
      
      if (data?.success) {
        alert('Campaign created successfully!');
        setShowCampaignModal(false);
        setCampaignForm({
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
        });
        fetchData(); // Refresh the campaigns list
      }
    } catch (error) {
      console.error('Campaign creation error:', error);
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Error details:', errorMessage); // Debug log
      alert('Error creating campaign: ' + errorMessage);
    }
  };

  // Add this function to format the campaign date for display
  const formatCampaignDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return { date: 'Invalid date', time: '' };
    }
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      // If search is empty, fetch latest 10 users
      const { data } = await API.get('/api/admin/users');
      if (data?.success) {
        setUsers(data.users);
      }
      return;
    }

    try {
      const { data } = await API.get(`/api/admin/users?search=${searchTerm}`);
      if (data?.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);
      alert('Error searching users: ' + (error.response?.data?.message || error.message));
    }
  };

  // Update useEffect for tab changes
  useEffect(() => {
    if (selectedTab === 'users' && !searchTerm) {
      // Fetch latest users when switching to users tab
      const { data } = API.get('/api/admin/users')
        .then(response => {
          if (response.data?.success) {
            setUsers(response.data.users);
          }
        })
        .catch(error => console.log(error));
    }
  }, [selectedTab]);

  // Add useEffect to fetch data when tab changes
  useEffect(() => {
    if (selectedTab === 'campaigns') {
      fetchData();
    }
  }, [selectedTab]);

  // Add useEffect for initial data load
  useEffect(() => {
    fetchData();
  }, []);

  const filteredRequests = bloodRequests.filter(request => 
    request.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome, {user?.name}</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative flex gap-2">
          <input
            type="text"
            placeholder="Search users, hospitals, or blood groups..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            className={`px-4 py-2 ${selectedTab === 'inventory' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-600'}`}
            onClick={() => setSelectedTab('inventory')}
          >
            Blood Inventory
          </button>
          <button
            className={`px-4 py-2 ${selectedTab === 'requests' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-600'}`}
            onClick={() => setSelectedTab('requests')}
          >
            Blood Requests
          </button>
          <button
            className={`px-4 py-2 ${selectedTab === 'campaigns' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-600'}`}
            onClick={() => setSelectedTab('campaigns')}
          >
            Campaigns
          </button>
          <button
            className={`px-4 py-2 ${selectedTab === 'users' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-600'}`}
            onClick={() => setSelectedTab('users')}
          >
            Users
          </button>
        </div>
      </div>

      {/* Blood Inventory Tab */}
      {selectedTab === 'inventory' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {bloodInventory.map((item) => (
            <div key={item.bloodGroup} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{item.bloodGroup}</h3>
                <FaTint className="text-red-500" />
              </div>
              <p className="text-2xl font-bold mt-2">{item.quantity} units</p>
            </div>
          ))}
        </div>
      )}

      {/* Blood Requests Tab */}
      {selectedTab === 'requests' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{request.hospitalName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.bloodGroup}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.quantity} units</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(request.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {request.status || 'pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {(!request.status || request.status === 'pending') && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRequestAction(request._id, 'approve')}
                          className="text-green-600 hover:text-green-800"
                          title="Approve Request"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleRequestAction(request._id, 'reject')}
                          className="text-red-600 hover:text-red-800"
                          title="Reject Request"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Campaigns Tab */}
      {selectedTab === 'campaigns' && (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowCampaignModal(true)}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <FaPlus className="mr-2" />
              Create Campaign
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns.map((campaign) => {
              const { date, time } = formatCampaignDate(campaign.date);
              return (
                <div key={campaign._id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{campaign.title}</h3>
                    <FaCalendarAlt className="text-red-500" />
                  </div>
                  <p className="text-gray-600 mb-2">{campaign.description}</p>
                  <div className="mt-2">
                    <span className="text-sm font-medium">Date: </span>
                    <span className="text-sm text-gray-600">{date}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium">Time: </span>
                    <span className="text-sm text-gray-600">{time}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium">Location: </span>
                    <span className="text-sm text-gray-600">{campaign.location}</span>
                  </div>
                  <div className="mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      new Date(campaign.date) > new Date() ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {new Date(campaign.date) > new Date() ? 'Upcoming' : 'Completed'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Users Tab */}
      {selectedTab === 'users' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donations</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.donations}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.requests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Campaign Modal */}
      {showCampaignModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Create Campaign</h3>
              <button
                onClick={() => setShowCampaignModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleCreateCampaign}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={campaignForm.title}
                  onChange={(e) => setCampaignForm({...campaignForm, title: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={campaignForm.description}
                  onChange={(e) => setCampaignForm({...campaignForm, description: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  rows="3"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={campaignForm.date}
                  onChange={(e) => setCampaignForm({...campaignForm, date: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  value={campaignForm.time}
                  onChange={(e) => setCampaignForm({...campaignForm, time: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={campaignForm.location}
                  onChange={(e) => setCampaignForm({...campaignForm, location: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                  placeholder="Enter full address"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 