import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Heart, Lock, User, AlertCircle } from 'lucide-react';

interface PatientLoginProps {
  onLoginSuccess: (isFirstTime: boolean) => void;
}

export default function PatientLogin({ onLoginSuccess }: PatientLoginProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple validation - password must be "123"
    setTimeout(() => {
      if (username && password === '123') {
        // Mock check if it's first time login
        const isFirstTime = username.includes('first');
        onLoginSuccess(isFirstTime);
        
        if (isFirstTime) {
          navigate('/patient/welcome');
        } else {
          navigate('/patient/home');
        }
      } else {
        setError('Credenciales incorrectas. Contraseña debe ser "123"');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-[#4A90E2] to-[#7ED957] p-4 rounded-full">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">¡Bienvenido a MindGo!</CardTitle>
          <CardDescription>
            Inicia sesión con las credenciales que te envió tu psicólogo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90"
              disabled={loading}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              <p>¿Olvidaste tu contraseña?</p>
              <button
                type="button"
                className="text-[#4A90E2] hover:underline"
                onClick={() => alert('Contacta a tu psicólogo para recuperar tu contraseña')}
              >
                Contactar a mi psicólogo
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}