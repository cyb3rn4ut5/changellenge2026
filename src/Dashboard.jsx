import React, { useState } from 'react';
import './Dashboard.css';

export default function Dashboard({ language, userData }) {
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Mock user data
  const userName = 'John';
  const cardNumber = '4532 1234 5678 9123';
  const balance = '124,567.89';
  const currency = '₽';

  // Recent transactions (Russia-localized)
  const transactions = [
    { id: 1, name: 'РОСТИКС', date: 'Сегодня', amount: -1249.00, category: 'food' },
    { id: 2, name: 'BURGER KING', date: 'Вчера', amount: -589.50, category: 'food' },
    { id: 3, name: 'ДИКСИ', date: '15 мар', amount: -2347.80, category: 'groceries' },
    { id: 4, name: 'ПЯТЁРОЧКА', date: '14 мар', amount: -1562.30, category: 'groceries' },
    { id: 5, name: 'Зарплата', date: '10 мар', amount: 85400.00, category: 'income' },
  ];

  // AI Recommendations (Russia-focused)
  const recommendations = [
    { id: 1, text: 'Курс валют в ближайшем отделении', icon: 'currency' },
    { id: 2, text: 'Скидка 15% в РОСТИКС по карте', icon: 'discount' },
    { id: 3, text: 'Кешбэк 5% в ПЯТЁРОЧКА', icon: 'cashback' },
  ];

  // Translations
  const texts = {
    ru: {
      welcome: 'Добро пожаловать',
      cardNumber: 'Номер карты',
      balance: 'Баланс',
      show: 'Показать',
      hide: 'Скрыть',
      recentTransactions: 'Последние операции',
      viewAll: 'Все',
      recommendations: 'Для вас',
      home: 'Главная',
      payments: 'Платежи',
      qr: 'QR-код',
      history: 'История',
      settings: 'Настройки',
      search: 'Поиск',
      chat: 'Чат',
      ai: 'AI ассистент',
      debit: 'Дебетовая'
    },
    en: {
      welcome: 'Welcome',
      cardNumber: 'Card Number',
      balance: 'Balance',
      show: 'Show',
      hide: 'Hide',
      recentTransactions: 'Recent Transactions',
      viewAll: 'View All',
      recommendations: 'For You',
      home: 'Home',
      payments: 'Payments',
      qr: 'QR Code',
      history: 'History',
      settings: 'Settings',
      search: 'Search',
      chat: 'Chat',
      ai: 'AI Assistant',
      debit: 'Debit'
    },
    zh: {
      welcome: '欢迎',
      cardNumber: '卡号',
      balance: '余额',
      show: '显示',
      hide: '隐藏',
      recentTransactions: '最近交易',
      viewAll: '查看全部',
      recommendations: '为你推荐',
      home: '首页',
      payments: '支付',
      qr: '二维码',
      history: '历史',
      settings: '设置',
      search: '搜索',
      chat: '聊天',
      ai: 'AI助手',
      debit: '借记卡'
    },
    hi: {
      welcome: 'स्वागत हे',
      cardNumber: 'कार्ड नंबर',
      balance: 'बैलेंस',
      show: 'दिखाएं',
      hide: 'छुपाएं',
      recentTransactions: 'हाल के लेन-देन',
      viewAll: 'सभी देखें',
      recommendations: 'आपके लिए',
      home: 'होम',
      payments: 'भुगतान',
      qr: 'क्यूआर कोड',
      history: 'इतिहास',
      settings: 'सेटिंग्स',
      search: 'खोज',
      chat: 'चैट',
      ai: 'AI सहायक',
      debit: 'डेबिट'
    },
    ar: {
      welcome: 'مرحباً',
      cardNumber: 'رقم البطاقة',
      balance: 'الرصيد',
      show: 'إظهار',
      hide: 'إخفاء',
      recentTransactions: 'المعاملات الأخيرة',
      viewAll: 'عرض الكل',
      recommendations: 'لك',
      home: 'الرئيسية',
      payments: 'المدفوعات',
      qr: 'رمز QR',
      history: 'السجل',
      settings: 'الإعدادات',
      search: 'بحث',
      chat: 'الدردشة',
      ai: 'مساعد AI',
      debit: 'بطاقة خصم'
    }
  };

  const t = texts[language] || texts.en;

  // SVG Icons
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

  const OTPSvg = () => (
    <svg width="32" height="32" viewBox="0 0 500 500" className="otp-logo">
      <path
        d="M70 230 A120 120 0 1 1 240 90"
        fill="none"
        stroke="#7FFF00"
        strokeWidth="35"
        strokeLinecap="round"
      />
      <circle
        cx="150"
        cy="170"
        r="55"
        fill="#7FFF00"
        className="center-circle"
      />
      <circle
        cx="235"
        cy="95"
        r="22"
        fill="#7FFF00"
        className="small-circle"
      />
    </svg>
  );

  const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="#7FFF00" strokeWidth="2"/>
      <path d="M16 16L21 21" stroke="#7FFF00" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const ChatIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const AiIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#7FFF00" strokeWidth="1.5"/>
      <path d="M12 8V12L15 15" stroke="#7FFF00" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="16" r="1" fill="#7FFF00"/>
    </svg>
  );

  const HomeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 10L12 3L21 10V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V10Z" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const PaymentsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="3" stroke="#7FFF00" strokeWidth="1.5"/>
      <path d="M2 8H22" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="6" cy="14" r="1" fill="#7FFF00"/>
    </svg>
  );

  const QrIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="#7FFF00" strokeWidth="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="#7FFF00" strokeWidth="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="#7FFF00" strokeWidth="1.5"/>
      <path d="M14 14H21V21H14V14Z" stroke="#7FFF00" strokeWidth="1.5"/>
      <path d="M18 14V21" stroke="#7FFF00" strokeWidth="1.5"/>
      <path d="M14 18H21" stroke="#7FFF00" strokeWidth="1.5"/>
    </svg>
  );

  const HistoryIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#7FFF00" strokeWidth="1.5"/>
      <path d="M12 7V12L15 15" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="16" r="0.5" fill="#7FFF00"/>
    </svg>
  );

  const SettingsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="#7FFF00" strokeWidth="1.5"/>
      <path d="M19.4 15C19.1 15.6 18.7 16.2 18.2 16.7L19 18L18 19L16.7 18.2C16.2 18.7 15.6 19.1 15 19.4L15 21H9L9 19.4C8.4 19.1 7.8 18.7 7.3 18.2L6 19L5 18L5.8 16.7C5.3 16.2 4.9 15.6 4.6 15L3 15L3 9L4.6 9C4.9 8.4 5.3 7.8 5.8 7.3L5 6L6 5L7.3 5.8C7.8 5.3 8.4 4.9 9 4.6L9 3H15V4.6C15.6 4.9 16.2 5.3 16.7 5.8L18 5L19 6L18.2 7.3C18.7 7.8 19.1 8.4 19.4 9L21 9V15L19.4 15Z" stroke="#7FFF00" strokeWidth="1.5"/>
    </svg>
  );

  const FoodIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 11H21" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 4V8" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 4V8" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="5" y="8" width="14" height="12" rx="2" stroke="#7FFF00" strokeWidth="1.5"/>
    </svg>
  );

  const GroceryIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M5 6H19L18 14H6L5 6Z" stroke="#7FFF00" strokeWidth="1.5"/>
      <circle cx="9" cy="20" r="2" stroke="#7FFF00" strokeWidth="1.5"/>
      <circle cx="17" cy="20" r="2" stroke="#7FFF00" strokeWidth="1.5"/>
      <path d="M3 4H5L6 8" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const IncomeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3V21" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 8L12 3L17 8" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const CurrencyIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#7FFF00" strokeWidth="1.5"/>
      <path d="M8 9H16" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 12H14" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 15H12" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const DiscountIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="9" cy="9" r="1" fill="#7FFF00"/>
      <circle cx="15" cy="15" r="1" fill="#7FFF00"/>
      <path d="M16 8L8 16" stroke="#7FFF00" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const CashbackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#7FFF00" strokeWidth="1.5"/>
      <path d="M8 12L10 14L16 8" stroke="#7FFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const getTransactionIcon = (category) => {
    switch(category) {
      case 'food': return <FoodIcon />;
      case 'groceries': return <GroceryIcon />;
      case 'income': return <IncomeIcon />;
      default: return <GroceryIcon />;
    }
  };

  const getRecommendationIcon = (type) => {
    switch(type) {
      case 'currency': return <CurrencyIcon />;
      case 'discount': return <DiscountIcon />;
      case 'cashback': return <CashbackIcon />;
      default: return <CurrencyIcon />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="profile-section">
          <div className="profile-avatar">
            <span>{userName[0]}</span>
          </div>
          <span className="profile-name">{t.welcome}, {userName}</span>
        </div>
        
        <div className="header-actions">
          <button className="icon-button">
            <SearchIcon />
          </button>
          <button className="icon-button">
            <ChatIcon />
          </button>
          <button className="icon-button ai-button">
            <AiIcon />
          </button>
        </div>
      </div>

      {/* Mir Card */}
      <div className="card-container">
        <div className="mir-card">
          <div className="card-header">
            <div className="card-brand">
              <div className="otp-logo-container">
                <svg width="40" height="40" viewBox="-50 0 1700 1600" className="otp-logo">
                  <g className="final-logo">
                    <path d="M 769.5,-0.5 C 778.5,-0.5 787.5,-0.5 796.5,-0.5C 797.497,95.7629 797.831,192.096 797.5,288.5C 640.753,292.138 510.92,352.471 408,469.5C 305.466,595.963 269.133,739.63 299,900.5C 333.939,1053.7 419.439,1168.86 555.5,1246C 690.945,1315.61 830.611,1325.28 974.5,1275C 1116.52,1218.98 1216.02,1120.15 1273,978.5C 1295.16,919.528 1306.33,858.528 1306.5,795.5C 1402.83,795.5 1499.17,795.5 1595.5,795.5C 1595.5,804.167 1595.5,812.833 1595.5,821.5C 1584.16,1052.32 1493.16,1244.82 1322.5,1399C 1183.3,1518.55 1021.64,1584.05 837.5,1595.5C 812.167,1595.5 786.833,1595.5 761.5,1595.5C 550.367,1583.16 370.867,1502.16 223,1352.5C 83.0365,1204.15 8.53647,1027.48 -0.5,822.5C -0.5,801.833 -0.5,781.167 -0.5,760.5C 12.9339,543.829 97.9339,360.996 254.5,212C 400.306,80.0783 571.973,9.24496 769.5,-0.5 Z" fill="#7FFF00"/>
                    <path d="M 777.5,443.5 C 901.349,439.526 1002.18,485.193 1080,580.5C 1150.41,676.548 1170.24,782.381 1139.5,898C 1106.86,1001.3 1041.53,1075.97 943.5,1122C 864.05,1155.42 782.717,1160.76 699.5,1138C 591.727,1104.19 515.56,1035.35 471,931.5C 439.606,849.343 437.273,766.343 464,682.5C 507.172,565.995 588.339,490.161 707.5,455C 730.621,448.962 753.954,445.129 777.5,443.5 Z" fill="#7FFF00"/>
                    <path d="M 1230.5,146.5 C 1316.68,143.165 1381.85,178.165 1426,251.5C 1454.88,308.343 1458.21,366.676 1436,426.5C 1402.57,500.573 1345.4,542.407 1264.5,552C 1193.51,556.074 1135.01,531.24 1089,477.5C 1045.48,419.867 1033.81,356.201 1054,286.5C 1079.65,215.179 1129.15,170.012 1202.5,151C 1211.93,149.236 1221.27,147.736 1230.5,146.5 Z" fill="#7FFF00"/>
                  </g>
                </svg>
                <span className="bank-name" style={{ 
                  fontFamily: "'Inter', sans-serif", 
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "white",
                  letterSpacing: "-0.02em"
                }}>
                  ОТП Банк
                </span>
              </div>
            </div>
            <span className="mir-text">МИР</span>
          </div>
          
          <div className="card-number-container">
            <span className="card-number">
              {showCardNumber ? cardNumber : '••••  ••••  ••••  ••••'}
            </span>
            <button 
              className="toggle-button"
              onClick={() => setShowCardNumber(!showCardNumber)}
            >
              <EyeIcon show={showCardNumber} />
            </button>
          </div>
          
          <div className="card-balance-container">
            <span className="balance-label">{t.balance}</span>
            <div className="balance-value-container">
              <span className="balance-value">
                {showBalance ? `${currency} ${balance}` : '••••••'}
              </span>
              <button 
                className="toggle-button"
                onClick={() => setShowBalance(!showBalance)}
              >
                <EyeIcon show={showBalance} />
              </button>
            </div>
          </div>
          
          <div className="card-footer">
            <div className="debit-overlay">{t.debit}</div>
            <span className="card-valid">12/28</span>
            <span className="card-chip"></span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-button">
          <PaymentsIcon />
          <span className="action-label">{t.payments}</span>
        </button>
        <button className="action-button">
          <HistoryIcon />
          <span className="action-label">{t.history}</span>
        </button>
        <button className="action-button">
          <QrIcon />
          <span className="action-label">{t.qr}</span>
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="transactions-section">
        <div className="section-header">
          <h3>{t.recentTransactions}</h3>
          <button className="view-all-button">{t.viewAll} →</button>
        </div>
        
        <div className="transactions-list">
          {transactions.map(tx => (
            <div key={tx.id} className="transaction-item">
              <div className="transaction-icon">
                {getTransactionIcon(tx.category)}
              </div>
              <div className="transaction-details">
                <div className="transaction-name">{tx.name}</div>
                <div className="transaction-date">{tx.date}</div>
              </div>
              <div className={`transaction-amount ${tx.amount > 0 ? 'positive' : 'negative'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount} {currency}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="recommendations-section">
        <div className="section-header">
          <h3>{t.recommendations}</h3>
          <AiIcon />
        </div>
        
        <div className="recommendations-list">
          {recommendations.map(rec => (
            <button key={rec.id} className="recommendation-item">
              <span className="rec-icon">
                {getRecommendationIcon(rec.icon)}
              </span>
              <span className="rec-text">{rec.text}</span>
              <span className="rec-arrow">→</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="footer-nav">
        <button 
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <HomeIcon />
          <span className="nav-label">{t.home}</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'payments' ? 'active' : ''}`}
          onClick={() => setActiveTab('payments')}
        >
          <PaymentsIcon />
          <span className="nav-label">{t.payments}</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'qr' ? 'active' : ''}`}
          onClick={() => setActiveTab('qr')}
        >
          <QrIcon />
          <span className="nav-label">{t.qr}</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <HistoryIcon />
          <span className="nav-label">{t.history}</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <SettingsIcon />
          <span className="nav-label">{t.settings}</span>
        </button>
      </div>
    </div>
  );
}