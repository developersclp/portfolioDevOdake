function SectionTitle({ title, subtitle, align = 'center' }) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`mb-16 ${alignClass}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
        {title.split(' ').map((word, i, arr) =>
          i === arr.length - 1 ? (
            <span key={i} className="gradient-text"> {word}</span>
          ) : (
            <span key={i}>{word} </span>
          )
        )}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`mt-6 flex ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
        <div className="w-20 h-1 bg-gradient-accent rounded-full" />
      </div>
    </div>
  );
}

export default SectionTitle;
