import { ArrowLeft, Award, Zap, Target, Trophy, Lock, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';

const achievements = [
  {
    id: 1,
    title: 'First Steps',
    description: 'Complete your first mood check-in',
    icon: '🎯',
    points: 10,
    unlocked: true,
    unlockedDate: 'Jan 12, 2026',
    rarity: 'common',
  },
  {
    id: 2,
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    points: 50,
    unlocked: true,
    unlockedDate: 'Jan 18, 2026',
    rarity: 'rare',
  },
  {
    id: 3,
    title: 'Evaluation Expert',
    description: 'Complete 10 micro-evaluations',
    icon: '📊',
    points: 30,
    unlocked: true,
    unlockedDate: 'Jan 16, 2026',
    rarity: 'common',
  },
  {
    id: 4,
    title: 'Exercise Champion',
    description: 'Complete all weekly exercises 4 weeks in a row',
    icon: '💪',
    points: 100,
    unlocked: false,
    progress: 75,
    rarity: 'epic',
  },
  {
    id: 5,
    title: 'Mood Master',
    description: 'Track your mood for 30 consecutive days',
    icon: '🌟',
    points: 150,
    unlocked: false,
    progress: 23,
    rarity: 'legendary',
  },
  {
    id: 6,
    title: 'Early Bird',
    description: 'Complete check-ins before 9 AM for 5 days',
    icon: '🌅',
    points: 40,
    unlocked: false,
    progress: 60,
    rarity: 'rare',
  },
  {
    id: 7,
    title: 'Consistent Progress',
    description: 'Show improvement for 3 weeks straight',
    icon: '📈',
    points: 75,
    unlocked: false,
    progress: 40,
    rarity: 'epic',
  },
  {
    id: 8,
    title: 'Support Network',
    description: 'Attend 10 therapy sessions',
    icon: '🤝',
    points: 80,
    unlocked: false,
    progress: 70,
    rarity: 'rare',
  },
];

const milestones = [
  { points: 0, level: 1, title: 'Beginner', color: 'gray' },
  { points: 100, level: 2, title: 'Explorer', color: 'blue' },
  { points: 250, level: 3, title: 'Achiever', color: 'purple' },
  { points: 500, level: 4, title: 'Champion', color: 'orange' },
  { points: 1000, level: 5, title: 'Legend', color: 'yellow' },
];

const currentPoints = 90;
const currentLevel = milestones.filter(m => currentPoints >= m.points).slice(-1)[0];
const nextLevel = milestones.find(m => m.points > currentPoints);
const progressToNext = nextLevel ? ((currentPoints - currentLevel.points) / (nextLevel.points - currentLevel.points)) * 100 : 100;

export default function Achievements() {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-200 text-gray-700';
      case 'rare': return 'bg-blue-200 text-blue-700';
      case 'epic': return 'bg-purple-200 text-purple-700';
      case 'legendary': return 'bg-yellow-200 text-yellow-700';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Back Button */}
      <Link
        to="/patient/home"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </Link>

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-sm p-8 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold mb-2">Your Achievements</h1>
            <p className="opacity-90">Keep up the great work! Every step counts.</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Trophy className="w-8 h-8" />
              <div>
                <p className="text-sm opacity-90">Total Points</p>
                <p className="text-3xl font-bold">{currentPoints}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Level {currentLevel.level}: {currentLevel.title}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {nextLevel ? `${nextLevel.points - currentPoints} points until ${nextLevel.title}` : 'Max level reached!'}
            </p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {currentLevel.level}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${progressToNext}%` }}
            >
              {progressToNext > 10 && (
                <span className="text-xs text-white font-medium">{Math.round(progressToNext)}%</span>
              )}
            </div>
          </div>
        </div>

        {/* Level Milestones */}
        <div className="grid grid-cols-5 gap-2">
          {milestones.map((milestone) => {
            const isAchieved = currentPoints >= milestone.points;
            return (
              <div
                key={milestone.level}
                className={`text-center p-3 rounded-lg border-2 transition-all ${
                  isAchieved
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="text-2xl mb-1">
                  {isAchieved ? '🏆' : '🔒'}
                </div>
                <p className="text-xs font-medium text-gray-900">{milestone.title}</p>
                <p className="text-xs text-gray-600">{milestone.points} pts</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Unlocked</p>
              <p className="text-3xl font-bold text-[#4A90E2] mt-1">
                {achievements.filter(a => a.unlocked).length}
              </p>
              <p className="text-xs text-gray-500 mt-1">of {achievements.length} total</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-[#4A90E2]" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Current Streak</p>
              <p className="text-3xl font-bold text-[#FFA500] mt-1">7</p>
              <p className="text-xs text-gray-500 mt-1">days in a row</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#FFA500]" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">In Progress</p>
              <p className="text-3xl font-bold text-[#7ED957] mt-1">
                {achievements.filter(a => !a.unlocked).length}
              </p>
              <p className="text-xs text-gray-500 mt-1">achievements left</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-[#7ED957]" />
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">All Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`rounded-lg border-2 p-6 transition-all ${
                achievement.unlocked
                  ? getRarityColor(achievement.rarity)
                  : 'border-gray-200 bg-gray-50 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                    achievement.unlocked ? 'bg-white' : 'bg-gray-200'
                  }`}>
                    {achievement.unlocked ? achievement.icon : '🔒'}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${achievement.unlocked ? 'text-gray-900' : 'text-gray-600'}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${achievement.unlocked ? 'text-gray-700' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getRarityBadge(achievement.rarity)}`}>
                  {achievement.rarity}
                </span>
              </div>

              {achievement.unlocked ? (
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-sm text-gray-600">Unlocked {achievement.unlockedDate}</span>
                  <div className="flex items-center space-x-1 text-[#4A90E2] font-medium">
                    <Star className="w-4 h-4" />
                    <span>+{achievement.points} pts</span>
                  </div>
                </div>
              ) : (
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{achievement.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#4A90E2] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Encouragement */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <TrendingUp className="w-6 h-6 text-[#4A90E2] flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Keep Building Your Momentum!</h3>
            <p className="text-sm text-gray-700">
              You're making amazing progress! Each achievement represents a real step forward in your mental health journey. 
              Your consistency and effort are truly paying off. 🌟
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}