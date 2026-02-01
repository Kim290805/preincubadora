import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { 
  BookOpen, 
  Mic, 
  Square, 
  Play,
  Pause,
  Trash2,
  Save,
  Tag,
  CheckCircle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function EmotionalJournal() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'text' | 'audio'>('text');
  const [journalText, setJournalText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const availableTags = [
    { id: 'anxiety', label: '#ansiedad', color: 'bg-red-100 text-red-700' },
    { id: 'family', label: '#familia', color: 'bg-blue-100 text-blue-700' },
    { id: 'work', label: '#trabajo', color: 'bg-purple-100 text-purple-700' },
    { id: 'sleep', label: '#sueño', color: 'bg-indigo-100 text-indigo-700' },
    { id: 'social', label: '#social', color: 'bg-green-100 text-green-700' },
    { id: 'health', label: '#salud', color: 'bg-orange-100 text-orange-700' },
    { id: 'mood', label: '#ánimo', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'stress', label: '#estrés', color: 'bg-pink-100 text-pink-700' }
  ];

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

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
      console.error('Error accessing microphone:', error);
      alert('No se pudo acceder al micrófono');
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

  const handleSave = () => {
    const journalEntry = {
      type: mode,
      text: mode === 'text' ? journalText : null,
      audio: mode === 'audio' && audioBlob ? 'audio_recorded' : null,
      tags: selectedTags,
      date: new Date().toISOString(),
      timestamp: Date.now()
    };

    // Save to localStorage
    const existingEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    existingEntries.push(journalEntry);
    localStorage.setItem('journalEntries', JSON.stringify(existingEntries));

    setSaved(true);
    setTimeout(() => navigate('/patient/home'), 2000);
  };

  const canSave = () => {
    if (mode === 'text') {
      return journalText.trim().length > 0;
    }
    return audioBlob !== null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-purple-50 p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {!saved ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="shadow-2xl border-2 border-purple-100">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Diario Emocional</CardTitle>
                      <CardDescription>
                        Comparte tus pensamientos y emociones del día
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                  {/* Mode Selector */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setMode('text')}
                      className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                        mode === 'text'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <BookOpen className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                      <p className="font-medium">Escribir</p>
                    </button>
                    <button
                      onClick={() => setMode('audio')}
                      className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                        mode === 'audio'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Mic className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                      <p className="font-medium">Grabar Audio</p>
                    </button>
                  </div>

                  {/* Text Mode */}
                  {mode === 'text' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <Textarea
                        placeholder="¿Qué sucedió hoy? ¿Cómo te sientes? ¿Qué pensamientos tienes?..."
                        value={journalText}
                        onChange={(e) => setJournalText(e.target.value)}
                        rows={12}
                        className="resize-none text-base"
                      />
                      <p className="text-sm text-gray-500 text-right">
                        {journalText.length} caracteres
                      </p>
                    </motion.div>
                  )}

                  {/* Audio Mode */}
                  {mode === 'audio' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {!audioBlob ? (
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 text-center">
                          <div className="flex justify-center mb-4">
                            <motion.div
                              animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className={`w-24 h-24 rounded-full flex items-center justify-center ${
                                isRecording
                                  ? 'bg-gradient-to-br from-red-500 to-orange-500'
                                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
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
                                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90'
                            }`}
                            size="lg"
                          >
                            {isRecording ? (
                              <>
                                <Square className="w-5 h-5 mr-2" />
                                Detener
                              </>
                            ) : (
                              <>
                                <Mic className="w-5 h-5 mr-2" />
                                Grabar
                              </>
                            )}
                          </Button>
                        </div>
                      ) : (
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="font-bold">Audio grabado</p>
                                <p className="text-sm text-gray-600">{formatTime(recordingTime)}</p>
                              </div>
                            </div>
                            <Button
                              onClick={deleteAudio}
                              variant="outline"
                              size="sm"
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button
                            onClick={playAudio}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
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

                  {/* Tags Section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-600" />
                      <label className="font-medium text-gray-900">
                        Etiquetas (opcional)
                      </label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <button
                          key={tag.id}
                          onClick={() => toggleTag(tag.id)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            selectedTags.includes(tag.id)
                              ? tag.color
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {selectedTags.includes(tag.id) && (
                            <CheckCircle className="w-3 h-3 inline mr-1" />
                          )}
                          {tag.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => navigate('/patient/home')}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={!canSave()}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Entrada
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center min-h-[400px]"
            >
              <Card className="shadow-2xl max-w-md w-full">
                <CardContent className="text-center py-12">
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    ¡Entrada Guardada!
                  </h3>
                  <p className="text-gray-600">
                    Tu registro emocional ha sido guardado correctamente
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
