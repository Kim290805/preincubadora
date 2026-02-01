import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle, Copy, Mail, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

interface CredentialsConfirmationProps {
  credentials: {
    username: string;
    password: string;
  };
  onComplete: () => void;
}

export default function CredentialsConfirmation({ credentials, onComplete }: CredentialsConfirmationProps) {
  const [emailSent, setEmailSent] = useState(false);
  const [copied, setCopied] = useState<'username' | 'password' | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleCopy = (text: string, type: 'username' | 'password') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    // Mock email sending
    setTimeout(() => {
      // In production, this would trigger an actual email
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="bg-green-100 p-4 rounded-full"
              >
                <CheckCircle className="w-16 h-16 text-green-600" />
              </motion.div>
            </div>
            <CardTitle className="text-3xl">¡Paciente Creado Exitosamente!</CardTitle>
            <CardDescription className="text-base">
              Las credenciales de acceso han sido generadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Credentials display */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-[#4A90E2] rounded-lg p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Usuario Generado
                  </label>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(credentials.username, 'username')}
                    className="h-8"
                  >
                    {copied === 'username' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <div className="bg-white rounded-lg p-3 font-mono text-lg font-bold text-[#4A90E2]">
                  {credentials.username}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Contraseña Temporal
                  </label>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      className="h-8"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy(credentials.password, 'password')}
                      className="h-8"
                    >
                      {copied === 'password' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 font-mono text-lg font-bold text-[#4A90E2]">
                  {showPassword ? credentials.password : '••••••••'}
                </div>
              </div>
            </div>

            {/* Important note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong className="text-yellow-800">⚠️ Importante:</strong> Asegúrate de guardar estas credenciales antes de continuar. El paciente deberá cambiar su contraseña en el primer inicio de sesión.
              </p>
            </div>

            {/* Send email button */}
            <Button
              onClick={handleSendEmail}
              disabled={emailSent}
              className={`w-full text-lg py-6 ${
                emailSent 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-[#4A90E2] hover:bg-[#3A7BC8]'
              }`}
            >
              {emailSent ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Email Enviado
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5 mr-2" />
                  Enviar por Email
                </>
              )}
            </Button>

            {emailSent && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-green-600 font-medium"
              >
                Las credenciales han sido enviadas al paciente
              </motion.div>
            )}

            {/* Continue button */}
            <Button
              onClick={onComplete}
              variant="outline"
              className="w-full text-lg py-6 border-2"
            >
              Ir al Dashboard
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
