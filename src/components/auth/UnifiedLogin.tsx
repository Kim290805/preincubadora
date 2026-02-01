import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Heart, User, Lock, ArrowRight } from 'lucide-react';

interface UnifiedLoginProps {
  onLoginSuccess: (userType: 'patient' | 'psychologist', isFirstTime: boolean) => void;
}

export default function UnifiedLogin({ onLoginSuccess }: UnifiedLoginProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      // Check if psychologist (password: admin124)
      if (password === 'admin124') {
        onLoginSuccess('psychologist', false);
        navigate('/psychologist/dashboard');
        return;
      }

      // Check if patient (password: 123)
      if (password === '123') {
        // Check if first time (username contains "first" or "new")
        const isFirstTime = username.toLowerCase().includes('first') || 
                           username.toLowerCase().includes('new') ||
                           !localStorage.getItem(`patient_${username}_onboarded`);
        
        onLoginSuccess('patient', isFirstTime);
        
        if (isFirstTime) {
          navigate('/patient/tutorial');
        } else {
          navigate('/patient/home');
        }
        return;
      }

      setError('Credenciales incorrectas');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#4A90E2] to-[#7ED957] rounded-3xl mb-4 shadow-xl"
          >
            <Heart className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">MindGo</h1>
          <p className="text-gray-600">Tu espacio de bienestar emocional</p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido</h2>
          <p className="text-sm text-gray-600 mb-6">
            Estas credenciales fueron enviadas por tu psicólogo
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#4A90E2] focus:bg-white focus:outline-none transition-all text-base"
                  placeholder="Tu usuario"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#4A90E2] focus:bg-white focus:outline-none transition-all text-base"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#4A90E2] to-[#7ED957] text-white font-bold py-4 rounded-xl hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                'Ingresando...'
              ) : (
                <>
                  Iniciar sesión
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              ¿Problemas para ingresar?
            </p>
            <button className="text-sm text-[#4A90E2] font-medium hover:underline mt-1">
              Contactar a mi psicólogo
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Tus datos están protegidos y son confidenciales
        </p>
      </motion.div>
    </div>
  );
}
