import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import './NewCustomerForm.css';

export default function NewCustomerForm({ language, onNext, onBack }) {
  const [formData, setFormData] = useState({
    fullName: '',
    passport: '',
    country: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  // Complete offline country list
  const countries = [
    { cca2: 'AF', name: { common: 'Afghanistan' } },
    { cca2: 'AL', name: { common: 'Albania' } },
    { cca2: 'DZ', name: { common: 'Algeria' } },
    { cca2: 'AR', name: { common: 'Argentina' } },
    { cca2: 'AM', name: { common: 'Armenia' } },
    { cca2: 'AU', name: { common: 'Australia' } },
    { cca2: 'AT', name: { common: 'Austria' } },
    { cca2: 'AZ', name: { common: 'Azerbaijan' } },
    { cca2: 'BH', name: { common: 'Bahrain' } },
    { cca2: 'BD', name: { common: 'Bangladesh' } },
    { cca2: 'BY', name: { common: 'Belarus' } },
    { cca2: 'BE', name: { common: 'Belgium' } },
    { cca2: 'BR', name: { common: 'Brazil' } },
    { cca2: 'BG', name: { common: 'Bulgaria' } },
    { cca2: 'CA', name: { common: 'Canada' } },
    { cca2: 'CN', name: { common: 'China' } },
    { cca2: 'CO', name: { common: 'Colombia' } },
    { cca2: 'HR', name: { common: 'Croatia' } },
    { cca2: 'CU', name: { common: 'Cuba' } },
    { cca2: 'CY', name: { common: 'Cyprus' } },
    { cca2: 'CZ', name: { common: 'Czechia' } },
    { cca2: 'DK', name: { common: 'Denmark' } },
    { cca2: 'EG', name: { common: 'Egypt' } },
    { cca2: 'EE', name: { common: 'Estonia' } },
    { cca2: 'FI', name: { common: 'Finland' } },
    { cca2: 'FR', name: { common: 'France' } },
    { cca2: 'GE', name: { common: 'Georgia' } },
    { cca2: 'DE', name: { common: 'Germany' } },
    { cca2: 'GR', name: { common: 'Greece' } },
    { cca2: 'HU', name: { common: 'Hungary' } },
    { cca2: 'IS', name: { common: 'Iceland' } },
    { cca2: 'IN', name: { common: 'India' } },
    { cca2: 'ID', name: { common: 'Indonesia' } },
    { cca2: 'IR', name: { common: 'Iran' } },
    { cca2: 'IQ', name: { common: 'Iraq' } },
    { cca2: 'IE', name: { common: 'Ireland' } },
    { cca2: 'IL', name: { common: 'Israel' } },
    { cca2: 'IT', name: { common: 'Italy' } },
    { cca2: 'JP', name: { common: 'Japan' } },
    { cca2: 'JO', name: { common: 'Jordan' } },
    { cca2: 'KZ', name: { common: 'Kazakhstan' } },
    { cca2: 'KE', name: { common: 'Kenya' } },
    { cca2: 'KW', name: { common: 'Kuwait' } },
    { cca2: 'KG', name: { common: 'Kyrgyzstan' } },
    { cca2: 'LV', name: { common: 'Latvia' } },
    { cca2: 'LB', name: { common: 'Lebanon' } },
    { cca2: 'LY', name: { common: 'Libya' } },
    { cca2: 'LT', name: { common: 'Lithuania' } },
    { cca2: 'LU', name: { common: 'Luxembourg' } },
    { cca2: 'MY', name: { common: 'Malaysia' } },
    { cca2: 'MV', name: { common: 'Maldives' } },
    { cca2: 'MT', name: { common: 'Malta' } },
    { cca2: 'MX', name: { common: 'Mexico' } },
    { cca2: 'MD', name: { common: 'Moldova' } },
    { cca2: 'MC', name: { common: 'Monaco' } },
    { cca2: 'MN', name: { common: 'Mongolia' } },
    { cca2: 'ME', name: { common: 'Montenegro' } },
    { cca2: 'MA', name: { common: 'Morocco' } },
    { cca2: 'NP', name: { common: 'Nepal' } },
    { cca2: 'NL', name: { common: 'Netherlands' } },
    { cca2: 'NZ', name: { common: 'New Zealand' } },
    { cca2: 'NG', name: { common: 'Nigeria' } },
    { cca2: 'KP', name: { common: 'North Korea' } },
    { cca2: 'MK', name: { common: 'North Macedonia' } },
    { cca2: 'NO', name: { common: 'Norway' } },
    { cca2: 'OM', name: { common: 'Oman' } },
    { cca2: 'PK', name: { common: 'Pakistan' } },
    { cca2: 'PS', name: { common: 'Palestine' } },
    { cca2: 'PE', name: { common: 'Peru' } },
    { cca2: 'PH', name: { common: 'Philippines' } },
    { cca2: 'PL', name: { common: 'Poland' } },
    { cca2: 'PT', name: { common: 'Portugal' } },
    { cca2: 'QA', name: { common: 'Qatar' } },
    { cca2: 'RO', name: { common: 'Romania' } },
    { cca2: 'RU', name: { common: 'Russia' } },
    { cca2: 'SA', name: { common: 'Saudi Arabia' } },
    { cca2: 'RS', name: { common: 'Serbia' } },
    { cca2: 'SG', name: { common: 'Singapore' } },
    { cca2: 'SK', name: { common: 'Slovakia' } },
    { cca2: 'SI', name: { common: 'Slovenia' } },
    { cca2: 'ZA', name: { common: 'South Africa' } },
    { cca2: 'KR', name: { common: 'South Korea' } },
    { cca2: 'ES', name: { common: 'Spain' } },
    { cca2: 'LK', name: { common: 'Sri Lanka' } },
    { cca2: 'SD', name: { common: 'Sudan' } },
    { cca2: 'SE', name: { common: 'Sweden' } },
    { cca2: 'CH', name: { common: 'Switzerland' } },
    { cca2: 'SY', name: { common: 'Syria' } },
    { cca2: 'TW', name: { common: 'Taiwan' } },
    { cca2: 'TJ', name: { common: 'Tajikistan' } },
    { cca2: 'TH', name: { common: 'Thailand' } },
    { cca2: 'TR', name: { common: 'Turkey' } },
    { cca2: 'TM', name: { common: 'Turkmenistan' } },
    { cca2: 'UA', name: { common: 'Ukraine' } },
    { cca2: 'AE', name: { common: 'United Arab Emirates' } },
    { cca2: 'GB', name: { common: 'United Kingdom' } },
    { cca2: 'US', name: { common: 'United States' } },
    { cca2: 'UY', name: { common: 'Uruguay' } },
    { cca2: 'UZ', name: { common: 'Uzbekistan' } },
    { cca2: 'VE', name: { common: 'Venezuela' } },
    { cca2: 'VN', name: { common: 'Vietnam' } },
    { cca2: 'YE', name: { common: 'Yemen' } },
    { cca2: 'ZW', name: { common: 'Zimbabwe' } }
  ].sort((a, b) => a.name.common.localeCompare(b.name.common));

  // Get translated placeholder text
  const getPlaceholder = (field) => {
    const placeholders = {
      ru: {
        fullName: 'Иван Петров',
        passport: '1234 567890',
        country: 'Выберите страну',
        phone: '+7 (999) 123-45-67'
      },
      en: {
        fullName: 'John Doe',
        passport: 'AB1234567',
        country: 'Select your country',
        phone: '+7 (999) 123-45-67'
      },
      zh: {
        fullName: '张三',
        passport: 'E12345678',
        country: '选择您的国家',
        phone: '+7 (999) 123-45-67'
      },
      hi: {
        fullName: 'राहुल शर्मा',
        passport: 'L1234567',
        country: 'अपना देश चुनें',
        phone: '+7 (999) 123-45-67'
      },
      ar: {
        fullName: 'أحمد محمد',
        passport: 'A1234567',
        country: 'اختر بلدك',
        phone: '+7 (999) 123-45-67'
      },
      kk: {
        fullName: 'Азамат Серік',
        passport: 'N1234567',
        country: 'Еліңізді таңдаңыз',
        phone: '+7 (999) 123-45-67'
      },
      tg: {
        fullName: 'Аҳмад Раҳим',
        passport: 'M1234567',
        country: 'Кишвари худро интихоб кунед',
        phone: '+7 (999) 123-45-67'
      },
      uz: {
        fullName: 'Alisher Karimov',
        passport: 'AA1234567',
        country: 'Mamlakatingizni tanlang',
        phone: '+7 (999) 123-45-67'
      }
    };
    return placeholders[language]?.[field] || placeholders.en[field];
  };

  // Translations
  const texts = {
    ru: {
      title: 'Новый клиент',
      fullName: 'Полное имя',
      passport: 'Паспортные данные',
      country: 'Страна гражданства',
      phone: 'Номер телефона',
      next: 'Продолжить',
      errors: {
        nameRequired: 'Введите полное имя',
        passportRequired: 'Введите паспортные данные',
        countryRequired: 'Выберите страну',
        phoneRequired: 'Введите номер телефона',
        phoneInvalid: 'Введите корректный номер'
      }
    },
    en: {
      title: 'New Customer',
      fullName: 'Full Name',
      passport: 'Passport Details',
      country: 'Country of Citizenship',
      phone: 'Phone Number',
      next: 'Continue',
      errors: {
        nameRequired: 'Full name is required',
        passportRequired: 'Passport details are required',
        countryRequired: 'Please select your country',
        phoneRequired: 'Phone number is required',
        phoneInvalid: 'Please enter a valid phone number'
      }
    },
    zh: {
      title: '新客户',
      fullName: '全名',
      passport: '护照信息',
      country: '国籍',
      phone: '电话号码',
      next: '继续',
      errors: {
        nameRequired: '请输入全名',
        passportRequired: '请输入护照信息',
        countryRequired: '请选择国籍',
        phoneRequired: '请输入电话号码',
        phoneInvalid: '请输入有效的电话号码'
      }
    },
    hi: {
      title: 'नया ग्राहक',
      fullName: 'पूरा नाम',
      passport: 'पासपोर्ट विवरण',
      country: 'नागरिकता वाला देश',
      phone: 'फ़ोन नंबर',
      next: 'जारी रखें',
      errors: {
        nameRequired: 'पूरा नाम आवश्यक है',
        passportRequired: 'पासपोर्ट विवरण आवश्यक है',
        countryRequired: 'कृपया अपना देश चुनें',
        phoneRequired: 'फ़ोन नंबर आवश्यक है',
        phoneInvalid: 'कृपया मान्य फ़ोन नंबर दर्ज करें'
      }
    },
    ar: {
      title: 'عميل جديد',
      fullName: 'الاسم الكامل',
      passport: 'بيانات جواز السفر',
      country: 'بلد الجنسية',
      phone: 'رقم الهاتف',
      next: 'متابعة',
      errors: {
        nameRequired: 'الاسم الكامل مطلوب',
        passportRequired: 'بيانات جواز السفر مطلوبة',
        countryRequired: 'الرجاء اختيار بلدك',
        phoneRequired: 'رقم الهاتف مطلوب',
        phoneInvalid: 'الرجاء إدخال رقم هاتف صحيح'
      }
    },
    kk: {
      title: 'Жаңа клиент',
      fullName: 'Толық аты-жөні',
      passport: 'Паспорт деректері',
      country: 'Азаматтық елі',
      phone: 'Телефон нөмірі',
      next: 'Жалғастыру',
      errors: {
        nameRequired: 'Толық аты-жөніңізді енгізіңіз',
        passportRequired: 'Паспорт деректерін енгізіңіз',
        countryRequired: 'Еліңізді таңдаңыз',
        phoneRequired: 'Телефон нөмірін енгізіңіз',
        phoneInvalid: 'Жарамды телефон нөмірін енгізіңіз'
      }
    },
    tg: {
      title: 'Мизоҷи нав',
      fullName: 'Номи пурра',
      passport: 'Маълумоти шиноснома',
      country: 'Кишвари шаҳрвандӣ',
      phone: 'Рақами телефон',
      next: 'Давом додан',
      errors: {
        nameRequired: 'Номи пурраро ворид кунед',
        passportRequired: 'Маълумоти шиносномаро ворид кунед',
        countryRequired: 'Кишвари худро интихоб кунед',
        phoneRequired: 'Рақами телефонро ворид кунед',
        phoneInvalid: 'Рақами телефони дуруст ворид кунед'
      }
    },
    uz: {
      title: 'Yangi mijoz',
      fullName: 'Toʻliq ism',
      passport: 'Pasport maʼlumotlari',
      country: 'Fuqarolik mamlakati',
      phone: 'Telefon raqami',
      next: 'Davom etish',
      errors: {
        nameRequired: 'Toʻliq ismingizni kiriting',
        passportRequired: 'Pasport maʼlumotlarini kiriting',
        countryRequired: 'Mamlakatingizni tanlang',
        phoneRequired: 'Telefon raqamini kiriting',
        phoneInvalid: 'Haqiqiy telefon raqamini kiriting'
      }
    }
  };

  const t = texts[language] || texts.en;

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = t.errors.nameRequired;
    }
    
    if (!formData.passport.trim()) {
      newErrors.passport = t.errors.passportRequired;
    }
    
    if (!formData.country) {
      newErrors.country = t.errors.countryRequired;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t.errors.phoneRequired;
    } else if (formData.phone.includes('_')) {
      newErrors.phone = t.errors.phoneInvalid;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(10);
      }
      onNext(formData);
    }
  };

  return (
    <div className="new-customer-container">
      <div className="form-card">
        {/* Back Button */}
        <button 
          className="back-button"
          onClick={() => {
            if (window.navigator.vibrate) {
              window.navigator.vibrate(10);
            }
            onBack();
          }}
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#7FFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="back-text">
            {language === 'ru' ? 'Назад' :
             language === 'zh' ? '返回' :
             language === 'hi' ? 'वापस' :
             language === 'ar' ? 'رجوع' :
             language === 'kk' ? 'Артқа' :
             language === 'tg' ? 'Бозгашт' :
             language === 'uz' ? 'Orqaga' :
             'Back'}
          </span>
        </button>
        
        <h1 className="form-title">{t.title}</h1>
        
        <form onSubmit={handleSubmit} className="customer-form">
          {/* Full Name */}
          <div className="form-group">
            <label>{t.fullName}</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className={errors.fullName ? 'error' : ''}
              placeholder={getPlaceholder('fullName')}
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>

          {/* Passport */}
          <div className="form-group">
            <label>{t.passport}</label>
            <input
              type="text"
              value={formData.passport}
              onChange={(e) => setFormData({...formData, passport: e.target.value})}
              className={errors.passport ? 'error' : ''}
              placeholder={getPlaceholder('passport')}
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            />
            {errors.passport && <span className="error-text">{errors.passport}</span>}
          </div>

          {/* Country Dropdown */}
          <div className="form-group">
            <label>{t.country}</label>
            <select
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
              className={errors.country ? 'error' : ''}
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
              <option value="">{getPlaceholder('country')}</option>
              {countries.map(country => (
                <option key={country.cca2} value={country.cca2}>
                  {country.name.common}
                </option>
              ))}
            </select>
            {errors.country && <span className="error-text">{errors.country}</span>}
          </div>

          {/* Phone with Mask */}
          <div className="form-group">
            <label>{t.phone}</label>
            <InputMask
              mask="+7 (999) 999-99-99"
              maskChar="_"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className={errors.phone ? 'error phone-input' : 'phone-input'}
              placeholder="+7 (999) 123-45-67"
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
              {(inputProps) => <input {...inputProps} type="tel" />}
            </InputMask>
            {errors.phone && <span className="error-text">{errors.phone}</span>}
            <span className="phone-hint">
              {language === 'ru' ? 'Формат: +7 (XXX) XXX-XX-XX' :
               'Format: +7 (XXX) XXX-XX-XX'}
            </span>
          </div>

          <button type="submit" className="submit-button">
            {t.next} →
          </button>
        </form>
      </div>
    </div>
  );
}