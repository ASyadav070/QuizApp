import { motion } from 'framer-motion';

const ProgressBar = ({ progress, label, color = 'blue' }) => {
  const colorVariants = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    indigo: 'bg-indigo-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
  };
  
  const bgColor = colorVariants[color] || colorVariants.blue;
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        {label && <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
        <motion.div 
          className={`h-full rounded-full ${bgColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, type: 'spring' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
