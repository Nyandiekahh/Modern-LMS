import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Camera, Mic, Share2, MessageSquare, Users, Layout, X } from 'lucide-react';
import ParticipantsList from './components/ParticipantsList';
import BreakoutRooms from './components/BreakoutRooms';
import WhiteboardTool from './components/WhiteboardTool';
import AIAssistant from './AIAssistant';

const Meeting = () => {
  const { sessionId } = useParams();
  const [localStream, setLocalStream] = useState(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeTab, setActiveTab] = useState('participants');
  const videoRef = useRef(null);

  const tabs = {
    participants: <ParticipantsList />,
    breakout: <BreakoutRooms />,
    whiteboard: <WhiteboardTool />,
    ai: <AIAssistant />
  };

  useEffect(() => {
    initializeMedia();
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setLocalStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
      }
    }
  };

  const shareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      });
      if (videoRef.current) {
        videoRef.current.srcObject = screenStream;
      }
      setIsScreenSharing(true);
      
      screenStream.getVideoTracks()[0].onended = () => {
        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
        }
        setIsScreenSharing(false);
      };
    } catch (err) {
      console.error('Error sharing screen:', err);
      setIsScreenSharing(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Live Session</h1>
        <p className="text-gray-600">Session ID: {sessionId}</p>
      </div>

      {/* Main content */}
      <div className="flex gap-6">
        {/* Video and controls section */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4">
            {/* Video grid */}
            <div className="grid grid-cols-2 gap-4 mb-4" style={{ height: "calc(100vh - 400px)" }}>
              <div className="bg-gray-800 rounded-lg flex items-center justify-center relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                  You
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-white">Waiting for others to join...</div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between p-4 border-t">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleVideo}
                  className={`p-3 rounded-full ${
                    isVideoOn ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                  }`}
                  title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
                >
                  <Camera />
                </button>
                <button
                  onClick={toggleAudio}
                  className={`p-3 rounded-full ${
                    isAudioOn ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                  }`}
                  title={isAudioOn ? 'Mute microphone' : 'Unmute microphone'}
                >
                  <Mic />
                </button>
                <button
                  onClick={shareScreen}
                  className={`p-3 rounded-full ${
                    isScreenSharing ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                  }`}
                  title="Share screen"
                >
                  <Share2 />
                </button>
              </div>

              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                End Meeting
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('participants')}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === 'participants' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
              }`}
            >
              <Users className="w-4 h-4 mx-auto mb-1" />
              Participants
            </button>
            <button
              onClick={() => setActiveTab('breakout')}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === 'breakout' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
              }`}
            >
              <Layout className="w-4 h-4 mx-auto mb-1" />
              Breakout
            </button>
            <button
              onClick={() => setActiveTab('whiteboard')}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === 'whiteboard' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
              }`}
            >
              <MessageSquare className="w-4 h-4 mx-auto mb-1" />
              Whiteboard
            </button>
          </div>

          {/* Active tab content */}
          <div className="p-4">
            {tabs[activeTab]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meeting;