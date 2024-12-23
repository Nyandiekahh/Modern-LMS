import React, { useState } from 'react';
import { Plus, Users, Clock, ArrowRight } from 'lucide-react';

const BreakoutRooms = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: 'Group Discussion 1',
      participants: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      timeLimit: 15
    },
    {
      id: 2,
      name: 'Project Team A',
      participants: ['Sarah Wilson', 'Alex Brown'],
      timeLimit: 20
    }
  ]);

  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [selectedTimeLimit, setSelectedTimeLimit] = useState(15);

  const createRoom = () => {
    if (newRoomName.trim()) {
      setRooms([...rooms, {
        id: rooms.length + 1,
        name: newRoomName,
        participants: [],
        timeLimit: selectedTimeLimit
      }]);
      setNewRoomName('');
      setIsCreatingRoom(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Breakout Rooms</h3>
        <button
          onClick={() => setIsCreatingRoom(true)}
          className="text-blue-600 flex items-center space-x-1"
        >
          <Plus className="w-4 h-4" />
          <span>New Room</span>
        </button>
      </div>

      {isCreatingRoom && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <input
            type="text"
            placeholder="Room Name"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <select
            value={selectedTimeLimit}
            onChange={(e) => setSelectedTimeLimit(Number(e.target.value))}
            className="w-full p-2 border rounded-md"
          >
            <option value={15}>15 minutes</option>
            <option value={20}>20 minutes</option>
            <option value={30}>30 minutes</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsCreatingRoom(false)}
              className="px-3 py-1 text-sm text-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={createRoom}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md"
            >
              Create
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {rooms.map((room) => (
          <div key={room.id} className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{room.name}</h4>
              <button className="text-blue-600 text-sm flex items-center space-x-1">
                <span>Join</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{room.participants.length} participants</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{room.timeLimit} minutes</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {room.participants.map((participant, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
                >
                  {participant}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreakoutRooms;