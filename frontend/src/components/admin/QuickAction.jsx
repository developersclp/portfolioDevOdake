import { Link } from 'react-router-dom';

function QuickAction({ title, icon: Icon, path, color }) {
  return (
    <Link 
      to={path}
      className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-accent/40 transition-all group"
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${color} text-white group-hover:scale-110 transition-transform`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-sm font-medium text-text-secondary group-hover:text-white transition-colors text-center">{title}</span>
    </Link>
  );
}

export default QuickAction;
