import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle,
  FileText,
  Mic,
  Upload,
  Play,
  Pause,
  X,
  AlertCircle,
  Image as ImageIcon,
  File
} from 'lucide-react';

// Mock task data
const mockTask = {
  id: 1,
  title: 'Reflexión Semanal',
  description: 'Reflexiona sobre tu semana. Puedes escribir tus pensamientos, grabar un audio explicando cómo te sentiste, o subir un documento con tus reflexiones.',
  dueDate: '2026-02-05',
  completed: false,
  points: 20,
  icon: '💭',
  assignedBy: 'Dr. María González'
};

export default function TaskDetail() {
  const navigate = useNavigate();
  
  // Multiple response types
  const [textResponse, setTextResponse] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      const mockBlob = new Blob(['mock audio data'], { type: 'audio/mp3' });
      setAudioBlob(mockBlob);
      setRecordingTime(0);
    } else {
      // Start recording
      setIsRecording(true);
      // Mock recording timer
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
      }, 10000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const hasContent = 
      textResponse.trim() || 
      audioBlob || 
      uploadedFiles.length > 0;

    if (hasContent) {
      setShowSuccessModal(true);
      setTimeout(() => {
        navigate('/patient/tasks');
      }, 2000);
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) {
      return <ImageIcon className="w-6 h-6 text-blue-600" />;
    }
    return <File className="w-6 h-6 text-gray-600" />;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const hasAnyContent = textResponse.trim() || audioBlob || uploadedFiles.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4A90E2] to-[#7ED957] text-white p-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() => navigate('/patient/tasks')}
          className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Volver a Tareas</span>
        </button>
        
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
            <span className="text-4xl">{mockTask.icon}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold mb-1">{mockTask.title}</h1>
            <p className="text-sm opacity-90">Asignada por {mockTask.assignedBy}</p>
            <p className="text-xs opacity-75 mt-1">Vence: {new Date(mockTask.dueDate).toLocaleDateString('es-ES')}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Task Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
        >
          <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span>📋</span>
            Instrucciones
          </h3>
          <p className="text-gray-700 leading-relaxed">{mockTask.description}</p>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-800 font-medium">
              💡 Puedes responder de múltiples formas: texto, audio, o archivos multimedia
            </p>
          </div>
        </motion.div>

        {/* Text Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
        >
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Escribe tu respuesta
          </h3>
          <textarea
            value={textResponse}
            onChange={(e) => setTextResponse(e.target.value)}
            placeholder="Escribe aquí tus reflexiones..."
            className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl focus:border-[#4A90E2] focus:outline-none resize-none text-gray-900"
          />
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {textResponse.length} caracteres
            </span>
            {textResponse.length > 0 && textResponse.length < 30 && (
              <span className="text-xs text-orange-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Al menos 30 caracteres
              </span>
            )}
          </div>
        </motion.div>

        {/* Audio Recording Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
        >
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Mic className="w-5 h-5 text-purple-600" />
            Graba un audio
          </h3>
          
          <div className="flex flex-col items-center justify-center py-6">
            <button
              onClick={handleRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all ${
                isRecording
                  ? 'bg-gradient-to-br from-red-500 to-orange-500 animate-pulse'
                  : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-110'
              }`}
            >
              {isRecording ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </button>
            <p className="mt-3 text-sm text-gray-600">
              {isRecording ? 'Grabando... Presiona para detener' : 'Presiona para grabar tu reflexión'}
            </p>
            {isRecording && (
              <div className="mt-2 flex items-center gap-2 text-red-600">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                <span className="text-sm font-medium">REC {formatTime(recordingTime)}</span>
              </div>
            )}
          </div>

          {audioBlob && (
            <div className="mt-4 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </button>
                  <div>
                    <p className="font-medium text-gray-900">Audio grabado ✓</p>
                    <p className="text-xs text-gray-600">Duración: {formatTime(recordingTime || 32)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setAudioBlob(null)}
                  className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* File Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
        >
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-green-600" />
            Sube archivos multimedia
          </h3>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="*/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-[#4A90E2] hover:bg-blue-50 transition-all"
          >
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-3">
                <Upload className="w-7 h-7 text-green-600" />
              </div>
              <p className="font-medium text-gray-900 mb-1">Seleccionar archivos</p>
              <p className="text-sm text-gray-600">PDF, imágenes, documentos, videos</p>
              <p className="text-xs text-gray-500 mt-1">(Puedes seleccionar múltiples archivos)</p>
            </div>
          </button>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="p-3 bg-green-50 rounded-xl border-2 border-green-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      {getFileIcon(file.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm truncate">{file.name}</p>
                      <p className="text-xs text-gray-600">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Points Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-5 border-2 border-yellow-200"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">⭐</span>
            <div>
              <h4 className="font-bold text-gray-900">Ganarás {mockTask.points} puntos</h4>
              <p className="text-sm text-gray-700">Al completar esta tarea</p>
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleSubmit}
          disabled={!hasAnyContent}
          className="w-full bg-gradient-to-r from-[#4A90E2] to-[#7ED957] text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-6 h-6" />
          Completar Tarea
        </motion.button>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-[#7ED957] to-[#4A90E2] rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Tarea Completada!
            </h3>
            <p className="text-gray-600 mb-4">
              Has ganado {mockTask.points} puntos
            </p>
            <div className="text-4xl">🎉</div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
