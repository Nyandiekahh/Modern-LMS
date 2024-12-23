import React, { useState } from 'react';
import { Play, Download, Clock, Calendar, Search, Filter } from 'lucide-react';

const SessionRecordings = () => {
  const [recordings, setRecordings] = useState([
    {
      id: 1,
      title: 'Web Development Basics',
      date: '2024-03-20',
      duration: '1:15:00',
      thumbnail: '/api/placeholder/320/180',
      views: 24,
      fileSize: '256MB'
    },
    {
      id: 2,
      title: 'Advanced CSS Techniques',
      date: '2024-03-18',
      duration: '1:30:00',
      thumbnail: '/api/placeholder/320/180',
      views: 18,
      fileSize: '320MB'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const filteredRecordings = recordings
    .filter(recording => 
      recording.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === 'views') {
        return b.views - a.views;
      }
      if (sortBy === 'duration') {
        return b.duration.localeCompare(a.duration);
      }
      return 0;
    });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Session Recordings</h2>
        
        <div className="flex space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search recordings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg appearance-none bg-white"
            >
              <option value="date">Sort by Date</option>
              <option value="views">Sort by Views</option>
              <option value="duration">Sort by Duration</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecordings.map((recording) => (
          <div key={recording.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative">
              <img
                src={recording.thumbnail}
                alt={recording.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button className="p-3 bg-white rounded-full text-blue-600">
                  <Play className="w-6 h-6" />
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                {recording.duration}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{recording.title}</h3>
              
              <div className="flex items-center text-gray-600 text-sm mb-3">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{new Date(recording.date).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <Clock className="w-4 h-4 mr-1" />
                <span>{recording.duration}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{recording.views} views</span>
                <button className="flex items-center text-blue-600 hover:text-blue-700">
                  <Download className="w-4 h-4 mr-1" />
                  <span>{recording.fileSize}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRecordings.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No recordings found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default SessionRecordings;