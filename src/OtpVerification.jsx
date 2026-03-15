import React, { useState, useRef, useEffect } from 'react';
import './OtpVerification.css';

export default function OtpVerification({ language, onBack, onNext, contactInfo }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple digits
    
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, ''); // Only digits
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    
    // Focus the next empty input or last input
    const nextEmptyIndex = newOtp.findIndex(val => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError(t.errorIncomplete);
      return;
    }

    // Demo: Accept any 6-digit code for prototype
    // In real app, this would validate against backend
    if (window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
    onNext({ otp: otpString });
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    // Show success message
    alert(t.resendSuccess);
  };

  // Format contact info for display
  const formatContact = () => {
    if (contactInfo?.method === 'phone') {
      return `+7 ${contactInfo.phone}`;
    }
    return contactInfo?.cardNumber ? `**** ${contactInfo.cardNumber.slice(-4)}` : '';
  };

  // Translations
  const texts = {
    ru: {
      title: 'Подтверждение',
      subtitle: 'Введите код из SMS',
      codeSent: 'Код отправлен на',
      resend: 'Отправить повторно',
      resendIn: 'Отправить повторно через',
      seconds: 'сек',
      continue: 'Подтвердить',
      back: 'Назад',
      errorIncomplete: 'Введите все 6 цифр',
      resendSuccess: 'Новый код отправлен!'
    },
    en: {
      title: 'Verification',
      subtitle: 'Enter SMS code',
      codeSent: 'Code sent to',
      resend: 'Resend code',
      resendIn: 'Resend in',
      seconds: 's',
      continue: 'Verify',
      back: 'Back',
      errorIncomplete: 'Enter all 6 digits',
      resendSuccess: 'New code sent!'
    },
    zh: {
      title: '验证',
      subtitle: '输入短信验证码',
      codeSent: '验证码已发送至',
      resend: '重新发送',
      resendIn: '重新发送于',
      seconds: '秒',
      continue: '验证',
      back: '返回',
      errorIncomplete: '请输入所有6位数字',
      resendSuccess: '新验证码已发送！'
    },
    hi: {
      title: 'सत्यापन',
      subtitle: 'SMS कोड दर्ज करें',
      codeSent: 'कोड भेजा गया',
      resend: 'पुनः भेजें',
      resendIn: 'पुनः भेजें',
      seconds: 'सेकंड',
      continue: 'सत्यापित करें',
      back: 'वापस',
      errorIncomplete: 'सभी 6 अंक दर्ज करें',
      resendSuccess: 'नया कोड भेजा गया!'
    },
    ar: {
      title: 'التحقق',
      subtitle: 'أدخل رمز SMS',
      codeSent: 'تم إرسال الرمز إلى',
      resend: 'إعادة الإرسال',
      resendIn: 'إعادة الإرسال بعد',
      seconds: 'ثانية',
      continue: 'تحقق',
      back: 'رجوع',
      errorIncomplete: 'أدخل جميع الأرقام الستة',
      resendSuccess: 'تم إرسال رمز جديد!'
    },
    kk: {
      title: 'Растау',
      subtitle: 'SMS кодын енгізіңіз',
      codeSent: 'Код жіберілді',
      resend: 'Қайта жіберу',
      resendIn: 'Қайта жіберу',
      seconds: 'сек',
      continue: 'Растау',
      back: 'Артқа',
      errorIncomplete: 'Барлық 6 цифрды енгізіңіз',
      resendSuccess: 'Жаңа код жіберілді!'
    },
    tg: {
      title: 'Тасдиқ',
      subtitle: 'Рамзи SMS-ро ворид кунед',
      codeSent: 'Рамз ба',
      resend: 'Аз нав фиристодан',
      resendIn: 'Аз нав фиристодан пас аз',
      seconds: 'сон',
      continue: 'Тасдиқ',
      back: 'Бозгашт',
      errorIncomplete: 'Ҳамаи 6 рақамро ворид кунед',
      resendSuccess: 'Рамзи нав фиристода шуд!'
    },
    uz: {
      title: 'Tasdiqlash',
      subtitle: 'SMS kodini kiriting',
      codeSent: 'Kod yuborildi',
      resend: 'Qayta yuborish',
      resendIn: 'Qayta yuborish',
      seconds: 'son',
      continue: 'Tasdiqlash',
      back: 'Orqaga',
      errorIncomplete: 'Barcha 6 raqamni kiriting',
      resendSuccess: 'Yangi kod yuborildi!'
    }
  };

  const t = texts[language] || texts.en;

  // SVG Icons
  const BackIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#7FFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const TimerIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#7FFF00" strokeWidth="1.5"/>
      <path d="M12 7V12L15 15" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const PhoneIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="2" width="14" height="20" rx="3" stroke="#7FFF00" strokeWidth="1.5"/>
      <circle cx="12" cy="18" r="1" fill="#7FFF00"/>
    </svg>
  );

  return (
    <div className="otp-container">
      <div className="otp-card">
        {/* Back Button */}
        <button 
          className="back-button"
          onClick={onBack}
        >
          <BackIcon />
          <span>{t.back}</span>
        </button>

        <h1 className="otp-title">{t.title}</h1>
        
        <div className="otp-subtitle">
          <p>{t.subtitle}</p>
          <div className="contact-info">
            <PhoneIcon />
            <span>{formatContact()}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="otp-form">
          {/* OTP Input Boxes */}
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`otp-input ${error ? 'error' : ''}`}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}

          {/* Timer and Resend */}
          <div className="timer-section">
            {timer > 0 ? (
              <div className="timer">
                <TimerIcon />
                <span>{t.resendIn} {timer}{t.seconds}</span>
              </div>
            ) : (
              <button
                type="button"
                className="resend-button"
                onClick={handleResend}
                disabled={!canResend}
              >
                {t.resend}
              </button>
            )}
          </div>

          <button type="submit" className="submit-button">
            {t.continue} →
          </button>
        </form>

        {/* Demo Hint */}
        <div className="demo-hint">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#7FFF00" strokeWidth="1.5" opacity="0.5"/>
            <path d="M12 8V12M12 16H12.01" stroke="#7FFF00" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
          </svg>
          <span>123456 (demo)</span>
        </div>
      </div>
    </div>
  );
}