import React, { useState, useRef, useEffect } from 'react';
import './CreatePin.css';

export default function CreatePin({ language, onBack, onNext }) {
  const [step, setStep] = useState('create'); // 'create' or 'confirm'
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '', '', '']);
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [pinStrength, setPinStrength] = useState('weak');
  
  const inputRefs = useRef([]);
  const confirmInputRefs = useRef([]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (step === 'create') {
      inputRefs.current[0]?.focus();
    } else {
      confirmInputRefs.current[0]?.focus();
    }
  }, [step]);

  // Check PIN strength
  useEffect(() => {
    const pinString = pin.join('');
    if (pinString.length < 6) return;
    
    // Check for sequential numbers (123456, 654321)
    const isSequential = /^(012345|123456|234567|345678|456789|567890|098765|987654|876543|765432|654321|543210)$/.test(pinString);
    
    // Check for repeated numbers (111111, 222222)
    const isRepeated = /^(.)\1{5}$/.test(pinString);
    
    if (isSequential || isRepeated) {
      setPinStrength('weak');
    } else {
      setPinStrength('strong');
    }
  }, [pin]);

  const handleChange = (index, value, isConfirm = false) => {
    if (value.length > 1) return;
    
    const numericValue = value.replace(/\D/g, '');
    const currentArray = isConfirm ? confirmPin : pin;
    const setter = isConfirm ? setConfirmPin : setPin;
    const newArray = [...currentArray];
    newArray[index] = numericValue;
    setter(newArray);
    setError('');

    // Auto-focus next input
    if (numericValue && index < 5) {
      if (isConfirm) {
        confirmInputRefs.current[index + 1]?.focus();
      } else {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e, isConfirm = false) => {
    if (e.key === 'Backspace' && !(isConfirm ? confirmPin[index] : pin[index]) && index > 0) {
      if (isConfirm) {
        confirmInputRefs.current[index - 1]?.focus();
      } else {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmitCreate = () => {
    const pinString = pin.join('');
    
    if (pinString.length !== 6) {
      setError(t.errorIncomplete);
      return;
    }
    
    if (pinStrength === 'weak') {
      setError(t.errorWeakPin);
      return;
    }
    
    setStep('confirm');
    setError('');
  };

  const handleSubmitConfirm = () => {
    const pinString = pin.join('');
    const confirmString = confirmPin.join('');
    
    if (confirmString.length !== 6) {
      setError(t.errorIncomplete);
      return;
    }
    
    if (pinString !== confirmString) {
      setError(t.errorMismatch);
      setConfirmPin(['', '', '', '', '', '']);
      confirmInputRefs.current[0]?.focus();
      return;
    }
    
    if (window.navigator.vibrate) {
      window.navigator.vibrate([10, 50, 20]);
    }
    onNext({ pin: pinString });
  };

  // Translations
  const texts = {
    ru: {
      title: 'Создание PIN-кода',
      createPin: 'Создайте PIN-код',
      confirmPin: 'Подтвердите PIN-код',
      pinHint: '6 цифр',
      showPin: 'Показать PIN',
      hidePin: 'Скрыть PIN',
      continue: 'Продолжить',
      confirm: 'Подтвердить',
      back: 'Назад',
      weakPin: 'Слабый PIN',
      strongPin: 'Надёжный PIN',
      errorIncomplete: 'Введите все 6 цифр',
      errorMismatch: 'PIN-коды не совпадают',
      errorWeakPin: 'Используйте более сложную комбинацию (избегайте 123456, 111111 и т.д.)',
      strengthWeak: 'Слабый',
      strengthStrong: 'Надёжный'
    },
    en: {
      title: 'Create PIN',
      createPin: 'Create your PIN',
      confirmPin: 'Confirm your PIN',
      pinHint: '6 digits',
      showPin: 'Show PIN',
      hidePin: 'Hide PIN',
      continue: 'Continue',
      confirm: 'Confirm',
      back: 'Back',
      weakPin: 'Weak PIN',
      strongPin: 'Strong PIN',
      errorIncomplete: 'Enter all 6 digits',
      errorMismatch: 'PINs do not match',
      errorWeakPin: 'Use a stronger combination (avoid 123456, 111111, etc.)',
      strengthWeak: 'Weak',
      strengthStrong: 'Strong'
    },
    zh: {
      title: '创建PIN码',
      createPin: '创建您的PIN码',
      confirmPin: '确认您的PIN码',
      pinHint: '6位数字',
      showPin: '显示PIN',
      hidePin: '隐藏PIN',
      continue: '继续',
      confirm: '确认',
      back: '返回',
      weakPin: '弱PIN',
      strongPin: '强PIN',
      errorIncomplete: '请输入所有6位数字',
      errorMismatch: 'PIN码不匹配',
      errorWeakPin: '请使用更强的组合（避免123456、111111等）',
      strengthWeak: '弱',
      strengthStrong: '强'
    },
    hi: {
      title: 'PIN बनाएं',
      createPin: 'अपना PIN बनाएं',
      confirmPin: 'अपना PIN पुष्टि करें',
      pinHint: '6 अंक',
      showPin: 'PIN दिखाएं',
      hidePin: 'PIN छुपाएं',
      continue: 'जारी रखें',
      confirm: 'पुष्टि करें',
      back: 'वापस',
      weakPin: 'कमज़ोर PIN',
      strongPin: 'मज़बूत PIN',
      errorIncomplete: 'सभी 6 अंक दर्ज करें',
      errorMismatch: 'PIN मेल नहीं खाते',
      errorWeakPin: 'मज़बूत संयोजन का उपयोग करें (123456, 111111 आदि से बचें)',
      strengthWeak: 'कमज़ोर',
      strengthStrong: 'मज़बूत'
    },
    ar: {
      title: 'إنشاء PIN',
      createPin: 'إنشاء PIN الخاص بك',
      confirmPin: 'تأكيد PIN الخاص بك',
      pinHint: '6 أرقام',
      showPin: 'إظهار PIN',
      hidePin: 'إخفاء PIN',
      continue: 'متابعة',
      confirm: 'تأكيد',
      back: 'رجوع',
      weakPin: 'PIN ضعيف',
      strongPin: 'PIN قوي',
      errorIncomplete: 'أدخل جميع الأرقام الستة',
      errorMismatch: 'PIN غير متطابق',
      errorWeakPin: 'استخدم تركيبة أقوى (تجنب 123456، 111111، إلخ)',
      strengthWeak: 'ضعيف',
      strengthStrong: 'قوي'
    }
  };

  const t = texts[language] || texts.en;

  // SVG Icons
  const BackIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#7FFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const EyeIcon = ({ show }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      {show ? (
        <>
          <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#7FFF00" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="3" fill="#7FFF00"/>
        </>
      ) : (
        <>
          <path d="M2 2L22 22" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M8.5 8.5C6.5 10.5 5 12 5 12C5 12 8 18 12 18C14 18 16 16.5 17.5 15" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 6C15 6 18 9 19 10.5" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
        </>
      )}
    </svg>
  );

  const StrengthIcon = ({ strength }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={strength === 'strong' ? '#7FFF00' : '#ff4444'} strokeWidth="2"/>
      <circle cx="12" cy="12" r="6" fill={strength === 'strong' ? '#7FFF00' : '#ff4444'}/>
    </svg>
  );

  return (
    <div className="pin-container">
      <div className="pin-card">
        {/* Back Button */}
        <button 
          className="back-button"
          onClick={() => step === 'create' ? onBack() : setStep('create')}
        >
          <BackIcon />
          <span>{t.back}</span>
        </button>

        <h1 className="pin-title">{t.title}</h1>
        
        <div className="pin-step">
          <p className="pin-subtitle">
            {step === 'create' ? t.createPin : t.confirmPin}
          </p>
          <span className="pin-hint">{t.pinHint}</span>
        </div>

        {/* PIN Strength Indicator (only in create step) */}
        {step === 'create' && pin.join('').length === 6 && (
          <div className={`pin-strength ${pinStrength}`}>
            <StrengthIcon strength={pinStrength} />
            <span>{pinStrength === 'strong' ? t.strengthStrong : t.strengthWeak}</span>
          </div>
        )}

        {/* PIN Inputs */}
        <div className="pin-inputs">
          {(step === 'create' ? pin : confirmPin).map((digit, index) => (
            <input
              key={index}
              ref={el => {
                if (step === 'create') {
                  inputRefs.current[index] = el;
                } else {
                  confirmInputRefs.current[index] = el;
                }
              }}
              type={showPin ? 'text' : 'password'}
              inputMode="numeric"
              pattern="\d*"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value, step === 'confirm')}
              onKeyDown={(e) => handleKeyDown(index, e, step === 'confirm')}
              className={`pin-input ${error ? 'error' : ''}`}
              aria-label={`PIN digit ${index + 1}`}
            />
          ))}
        </div>

        {/* Show/Hide Toggle */}
        <button 
          className="show-hide-button"
          onClick={() => setShowPin(!showPin)}
          type="button"
        >
          <EyeIcon show={showPin} />
          <span>{showPin ? t.hidePin : t.showPin}</span>
        </button>

        {error && <div className="error-message">{error}</div>}

        {/* Submit Button */}
        <button 
          className="submit-button"
          onClick={step === 'create' ? handleSubmitCreate : handleSubmitConfirm}
        >
          {step === 'create' ? t.continue : t.confirm} →
        </button>

        {/* Demo Hint */}
        <div className="demo-hint">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#7FFF00" strokeWidth="1.5" opacity="0.5"/>
            <path d="M12 8V12M12 16H12.01" stroke="#7FFF00" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
          </svg>
          <span>{t.strengthStrong}: 2486</span>
        </div>
      </div>
    </div>
  );
}