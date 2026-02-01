import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { motion } from 'motion/react';
import { Smile, Frown, Meh, Heart, CheckCircle } from 'lucide-react';

export default function DailyCheckIn() {
  const navigate = useNavigate();
  const [moodValue, setMoodValue] = useState<number[]>([5]);
  const [saved, setSaved] = useState(false);

  const getMoodEmoji = (value: number) => {
    if (value <= 3) return { emoji: '😢', color: 'text-red-500', label: 'Muy mal' };
    if (value <= 4) return { emoji: '😟', color: 'text-orange-500', label: 'Mal' };
    if (value <= 6) return { emoji: '😐', color: 'text-yellow-500', label: 'Regular' };
    if (value <= 8) return { emoji: '🙂', color: 'text-green-500', label: 'Bien' };
    return { emoji: '😊', color: 'text-emerald-500', label: 'Muy bien' };
  };

  const currentMood = getMoodEmoji(moodValue[0]);

  const handleSave = () => {
    // Save check-in data
    const checkInData = {
      mood: moodValue[0],
      date: new Date().toISOString(),
      timestamp: Date.now()
    };
    
    // Get existing check-ins
    const existingCheckIns = JSON.parse(localStorage.getItem('dailyCheckIns') || '[]');
    existingCheckIns.push(checkInData);
    localStorage.setItem('dailyCheckIns', JSON.stringify(existingCheckIns));
    
    setSaved(true);
    
    // Redirect after 2 seconds
    setTimeout(() => {
      navigate('/patient/home');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-2xl border-2 border-blue-100">
          <CardHeader className="text-center border-b border-gray-100 pb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-[#4A90E2] to-[#7ED957] p-4 rounded-full">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl">Check-in Rápido</CardTitle>
            <CardDescription className="text-base">
              ¿Cómo te sientes hoy?
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            {!saved ? (
              <>
                {/* Emoji Display */}
                <motion.div
                  key={moodValue[0]}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center mb-8"
                >
                  <div className="text-8xl mb-4">{currentMood.emoji}</div>
                  <p className={`text-2xl font-bold ${currentMood.color}`}>
                    {currentMood.label}
                  </p>
                </motion.div>

                {/* Mood Slider */}
                <div className="mb-8">
                  <div className="flex justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">1</span>
                    <span className="text-lg font-bold text-gray-900">{moodValue[0]}</span>
                    <span className="text-sm font-medium text-gray-600">10</span>
                  </div>
                  <Slider
                    value={moodValue}
                    onValueChange={setMoodValue}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Muy mal</span>
                    <span>Muy bien</span>
                  </div>
                </div>

                {/* Quick Mood Icons */}
                <div className="grid grid-cols-5 gap-2 mb-8">
                  {[1, 3, 5, 7, 10].map((value) => {
                    const mood = getMoodEmoji(value);
                    return (
                      <button
                        key={value}
                        onClick={() => setMoodValue([value])}
                        className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                          moodValue[0] === value
                            ? 'border-[#4A90E2] bg-blue-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="text-3xl">{mood.emoji}</div>
                        <div className="text-xs mt-1">{value}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Save Button */}
                <Button
                  onClick={handleSave}
                  className="w-full bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90 text-lg py-6"
                >
                  Guardar Check-in
                </Button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Tu psicólogo podrá ver esta información
                </p>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  ¡Check-in Guardado!
                </h3>
                <p className="text-gray-600">
                  Gracias por compartir cómo te sientes hoy
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
