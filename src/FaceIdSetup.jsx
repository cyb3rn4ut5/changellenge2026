import React, { useState, useEffect } from 'react';
import './FaceIdSetup.css';

export default function FaceIdSetup({ language, onBack, onSkip, onNext }) {
  const [scanning, setScanning] = useState(true);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    // Simulate Face ID verification (2 seconds)
    const timer = setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
      if (window.navigator.vibrate) {
        window.navigator.vibrate(10); // Gentle tap when complete
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Translations
  const texts = {
    ru: {
      title: 'Face ID',
      subtitle: 'Настройка биометрической аутентификации',
      scanning: 'Сканирование...',
      complete: 'Face ID готов',
      continue: 'Продолжить',
      skip: 'Пропустить',
      back: 'Назад',
      secure: 'Ваши данные защищены'
    },
    en: {
      title: 'Face ID',
      subtitle: 'Set up biometric authentication',
      scanning: 'Scanning...',
      complete: 'Face ID is ready',
      continue: 'Continue',
      skip: 'Skip',
      back: 'Back',
      secure: 'Your data is secure'
    },
    zh: {
      title: '面容 ID',
      subtitle: '设置生物识别认证',
      scanning: '扫描中...',
      complete: '面容 ID 已就绪',
      continue: '继续',
      skip: '跳过',
      back: '返回',
      secure: '您的数据是安全的'
    },
    hi: {
      title: 'फेस आईडी',
      subtitle: 'बायोमेट्रिक प्रमाणीकरण सेट करें',
      scanning: 'स्कैन हो रहा है...',
      complete: 'फेस आईडी तैयार है',
      continue: 'जारी रखें',
      skip: 'छोड़ें',
      back: 'वापस',
      secure: 'आपका डेटा सुरक्षित है'
    },
    ar: {
      title: 'معرف الوجه',
      subtitle: 'إعداد المصادقة البيومترية',
      scanning: 'جاري المسح...',
      complete: 'معرف الوجه جاهز',
      continue: 'متابعة',
      skip: 'تخطي',
      back: 'رجوع',
      secure: 'بياناتك آمنة'
    }
  };

  const t = texts[language] || texts.en;

  // SVG Icons
  const BackIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#7FFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const FaceIcon = () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#7FFF00" strokeWidth="1.5"/>
      <circle cx="8" cy="10" r="1.5" fill="#7FFF00"/>
      <circle cx="16" cy="10" r="1.5" fill="#7FFF00"/>
      <path d="M8 15C9 17 15 17 16 15" stroke="#7FFF00" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const CheckmarkIcon = () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#7FFF00" strokeWidth="1.5"/>
      <path d="M7 13L10 16L17 9" stroke="#7FFF00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const ShieldIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7V12C3 16.97 7 21 12 22C17 21 21 16.97 21 12V7L12 2Z" stroke="#7FFF00" strokeWidth="1.5"/>
      <path d="M8 12L11 15L16 9" stroke="#7FFF00" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  return (
    <div className="faceid-container">
      <div className="faceid-card">
        {/* Back Button */}
        <button 
          className="back-button"
          onClick={onBack}
        >
          <BackIcon />
          <span>{t.back}</span>
        </button>

        <h1 className="faceid-title">{t.title}</h1>
        <p className="faceid-subtitle">{t.subtitle}</p>

        {/* Face ID Animation - iOS Style */}
        <div className="faceid-animation">
          {scanning ? (
            <>
              <FaceIcon />
              <div className="scanning-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <p className="scanning-text">{t.scanning}</p>
            </>
          ) : scanComplete ? (
            <>
              <CheckmarkIcon />
              <p className="complete-text">{t.complete}</p>
            </>
          ) : null}
        </div>

        {/* Action Buttons */}
        <div className="faceid-actions">
          {!scanComplete ? (
            <button 
              className="skip-button"
              onClick={onSkip}
            >
              {t.skip}
            </button>
          ) : (
            <button 
              className="continue-button"
              onClick={() => onNext({ faceId: true })}
            >
              {t.continue} →
            </button>
          )}
        </div>

        {/* Secure Footer */}
        <div className="secure-footer">
          <ShieldIcon />
          <span>{t.secure}</span>
        </div>
      </div>
    </div>
  );
}