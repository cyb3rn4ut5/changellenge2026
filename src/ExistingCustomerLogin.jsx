import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import './ExistingCustomerLogin.css';

export default function ExistingCustomerLogin({ language, onBack, onNext }) {
  const [loginMethod, setLoginMethod] = useState(null); // 'card' or 'phone'
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [showLuhnPopup, setShowLuhnPopup] = useState(false);

  // Luhn's Algorithm validation
  const validateLuhn = (cardNum) => {
    const cleaned = cardNum.replace(/[\s-]/g, '');
    if (!/^\d+$/.test(cleaned)) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i), 10);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const matches = cleaned.match(/\d{1,4}/g);
    return matches ? matches.join(' ') : cleaned;
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    setError('');
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    setExpiry(formatted);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (loginMethod === 'card') {
      const cleanCard = cardNumber.replace(/\s/g, '');
      
      if (cleanCard.length !== 16) {
        setError(language === 'ru' ? 'Номер карты должен содержать 16 цифр' :
                language === 'zh' ? '卡号必须为16位' :
                language === 'hi' ? 'कार्ड नंबर 16 अंकों का होना चाहिए' :
                language === 'ar' ? 'يجب أن يتكون رقم البطاقة من 16 رقمًا' :
                'Card number must be 16 digits');
        return;
      }
      
      if (!validateLuhn(cleanCard)) {
        setShowLuhnPopup(true);
        return;
      }
      
      if (!expiry || expiry.length < 5) {
        setError(language === 'ru' ? 'Введите срок действия' :
                language === 'zh' ? '请输入有效期' :
                language === 'hi' ? 'समाप्ति तिथि दर्ज करें' :
                language === 'ar' ? 'أدخل تاريخ الانتهاء' :
                'Enter expiry date');
        return;
      }
      
      onNext({ method: 'card', cardNumber: cleanCard, expiry });
      
    } else if (loginMethod === 'phone') {
      // Remove spaces and hyphens for validation
      const cleanPhone = phoneNumber.replace(/[\s-]/g, '');
      
      if (cleanPhone.length !== 10) {
        setError(language === 'ru' ? 'Введите корректный номер телефона' :
                language === 'zh' ? '请输入有效的手机号码' :
                language === 'hi' ? 'मान्य फोन नंबर दर्ज करें' :
                language === 'ar' ? 'أدخل رقم هاتف صحيح' :
                'Enter valid phone number');
        return;
      }
      
      // Check if all digits are entered (no underscores)
      if (cleanPhone.includes('_')) {
        setError(language === 'ru' ? 'Введите все 10 цифр' :
                language === 'zh' ? '请输入所有10位数字' :
                language === 'hi' ? 'सभी 10 अंक दर्ज करें' :
                language === 'ar' ? 'أدخل جميع الأرقام العشرة' :
                'Enter all 10 digits');
        return;
      }
      
      onNext({ method: 'phone', phone: cleanPhone });
    }
  };

  // Translations
  const texts = {
    ru: {
      title: 'Вход для клиентов',
      cardMethod: 'Войти по карте',
      phoneMethod: 'Войти по номеру телефона',
      cardNumber: 'Номер карты',
      expiry: 'Срок действия (ММ/ГГ)',
      phoneNumber: 'Номер телефона',
      phoneHint: '10 цифр (формат: 999 123-45-67)',
      continue: 'Продолжить',
      back: 'Назад',
      luhnTitle: 'Алгоритм Луна',
      luhnMessage: 'Для демонстрации используйте настоящий номер карты или номер, соответствующий алгоритму Луна (например: 4532 1234 5678 9123)',
      luhnButton: 'Понятно',
      otherMethod: 'Другой способ'
    },
    en: {
      title: 'Customer Login',
      cardMethod: 'Login with Card',
      phoneMethod: 'Login with Phone',
      cardNumber: 'Card Number',
      expiry: 'Expiry (MM/YY)',
      phoneNumber: 'Phone Number',
      phoneHint: '10 digits (format: 999 123-45-67)',
      continue: 'Continue',
      back: 'Back',
      luhnTitle: 'Luhn\'s Algorithm',
      luhnMessage: 'For demo purposes, please use a real card number or a number that satisfies Luhn\'s algorithm (e.g., 4532 1234 5678 9123)',
      luhnButton: 'Got it',
      otherMethod: 'Other method'
    },
    zh: {
      title: '客户登录',
      cardMethod: '银行卡登录',
      phoneMethod: '手机号登录',
      cardNumber: '卡号',
      expiry: '有效期 (MM/YY)',
      phoneNumber: '手机号码',
      phoneHint: '10位数字 (格式: 999 123-45-67)',
      continue: '继续',
      back: '返回',
      luhnTitle: '卢恩算法',
      luhnMessage: '演示目的，请使用真实卡号或符合卢恩算法的号码（例如：4532 1234 5678 9123）',
      luhnButton: '知道了',
      otherMethod: '其他方式'
    },
    hi: {
      title: 'ग्राहक लॉगिन',
      cardMethod: 'कार्ड से लॉगिन',
      phoneMethod: 'फोन से लॉगिन',
      cardNumber: 'कार्ड नंबर',
      expiry: 'समाप्ति (MM/YY)',
      phoneNumber: 'फोन नंबर',
      phoneHint: '10 अंक (फॉर्मेट: 999 123-45-67)',
      continue: 'जारी रखें',
      back: 'वापस',
      luhnTitle: 'लुह्न एल्गोरिदम',
      luhnMessage: 'डेमो के लिए, कृपया वास्तविक कार्ड नंबर या लुह्न एल्गोरिदम को संतुष्ट करने वाला नंबर का उपयोग करें (उदा: 4532 1234 5678 9123)',
      luhnButton: 'समझ गया',
      otherMethod: 'अन्य तरीका'
    },
    ar: {
      title: 'تسجيل دخول العميل',
      cardMethod: 'الدخول بالبطاقة',
      phoneMethod: 'الدخول بالهاتف',
      cardNumber: 'رقم البطاقة',
      expiry: 'تاريخ الانتهاء (MM/YY)',
      phoneNumber: 'رقم الهاتف',
      phoneHint: '10 أرقام (التنسيق: 999 123-45-67)',
      continue: 'متابعة',
      back: 'رجوع',
      luhnTitle: 'خوارزمية لون',
      luhnMessage: 'لأغراض العرض التوضيحي، يرجى استخدام رقم بطاقة حقيقي أو رقم يفي بخوارزمية لون (مثل: 4532 1234 5678 9123)',
      luhnButton: 'فهمت',
      otherMethod: 'طريقة أخرى'
    },
    kk: {
      title: 'Клиенттің кіруі',
      cardMethod: 'Картамен кіру',
      phoneMethod: 'Телефон нөмірімен кіру',
      cardNumber: 'Карта нөмірі',
      expiry: 'Қолданылу мерзімі (АА/ЖЖ)',
      phoneNumber: 'Телефон нөмірі',
      phoneHint: '10 цифр (формат: 999 123-45-67)',
      continue: 'Жалғастыру',
      back: 'Артқа',
      luhnTitle: 'Лун алгоритмі',
      luhnMessage: 'Демо үшін нақты карта нөмірін немесе Лун алгоритміне сәйкес келетін нөмірді пайдаланыңыз (мысалы: 4532 1234 5678 9123)',
      luhnButton: 'Түсіндім',
      otherMethod: 'Басқа әдіс'
    },
    tg: {
      title: 'Вуруди мизоҷ',
      cardMethod: 'Вуруд бо корт',
      phoneMethod: 'Вуруд бо рақами телефон',
      cardNumber: 'Рақами корт',
      expiry: 'Муҳлати амал (ММ/СС)',
      phoneNumber: 'Рақами телефон',
      phoneHint: '10 рақам (формат: 999 123-45-67)',
      continue: 'Давом додан',
      back: 'Бозгашт',
      luhnTitle: 'Алгоритми Лун',
      luhnMessage: 'Барои намоиш, рақами корти воқеӣ ё рақамеро истифода баред, ки ба алгоритми Лун мувофиқат мекунад (масалан: 4532 1234 5678 9123)',
      luhnButton: 'Фаҳмидам',
      otherMethod: 'Усули дигар'
    },
    uz: {
      title: 'Mijoz kirishi',
      cardMethod: 'Karta bilan kirish',
      phoneMethod: 'Telefon raqami bilan kirish',
      cardNumber: 'Karta raqami',
      expiry: 'Amal qilish muddati (MM/YY)',
      phoneNumber: 'Telefon raqami',
      phoneHint: '10 raqam (format: 999 123-45-67)',
      continue: 'Davom etish',
      back: 'Orqaga',
      luhnTitle: 'Lun algoritmi',
      luhnMessage: 'Namoyish uchun haqiqiy karta raqamidan yoki Lun algoritmiga mos keladigan raqamdan foydalaning (masalan: 4532 1234 5678 9123)',
      luhnButton: 'Tushundim',
      otherMethod: 'Boshqa usul'
    }
  };

  const t = texts[language] || texts.en;

  // SVG Icons
  const CardIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="16" rx="3" stroke="#7FFF00" strokeWidth="1.5"/>
      <path d="M2 8H22" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="6" cy="14" r="1" fill="#7FFF00"/>
      <circle cx="10" cy="14" r="1" fill="#7FFF00"/>
    </svg>
  );

  const PhoneIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="2" width="14" height="20" rx="3" stroke="#7FFF00" strokeWidth="1.5"/>
      <path d="M12 18H12.01" stroke="#7FFF00" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="16" r="1" fill="#7FFF00"/>
    </svg>
  );

  const BackIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#7FFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="#7FFF00" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  if (showLuhnPopup) {
    return (
      <div className="popup-overlay">
        <div className="popup-card">
          <button 
            className="popup-close"
            onClick={() => setShowLuhnPopup(false)}
          >
            <CloseIcon />
          </button>
          <h2 className="popup-title">{t.luhnTitle}</h2>
          <p className="popup-message">{t.luhnMessage}</p>
          <button 
            className="popup-button"
            onClick={() => setShowLuhnPopup(false)}
          >
            {t.luhnButton}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Back Button */}
        <button 
          className="back-button"
          onClick={onBack}
        >
          <BackIcon />
          <span>{t.back}</span>
        </button>

        <h1 className="login-title">{t.title}</h1>

        {/* Method Selection */}
        {!loginMethod ? (
          <div className="method-buttons">
            <button 
              className="method-button"
              onClick={() => setLoginMethod('card')}
            >
              <span className="method-icon">
                <CardIcon />
              </span>
              <span className="method-text">{t.cardMethod}</span>
            </button>
            
            <button 
              className="method-button"
              onClick={() => setLoginMethod('phone')}
            >
              <span className="method-icon">
                <PhoneIcon />
              </span>
              <span className="method-text">{t.phoneMethod}</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            {loginMethod === 'card' ? (
              <>
                <div className="form-group">
                  <label>{t.cardNumber}</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="4532 1234 5678 9123"
                    maxLength="19"
                    className="card-input"
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label>{t.expiry}</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className="expiry-input"
                  />
                </div>
              </>
            ) : (
              <div className="form-group">
                <label>{t.phoneNumber}</label>
                <div className="phone-input-wrapper">
                  <span className="phone-prefix">+7</span>
                  <InputMask
                    mask="999 999-99-99"
                    maskChar="_"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      setError('');
                    }}
                    className={`phone-input ${error ? 'error' : ''}`}
                    placeholder="999 123-45-67"
                  >
                    {(inputProps) => <input {...inputProps} type="tel" />}
                  </InputMask>
                </div>
                <span className="phone-hint">{t.phoneHint}</span>
              </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button 
                type="button"
                className="change-method-button"
                onClick={() => {
                  setLoginMethod(null);
                  setCardNumber('');
                  setExpiry('');
                  setPhoneNumber('');
                  setError('');
                }}
              >
                ← {t.otherMethod}
              </button>
              
              <button type="submit" className="submit-button">
                {t.continue} →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}