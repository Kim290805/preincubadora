import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { MessageSquare, Mic, Square, Play, Pause, Trash2, ChevronRight } from 'lucide-react';

export default function OptionalNote() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'text' | 'audio'>('text');
  const [noteText, setNoteText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      alert('No se pudo acceder al micrófono');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const playAudio = () => {
    if (audioBlob && !audioRef.current) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audioRef.current = audio;
      audio.onended = () => {
        setIsPlaying(false);
        audioRef.current = null;
      };
      audio.play();
      setIsPlaying(true);
    } else if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const deleteAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setAudioBlob(null);
    setIsPlaying(false);
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSave = () => {
    const note = {
      type: mode,
      text: mode === 'text' ? noteText : null,
      audio: mode === 'audio' && audioBlob ? 'recorded' : null,
      date: new Date().toISOString()
    };
    localStorage.setItem('initialNote', JSON.stringify(note));
    completeOnboarding();
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = () => {
    const username = localStorage.getItem('currentUsername') || 'user';
    localStorage.setItem(`patient_${username}_onboarded`, 'true');
    navigate('/patient/home-new');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">¿Quieres escribir algo hoy?</h1>
            <p className="text-sm text-gray-600">Este paso es opcional</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Mode Selector */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMode('text')}
              className={`p-4 rounded-xl border-2 transition-all ${
                mode === 'text'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200'
              }`}
            >
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <p className="font-medium">Escribir</p>
            </button>
            <button
              onClick={() => setMode('audio')}
              className={`p-4 rounded-xl border-2 transition-all ${
                mode === 'audio'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200'
              }`}
            >
              <Mic className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <p className="font-medium">Grabar</p>
            </button>
          </div>

          {/* Text Mode */}
          {mode === 'text' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6"
            >
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Escribe cómo te sientes hoy, tus expectativas o cualquier cosa que quieras compartir..."
                className="w-full h-48 resize-none border-2 border-gray-200 rounded-xl p-4 focus:border-purple-500 focus:outline-none"
              />
              <p className="text-sm text-gray-500 mt-2 text-right">
                {noteText.length} caracteres
              </p>
            </motion.div>
          )}

          {/* Audio Mode */}
          {mode === 'audio' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6"
            >
              {!audioBlob ? (
                <div className="text-center py-8">
                  <motion.div
                    animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
                      isRecording
                        ? 'bg-gradient-to-br from-red-500 to-orange-500'
                        : 'bg-gradient-to-br from-purple-500 to-pink-500'
                    }`}
                  >
                    <Mic className="w-12 h-12 text-white" />
                  </motion.div>

                  {isRecording && (
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      {formatTime(recordingTime)}
                    </p>
                  )}

                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`px-6 py-3 rounded-xl font-bold text-white ${
                      isRecording
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <Square className="w-5 h-5 inline mr-2" />
                        Detener
                      </>
                    ) : (
                      <>
                        <Mic className="w-5 h-5 inline mr-2" />
                        Grabar
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-bold">Audio grabado</p>
                      <p className="text-sm text-gray-600">{formatTime(recordingTime)}</p>
                    </div>
                    <button
                      onClick={deleteAudio}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    onClick={playAudio}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5 inline mr-2" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 inline mr-2" />
                        Reproducir
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="p-6 bg-white border-t border-gray-200 space-y-3">
        <button
          onClick={handleSave}
          disabled={mode === 'text' ? !noteText.trim() : !audioBlob}
          className="w-full bg-gradient-to-r from-[#4A90E2] to-[#7ED957] text-white font-bold py-4 rounded-2xl hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          Guardar y continuar
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={handleSkip}
          className="w-full text-gray-600 font-medium py-3 rounded-2xl hover:bg-gray-100 transition-colors"
        >
          Omitir este paso
        </button>
      </div>
    </div>
  );
}
