import React, { useState } from 'react';
import { Mic, MicOff, Camera, CameraOff, Hand, MoreVertical } from 'lucide-react';

const ParticipantsList = () => {
  const [participants, setParticipants] = useState([
    { id: 1, name: 'John Doe (Host)', isHost: true, audio: true, video: true, handRaised: false },
    { id: 2, name: 'Jane Smith', isHost: false, audio: true, video: true, handRaised: false },
    { id: 3, name: 'Mike Johnson', isHost: false, audio: false, video: true, handRaised: true },
    { id: 4, name: 'Sarah Wilson', isHost: false, audio: true, video: false, handRaised: false },
  ]);

  const toggleParticipantAudio = (id) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, audio: !p.audio } : p
    ));
  };

  const toggleParticipantVideo = (id) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, video: !p.video } : p
    ));
  };

  const toggleHandRaise = (id) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, handRaised: !p.handRaised } : p
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Participants ({participants.length})</h3>
        <button className="text-blue-600 text-sm">Invite</button>
      </div>

      <div className="space-y-2">
        {participants.map((participant) => (
          <div 
            key={participant.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                {participant.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">
                  {participant.name}
                  {participant.handRaised && (
                    <Hand className="w-4 h-4 text-yellow-500 inline ml-2" />
                  )}
                </p>
                {participant.isHost && (
                  <span className="text-xs text-gray-500">Host</span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleParticipantAudio(participant.id)}
                className={`p-1 rounded-full ${
                  participant.audio ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {participant.audio ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => toggleParticipantVideo(participant.id)}
                className={`p-1 rounded-full ${
                  participant.video ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {participant.video ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
              </button>
              <button className="p-1 rounded-full text-gray-400">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsList;