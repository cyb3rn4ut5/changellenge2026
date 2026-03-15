import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen({ language, onComplete }) {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [fadeGreeting, setFadeGreeting] = useState(true);
  const [subtitle, setSubtitle] = useState('');

  console.log('LoadingScreen rendered with language:', language); // Debug log

  // Greetings in different languages (formal) with matching emojis
  const greetings = {
    ru: ['Здравствуйте 😊', '✨ Добро пожаловать'],
    en: ['Hello 😊', '✨ Welcome'],
    zh: ['您好 😊', '✨ 欢迎'],
    hi: ['नमस्ते 😊', '✨ स्वागत हे'],
    ar: ['مرحبا 😊', '✨ أهلا وسهلا'],
    kk: ['Сәлеметсіз бе 😊', '✨ Қош келдіңіз'],
    tg: ['Салом 😊', '✨ Хуш омадед'],
    uz: ['Assalomu alaykum 😊', '✨ Xush kelibsiz']
  };

  // Subtle footer messages
  const footers = {
    ru: 'ОТП Банк · Ваш финансовый помощник',
    en: 'OTP Bank · Your financial companion',
    zh: 'OTP银行 · 您的财务助手',
    hi: 'ओटीपी बैंक · आपका वित्तीय साथी',
    ar: 'OTP بنك · رفيقك المالي',
    kk: 'ОТП Банк · Сіздің қаржылық көмекшіңіз',
    tg: 'Бонки ОТП · Ёвари молиявии шумо',
    uz: 'OTP Bank · Sizning moliyaviy yordamchingiz'
  };

  useEffect(() => {
    console.log('LoadingScreen useEffect triggered for language:', language);
    
    // Set subtitle
    setSubtitle(footers[language] || footers.en);
    
    // Elegant greeting transition
    const greetingTimer = setInterval(() => {
      setFadeGreeting(false);
      setTimeout(() => {
        setGreetingIndex(prev => (prev + 1) % 2);
        setFadeGreeting(true);
      }, 400);
    }, 2800);

    // Complete after 3 seconds
    const completeTimer = setTimeout(() => {
      console.log('LoadingScreen timer completed, calling onComplete');
      if (onComplete) {
        console.log('📞 Calling onComplete function');
        onComplete();
      } else {
        console.log('❌ onComplete is undefined!');
      }
    }, 5000);

    // Cleanup
    return () => {
      console.log('🧹 Cleaning up LoadingScreen timers');
      clearInterval(greetingTimer);
      clearTimeout(completeTimer);
    };
  }, [language, onComplete]); // Removed footers from dependencies

  return (
    <div className="apple-loading">
      <div className="loading-content">
        <h1 className={`greeting ${fadeGreeting ? 'visible' : 'hidden'}`}>
          {greetings[language]?.[greetingIndex] || greetings.en[greetingIndex]}
        </h1>
        <p className="footer-message">{subtitle}</p>
      </div>
    </div>
  );
}