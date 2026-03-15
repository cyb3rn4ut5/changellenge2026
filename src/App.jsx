import React, { useState } from 'react';
import Preloader from './Preloader';
import LanguageSelection from './LanguageSelection';
import LoadingScreen from './LoadingScreen';
import NewCustomerForm from './NewCustomerForm';
import BranchMap from './BranchMap';
import ExistingCustomerLogin from './ExistingCustomerLogin';
import OtpVerification from './OtpVerification';
import CreatePin from './CreatePin';
import FaceIdSetup from './FaceIdSetup';
import Dashboard from './Dashboard';
import OrientationLock from './components/OrientationLock';
import Blobs from './components/Blobs';

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [customerType, setCustomerType] = useState(null);
  const [newCustomerData, setNewCustomerData] = useState(null);
  const [branchData, setBranchData] = useState(null);
  const [loginData, setLoginData] = useState(null);
  const [otpData, setOtpData] = useState(null);
  const [pinData, setPinData] = useState(null);
  const [faceIdData, setFaceIdData] = useState(null);
  
  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode);
    setShowLoading(true);
    if (window.navigator.vibrate) {
      window.navigator.vibrate(15);
    }
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  const handleCustomerTypeSelect = (type) => {
    setCustomerType(type);
    if (window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
  };

  const handleNewCustomerNext = (data) => {
    setNewCustomerData(data);
    console.log('New customer data:', data);
  };

  const handleBranchBack = () => {
    setNewCustomerData(null);
    setBranchData(null);
  };

  const handleBranchSelect = (branch) => {
    setBranchData(branch);
    console.log('Selected branch:', branch);
  };

  const handleExistingCustomerNext = (data) => {
    setLoginData(data);
    console.log('Existing customer login:', data);
  };

  const handleOtpNext = (data) => {
    setOtpData(data);
    console.log('OTP verified:', data);
  };

  const handlePinNext = (data) => {
    setPinData(data);
    console.log('PIN created:', data);
  };

  const handlePinBack = () => {
    setOtpData(null);
  };

  const handleFaceIdNext = (data) => {
    setFaceIdData(data);
    console.log('Face ID setup:', data);
  };

  const handleFaceIdSkip = () => {
    // Skip Face ID and go directly to dashboard
    setFaceIdData({ skipped: true });
  };

  const handleFaceIdBack = () => {
    setPinData(null);
  };

  const handleBackToLanguage = () => {
    setSelectedLanguage(null);
    setCustomerType(null);
    setNewCustomerData(null);
    setBranchData(null);
    setLoginData(null);
    setOtpData(null);
    setPinData(null);
    setFaceIdData(null);
    setShowLoading(false);
    if (window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
  };

  const handleHome = () => {
    setShowPreloader(true);
    setSelectedLanguage(null);
    setCustomerType(null);
    setNewCustomerData(null);
    setBranchData(null);
    setLoginData(null);
    setOtpData(null);
    setPinData(null);
    setFaceIdData(null);
    setShowLoading(false);
    if (window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
  };

  const showCustomerType = !showPreloader && selectedLanguage && !showLoading && !customerType;

  const getCustomerTypeText = () => {
    switch(selectedLanguage) {
      case 'ru':
        return {
          title: 'Выберите действие',
          new: 'Я новый клиент',
          existing: 'Уже есть счёт',
          back: 'Назад',
          home: 'На главную'
        };
      case 'zh':
        return {
          title: '选择操作',
          new: '我是新客户',
          existing: '已有账户',
          back: '返回',
          home: '主页'
        };
      case 'hi':
        return {
          title: 'कार्य चुनें',
          new: 'मैं नया ग्राहक हूं',
          existing: 'पहले से ग्राहक हूं',
          back: 'वापस',
          home: 'होम'
        };
      case 'ar':
        return {
          title: 'اختر الإجراء',
          new: 'أنا عميل جديد',
          existing: 'لدي حساب بالفعل',
          back: 'رجوع',
          home: 'الرئيسية'
        };
      case 'kk':
        return {
          title: 'Әрекетті таңдаңыз',
          new: 'Мен жаңа клиентпін',
          existing: 'Менің есепшотым бар',
          back: 'Артқа',
          home: 'Басты бет'
        };
      case 'tg':
        return {
          title: 'Амалро интихоб кунед',
          new: 'Ман мизоҷи нав ҳастам',
          existing: 'Аллакай ҳисоб дорам',
          back: 'Бозгашт',
          home: 'Асосӣ'
        };
      case 'uz':
        return {
          title: 'Amalni tanlang',
          new: 'Men yangi mijozman',
          existing: 'Mening hisobim bor',
          back: 'Orqaga',
          home: 'Bosh sahifa'
        };
      default:
        return {
          title: 'Choose action',
          new: "I'm a new customer",
          existing: 'Already a customer',
          back: 'Back',
          home: 'Home'
        };
    }
  };

  const texts = getCustomerTypeText();

  return (
    <OrientationLock language={selectedLanguage || 'ru'}>
      {/* Blobs background on all screens except preloader */}
      {!showPreloader && <Blobs />}
      
      {showPreloader ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : !selectedLanguage ? (
        <LanguageSelection onSelect={handleLanguageSelect} />
      ) : showLoading ? (
        <LoadingScreen 
          language={selectedLanguage} 
          onComplete={handleLoadingComplete} 
        />
      ) : showCustomerType ? (
        <div className="customer-type-container">
          <div className="customer-type-card">
            {/* Back Button */}
            <button 
              className="back-button"
              onClick={handleBackToLanguage}
              aria-label="Go back"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#7FFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="back-text">{texts.back}</span>
            </button>
            
            <h1 className="type-title">
              <span className="chartreuse">{texts.title}</span>
            </h1>
            
            <div className="type-buttons">
              <button 
                className="type-button new"
                onClick={() => handleCustomerTypeSelect('new')}
              >
                <span className="type-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="8" r="4" stroke="#7FFF00" strokeWidth="1.5"/>
                    <path d="M5 20V19C5 15.6863 7.68629 13 11 13H13C16.3137 13 19 15.6863 19 19V20" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M16 4L19 7L16 10" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 4L5 7L8 10" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="8" r="1" fill="#7FFF00" opacity="0.5"/>
                  </svg>
                </span>
                <span className="type-text">{texts.new}</span>
              </button>
              
              <button 
                className="type-button existing"
                onClick={() => handleCustomerTypeSelect('existing')}
              >
                <span className="type-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#7FFF00" strokeWidth="1.5"/>
                    <path d="M3 9H21" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="7" cy="13" r="1" fill="#7FFF00"/>
                    <circle cx="12" cy="13" r="1" fill="#7FFF00"/>
                    <circle cx="17" cy="13" r="1" fill="#7FFF00"/>
                    <path d="M8 17H16" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                </span>
                <span className="type-text">{texts.existing}</span>
              </button>
            </div>
          </div>
        </div>
      ) : customerType === 'new' && !newCustomerData ? (
        <NewCustomerForm 
          language={selectedLanguage} 
          onNext={handleNewCustomerNext}
          onBack={() => {
            setCustomerType(null);
            if (window.navigator.vibrate) {
              window.navigator.vibrate(10);
            }
          }}         
        />
      ) : customerType === 'new' && newCustomerData && !branchData ? (
        <BranchMap
          language={selectedLanguage}
          onBack={handleBranchBack}
          onSelect={handleBranchSelect}
        />
      ) : customerType === 'new' && branchData && !faceIdData ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'transparent',
          color: 'white',
          position: 'relative',
          zIndex: 1,
          padding: '20px',
          textAlign: 'center'
        }}>
          {/* Home Button */}
          <button 
            className="home-button"
            onClick={handleHome}
            aria-label="Go to home"
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#7FFF00',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '12px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(127, 255, 0, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" 
                stroke="#7FFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{texts.home}</span>
          </button>
          
          {/* Success Icon */}
          <div style={{
            width: '80px',
            height: '80px',
            background: 'rgba(127, 255, 0, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            border: '2px solid #7FFF00'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="#7FFF00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h1 style={{ 
            color: '#7FFF00', 
            fontSize: 'clamp(28px, 6vw, 36px)',
            marginBottom: '16px',
            fontWeight: '500'
          }}>
            {selectedLanguage === 'ru' ? 'Запись подтверждена!' :
             selectedLanguage === 'zh' ? '预约已确认！' :
             selectedLanguage === 'hi' ? 'अपॉइंटमेंट की पुष्टि हो गई!' :
             selectedLanguage === 'ar' ? '!تم تأكيد الموعد' :
             'Appointment Confirmed!'}
          </h1>
          
          <p style={{ 
            color: 'white', 
            opacity: 0.9,
            fontSize: '18px',
            marginBottom: '12px',
            fontWeight: '400'
          }}>
            {selectedLanguage === 'ru' ? 'Вы выбрали отделение:' :
             'You selected branch:'}
          </p>
          
          <p style={{ 
            color: '#7FFF00', 
            fontSize: '20px',
            marginBottom: '8px',
            fontWeight: '600'
          }}>
            {selectedLanguage === 'ru' ? branchData?.name : branchData?.nameEn}
          </p>
          
          <p style={{ 
            color: 'white', 
            opacity: 0.7,
            fontSize: '16px',
            marginBottom: '32px'
          }}>
            {selectedLanguage === 'ru' ? branchData?.address : branchData?.addressEn}
          </p>
          
          <div style={{
            background: 'rgba(127, 255, 0, 0.05)',
            borderRadius: '16px',
            padding: '20px',
            width: '100%',
            maxWidth: '300px',
            marginBottom: '32px',
            border: '1px solid rgba(127, 255, 0, 0.2)'
          }}>
            <p style={{ color: '#7FFF00', fontSize: '14px', marginBottom: '8px' }}>
              {selectedLanguage === 'ru' ? 'Дата и время' : 'Date & Time'}
            </p>
            <p style={{ color: 'white', fontSize: '18px', fontWeight: '500' }}>
              15 марта 2026 · 14:30
            </p>
          </div>
          
          <p style={{ 
            color: 'white', 
            opacity: 0.5,
            fontSize: '14px',
            maxWidth: '300px',
            lineHeight: '1.5'
          }}>
            {selectedLanguage === 'ru' ? 'Подтверждение отправлено на ваш номер телефона' :
             selectedLanguage === 'zh' ? '确认信息已发送到您的手机' :
             selectedLanguage === 'hi' ? 'पुष्टिकरण आपके फोन नंबर पर भेज दिया गया है' :
             selectedLanguage === 'ar' ? 'تم إرسال التأكيد إلى رقم هاتفك' :
             'Confirmation sent to your phone number'}
          </p>
        </div>
      ) : customerType === 'existing' && !loginData ? (
        <ExistingCustomerLogin
          language={selectedLanguage}
          onBack={() => setCustomerType(null)}
          onNext={handleExistingCustomerNext}
        />
      ) : customerType === 'existing' && loginData && !otpData ? (
        <OtpVerification
          language={selectedLanguage}
          contactInfo={loginData}
          onBack={() => setLoginData(null)}
          onNext={handleOtpNext}
        />
      ) : customerType === 'existing' && otpData && !pinData ? (
        <CreatePin
          language={selectedLanguage}
          onBack={handlePinBack}
          onNext={handlePinNext}
        />
      ) : customerType === 'existing' && pinData && !faceIdData ? (
        <FaceIdSetup
          language={selectedLanguage}
          onBack={handleFaceIdBack}
          onSkip={handleFaceIdSkip}
          onNext={handleFaceIdNext}
        />
      ) : customerType === 'existing' && faceIdData ? (
        <Dashboard
          language={selectedLanguage}
          userData={{
            ...loginData,
            ...otpData,
            ...pinData,
            ...faceIdData
          }}
        />
      ) : null}
    </OrientationLock>
  );
}

export default App;