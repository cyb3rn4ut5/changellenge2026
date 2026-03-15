import React, { useEffect, useState } from 'react';
import './OrientationLock.css';

export default function OrientationLock({ children, language = 'ru' }) {
  const [isLandscape, setIsLandscape] = useState(false);

  // Messages in different languages (Russian first)
  const messages = {
    ru: {
      title: 'Поверните устройство',
      subtitle: 'Приложение оптимизировано для портретного режима'
    },
    en: {
      title: 'Please rotate your device',
      subtitle: 'This app is optimized for portrait mode'
    },
    zh: {
      title: '请旋转设备',
      subtitle: '此应用程序针对纵向模式进行了优化'
    },
    hi: {
      title: 'कृपया अपना डिवाइस घुमाएँ',
      subtitle: 'यह ऐप पोर्ट्रेट मोड के लिए अनुकूलित है'
    },
    ar: {
      title: 'يرجى تدوير جهازك',
      subtitle: 'تم تحسين هذا التطبيق للوضع الرأسي'
    },
    kk: {
      title: 'Құрылғыны бұрыңыз',
      subtitle: 'Қолданба портрет режиміне оңтайландырылған'
    },
    tg: {
      title: 'Лутфан дастгоҳро гардонед',
      subtitle: 'Ин барнома ба реҷаи портрет оптимизатсия шудааст'
    },
    uz: {
      title: 'Iltimos, qurilmani aylantiring',
      subtitle: 'Ilova portret rejimi uchun optimallashtirilgan'
    }
  };

  useEffect(() => {
    const checkOrientation = () => {
      const landscape = window.innerWidth > window.innerHeight && window.innerHeight < 600;
      setIsLandscape(landscape);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (isLandscape) {
    return (
      <div className="orientation-warning">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#7FFF00"/>
        </svg>
        
        <h2 className="warning-title">{messages[language]?.title || messages.ru.title}</h2>
        <p className="warning-subtitle">{messages[language]?.subtitle || messages.ru.subtitle}</p>
        
        <div className="phone-icon">
          <div className="phone"></div>
          <svg className="rotate-icon" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M16.5 3h-9C6.67 3 6 3.67 6 4.5v15c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5zM16 19H8V5h8v14z" fill="#7FFF00"/>
            <path d="M12 16c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" fill="#7FFF00"/>
            <path d="M15 9l-3-3-3 3h2v4h2V9h2z" fill="#7FFF00"/>
          </svg>
        </div>
      </div>
    );
  }

  return children;
}