import React, { useState } from 'react';
import { Calendar, Clock, Users, Link, Plus, AlertCircle, Trash, Edit2 } from 'lucide-react';

const SessionScheduler = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: 'Web Development Basics',
      date: '2024-03-25',
      time: '10:00',
      duration: 60,
      participants: ['All Students'],
      description: 'Introduction to HTML and CSS',
      meetingLink: 'https://meet.eduverse.com/abc123'
    }
  ]);

  const [showNewSession, setShowNewSession] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    date: '',
    time: '',
    duration: 60,
    description: '',
    participants: ['All Students']
  });

  const [editingSession, setEditingSession] = useState(null);

  const createSession = (e) => {
    e.preventDefault();
    if (!newSession.title || !newSession.date || !newSession.time) return;

    const sessionToAdd = {
      id: sessions.length + 1,
      ...newSession,
      meetingLink: `https://meet.eduverse.com/${Math.random().toString(36).substr(2, 6)}`
    };

    setSessions([...sessions, sessionToAdd]);
    setNewSession({
      title: '',
      date: '',
      time: '',
      duration: 60,
      description: '',
      participants: ['All Students']
    });
    setShowNewSession(false);
  };

  const deleteSession = (id) => {
    setSessions(sessions.filter(session => session.id !== id));
  };

  const startEditing = (session) => {
    setEditingSession(session);
    setNewSession(session);
    setShowNewSession(true);
  };

  const updateSession = (e) => {
    e.preventDefault();
    setSessions(sessions.map(session => 
      session.id === editingSession.id ? { ...newSession, id: session.id } : session
    ));
    setNewSession({
      title: '',
      date: '',
      time: '',
      duration: 60,
      description: '',
      participants: ['All Students']
    });
    setEditingSession(null);
    setShowNewSession(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Live Sessions</h2>
        <button
          onClick={() => setShowNewSession(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Session</span>
        </button>
      </div>

      {showNewSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingSession ? 'Edit Session' : 'Schedule New Session'}
            </h3>
            <form onSubmit={editingSession ? updateSession : createSession}>
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
                  onClick={() => {
                    setShowNewSession(false);
                    setEditingSession(null);
                  }}
                  className="px-4 py-2 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {editingSession ? 'Update Session' : 'Create Session'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {sessions.map((session) => (
          <div key={session.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{session.title}</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(session.date).toLocaleDateString()}</span>
                    <Clock className="w-4 h-4 ml-4 mr-2" />
                    <span>{session.time}</span>
                    <span className="ml-2">({session.duration} minutes)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{session.participants.join(', ')}</span>
                  </div>
                  {session.description && (
                    <p className="text-gray-600 mt-2">{session.description}</p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => startEditing(session)}
                  className="p-2 text-gray-600 hover:text-blue-600"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteSession(session.id)}
                  className="p-2 text-gray-600 hover:text-red-600"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Link className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600">{session.meetingLink}</span>
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(session.meetingLink)}
                className="text-blue-600 text-sm"
              >
                Copy Link
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionScheduler;