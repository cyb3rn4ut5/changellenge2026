import React from 'react';
import './LanguageSelection.css';

export default function LanguageSelection({ onSelect }) {
  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }, // Hindi added
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'kk', name: 'Қазақша', flag: '🇰🇿' },
    { code: 'tg', name: 'Тоҷикӣ', flag: '🇹🇯' },
    { code: 'uz', name: 'Oʻzbekcha', flag: '🇺🇿' },
  ];

  return (
    <div className="language-container">
      <h2 className="language-title">
        <span className="chartreuse">Выберите язык</span>
        <span className="white"> / Choose language</span>
      </h2>
      
      <div className="language-grid">
        {languages.map(lang => (
          <button
            key={lang.code}
            className="language-button"
            onClick={() => onSelect(lang.code)}
          >
            <span className="flag">{lang.flag}</span>
            <span className="lang-name">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}