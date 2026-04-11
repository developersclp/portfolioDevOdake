function StatCard({ title, count, icon: Icon, colorClass }) {
  return (
    <div className="glass-card p-6 flex items-center gap-6 group hover:border-accent/50 transition-all duration-300">
      <div className={`p-4 rounded-xl ${colorClass} text-white shadow-lg group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-3xl font-bold text-white mb-1">{count}</p>
        <p className="text-text-muted text-sm font-medium uppercase tracking-wider">{title}</p>
      </div>
    </div>
  );
}

export default StatCard;
