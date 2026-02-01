import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { 
  FileText, 
  Mic, 
  Square, 
  Play,
  Pause,
  Trash2,
  ChevronRight,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';

interface InitialNoteProps {
  onComplete: () => void;
}

export default function InitialNote({ onComplete }: InitialNoteProps) {
  const navigate = useNavigate();
  const [noteText, setNoteText] = useState('');
  const [recordingMode, setRecordingMode] = useState<'text' | 'audio'>('text');
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

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('No se pudo acceder al micrófono. Por favor verifica los permisos.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
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

  const handleSubmit = () => {
    // Save the note (text or audio)
    const noteData = {
      type: recordingMode,
      text: recordingMode === 'text' ? noteText : null,
      audio: recordingMode === 'audio' && audioBlob ? 'audio_recorded' : null,
      date: new Date().toISOString()
    };
    
    localStorage.setItem('initialNote', JSON.stringify(noteData));
    onComplete();
    navigate('/patient/home');
  };

  const handleSkip = () => {
    onComplete();
    navigate('/patient/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-blue-50 p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl border-2 border-blue-100">
          <CardHeader className="text-center border-b border-gray-100 pb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-[#4A90E2] to-[#7ED957] p-4 rounded-full">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl">Nota Inicial (Opcional)</CardTitle>
            <CardDescription className="text-base">
              Comparte tus pensamientos, expectativas o cualquier cosa que quieras que tu psicólogo sepa
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            {/* Mode Selector */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setRecordingMode('text')}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                  recordingMode === 'text'
                    ? 'border-[#4A90E2] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FileText className="w-6 h-6 mx-auto mb-2 text-[#4A90E2]" />
                <p className="font-medium">Texto</p>
              </button>
              <button
                onClick={() => setRecordingMode('audio')}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                  recordingMode === 'audio'
                    ? 'border-[#4A90E2] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Mic className="w-6 h-6 mx-auto mb-2 text-[#4A90E2]" />
                <p className="font-medium">Audio</p>
              </button>
            </div>

            {/* Text Mode */}
            {recordingMode === 'text' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <Textarea
                  placeholder="Escribe aquí tus pensamientos, expectativas, preocupaciones o cualquier cosa que quieras compartir con tu psicólogo..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={10}
                  className="resize-none text-base"
                />
                <p className="text-sm text-gray-500 text-right">
                  {noteText.length} caracteres
                </p>
              </motion.div>
            )}

            {/* Audio Mode */}
            {recordingMode === 'audio' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {!audioBlob ? (
                  <>
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 text-center">
                      <div className="flex justify-center mb-4">
                        <motion.div
                          animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className={`w-24 h-24 rounded-full flex items-center justify-center ${
                            isRecording
                              ? 'bg-gradient-to-br from-red-500 to-orange-500'
                              : 'bg-gradient-to-br from-[#4A90E2] to-[#7ED957]'
                          }`}
                        >
                          <Mic className="w-12 h-12 text-white" />
                        </motion.div>
                      </div>

                      {isRecording && (
                        <div className="mb-4">
                          <p className="text-3xl font-bold text-gray-900 mb-1">
                            {formatTime(recordingTime)}
                          </p>
                          <p className="text-sm text-gray-600">Grabando...</p>
                        </div>
                      )}

                      <Button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`${
                          isRecording
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90'
                        }`}
                        size="lg"
                      >
                        {isRecording ? (
                          <>
                            <Square className="w-5 h-5 mr-2" />
                            Detener Grabación
                          </>
                        ) : (
                          <>
                            <Mic className="w-5 h-5 mr-2" />
                            Comenzar a Grabar
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        💡 <strong>Tip:</strong> Habla con naturalidad. Puedes compartir cómo te sientes, qué esperas de la terapia, o cualquier preocupación que tengas.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#4A90E2] to-[#7ED957] rounded-full flex items-center justify-center">
                          <Check className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-lg">Audio Grabado</p>
                          <p className="text-sm text-gray-600">
                            Duración: {formatTime(recordingTime)}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={deleteAudio}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button
                      onClick={playAudio}
                      className="w-full bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90"
                      size="lg"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-5 h-5 mr-2" />
                          Pausar
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Reproducir
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <Button
                onClick={handleSkip}
                variant="outline"
                className="flex-1"
              >
                Omitir este paso
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={
                  recordingMode === 'text' 
                    ? noteText.trim().length === 0 
                    : !audioBlob
                }
                className="flex-1 bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90 disabled:opacity-50"
              >
                Completar Registro
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              Esta información será compartida solo con tu psicólogo asignado
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}