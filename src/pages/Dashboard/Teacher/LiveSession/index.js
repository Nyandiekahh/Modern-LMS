import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar,
  Video, 
  Link as LinkIcon, 
  Users,
  Clock,
  Plus,
  Copy,
  Share2,
  ArrowRight
} from 'lucide-react';

const LiveSession = () => {
  const navigate = useNavigate();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    date: '',
    time: '',
    duration: 60,
    description: ''
  });
  
  // Mock scheduled sessions (replace with actual data from backend)
  const [scheduledSessions, setScheduledSessions] = useState([
    {
      id: 1,
      title: 'Introduction to React',
      date: '2024-03-25',
      time: '10:00',
      duration: 60,
      description: 'Basics of React and component architecture',
      meetingLink: 'https://meet.eduverse.com/abc123'
    }
  ]);

  const handleScheduleSession = (e) => {
    e.preventDefault();
    const meetingLink = `https://meet.eduverse.com/${Math.random().toString(36).substr(2, 6)}`;
    const newScheduledSession = {
      id: scheduledSessions.length + 1,
      ...newSession,
      meetingLink
    };
    setScheduledSessions([...scheduledSessions, newScheduledSession]);
    setShowScheduleModal(false);
    setNewSession({
      title: '',
      date: '',
      time: '',
      duration: 60,
      description: ''
    });
  };

  const startSession = (sessionId) => {
    // Navigate to the video conference page with session details
    navigate(`/dashboard/teacher/live-session/meeting/${sessionId}`);
  };

  const copyLink = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      alert('Meeting link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Live Sessions</h1>
          <p className="text-gray-600 mt-1">Schedule and manage your live teaching sessions</p>
        </div>
        <button
          onClick={() => setShowScheduleModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Schedule New Session
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Video className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Upcoming Sessions</h3>
              <p className="text-2xl font-bold text-gray-800">{scheduledSessions.length}</p>
            </div>
          </div>
        </div>
        {/* Add more stats cards as needed */}
      </div>

      {/* Scheduled Sessions List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Sessions</h2>
          <div className="space-y-4">
            {scheduledSessions.map((session) => (
              <div
                key={session.id}
                className="border rounded-lg p-6 hover:border-blue-200 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{session.title}</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{new Date(session.date).toLocaleDateString()}</span>
                        <Clock className="w-4 h-4 ml-4 mr-2" />
                        <span>{session.time}</span>
                        <span className="ml-2">({session.duration} minutes)</span>
                      </div>
                      <p className="text-gray-600">{session.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyLink(session.meetingLink)}
                      className="p-2 text-gray-600 hover:text-blue-600"
                      title="Copy meeting link"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => startSession(session.id)}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Start Session
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <LinkIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{session.meetingLink}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyLink(session.meetingLink)}
                      className="text-blue-600 text-sm hover:text-blue-700"
                    >
                      Copy Link
                    </button>
                    <button
                      className="text-blue-600 text-sm hover:text-blue-700 flex items-center"
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {scheduledSessions.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Video className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No upcoming sessions scheduled</p>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="mt-2 text-blue-600 hover:text-blue-700"
                >
                  Schedule your first session
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Schedule Session Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Schedule New Session</h3>
            <form onSubmit={handleScheduleSession}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Session Title</label>
                  <input
                    type="text"
                    value={newSession.title}
                    onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                    className="mt-1 block w-full rounded-md border p-2"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      value={newSession.date}
                      onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                      className="mt-1 block w-full rounded-md border p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <input
                      type="time"
                      value={newSession.time}
                      onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                      className="mt-1 block w-full rounded-md border p-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                  <select
                    value={newSession.duration}
                    onChange={(e) => setNewSession({...newSession, duration: parseInt(e.target.value)})}
                    className="mt-1 block w-full rounded-md border p-2"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1.5 hours</option>
                    <option value={120}>2 hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newSession.description}
                    onChange={(e) => setNewSession({...newSession, description: e.target.value})}
                    className="mt-1 block w-full rounded-md border p-2"
                    rows={3}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Schedule Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveSession;