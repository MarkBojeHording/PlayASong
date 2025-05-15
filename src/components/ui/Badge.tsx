import React from 'react';

interface BadgeProps {
  label: string;
  icon: React.ReactNode;
  color?: 'teal' | 'coral';
}

const Badge: React.FC<BadgeProps> = ({ label, icon, color = 'teal' }) => {
  const colorClasses = {
    teal: 'bg-teal-900 text-white',
    coral: 'bg-coral-500 text-white',
  };

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full ${colorClasses[color]} text-sm font-medium`}>
      <span className="mr-1">{icon}</span>
      {label}
    </div>
  );
};

export default Badge;
