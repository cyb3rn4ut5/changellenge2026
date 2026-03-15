import React, { useState, useEffect } from 'react';
import './Dashboard.css';

export default function Dashboard({ language = 'ru', userData = {} }) {
  // ============= STATE MANAGEMENT =============
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  
  // Modal States
  const [activeModal, setActiveModal] = useState(null);
  const [paymentStep, setPaymentStep] = useState('amount');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [selectedPaymentCard, setSelectedPaymentCard] = useState(null);
  const [selectedUtility, setSelectedUtility] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [utilityAccount, setUtilityAccount] = useState('');
  
  // QR Scanner State
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  // ============= MOCK DATA =============
  const cards = [
    {
      id: 1,
      type: 'МИР',
      bank: 'ОТП Банк',
      number: '4532 1234 5678 9123',
      balance: 124567.89,
      currency: '₽',
      color: 'linear-gradient(135deg, #1A3B5C, #0F2A40)',
      expiry: '12/28'
    },
    {
      id: 2,
      type: 'МИР Premium',
      bank: 'ОТП Банк',
      number: '9876 5432 1098 7654',
      balance: 45789.32,
      currency: '₽',
      color: 'linear-gradient(135deg, #2D1B2E, #1A0F1A)',
      expiry: '08/27'
    },
    {
      id: 3,
      type: 'МИР Digital',
      bank: 'ОТП Банк',
      number: '5555 7777 3333 1111',
      balance: 23500.00,
      currency: '₽',
      color: 'linear-gradient(135deg, #1A2E2B, #0F1A17)',
      expiry: '03/29'
    }
  ];

  // Banks for SBP section
  const sbpBanks = [
    { id: 1, name: 'Сбербанк', icon: 'sber' },
    { id: 2, name: 'Т-Банк', icon: 'tbank' },
    { id: 3, name: 'Альфа-Банк', icon: 'alfa' },
    { id: 4, name: 'ВТБ', icon: 'vtb' },
    { id: 5, name: 'Газпромбанк', icon: 'gazprom' },
    { id: 6, name: 'Райффайзен', icon: 'raiffeisen' },
    { id: 7, name: 'Открытие', icon: 'otkritie' },
    { id: 8, name: 'Почта Банк', icon: 'pochta' }
  ];

  // Utilities for other payments
  const utilities = [
    { id: 1, key: 'education', icon: 'education' },
    { id: 2, key: 'mobile', icon: 'phone' },
    { id: 3, key: 'electricity', icon: 'electricity' },
    { id: 4, key: 'gas', icon: 'gas' },
    { id: 5, key: 'water', icon: 'water' },
    { id: 6, key: 'internet', icon: 'internet' },
    { id: 7, key: 'fines', icon: 'fine' },
    { id: 8, key: 'taxes', icon: 'tax' }
  ];

  // All Transactions
  const allTransactions = [
    { id: 1, name: 'РОСТИКС', date: '2024-03-15', amount: -1249.00, category: 'food', time: '14:30' },
    { id: 2, name: 'BURGER KING', date: '2024-03-14', amount: -589.50, category: 'food', time: '19:45' },
    { id: 3, name: 'ДИКСИ', date: '2024-03-13', amount: -2347.80, category: 'groceries', time: '11:20' },
    { id: 4, name: 'ПЯТЁРОЧКА', date: '2024-03-12', amount: -1562.30, category: 'groceries', time: '16:15' },
    { id: 5, name: 'Зарплата', date: '2024-03-10', amount: 85400.00, category: 'income', time: '09:00' },
    { id: 6, name: 'МТС', date: '2024-03-08', amount: -650.00, category: 'utilities', time: '10:30' },
    { id: 7, name: 'Яндекс Go', date: '2024-03-07', amount: -389.00, category: 'transport', time: '22:15' },
    { id: 8, name: 'Кино', date: '2024-03-05', amount: -800.00, category: 'entertainment', time: '20:00' }
  ];

  // Fixed Deposit Accounts (Gamified)
  const fdAccounts = [
    {
      id: 1,
      nameKey: 'fdName1',
      goal: 100000,
      current: 35000,
      streak: 15,
      nextMilestone: 50000,
      interest: 8.5,
      color: 'linear-gradient(135deg, #1A3B5C, #0F2A40)'
    },
    {
      id: 2,
      nameKey: 'fdName2',
      goal: 500000,
      current: 127000,
      streak: 42,
      nextMilestone: 150000,
      interest: 9.2,
      color: 'linear-gradient(135deg, #2D1B2E, #1A0F1A)'
    }
  ];

  // Debts
  const debts = [
    {
      id: 1,
      nameKey: 'mortgage',
      total: 2500000,
      paid: 450000,
      monthly: 45000,
      nextDate: '2024-04-10',
      interest: 9.5
    },
    {
      id: 2,
      nameKey: 'educationDebt',
      total: 500000,
      paid: 120000,
      monthly: 15000,
      nextDate: '2024-03-25',
      interest: 5.0
    }
  ];

// ============= COMPLETE 8-LANGUAGE TEXT OBJECT =============
// Replace the existing 'texts' object in Dashboard.jsx with this
const texts = {
  ru: {
    // Header
    welcome: 'С возвращением',
    userName: 'Александр',
    search: 'Поиск',
    notifications: 'Уведомления',
    
    // Cards
    balance: 'Баланс',
    cardNumber: 'Номер карты',
    show: 'Показать',
    hide: 'Скрыть',
    debit: 'Дебетовая',
    
    // Quick Actions
    quickActions: 'Быстрые действия',
    qrPayment: 'Оплата по QR',
    phonePayment: 'По номеру',
    sbp: 'СБП',
    transfer: 'Перевод',
    
    // SBP / Utilities
    sbpFull: 'Платежи и переводы',
    education: 'Образование',
    mobile: 'Мобильная связь',
    electricity: 'Электричество',
    gas: 'Газ',
    water: 'Вода',
    internet: 'Интернет',
    fines: 'Штрафы',
    taxes: 'Налоги',
    
    // Banks
    selectBank: 'Выберите банк',
    sberbank: 'Сбербанк',
    tbank: 'Т-Банк',
    alfabank: 'Альфа-Банк',
    vtb: 'ВТБ',
    gazprombank: 'Газпромбанк',
    raiffeisen: 'Райффайзен',
    otkritie: 'Открытие',
    pochta: 'Почта Банк',
    
    // Analytics
    analytics: 'Аналитика',
    thisWeek: 'Эта неделя',
    thisMonth: 'Этот месяц',
    thisYear: 'Этот год',
    income: 'Доход',
    expenses: 'Расходы',
    
    // Categories
    food: 'Питание',
    groceries: 'Продукты',
    transport: 'Транспорт',
    entertainment: 'Развлечения',
    utilities: 'Коммунальные',
    
    // Fixed Deposits (Gamified)
    savings: 'Накопления',
    fixedDeposit: 'Накопительный счёт',
    investment: 'Инвестиции',
    goal: 'Цель',
    current: 'Текущее',
    interest: 'Ставка',
    streak: 'Дней подряд',
    nextMilestone: 'Следующая цель',
    leftToGoal: 'До цели',
    replenish: 'Пополнить',
    fdName1: 'Накопительный',
    fdName2: 'Инвестиционный',
    
    // Debt Reminders
    debtReminder: 'Напоминание о долгах',
    mortgage: 'Ипотека',
    educationDebt: 'Образование',
    paid: 'Оплачено',
    remaining: 'Осталось',
    monthlyPayment: 'Ежемесячный платёж',
    nextPayment: 'Следующий платёж',
    days: 'дн.',
    pay: 'Оплатить',
    
    // Recent Transactions
    recentTransactions: 'Последние операции',
    viewAll: 'Все',
    collapse: 'Свернуть',
    
    // Bottom Navigation
    home: 'Главная',
    payments: 'Платежи',
    history: 'История',
    settings: 'Настройки',
    
    // QR Scanner
    scanQR: 'Сканируйте QR-код',
    alignQR: 'Поместите QR-код в рамку',
    qrDetected: 'QR-код обнаружен!',
    
    // Modals - Common
    cancel: 'Отмена',
    continue: 'Продолжить',
    confirm: 'Подтвердить',
    back: 'Назад',
    done: 'Готово',
    
    // Payment Modals
    enterAmount: 'Введите сумму',
    enterPhone: 'Введите номер телефона',
    enterAccount: 'Введите номер счета',
    selectCard: 'Выберите карту',
    card: 'Карта',
    amount: 'Сумма',
    recipient: 'Получатель',
    processing: 'Обработка платежа',
    success: 'Платёж успешен',
    
    // Card Selection
    cardNumberMask: '**** {number}',
    balanceLabel: 'Баланс',
    
    // Filter
    all: 'Все',
    
    // Progress text
    progressFormat: (paid, total) => `Оплачено: ${paid.toLocaleString()} ₽ · Осталось: ${(total - paid).toLocaleString()} ₽`,
    daysFormat: (days) => `${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дн.'}`,
    
    // Month names for date formatting
    months: {
      '01': 'янв',
      '02': 'фев',
      '03': 'мар',
      '04': 'апр',
      '05': 'май',
      '06': 'июн',
      '07': 'июл',
      '08': 'авг',
      '09': 'сен',
      '10': 'окт',
      '11': 'ноя',
      '12': 'дек'
    },
    
    // Helper function for utility names
    getUtilityName: (key) => {
      const names = {
        education: 'Образование',
        mobile: 'Мобильная связь',
        electricity: 'Электричество',
        gas: 'Газ',
        water: 'Вода',
        internet: 'Интернет',
        fines: 'Штрафы',
        taxes: 'Налоги'
      };
      return names[key] || key;
    },
    
    // Helper function for bank names
    getBankName: (key) => {
      const names = {
        sber: 'Сбербанк',
        tbank: 'Т-Банк',
        alfa: 'Альфа-Банк',
        vtb: 'ВТБ',
        gazprom: 'Газпромбанк',
        raiffeisen: 'Райффайзен',
        otkritie: 'Открытие',
        pochta: 'Почта Банк'
      };
      return names[key] || key;
    }
  },
  
  en: {
    // Header
    welcome: 'Welcome back',
    userName: 'Alexander',
    search: 'Search',
    notifications: 'Notifications',
    
    // Cards
    balance: 'Balance',
    cardNumber: 'Card Number',
    show: 'Show',
    hide: 'Hide',
    debit: 'Debit',
    
    // Quick Actions
    quickActions: 'Quick Actions',
    qrPayment: 'QR Payment',
    phonePayment: 'By Phone',
    sbp: 'SBP',
    transfer: 'Transfer',
    
    // SBP / Utilities
    sbpFull: 'Payments & Transfers',
    education: 'Education',
    mobile: 'Mobile',
    electricity: 'Electricity',
    gas: 'Gas',
    water: 'Water',
    internet: 'Internet',
    fines: 'Fines',
    taxes: 'Taxes',
    
    // Banks
    selectBank: 'Select Bank',
    sberbank: 'Sberbank',
    tbank: 'T-Bank',
    alfabank: 'Alfa-Bank',
    vtb: 'VTB',
    gazprombank: 'Gazprombank',
    raiffeisen: 'Raiffeisen',
    otkritie: 'Otkritie',
    pochta: 'Pochta Bank',
    
    // Analytics
    analytics: 'Analytics',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    thisYear: 'This Year',
    income: 'Income',
    expenses: 'Expenses',
    
    // Categories
    food: 'Food',
    groceries: 'Groceries',
    transport: 'Transport',
    entertainment: 'Entertainment',
    utilities: 'Utilities',
    
    // Fixed Deposits (Gamified)
    savings: 'Savings',
    fixedDeposit: 'Fixed Deposit',
    investment: 'Investment',
    goal: 'Goal',
    current: 'Current',
    interest: 'Interest',
    streak: 'Day streak',
    nextMilestone: 'Next Milestone',
    leftToGoal: 'Left to Goal',
    replenish: 'Replenish',
    fdName1: 'Savings',
    fdName2: 'Investment',
    
    // Debt Reminders
    debtReminder: 'Debt Reminder',
    mortgage: 'Mortgage',
    educationDebt: 'Education',
    paid: 'Paid',
    remaining: 'Remaining',
    monthlyPayment: 'Monthly Payment',
    nextPayment: 'Next Payment',
    days: 'days',
    pay: 'Pay',
    
    // Recent Transactions
    recentTransactions: 'Recent Transactions',
    viewAll: 'View All',
    collapse: 'Collapse',
    
    // Bottom Navigation
    home: 'Home',
    payments: 'Payments',
    history: 'History',
    settings: 'Settings',
    
    // QR Scanner
    scanQR: 'Scan QR Code',
    alignQR: 'Align QR code within frame',
    qrDetected: 'QR Code detected!',
    
    // Modals - Common
    cancel: 'Cancel',
    continue: 'Continue',
    confirm: 'Confirm',
    back: 'Back',
    done: 'Done',
    
    // Payment Modals
    enterAmount: 'Enter amount',
    enterPhone: 'Enter phone number',
    enterAccount: 'Enter account number',
    selectCard: 'Select card',
    card: 'Card',
    amount: 'Amount',
    recipient: 'Recipient',
    processing: 'Processing payment',
    success: 'Payment successful',
    
    // Card Selection
    cardNumberMask: '**** {number}',
    balanceLabel: 'Balance',
    
    // Filter
    all: 'All',
    
    // Progress text
    progressFormat: (paid, total) => `Paid: ${paid.toLocaleString()} ₽ · Left: ${(total - paid).toLocaleString()} ₽`,
    daysFormat: (days) => `${days} ${days === 1 ? 'day' : 'days'}`,
    
    // Month names for date formatting
    months: {
      '01': 'Jan',
      '02': 'Feb',
      '03': 'Mar',
      '04': 'Apr',
      '05': 'May',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Aug',
      '09': 'Sep',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec'
    },
    
    // Helper function for utility names
    getUtilityName: (key) => {
      const names = {
        education: 'Education',
        mobile: 'Mobile',
        electricity: 'Electricity',
        gas: 'Gas',
        water: 'Water',
        internet: 'Internet',
        fines: 'Fines',
        taxes: 'Taxes'
      };
      return names[key] || key;
    },
    
    // Helper function for bank names
    getBankName: (key) => {
      const names = {
        sber: 'Sberbank',
        tbank: 'T-Bank',
        alfa: 'Alfa-Bank',
        vtb: 'VTB',
        gazprom: 'Gazprombank',
        raiffeisen: 'Raiffeisen',
        otkritie: 'Otkritie',
        pochta: 'Pochta Bank'
      };
      return names[key] || key;
    }
  },
  
  zh: {
    // Header
    welcome: '欢迎回来',
    userName: '亚历山大',
    search: '搜索',
    notifications: '通知',
    
    // Cards
    balance: '余额',
    cardNumber: '卡号',
    show: '显示',
    hide: '隐藏',
    debit: '借记卡',
    
    // Quick Actions
    quickActions: '快捷操作',
    qrPayment: '二维码支付',
    phonePayment: '手机支付',
    sbp: '快速支付',
    transfer: '转账',
    
    // SBP / Utilities
    sbpFull: '支付与转账',
    education: '教育',
    mobile: '手机',
    electricity: '电费',
    gas: '燃气',
    water: '水费',
    internet: '网络',
    fines: '罚款',
    taxes: '税费',
    
    // Banks
    selectBank: '选择银行',
    sberbank: '储蓄银行',
    tbank: 'T银行',
    alfabank: '阿尔法银行',
    vtb: 'VTB银行',
    gazprombank: '天然气工业银行',
    raiffeisen: '赖夫艾森银行',
    otkritie: 'Otkritie银行',
    pochta: '邮政银行',
    
    // Analytics
    analytics: '分析',
    thisWeek: '本周',
    thisMonth: '本月',
    thisYear: '今年',
    income: '收入',
    expenses: '支出',
    
    // Categories
    food: '餐饮',
    groceries: '购物',
    transport: '交通',
    entertainment: '娱乐',
    utilities: '水电',
    
    // Fixed Deposits (Gamified)
    savings: '储蓄',
    fixedDeposit: '定期存款',
    investment: '投资',
    goal: '目标',
    current: '当前',
    interest: '利率',
    streak: '连续天数',
    nextMilestone: '下一个里程碑',
    leftToGoal: '距离目标',
    replenish: '充值',
    fdName1: '储蓄账户',
    fdName2: '投资账户',
    
    // Debt Reminders
    debtReminder: '债务提醒',
    mortgage: '房贷',
    educationDebt: '教育贷款',
    paid: '已付',
    remaining: '剩余',
    monthlyPayment: '月付',
    nextPayment: '下次付款',
    days: '天',
    pay: '支付',
    
    // Recent Transactions
    recentTransactions: '最近交易',
    viewAll: '全部',
    collapse: '收起',
    
    // Bottom Navigation
    home: '主页',
    payments: '支付',
    history: '历史',
    settings: '设置',
    
    // QR Scanner
    scanQR: '扫描二维码',
    alignQR: '将二维码放入框内',
    qrDetected: '二维码已检测到！',
    
    // Modals - Common
    cancel: '取消',
    continue: '继续',
    confirm: '确认',
    back: '返回',
    done: '完成',
    
    // Payment Modals
    enterAmount: '输入金额',
    enterPhone: '输入手机号码',
    enterAccount: '输入账号',
    selectCard: '选择卡片',
    card: '卡',
    amount: '金额',
    recipient: '收款人',
    processing: '处理支付',
    success: '支付成功',
    
    // Card Selection
    cardNumberMask: '**** {number}',
    balanceLabel: '余额',
    
    // Filter
    all: '全部',
    
    // Progress text
    progressFormat: (paid, total) => `已付: ${paid.toLocaleString()} ₽ · 剩余: ${(total - paid).toLocaleString()} ₽`,
    daysFormat: (days) => `${days}天`,
    
    // Month names for date formatting
    months: {
      '01': '1月',
      '02': '2月',
      '03': '3月',
      '04': '4月',
      '05': '5月',
      '06': '6月',
      '07': '7月',
      '08': '8月',
      '09': '9月',
      '10': '10月',
      '11': '11月',
      '12': '12月'
    },
    
    // Helper function for utility names
    getUtilityName: (key) => {
      const names = {
        education: '教育',
        mobile: '手机',
        electricity: '电费',
        gas: '燃气',
        water: '水费',
        internet: '网络',
        fines: '罚款',
        taxes: '税费'
      };
      return names[key] || key;
    },
    
    // Helper function for bank names
    getBankName: (key) => {
      const names = {
        sber: '储蓄银行',
        tbank: 'T银行',
        alfa: '阿尔法银行',
        vtb: 'VTB银行',
        gazprom: '天然气工业银行',
        raiffeisen: '赖夫艾森银行',
        otkritie: 'Otkritie银行',
        pochta: '邮政银行'
      };
      return names[key] || key;
    }
  },
  
  hi: {
    // Header
    welcome: 'वापसी पर स्वागत है',
    userName: 'अलेक्जेंडर',
    search: 'खोजें',
    notifications: 'सूचनाएं',
    
    // Cards
    balance: 'बैलेंस',
    cardNumber: 'कार्ड नंबर',
    show: 'दिखाएं',
    hide: 'छुपाएं',
    debit: 'डेबिट',
    
    // Quick Actions
    quickActions: 'त्वरित कार्रवाई',
    qrPayment: 'क्यूआर भुगतान',
    phonePayment: 'फोन द्वारा',
    sbp: 'एसबीपी',
    transfer: 'ट्रांसफर',
    
    // SBP / Utilities
    sbpFull: 'भुगतान और ट्रांसफर',
    education: 'शिक्षा',
    mobile: 'मोबाइल',
    electricity: 'बिजली',
    gas: 'गैस',
    water: 'पानी',
    internet: 'इंटरनेट',
    fines: 'जुर्माना',
    taxes: 'कर',
    
    // Banks
    selectBank: 'बैंक चुनें',
    sberbank: 'स्बेरबैंक',
    tbank: 'टी-बैंक',
    alfabank: 'अल्फा-बैंक',
    vtb: 'वीटीबी',
    gazprombank: 'गैज़प्रॉमबैंक',
    raiffeisen: 'राइफ़ाइज़ेन',
    otkritie: 'ओटक्रिटी',
    pochta: 'पोच्टा बैंक',
    
    // Analytics
    analytics: 'एनालिटिक्स',
    thisWeek: 'इस सप्ताह',
    thisMonth: 'इस महीने',
    thisYear: 'इस वर्ष',
    income: 'आय',
    expenses: 'खर्च',
    
    // Categories
    food: 'भोजन',
    groceries: 'किराना',
    transport: 'परिवहन',
    entertainment: 'मनोरंजन',
    utilities: 'उपयोगिताएँ',
    
    // Fixed Deposits (Gamified)
    savings: 'बचत',
    fixedDeposit: 'फिक्स्ड डिपॉजिट',
    investment: 'निवेश',
    goal: 'लक्ष्य',
    current: 'वर्तमान',
    interest: 'ब्याज दर',
    streak: 'लगातार दिन',
    nextMilestone: 'अगला माइलस्टोन',
    leftToGoal: 'लक्ष्य से शेष',
    replenish: 'पुनः भरें',
    fdName1: 'बचत खाता',
    fdName2: 'निवेश खाता',
    
    // Debt Reminders
    debtReminder: 'ऋण अनुस्मारक',
    mortgage: 'गिरवी',
    educationDebt: 'शिक्षा ऋण',
    paid: 'भुगतान किया',
    remaining: 'शेष',
    monthlyPayment: 'मासिक भुगतान',
    nextPayment: 'अगला भुगतान',
    days: 'दिन',
    pay: 'भुगतान करें',
    
    // Recent Transactions
    recentTransactions: 'हाल के लेन-देन',
    viewAll: 'सभी देखें',
    collapse: 'संक्षिप्त करें',
    
    // Bottom Navigation
    home: 'होम',
    payments: 'भुगतान',
    history: 'इतिहास',
    settings: 'सेटिंग्स',
    
    // QR Scanner
    scanQR: 'क्यूआर कोड स्कैन करें',
    alignQR: 'क्यूआर कोड को फ्रेम में रखें',
    qrDetected: 'क्यूआर कोड मिला!',
    
    // Modals - Common
    cancel: 'रद्द करें',
    continue: 'जारी रखें',
    confirm: 'पुष्टि करें',
    back: 'वापस',
    done: 'पूर्ण',
    
    // Payment Modals
    enterAmount: 'राशि दर्ज करें',
    enterPhone: 'फोन नंबर दर्ज करें',
    enterAccount: 'खाता नंबर दर्ज करें',
    selectCard: 'कार्ड चुनें',
    card: 'कार्ड',
    amount: 'राशि',
    recipient: 'प्राप्तकर्ता',
    processing: 'भुगतान प्रक्रियाधीन',
    success: 'भुगतान सफल',
    
    // Card Selection
    cardNumberMask: '**** {number}',
    balanceLabel: 'बैलेंस',
    
    // Filter
    all: 'सभी',
    
    // Progress text
    progressFormat: (paid, total) => `भुगतान: ${paid.toLocaleString()} ₽ · शेष: ${(total - paid).toLocaleString()} ₽`,
    daysFormat: (days) => `${days} दिन`,
    
    // Month names for date formatting
    months: {
      '01': 'जन',
      '02': 'फर',
      '03': 'मार',
      '04': 'अप्र',
      '05': 'मई',
      '06': 'जून',
      '07': 'जुल',
      '08': 'अग',
      '09': 'सित',
      '10': 'अक्ट',
      '11': 'नव',
      '12': 'दिस'
    },
    
    // Helper function for utility names
    getUtilityName: (key) => {
      const names = {
        education: 'शिक्षा',
        mobile: 'मोबाइल',
        electricity: 'बिजली',
        gas: 'गैस',
        water: 'पानी',
        internet: 'इंटरनेट',
        fines: 'जुर्माना',
        taxes: 'कर'
      };
      return names[key] || key;
    },
    
    // Helper function for bank names
    getBankName: (key) => {
      const names = {
        sber: 'स्बेरबैंक',
        tbank: 'टी-बैंक',
        alfa: 'अल्फा-बैंक',
        vtb: 'वीटीबी',
        gazprom: 'गैज़प्रॉमबैंक',
        raiffeisen: 'राइफ़ाइज़ेन',
        otkritie: 'ओटक्रिटी',
        pochta: 'पोच्टा बैंक'
      };
      return names[key] || key;
    }
  },
  
  ar: {
    // Header
    welcome: 'مرحباً بعودتك',
    userName: 'ألكسندر',
    search: 'بحث',
    notifications: 'إشعارات',
    
    // Cards
    balance: 'الرصيد',
    cardNumber: 'رقم البطاقة',
    show: 'إظهار',
    hide: 'إخفاء',
    debit: 'بطاقة خصم',
    
    // Quick Actions
    quickActions: 'إجراءات سريعة',
    qrPayment: 'الدفع عبر QR',
    phonePayment: 'بالهاتف',
    sbp: 'SBP',
    transfer: 'تحويل',
    
    // SBP / Utilities
    sbpFull: 'المدفوعات والتحويلات',
    education: 'تعليم',
    mobile: 'جوال',
    electricity: 'كهرباء',
    gas: 'غاز',
    water: 'مياه',
    internet: 'إنترنت',
    fines: 'غرامات',
    taxes: 'ضرائب',
    
    // Banks
    selectBank: 'اختر البنك',
    sberbank: 'سبيربنك',
    tbank: 'تي-بنك',
    alfabank: 'ألفا-بنك',
    vtb: 'في تي بي',
    gazprombank: 'غازبروم بنك',
    raiffeisen: 'رايفايزن',
    otkritie: 'أوتكريتي',
    pochta: 'بنك البريد',
    
    // Analytics
    analytics: 'التحليلات',
    thisWeek: 'هذا الأسبوع',
    thisMonth: 'هذا الشهر',
    thisYear: 'هذه السنة',
    income: 'دخل',
    expenses: 'مصروفات',
    
    // Categories
    food: 'طعام',
    groceries: 'بقالة',
    transport: 'مواصلات',
    entertainment: 'ترفيه',
    utilities: 'مرافق',
    
    // Fixed Deposits (Gamified)
    savings: 'مدخرات',
    fixedDeposit: 'وديعة ثابتة',
    investment: 'استثمارات',
    goal: 'هدف',
    current: 'حالي',
    interest: 'فائدة',
    streak: 'أيام متتالية',
    nextMilestone: 'الهدف التالي',
    leftToGoal: 'متبقي للهدف',
    replenish: 'إعادة تعبئة',
    fdName1: 'حساب توفير',
    fdName2: 'حساب استثماري',
    
    // Debt Reminders
    debtReminder: 'تذكير الديون',
    mortgage: 'رهن عقاري',
    educationDebt: 'قرض تعليمي',
    paid: 'مدفوع',
    remaining: 'متبقي',
    monthlyPayment: 'الدفعة الشهرية',
    nextPayment: 'الدفعة القادمة',
    days: 'أيام',
    pay: 'ادفع',
    
    // Recent Transactions
    recentTransactions: 'آخر المعاملات',
    viewAll: 'عرض الكل',
    collapse: 'طي',
    
    // Bottom Navigation
    home: 'الرئيسية',
    payments: 'المدفوعات',
    history: 'السجل',
    settings: 'الإعدادات',
    
    // QR Scanner
    scanQR: 'امسح رمز QR',
    alignQR: 'ضع رمز QR في الإطار',
    qrDetected: 'تم اكتشاف رمز QR!',
    
    // Modals - Common
    cancel: 'إلغاء',
    continue: 'متابعة',
    confirm: 'تأكيد',
    back: 'رجوع',
    done: 'تم',
    
    // Payment Modals
    enterAmount: 'أدخل المبلغ',
    enterPhone: 'أدخل رقم الهاتف',
    enterAccount: 'أدخل رقم الحساب',
    selectCard: 'اختر البطاقة',
    card: 'بطاقة',
    amount: 'المبلغ',
    recipient: 'المستلم',
    processing: 'جاري المعالجة',
    success: 'تم الدفع بنجاح',
    
    // Card Selection
    cardNumberMask: '**** {number}',
    balanceLabel: 'الرصيد',
    
    // Filter
    all: 'الكل',
    
    // Progress text
    progressFormat: (paid, total) => `مدفوع: ${paid.toLocaleString()} ₽ · متبقي: ${(total - paid).toLocaleString()} ₽`,
    daysFormat: (days) => `${days} ${days === 1 ? 'يوم' : 'أيام'}`,
    
    // Month names for date formatting (Arabic)
    months: {
      '01': 'يناير',
      '02': 'فبراير',
      '03': 'مارس',
      '04': 'أبريل',
      '05': 'مايو',
      '06': 'يونيو',
      '07': 'يوليو',
      '08': 'أغسطس',
      '09': 'سبتمبر',
      '10': 'أكتوبر',
      '11': 'نوفمبر',
      '12': 'ديسمبر'
    },
    
    // Helper function for utility names
    getUtilityName: (key) => {
      const names = {
        education: 'تعليم',
        mobile: 'جوال',
        electricity: 'كهرباء',
        gas: 'غاز',
        water: 'مياه',
        internet: 'إنترنت',
        fines: 'غرامات',
        taxes: 'ضرائب'
      };
      return names[key] || key;
    },
    
    // Helper function for bank names
    getBankName: (key) => {
      const names = {
        sber: 'سبيربنك',
        tbank: 'تي-بنك',
        alfa: 'ألفا-بنك',
        vtb: 'في تي بي',
        gazprom: 'غازبروم بنك',
        raiffeisen: 'رايفايزن',
        otkritie: 'أوتكريتي',
        pochta: 'بنك البريد'
      };
      return names[key] || key;
    }
  },
  
  kk: {
    // Header
    welcome: 'Қайта оралуыңызбен',
    userName: 'Александр',
    search: 'Іздеу',
    notifications: 'Хабарландырулар',
    
    // Cards
    balance: 'Баланс',
    cardNumber: 'Карта нөмірі',
    show: 'Көрсету',
    hide: 'Жасыру',
    debit: 'Дебеттік',
    
    // Quick Actions
    quickActions: 'Жылдам әрекеттер',
    qrPayment: 'QR төлем',
    phonePayment: 'Телефон арқылы',
    sbp: 'СБП',
    transfer: 'Аударым',
    
    // SBP / Utilities
    sbpFull: 'Төлемдер және аударымдар',
    education: 'Білім',
    mobile: 'Мобильді',
    electricity: 'Электр',
    gas: 'Газ',
    water: 'Су',
    internet: 'Интернет',
    fines: 'Айыппұлдар',
    taxes: 'Салықтар',
    
    // Banks
    selectBank: 'Банкті таңдаңыз',
    sberbank: 'Сбербанк',
    tbank: 'Т-Банк',
    alfabank: 'Альфа-Банк',
    vtb: 'ВТБ',
    gazprombank: 'Газпромбанк',
    raiffeisen: 'Райффайзен',
    otkritie: 'Открытие',
    pochta: 'Почта Банк',
    
    // Analytics
    analytics: 'Аналитика',
    thisWeek: 'Осы апта',
    thisMonth: 'Осы ай',
    thisYear: 'Осы жыл',
    income: 'Кіріс',
    expenses: 'Шығыс',
    
    // Categories
    food: 'Тамақ',
    groceries: 'Азық-түлік',
    transport: 'Көлік',
    entertainment: 'Ойын-сауық',
    utilities: 'Коммуналдық',
    
    // Fixed Deposits (Gamified)
    savings: 'Жинақ',
    fixedDeposit: 'Мерзімді салым',
    investment: 'Инвестиция',
    goal: 'Мақсат',
    current: 'Ағымдағы',
    interest: 'Мөлшерлеме',
    streak: 'Қатар күндер',
    nextMilestone: 'Келесі мақсат',
    leftToGoal: 'Мақсатқа дейін',
    replenish: 'Толықтыру',
    fdName1: 'Жинақ шоты',
    fdName2: 'Инвестициялық шот',
    
    // Debt Reminders
    debtReminder: 'Қарыз ескертуі',
    mortgage: 'Ипотека',
    educationDebt: 'Білім қарызы',
    paid: 'Төленді',
    remaining: 'Қалдық',
    monthlyPayment: 'Айлық төлем',
    nextPayment: 'Келесі төлем',
    days: 'күн',
    pay: 'Төлеу',
    
    // Recent Transactions
    recentTransactions: 'Соңғы транзакциялар',
    viewAll: 'Барлығын көру',
    collapse: 'Жию',
    
    // Bottom Navigation
    home: 'Басты',
    payments: 'Төлемдер',
    history: 'Тарих',
    settings: 'Баптаулар',
    
    // QR Scanner
    scanQR: 'QR кодты сканерлеу',
    alignQR: 'QR кодты рамкаға салыңыз',
    qrDetected: 'QR код табылды!',
    
    // Modals - Common
    cancel: 'Болдырмау',
    continue: 'Жалғастыру',
    confirm: 'Растау',
    back: 'Артқа',
    done: 'Дайын',
    
    // Payment Modals
    enterAmount: 'Соманы енгізіңіз',
    enterPhone: 'Телефон нөмірін енгізіңіз',
    enterAccount: 'Шот нөмірін енгізіңіз',
    selectCard: 'Картаны таңдаңыз',
    card: 'Карта',
    amount: 'Сома',
    recipient: 'Алушы',
    processing: 'Төлем өңделуде',
    success: 'Төлем сәтті',
    
    // Card Selection
    cardNumberMask: '**** {number}',
    balanceLabel: 'Баланс',
    
    // Filter
    all: 'Барлығы',
    
    // Progress text
    progressFormat: (paid, total) => `Төленді: ${paid.toLocaleString()} ₽ · Қалды: ${(total - paid).toLocaleString()} ₽`,
    daysFormat: (days) => `${days} күн`,
    
    // Month names for date formatting
    months: {
      '01': 'қаң',
      '02': 'ақп',
      '03': 'нау',
      '04': 'сәу',
      '05': 'мам',
      '06': 'мау',
      '07': 'шіл',
      '08': 'там',
      '09': 'қыр',
      '10': 'қаз',
      '11': 'қар',
      '12': 'жел'
    },
    
    // Helper function for utility names
    getUtilityName: (key) => {
      const names = {
        education: 'Білім',
        mobile: 'Мобильді',
        electricity: 'Электр',
        gas: 'Газ',
        water: 'Су',
        internet: 'Интернет',
        fines: 'Айыппұлдар',
        taxes: 'Салықтар'
      };
      return names[key] || key;
    },
    
    // Helper function for bank names
    getBankName: (key) => {
      const names = {
        sber: 'Сбербанк',
        tbank: 'Т-Банк',
        alfa: 'Альфа-Банк',
        vtb: 'ВТБ',
        gazprom: 'Газпромбанк',
        raiffeisen: 'Райффайзен',
        otkritie: 'Открытие',
        pochta: 'Почта Банк'
      };
      return names[key] || key;
    }
  },
  
  tg: {
    // Header
    welcome: 'Хуш омадед',
    userName: 'Александр',
    search: 'Ҷустуҷӯ',
    notifications: 'Огоҳиҳо',
    
    // Cards
    balance: 'Бақия',
    cardNumber: 'Рақами корт',
    show: 'Нишон додан',
    hide: 'Пинҳон кардан',
    debit: 'Дебетӣ',
    
    // Quick Actions
    quickActions: 'Амалҳои зуд',
    qrPayment: 'Пардохти QR',
    phonePayment: 'Бо телефон',
    sbp: 'СБП',
    transfer: 'Интиқол',
    
    // SBP / Utilities
    sbpFull: 'Пардохтҳо ва интиқолҳо',
    education: 'Маориф',
    mobile: 'Мобилӣ',
    electricity: 'Барқ',
    gas: 'Газ',
    water: 'Об',
    internet: 'Интернет',
    fines: 'Ҷаримаҳо',
    taxes: 'Андозҳо',
    
    // Banks
    selectBank: 'Бонкро интихоб кунед',
    sberbank: 'Сбербанк',
    tbank: 'Т-Банк',
    alfabank: 'Альфа-Банк',
    vtb: 'ВТБ',
    gazprombank: 'Газпромбанк',
    raiffeisen: 'Райффайзен',
    otkritie: 'Открытие',
    pochta: 'Почта Банк',
    
    // Analytics
    analytics: 'Таҳлил',
    thisWeek: 'Ин ҳафта',
    thisMonth: 'Ин моҳ',
    thisYear: 'Имсол',
    income: 'Даромад',
    expenses: 'Хароҷот',
    
    // Categories
    food: 'Ғизо',
    groceries: 'Хӯрокворӣ',
    transport: 'Нақлиёт',
    entertainment: 'Фароғат',
    utilities: 'Коммуналӣ',
    
    // Fixed Deposits (Gamified)
    savings: 'Пасандоз',
    fixedDeposit: 'Пасандози мӯҳлатдор',
    investment: 'Сармоягузорӣ',
    goal: 'Ҳадаф',
    current: 'Ҷорӣ',
    interest: 'Фоиз',
    streak: 'Рӯзҳои пайдарпай',
    nextMilestone: 'Ҳадафи навбатӣ',
    leftToGoal: 'То ҳадаф',
    replenish: 'Пур кардан',
    fdName1: 'Ҳисоби пасандоз',
    fdName2: 'Ҳисоби сармоягузорӣ',
    
    // Debt Reminders
    debtReminder: 'Ёдраскунии қарз',
    mortgage: 'Ипотека',
    educationDebt: 'Қарзи маориф',
    paid: 'Пардохт шуд',
    remaining: 'Боқимонда',
    monthlyPayment: 'Пардохти моҳона',
    nextPayment: 'Пардохти навбатӣ',
    days: 'рӯз',
    pay: 'Пардохт',
    
    // Recent Transactions
    recentTransactions: 'Амалиёти охирин',
    viewAll: 'Ҳама',
    collapse: 'Печондан',
    
    // Bottom Navigation
    home: 'Асосӣ',
    payments: 'Пардохтҳо',
    history: 'Таърих',
    settings: 'Танзимот',
    
    // QR Scanner
    scanQR: 'Рамзи QR-ро скан кунед',
    alignQR: 'Рамзи QR-ро ба чаҳорчӯба гузоред',
    qrDetected: 'Рамзи QR ёфт шуд!',
    
    // Modals - Common
    cancel: 'Бекор кардан',
    continue: 'Давом додан',
    confirm: 'Тасдиқ',
    back: 'Бозгашт',
    done: 'Тайёр',
    
    // Payment Modals
    enterAmount: 'Маблағро ворид кунед',
    enterPhone: 'Рақами телефонро ворид кунед',
    enterAccount: 'Рақами ҳисобро ворид кунед',
    selectCard: 'Кортро интихоб кунед',
    card: 'Корт',
    amount: 'Маблағ',
    recipient: 'Қабулкунанда',
    processing: 'Коркарди пардохт',
    success: 'Пардохт муваффақ',
    
    // Card Selection
    cardNumberMask: '**** {number}',
    balanceLabel: 'Бақия',
    
    // Filter
    all: 'Ҳама',
    
    // Progress text
    progressFormat: (paid, total) => `Пардохт: ${paid.toLocaleString()} ₽ · Боқӣ: ${(total - paid).toLocaleString()} ₽`,
    daysFormat: (days) => `${days} рӯз`,
    
    // Month names for date formatting
    months: {
      '01': 'янв',
      '02': 'фев',
      '03': 'мар',
      '04': 'апр',
      '05': 'май',
      '06': 'июн',
      '07': 'июл',
      '08': 'авг',
      '09': 'сен',
      '10': 'окт',
      '11': 'ноя',
      '12': 'дек'
    },
    
    // Helper function for utility names
    getUtilityName: (key) => {
      const names = {
        education: 'Маориф',
        mobile: 'Мобилӣ',
        electricity: 'Барқ',
        gas: 'Газ',
        water: 'Об',
        internet: 'Интернет',
        fines: 'Ҷаримаҳо',
        taxes: 'Андозҳо'
      };
      return names[key] || key;
    },
    
    // Helper function for bank names
    getBankName: (key) => {
      const names = {
        sber: 'Сбербанк',
        tbank: 'Т-Банк',
        alfa: 'Альфа-Банк',
        vtb: 'ВТБ',
        gazprom: 'Газпромбанк',
        raiffeisen: 'Райффайзен',
        otkritie: 'Открытие',
        pochta: 'Почта Банк'
      };
      return names[key] || key;
    }
  },
  
  uz: {
    // Header
    welcome: 'Qaytganingiz bilan',
    userName: 'Aleksandr',
    search: 'Qidirish',
    notifications: 'Bildirishnomalar',
    
    // Cards
    balance: 'Balans',
    cardNumber: 'Karta raqami',
    show: 'Koʻrsatish',
    hide: 'Yashirish',
    debit: 'Debet',
    
    // Quick Actions
    quickActions: 'Tezkor amallar',
    qrPayment: 'QR toʻlov',
    phonePayment: 'Telefon orqali',
    sbp: 'SBP',
    transfer: 'Pul oʻtkazish',
    
    // SBP / Utilities
    sbpFull: 'Toʻlovlar va oʻtkazmalar',
    education: 'Taʼlim',
    mobile: 'Mobil',
    electricity: 'Elektr',
    gas: 'Gaz',
    water: 'Suv',
    internet: 'Internet',
    fines: 'Jarimalar',
    taxes: 'Soliqlar',
    
    // Banks
    selectBank: 'Bankni tanlang',
    sberbank: 'Sberbank',
    tbank: 'T-Bank',
    alfabank: 'Alfa-Bank',
    vtb: 'VTB',
    gazprombank: 'Gazprombank',
    raiffeisen: 'Raiffeisen',
    otkritie: 'Otkritie',
    pochta: 'Pochta Bank',
    
    // Analytics
    analytics: 'Tahlillar',
    thisWeek: 'Shu hafta',
    thisMonth: 'Shu oy',
    thisYear: 'Bu yil',
    income: 'Daromad',
    expenses: 'Xarajatlar',
    
    // Categories
    food: 'Ovqatlanish',
    groceries: 'Oziq-ovqat',
    transport: 'Transport',
    entertainment: 'Koʻngilochar',
    utilities: 'Kommunal',
    
    // Fixed Deposits (Gamified)
    savings: 'Jamgʻarma',
    fixedDeposit: 'Muddatli omonat',
    investment: 'Investitsiya',
    goal: 'Maqsad',
    current: 'Joriy',
    interest: 'Foiz',
    streak: 'Ketma-ket kunlar',
    nextMilestone: 'Keyingi maqsad',
    leftToGoal: 'Maqsadgacha',
    replenish: 'Toʻldirish',
    fdName1: 'Jamgʻarma hisobi',
    fdName2: 'Investitsiya hisobi',
    
    // Debt Reminders
    debtReminder: 'Qarz eslatmasi',
    mortgage: 'Ipoteka',
    educationDebt: 'Taʼlim qarzi',
    paid: 'Toʻlandi',
    remaining: 'Qoldiq',
    monthlyPayment: 'Oylik toʻlov',
    nextPayment: 'Keyingi toʻlov',
    days: 'kun',
    pay: 'Toʻlash',
    
    // Recent Transactions
    recentTransactions: 'Soʻnggi tranzaksiyalar',
    viewAll: 'Barchasini koʻrish',
    collapse: 'Yigʻish',
    
    // Bottom Navigation
    home: 'Bosh sahifa',
    payments: 'Toʻlovlar',
    history: 'Tarix',
    settings: 'Sozlamalar',
    
    // QR Scanner
    scanQR: 'QR kodni skanerlash',
    alignQR: 'QR kodni ramkaga joylashtiring',
    qrDetected: 'QR kod topildi!',
    
    // Modals - Common
    cancel: 'Bekor qilish',
    continue: 'Davom etish',
    confirm: 'Tasdiqlash',
    back: 'Orqaga',
    done: 'Tayyor',
    
    // Payment Modals
    enterAmount: 'Miqdorni kiriting',
    enterPhone: 'Telefon raqamini kiriting',
    enterAccount: 'Hisob raqamini kiriting',
    selectCard: 'Kartani tanlang',
    card: 'Karta',
    amount: 'Miqdor',
    recipient: 'Qabul qiluvchi',
    processing: "Toʻlov amalga oshirilmoqda",
    success: "Toʻlov muvaffaqiyatli",
    
    // Card Selection
    cardNumberMask: '**** {number}',
    balanceLabel: 'Balans',
    
    // Filter
    all: 'Barchasi',
    
    // Progress text
    progressFormat: (paid, total) => `Toʻlandi: ${paid.toLocaleString()} ₽ · Qoldi: ${(total - paid).toLocaleString()} ₽`,
    daysFormat: (days) => `${days} kun`,
    
    // Month names for date formatting
    months: {
      '01': 'yan',
      '02': 'fev',
      '03': 'mar',
      '04': 'apr',
      '05': 'may',
      '06': 'iyn',
      '07': 'iyl',
      '08': 'avg',
      '09': 'sen',
      '10': 'okt',
      '11': 'noy',
      '12': 'dek'
    },
    
    // Helper function for utility names
    getUtilityName: (key) => {
      const names = {
        education: 'Taʼlim',
        mobile: 'Mobil',
        electricity: 'Elektr',
        gas: 'Gaz',
        water: 'Suv',
        internet: 'Internet',
        fines: 'Jarimalar',
        taxes: 'Soliqlar'
      };
      return names[key] || key;
    },
    
    // Helper function for bank names
    getBankName: (key) => {
      const names = {
        sber: 'Sberbank',
        tbank: 'T-Bank',
        alfa: 'Alfa-Bank',
        vtb: 'VTB',
        gazprom: 'Gazprombank',
        raiffeisen: 'Raiffeisen',
        otkritie: 'Otkritie',
        pochta: 'Pochta Bank'
      };
      return names[key] || key;
    }
  }
};

  const t = texts[language] || texts.ru;

  // ============= HELPER FUNCTIONS =============
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(amount));
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day} ${t.months[month]}`;
  };

  const getFilteredTransactions = () => {
    let filtered = allTransactions;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }
    
    if (selectedPeriod === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      filtered = filtered.filter(t => new Date(t.date) >= weekAgo);
    } else if (selectedPeriod === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      filtered = filtered.filter(t => new Date(t.date) >= monthAgo);
    }
    
    return showFullHistory ? filtered : filtered.slice(0, 5);
  };

  const getCategoryTotal = (category) => {
    return allTransactions
      .filter(t => t.category === category && t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  };

  const getIncomeTotal = () => {
    return allTransactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getExpenseTotal = () => {
    return allTransactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  };

  // ============= MODAL HANDLERS =============
  const handleQrPayment = () => {
    setShowQRScanner(true);
    setScanning(true);
    setScanComplete(false);
    
    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
      
      setTimeout(() => {
        setShowQRScanner(false);
        setActiveModal('qr');
        setPaymentStep('amount');
        setScanComplete(false);
      }, 800);
    }, 1500);
  };

  const handlePhonePayment = () => {
    setActiveModal('phone');
    setPaymentStep('phone');
  };

  const handleSbpPayment = (utility) => {
    setSelectedUtility(utility);
    setActiveModal('sbp');
    setPaymentStep('account');
  };

  const handleTransfer = () => {
    setActiveModal('transfer');
    setPaymentStep('card');
  };

  const handleFdReplenish = (fdId) => {
    setActiveModal('fd');
    setSelectedPaymentCard(fdId);
    setPaymentStep('amount');
  };

  const closeModal = () => {
    setActiveModal(null);
    setPaymentStep('amount');
    setPaymentAmount('');
    setSelectedPaymentCard(null);
    setSelectedUtility(null);
    setSelectedBank(null);
    setPhoneNumber('');
    setUtilityAccount('');
  };

  const processPayment = () => {
    setPaymentStep('processing');
    
    setTimeout(() => {
      setPaymentStep('success');
    }, 1500);
  };

  // ============= QR SCANNER COMPONENT =============
  const QRScannerModal = () => {
    useEffect(() => {
      if (showQRScanner && scanning) {
        // Auto-progress handled by timeout above
      }
    }, [showQRScanner, scanning]);

    if (!showQRScanner) return null;

    return (
      <div className="qr-modal-overlay" onClick={() => setShowQRScanner(false)}>
        <div className="qr-modal-content" onClick={e => e.stopPropagation()}>
          <button className="qr-modal-close" onClick={() => setShowQRScanner(false)}>×</button>
          
          <div className="qr-scanner-container">
            <h3 className="qr-scanner-title chartreuse">{t.scanQR}</h3>
            
            <div className="qr-scanner-frame">
              <div className="qr-scanner-viewport">
                <div className="qr-corner top-left"></div>
                <div className="qr-corner top-right"></div>
                <div className="qr-corner bottom-left"></div>
                <div className="qr-corner bottom-right"></div>
                {scanning && <div className="qr-scanner-line"></div>}
              </div>
            </div>

            <p className="qr-scanner-hint">
              {scanComplete ? t.qrDetected : (scanning ? t.alignQR : '')}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // ============= RENDER FUNCTIONS =============
  const renderCardCarousel = () => (
    <div className="cards-section">
      <div className="cards-carousel">
        <div className="cards-wrapper" style={{ transform: `translateX(calc(-${selectedCardIndex * 100}% - ${selectedCardIndex * 16}px))` }}>
          {cards.map((card, index) => (
            <div key={card.id} className="card-item" style={{ background: card.color }}>
              <div className="debit-overlay">{t.debit}</div>
              
              <div className="card-header">
                <div className="card-brand">
                  <OTPLogo />
                  <span className="bank-name">ОТП Банк</span>
                </div>
                <span className="card-type">{card.type}</span>
              </div>
              
              <div className="card-number-container">
                <span className="card-number">
                  {showCardNumber ? card.number : '••••  ••••  ••••  ••••'}
                </span>
                <EyeButton show={showCardNumber} onClick={() => setShowCardNumber(!showCardNumber)} />
              </div>
              
              <div className="card-balance-container">
                <span className="balance-label">{t.balance}</span>
                <div className="balance-wrapper">
                  <span className="balance-value">
                    {showBalance ? `${card.currency} ${formatCurrency(card.balance)}` : '••••••'}
                  </span>
                  <EyeButton show={showBalance} onClick={() => setShowBalance(!showBalance)} />
                </div>
              </div>
              
              <div className="card-footer">
                <span className="card-valid">{card.expiry}</span>
                <MirChip />
              </div>
            </div>
          ))}
        </div>
        
        <div className="card-dots">
          {cards.map((_, index) => (
            <button
              key={index}
              className={`card-dot ${selectedCardIndex === index ? 'active' : ''}`}
              onClick={() => setSelectedCardIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderQuickActions = () => (
    <div className="quick-actions-section">
      <h3 className="section-title chartreuse">{t.quickActions}</h3>
      <div className="quick-actions-grid">
        <ActionButton
          icon={<QRIcon />}
          label={t.qrPayment}
          onClick={handleQrPayment}
        />
        <ActionButton
          icon={<PhoneIcon />}
          label={t.phonePayment}
          onClick={handlePhonePayment}
        />
        <ActionButton
          icon={<SBPIcon />}
          label={t.sbp}
          onClick={() => {
            setActiveModal('sbp-banks');
            setSelectedBank(null);
            setPaymentStep('phone');
          }}
        />
        <ActionButton
          icon={<TransferIcon />}
          label={t.transfer}
          onClick={handleTransfer}
        />
      </div>
    </div>
  );

  const renderUtilitiesSection = () => (
    <div className="utilities-section">
      <div className="section-header">
        <h3 className="section-title chartreuse">{t.sbpFull}</h3>
        <SBPIcon />
      </div>
      <div className="utilities-grid">
        {utilities.map(util => (
          <button
            key={util.id}
            className="utility-item"
            onClick={() => handleSbpPayment(util)}
          >
            <UtilityIcon type={util.icon} />
            <span className="utility-name">{getUtilityName(util.key)}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const getUtilityName = (key) => {
    const names = {
      education: t.education,
      mobile: t.mobile,
      electricity: t.electricity,
      gas: t.gas,
      water: t.water,
      internet: t.internet,
      fines: t.fines,
      taxes: t.taxes
    };
    return names[key] || key;
  };

  const renderAnalytics = () => {
    const expenseTotal = getExpenseTotal();
    const incomeTotal = getIncomeTotal();
    
    const categories = [
      { name: t.food, amount: getCategoryTotal('food'), color: '#FF6B6B' },
      { name: t.groceries, amount: getCategoryTotal('groceries'), color: '#4ECDC4' },
      { name: t.transport, amount: getCategoryTotal('transport'), color: '#45B7D1' },
      { name: t.entertainment, amount: getCategoryTotal('entertainment'), color: '#96CEB4' },
      { name: t.utilities, amount: getCategoryTotal('utilities'), color: '#FFE194' }
    ].filter(c => c.amount > 0);

    return (
      <div className="analytics-section">
        <div className="section-header">
          <h3 className="section-title chartreuse">{t.analytics}</h3>
          <select 
            className="period-select"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="week">{t.thisWeek}</option>
            <option value="month">{t.thisMonth}</option>
            <option value="year">{t.thisYear}</option>
          </select>
        </div>

        <div className="analytics-cards">
          <div className="analytics-card income">
            <span className="analytics-label">{t.income}</span>
            <span className="analytics-value positive">+{formatCurrency(incomeTotal)} ₽</span>
          </div>
          <div className="analytics-card expense">
            <span className="analytics-label">{t.expenses}</span>
            <span className="analytics-value negative">-{formatCurrency(expenseTotal)} ₽</span>
          </div>
        </div>

        <div className="pie-chart-container">
          <PieChart categories={categories} total={expenseTotal} />
        </div>

        <div className="category-legend">
          {categories.map(cat => (
            <div key={cat.name} className="legend-item">
              <span className="legend-color" style={{ background: cat.color }}></span>
              <span className="legend-name">{cat.name}</span>
              <span className="legend-amount">{formatCurrency(cat.amount)} ₽</span>
              <span className="legend-percent">{Math.round(cat.amount / expenseTotal * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFixedDeposits = () => (
    <div className="fd-section">
      <div className="section-header">
        <h3 className="section-title chartreuse">{t.savings}</h3>
        <TrendIcon />
      </div>

      {fdAccounts.map(fd => (
        <div key={fd.id} className="fd-card" style={{ background: fd.color }}>
          <div className="fd-header">
            <span className="fd-name">{t[fd.nameKey]}</span>
            <div className="fd-streak">
              <FireIcon />
              <span>{fd.streak} {t.streak}</span>
            </div>
          </div>

          <div className="fd-goal">
            <span>{t.goal}: {formatCurrency(fd.goal)} ₽</span>
            <span className="fd-progress-text">{Math.round(fd.current / fd.goal * 100)}%</span>
          </div>

          <div className="fd-progress-bar">
            <div 
              className="fd-progress-fill" 
              style={{ width: `${fd.current / fd.goal * 100}%` }}
            />
          </div>

          <div className="fd-stats">
            <div className="fd-stat">
              <span className="stat-label">{t.current}</span>
              <span className="stat-value">{formatCurrency(fd.current)} ₽</span>
            </div>
            <div className="fd-stat">
              <span className="stat-label">{t.interest}</span>
              <span className="stat-value">{fd.interest}%</span>
            </div>
          </div>

          <div className="fd-milestones">
            <div className="milestone">
              <MilestoneIcon />
              <span>{t.nextMilestone}: {formatCurrency(fd.nextMilestone)} ₽</span>
            </div>
            <div className="milestone">
              <TargetIcon />
              <span>{t.leftToGoal}: {formatCurrency(fd.goal - fd.current)} ₽</span>
            </div>
          </div>

          <button 
            className="fd-replenish-btn"
            onClick={() => handleFdReplenish(fd.id)}
          >
            <PlusIcon />
            {t.replenish}
          </button>
        </div>
      ))}
    </div>
  );

  const renderDebtReminders = () => (
    <div className="debt-section">
      <div className="section-header">
        <h3 className="section-title chartreuse">{t.debtReminder}</h3>
        <BellIcon />
      </div>

      {debts.map(debt => {
        const progress = (debt.paid / debt.total) * 100;
        const nextPayment = new Date(debt.nextDate);
        const daysLeft = Math.ceil((nextPayment - new Date()) / (1000 * 60 * 60 * 24));

        return (
          <div key={debt.id} className="debt-card">
            <div className="debt-header">
              <span className="debt-name">{t[debt.nameKey]}</span>
              <span className="debt-interest">{debt.interest}%</span>
            </div>

            <div className="debt-progress">
              <div className="debt-progress-bar">
                <div className="debt-progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="debt-stats">
                {t.progressFormat(debt.paid, debt.total)}
              </div>
            </div>

            <div className="debt-footer">
              <div className="debt-payment-info">
                <span className="payment-label">{t.monthlyPayment}</span>
                <span className="payment-value">{formatCurrency(debt.monthly)} ₽</span>
              </div>
              <div className="debt-payment-info">
                <span className="payment-label">{t.nextPayment}</span>
                <span className="payment-value">
                  {formatDate(debt.nextDate)} · {t.daysFormat(daysLeft)}
                </span>
              </div>
              <button className="debt-pay-btn">{t.pay}</button>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderRecentTransactions = () => {
    const filteredTransactions = showFullHistory ? allTransactions : allTransactions.slice(0, 3);

    return (
      <div className="transactions-section">
        <div className="section-header">
          <h3 className="section-title chartreuse">{t.recentTransactions}</h3>
          <button 
            className="view-all-btn"
            onClick={() => setShowFullHistory(!showFullHistory)}
          >
            {showFullHistory ? t.collapse : t.viewAll}
          </button>
        </div>

        <div className="transactions-list">
          {filteredTransactions.map(tx => (
            <div key={tx.id} className="transaction-item">
              <TransactionIcon category={tx.category} />
              
              <div className="transaction-info">
                <span className="transaction-name">{tx.name}</span>
                <span className="transaction-date-time">
                  <span className="transaction-date">{formatDate(tx.date)}</span>
                  <span className="transaction-time">{tx.time}</span>
                </span>
              </div>
              
              <span className={`transaction-amount ${tx.amount > 0 ? 'positive' : 'negative'}`}>
                {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)} ₽
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBottomNav = () => (
    <nav className="bottom-nav">
      <NavButton
        icon={<HomeIcon />}
        label={t.home}
        active={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
      />
      <NavButton
        icon={<PaymentsIcon />}
        label={t.payments}
        active={activeTab === 'payments'}
        onClick={() => setActiveTab('payments')}
      />
      <NavButton
        icon={<AnalyticsIcon />}
        label={t.analytics}
        active={activeTab === 'analytics'}
        onClick={() => setActiveTab('analytics')}
      />
      <NavButton
        icon={<HistoryIcon />}
        label={t.history}
        active={activeTab === 'history'}
        onClick={() => setActiveTab('history')}
      />
      <NavButton
        icon={<SettingsIcon />}
        label={t.settings}
        active={activeTab === 'settings'}
        onClick={() => setActiveTab('settings')}
      />
    </nav>
  );

  // ============= MAIN RENDER =============
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="profile-section">
          <div className="profile-avatar">
            <span>{t.userName[0]}</span>
          </div>
          <div className="profile-info">
            <span className="profile-greeting">{t.welcome},</span>
            <span className="profile-name">{t.userName}</span>
          </div>
        </div>

        <div className="header-actions">
          <NotificationButton count={3} />
          <SearchButton />
        </div>
      </div>

      {renderCardCarousel()}
      {renderQuickActions()}
      {renderUtilitiesSection()}
      {renderAnalytics()}
      {renderFixedDeposits()}
      {renderDebtReminders()}
      {renderRecentTransactions()}
      {renderBottomNav()}

      {/* QR Scanner Modal */}
      <QRScannerModal />

      {/* SBP Bank Selection Modal */}
      {activeModal === 'sbp-banks' && !selectedBank && (
        <Modal onClose={closeModal}>
          <div className="modal-step">
            <h2 className="step-title chartreuse">Выберите банк</h2>
            <div className="banks-grid modal-grid">
              {sbpBanks.map(bank => (
                <button
                  key={bank.id}
                  className="bank-item"
                  onClick={() => {
                    setSelectedBank(bank);
                  }}
                >
                  <BankIcon name={bank.icon} />
                  <span className="bank-name">{bank.name}</span>
                </button>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* SBP Bank Payment Flow */}
      {activeModal === 'sbp-banks' && selectedBank && paymentStep === 'phone' && (
        <Modal onClose={closeModal}>
          <PhoneNumberStep
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            onNext={() => setPaymentStep('amount')}
            onClose={closeModal}
            t={t}
          />
        </Modal>
      )}

      {activeModal === 'sbp-banks' && selectedBank && paymentStep === 'amount' && (
        <Modal onClose={closeModal}>
          <PaymentAmountStep
            title={selectedBank?.name}
            amount={paymentAmount}
            setAmount={setPaymentAmount}
            onNext={() => setPaymentStep('card')}
            onClose={closeModal}
            t={t}
          />
        </Modal>
      )}

      {activeModal === 'sbp-banks' && selectedBank && paymentStep === 'card' && (
        <Modal onClose={closeModal}>
          <CardSelectionStep
            cards={cards}
            selectedCard={selectedPaymentCard}
            setSelectedCard={setSelectedPaymentCard}
            amount={paymentAmount}
            onNext={processPayment}
            onBack={() => setPaymentStep('amount')}
            t={t}
          />
        </Modal>
      )}

      {activeModal === 'sbp-banks' && selectedBank && paymentStep === 'processing' && (
        <Modal onClose={closeModal}>
          <ProcessingStep amount={paymentAmount} t={t} />
        </Modal>
      )}

      {activeModal === 'sbp-banks' && selectedBank && paymentStep === 'success' && (
        <Modal onClose={closeModal}>
          <SuccessStep 
            amount={paymentAmount}
            card={cards.find(c => c.id === selectedPaymentCard)}
            recipient={`${selectedBank?.name} · +7 ${phoneNumber}`}
            onDone={closeModal}
            t={t}
          />
        </Modal>
      )}

      {/* Utilities Selection Modal */}
      {activeModal === 'sbp-utilities' && (
        <Modal onClose={closeModal}>
          <div className="modal-step">
            <h2 className="step-title chartreuse">{t.sbpFull}</h2>
            <div className="utilities-grid modal-grid">
              {utilities.map(util => (
                <button
                  key={util.id}
                  className="utility-item"
                  onClick={() => handleSbpPayment(util)}
                >
                  <UtilityIcon type={util.icon} />
                  <span className="utility-name">{getUtilityName(util.key)}</span>
                </button>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* SBP Payment Modal */}
      {activeModal === 'sbp' && (
        <Modal onClose={closeModal}>
          {paymentStep === 'account' && (
            <AccountNumberStep
              title={getUtilityName(selectedUtility?.key)}
              accountNumber={utilityAccount}
              setAccountNumber={setUtilityAccount}
              onNext={() => setPaymentStep('amount')}
              onClose={closeModal}
              t={t}
            />
          )}

          {paymentStep === 'amount' && (
            <PaymentAmountStep
              title={getUtilityName(selectedUtility?.key)}
              amount={paymentAmount}
              setAmount={setPaymentAmount}
              onNext={() => setPaymentStep('card')}
              onClose={closeModal}
              t={t}
            />
          )}

          {paymentStep === 'card' && (
            <CardSelectionStep
              cards={cards}
              selectedCard={selectedPaymentCard}
              setSelectedCard={setSelectedPaymentCard}
              amount={paymentAmount}
              onNext={processPayment}
              onBack={() => setPaymentStep('amount')}
              t={t}
            />
          )}

          {paymentStep === 'processing' && (
            <ProcessingStep amount={paymentAmount} t={t} />
          )}

          {paymentStep === 'success' && (
            <SuccessStep 
              amount={paymentAmount}
              card={cards.find(c => c.id === selectedPaymentCard)}
              recipient={getUtilityName(selectedUtility?.key)}
              onDone={closeModal}
              t={t}
            />
          )}
        </Modal>
      )}

      {/* Phone Payment Modal */}
      {activeModal === 'phone' && (
        <Modal onClose={closeModal}>
          {paymentStep === 'phone' && (
            <PhoneNumberStep
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              onNext={() => setPaymentStep('amount')}
              onClose={closeModal}
              t={t}
            />
          )}

          {paymentStep === 'amount' && (
            <PaymentAmountStep
              title={t.phonePayment}
              amount={paymentAmount}
              setAmount={setPaymentAmount}
              onNext={() => setPaymentStep('card')}
              onClose={closeModal}
              t={t}
            />
          )}

          {paymentStep === 'card' && (
            <CardSelectionStep
              cards={cards}
              selectedCard={selectedPaymentCard}
              setSelectedCard={setSelectedPaymentCard}
              amount={paymentAmount}
              onNext={processPayment}
              onBack={() => setPaymentStep('amount')}
              t={t}
            />
          )}

          {paymentStep === 'processing' && (
            <ProcessingStep amount={paymentAmount} t={t} />
          )}

          {paymentStep === 'success' && (
            <SuccessStep 
              amount={paymentAmount}
              card={cards.find(c => c.id === selectedPaymentCard)}
              recipient={`+7 ${phoneNumber}`}
              onDone={closeModal}
              t={t}
            />
          )}
        </Modal>
      )}

      {/* QR Payment Modal */}
      {activeModal === 'qr' && (
        <Modal onClose={closeModal}>
          {paymentStep === 'amount' && (
            <PaymentAmountStep
              title={t.qrPayment}
              amount={paymentAmount}
              setAmount={setPaymentAmount}
              onNext={() => setPaymentStep('card')}
              onClose={closeModal}
              t={t}
            />
          )}

          {paymentStep === 'card' && (
            <CardSelectionStep
              cards={cards}
              selectedCard={selectedPaymentCard}
              setSelectedCard={setSelectedPaymentCard}
              amount={paymentAmount}
              onNext={processPayment}
              onBack={() => setPaymentStep('amount')}
              t={t}
            />
          )}

          {paymentStep === 'processing' && (
            <ProcessingStep amount={paymentAmount} t={t} />
          )}

          {paymentStep === 'success' && (
            <SuccessStep 
              amount={paymentAmount}
              card={cards.find(c => c.id === selectedPaymentCard)}
              onDone={closeModal}
              t={t}
            />
          )}
        </Modal>
      )}

      {/* Transfer Modal */}
      {activeModal === 'transfer' && (
        <Modal onClose={closeModal}>
          {paymentStep === 'card' && (
            <CardSelectionStep
              cards={cards}
              selectedCard={selectedPaymentCard}
              setSelectedCard={setSelectedPaymentCard}
              onNext={() => setPaymentStep('amount')}
              onClose={closeModal}
              t={t}
            />
          )}

          {paymentStep === 'amount' && (
            <PaymentAmountStep
              title={t.transfer}
              amount={paymentAmount}
              setAmount={setPaymentAmount}
              onNext={processPayment}
              onClose={closeModal}
              t={t}
            />
          )}

          {paymentStep === 'processing' && (
            <ProcessingStep amount={paymentAmount} t={t} />
          )}

          {paymentStep === 'success' && (
            <SuccessStep 
              amount={paymentAmount}
              card={cards.find(c => c.id === selectedPaymentCard)}
              onDone={closeModal}
              t={t}
            />
          )}
        </Modal>
      )}

      {/* Fixed Deposit Replenish Modal */}
      {activeModal === 'fd' && (
        <Modal onClose={closeModal}>
          {paymentStep === 'amount' && (
            <PaymentAmountStep
              title={t.replenish}
              amount={paymentAmount}
              setAmount={setPaymentAmount}
              onNext={() => setPaymentStep('card')}
              onClose={closeModal}
              t={t}
            />
          )}

          {paymentStep === 'card' && (
            <CardSelectionStep
              cards={cards}
              selectedCard={selectedPaymentCard}
              setSelectedCard={setSelectedPaymentCard}
              amount={paymentAmount}
              onNext={() => setPaymentStep('processing')}
              onBack={() => setPaymentStep('amount')}
              t={t}
            />
          )}

          {paymentStep === 'processing' && (
            <ProcessingStep amount={paymentAmount} t={t} />
          )}

          {paymentStep === 'success' && (
            <SuccessStep 
              amount={paymentAmount}
              card={cards.find(c => c.id === selectedPaymentCard)}
              message={`${t.fixedDeposit} пополнен`}
              onDone={closeModal}
              t={t}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

// ============= HELPER COMPONENTS =============

const OTPLogo = () => (
  <svg width="32" height="32" viewBox="-50 0 1700 1600" className="otp-logo">
    <path d="M 769.5,-0.5 C 778.5,-0.5 787.5,-0.5 796.5,-0.5C 797.497,95.7629 797.831,192.096 797.5,288.5C 640.753,292.138 510.92,352.471 408,469.5C 305.466,595.963 269.133,739.63 299,900.5C 333.939,1053.7 419.439,1168.86 555.5,1246C 690.945,1315.61 830.611,1325.28 974.5,1275C 1116.52,1218.98 1216.02,1120.15 1273,978.5C 1295.16,919.528 1306.33,858.528 1306.5,795.5C 1402.83,795.5 1499.17,795.5 1595.5,795.5C 1595.5,804.167 1595.5,812.833 1595.5,821.5C 1584.16,1052.32 1493.16,1244.82 1322.5,1399C 1183.3,1518.55 1021.64,1584.05 837.5,1595.5C 812.167,1595.5 786.833,1595.5 761.5,1595.5C 550.367,1583.16 370.867,1502.16 223,1352.5C 83.0365,1204.15 8.53647,1027.48 -0.5,822.5C -0.5,801.833 -0.5,781.167 -0.5,760.5C 12.9339,543.829 97.9339,360.996 254.5,212C 400.306,80.0783 571.973,9.24496 769.5,-0.5 Z" fill="white"/>
    <path d="M 777.5,443.5 C 901.349,439.526 1002.18,485.193 1080,580.5C 1150.41,676.548 1170.24,782.381 1139.5,898C 1106.86,1001.3 1041.53,1075.97 943.5,1122C 864.05,1155.42 782.717,1160.76 699.5,1138C 591.727,1104.19 515.56,1035.35 471,931.5C 439.606,849.343 437.273,766.343 464,682.5C 507.172,565.995 588.339,490.161 707.5,455C 730.621,448.962 753.954,445.129 777.5,443.5 Z" fill="white"/>
    <path d="M 1230.5,146.5 C 1316.68,143.165 1381.85,178.165 1426,251.5C 1454.88,308.343 1458.21,366.676 1436,426.5C 1402.57,500.573 1345.4,542.407 1264.5,552C 1193.51,556.074 1135.01,531.24 1089,477.5C 1045.48,419.867 1033.81,356.201 1054,286.5C 1079.65,215.179 1129.15,170.012 1202.5,151C 1211.93,149.236 1221.27,147.736 1230.5,146.5 Z" fill="white"/>
  </svg>
);

const EyeButton = ({ show, onClick }) => (
  <button className="eye-button" onClick={onClick}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7FFF00">
      {show ? (
        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" strokeWidth="2"/>
      ) : (
        <path d="M2 2L22 22M8.5 8.5C6.5 10.5 5 12 5 12C5 12 8 18 12 18C14 18 16 16.5 17.5 15" strokeWidth="2"/>
      )}
    </svg>
  </button>
);

const MirChip = () => (
  <div className="card-chip">
    <div className="chip-inner"></div>
  </div>
);

const ActionButton = ({ icon, label, onClick }) => (
  <button className="action-card" onClick={onClick}>
    <div className="action-icon chartreuse">
      {icon}
    </div>
    <span className="action-label">{label}</span>
  </button>
);

const QRIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="3" width="7" height="7" strokeWidth="2"/>
    <rect x="14" y="3" width="7" height="7" strokeWidth="2"/>
    <rect x="3" y="14" width="7" height="7" strokeWidth="2"/>
    <path d="M14 14H21V21H14V14Z" strokeWidth="2"/>
    <path d="M18 14V21M14 18H21" strokeWidth="2"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="5" y="2" width="14" height="20" rx="3" strokeWidth="2"/>
    <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
  </svg>
);

const SBPIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="9" strokeWidth="2"/>
    <path d="M8 12H16M12 8V16" strokeWidth="2"/>
  </svg>
);

const TransferIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M17 2L21 6L17 10" strokeWidth="2"/>
    <path d="M3 6H21" strokeWidth="2"/>
    <path d="M7 14L3 18L7 22" strokeWidth="2"/>
    <path d="M21 18H3" strokeWidth="2"/>
  </svg>
);

const BankIcon = ({ name }) => {
  switch(name) {
    case 'sber':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M7 12L10 15L17 8" />
        </svg>
      );
    case 'tbank':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    case 'alfa':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 9H16M8 12H16M8 15H13" />
        </svg>
      );
    case 'vtb':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 6H21M4 12H20M5 18H19" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case 'gazprom':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" />
          <path d="M2 17L12 22L22 17" />
          <path d="M2 12L12 17L22 12" />
        </svg>
      );
    case 'raiffeisen':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    case 'otkritie':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8V16M8 12H16" />
        </svg>
      );
    case 'pochta':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 7L12 13L2 7" />
        </svg>
      );
    default:
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
};

const UtilityIcon = ({ type }) => {
  switch(type) {
    case 'education':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 3L2 8L12 13L22 8L12 3Z" strokeWidth="2"/>
          <path d="M2 17L12 22L22 17" strokeWidth="2"/>
          <path d="M2 12L12 17L22 12" strokeWidth="2"/>
        </svg>
      );
    case 'phone':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="5" y="2" width="14" height="20" rx="3" strokeWidth="2"/>
          <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
        </svg>
      );
    case 'electricity':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" strokeWidth="2"/>
        </svg>
      );
    case 'gas':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="9" strokeWidth="2"/>
          <path d="M12 8V12L15 15" strokeWidth="2"/>
        </svg>
      );
    case 'water':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2C12 2 6 8 6 13C6 16.3137 8.68629 19 12 19C15.3137 19 18 16.3137 18 13C18 8 12 2 12 2Z" strokeWidth="2"/>
        </svg>
      );
    case 'internet':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="9" strokeWidth="2"/>
          <path d="M12 3V21M3 12H21" strokeWidth="2"/>
        </svg>
      );
    case 'fine':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="9" strokeWidth="2"/>
          <path d="M12 8V12L15 15" strokeWidth="2"/>
          <circle cx="12" cy="16" r="0.5" fill="currentColor"/>
        </svg>
      );
    case 'tax':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="2"/>
          <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="16" cy="12" r="1.5" fill="currentColor"/>
        </svg>
      );
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="9" strokeWidth="2"/>
        </svg>
      );
  }
};

const TransactionIcon = ({ category }) => {
  const getIcon = () => {
    switch(category) {
      case 'food':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 11H21M7 4V8M17 4V8" strokeWidth="1.5"/>
            <rect x="5" y="8" width="14" height="12" rx="2" strokeWidth="1.5"/>
          </svg>
        );
      case 'groceries':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 6H19L18 14H6L5 6Z" strokeWidth="1.5"/>
            <circle cx="9" cy="20" r="2" strokeWidth="1.5"/>
            <circle cx="17" cy="20" r="2" strokeWidth="1.5"/>
          </svg>
        );
      case 'transport':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="4" y="8" width="16" height="12" rx="2" strokeWidth="1.5"/>
            <circle cx="8" cy="18" r="2" fill="currentColor"/>
            <circle cx="16" cy="18" r="2" fill="currentColor"/>
          </svg>
        );
      case 'entertainment':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="9" strokeWidth="1.5"/>
            <path d="M8 12L12 8L16 12L12 16L8 12Z" strokeWidth="1.5"/>
          </svg>
        );
      case 'utilities':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeWidth="1.5"/>
            <path d="M2 17L12 22L22 17" strokeWidth="1.5"/>
            <path d="M2 12L12 17L22 12" strokeWidth="1.5"/>
          </svg>
        );
      case 'income':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2V22M7 7L12 2L17 7" strokeWidth="1.5"/>
          </svg>
        );
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="9" strokeWidth="1.5"/>
          </svg>
        );
    }
  };

  return (
    <div className="transaction-icon">
      {getIcon()}
    </div>
  );
};

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M3 10L12 3L21 10V20H3V10Z" strokeWidth="2"/>
  </svg>
);

const PaymentsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2"/>
    <path d="M2 10H22" strokeWidth="2"/>
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M21 21H4V4" strokeWidth="2"/>
    <path d="M7 15L10 10L13 13L19 7" strokeWidth="2"/>
  </svg>
);

const HistoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="9" strokeWidth="2"/>
    <path d="M12 7V12L15 15" strokeWidth="2"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="3" strokeWidth="2"/>
    <path d="M19.4 15C19.1 15.6 18.7 16.2 18.2 16.7L19 18L18 19L16.7 18.2C16.2 18.7 15.6 19.1 15 19.4L15 21H9L9 19.4C8.4 19.1 7.8 18.7 7.3 18.2L6 19L5 18L5.8 16.7C5.3 16.2 4.9 15.6 4.6 15L3 15L3 9L4.6 9C4.9 8.4 5.3 7.8 5.8 7.3L5 6L6 5L7.3 5.8C7.8 5.3 8.4 4.9 9 4.6L9 3H15V4.6C15.6 4.9 16.2 5.3 16.7 5.8L18 5L19 6L18.2 7.3C18.7 7.8 19.1 8.4 19.4 9L21 9V15L19.4 15Z" strokeWidth="2"/>
  </svg>
);

const NotificationButton = ({ count = 3 }) => (
  <button className="icon-button notification-btn">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" strokeWidth="2"/>
      <path d="M9 17V18C9 18.7956 9.31607 19.5587 9.87868 20.1213C10.4413 20.6839 11.2044 21 12 21C12.7956 21 13.5587 20.6839 14.1213 20.1213C14.6839 19.5587 15 18.7956 15 18V17" strokeWidth="2"/>
    </svg>
    {count > 0 && <span className="notification-badge">{count}</span>}
  </button>
);

const SearchButton = () => (
  <button className="icon-button">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="11" cy="11" r="7" strokeWidth="2"/>
      <path d="M16 16L21 21" strokeWidth="2"/>
    </svg>
  </button>
);

const NavButton = ({ icon, label, active, onClick }) => (
  <button 
    className={`nav-item ${active ? 'active' : ''}`}
    onClick={onClick}
  >
    {icon}
    <span className="nav-label">{label}</span>
  </button>
);

const Modal = ({ children, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>×</button>
      {children}
    </div>
  </div>
);

const PieChart = ({ categories, total }) => {
  let cumulativePercent = 0;
  
  return (
    <svg viewBox="0 0 100 100" className="pie-chart">
      {categories.map((cat, index) => {
        const percent = cat.amount / total;
        const startAngle = cumulativePercent * 360;
        const endAngle = (cumulativePercent + percent) * 360;
        cumulativePercent += percent;
        
        const startRad = (startAngle - 90) * Math.PI / 180;
        const endRad = (endAngle - 90) * Math.PI / 180;
        
        const x1 = 50 + 40 * Math.cos(startRad);
        const y1 = 50 + 40 * Math.sin(startRad);
        const x2 = 50 + 40 * Math.cos(endRad);
        const y2 = 50 + 40 * Math.sin(endRad);
        
        const largeArc = percent > 0.5 ? 1 : 0;
        
        const pathData = [
          `M 50 50`,
          `L ${x1} ${y1}`,
          `A 40 40 0 ${largeArc} 1 ${x2} ${y2}`,
          `Z`
        ].join(' ');
        
        return <path key={cat.name} d={pathData} fill={cat.color} />;
      })}
    </svg>
  );
};

const FireIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M8 9C8 6 10 4 12 2C14 4 16 6 16 9C16 12 14 14 12 14C10 14 8 12 8 9Z" strokeWidth="1.5"/>
    <path d="M8 14C6 16 6 19 8 21" strokeWidth="1.5"/>
    <path d="M16 14C18 16 18 19 16 21" strokeWidth="1.5"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M12 5V19M5 12H19" strokeWidth="2"/>
  </svg>
);

const TrendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M2 20L8 14L12 18L22 8" strokeWidth="2"/>
  </svg>
);

const MilestoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="9" strokeWidth="1.5"/>
    <path d="M12 8V12L15 15" strokeWidth="1.5"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="9" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" strokeWidth="1.5"/>
    <path d="M9 17V18C9 18.7956 9.31607 19.5587 9.87868 20.1213C10.4413 20.6839 11.2044 21 12 21C12.7956 21 13.5587 20.6839 14.1213 20.1213C14.6839 19.5587 15 18.7956 15 18V17" strokeWidth="1.5"/>
  </svg>
);

// Modal Step Components with language props
const PaymentAmountStep = ({ title, amount, setAmount, onNext, onClose, t }) => (
  <div className="modal-step">
    <h2 className="step-title">{title}</h2>
    <div className="amount-input-group">
      <input
        type="number"
        className="amount-input"
        placeholder="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        autoFocus
      />
      <span className="currency">₽</span>
    </div>
    <div className="step-actions">
      <button className="step-btn cancel" onClick={onClose}>{t.cancel}</button>
      <button 
        className="step-btn confirm" 
        onClick={onNext}
        disabled={!amount || parseFloat(amount) <= 0}
      >
        {t.continue}
      </button>
    </div>
  </div>
);

const PhoneNumberStep = ({ phoneNumber, setPhoneNumber, onNext, onClose, t }) => (
  <div className="modal-step">
    <h2 className="step-title">{t.enterPhone}</h2>
    <div className="phone-input-group">
      <span className="phone-prefix">+7</span>
      <input
        type="tel"
        className="phone-input"
        placeholder="999 123-45-67"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        maxLength="10"
        autoFocus
      />
    </div>
    <div className="step-actions">
      <button className="step-btn cancel" onClick={onClose}>{t.cancel}</button>
      <button 
        className="step-btn confirm" 
        onClick={onNext}
        disabled={phoneNumber.length < 10}
      >
        {t.continue}
      </button>
    </div>
  </div>
);

const AccountNumberStep = ({ title, accountNumber, setAccountNumber, onNext, onClose, t }) => (
  <div className="modal-step">
    <h2 className="step-title">{title}</h2>
    <div className="account-input-group">
      <input
        type="text"
        className="account-input"
        placeholder={t.enterAccount}
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        autoFocus
      />
    </div>
    <div className="step-actions">
      <button className="step-btn cancel" onClick={onClose}>{t.cancel}</button>
      <button 
        className="step-btn confirm" 
        onClick={onNext}
        disabled={!accountNumber}
      >
        {t.continue}
      </button>
    </div>
  </div>
);

const CardSelectionStep = ({ cards, selectedCard, setSelectedCard, amount, onNext, onBack, t }) => (
  <div className="modal-step">
    <h2 className="step-title">{t.selectCard}</h2>
    <div className="cards-list">
      {cards.map(card => (
        <button
          key={card.id}
          className={`card-select-item ${selectedCard === card.id ? 'selected' : ''}`}
          onClick={() => setSelectedCard(card.id)}
        >
          <div className="card-select-info">
            <span className="card-select-name">{card.bank}</span>
            <span className="card-select-number">
              {t.cardNumberMask.replace('{number}', card.number.slice(-4))}
            </span>
          </div>
          <span className="card-select-balance">{card.balance.toLocaleString()} ₽</span>
        </button>
      ))}
    </div>
    {amount && (
      <div className="selected-amount">
        {t.amount}: <strong>{parseFloat(amount).toLocaleString()} ₽</strong>
      </div>
    )}
    <div className="step-actions">
      <button className="step-btn cancel" onClick={onBack}>{t.back}</button>
      <button 
        className="step-btn confirm" 
        onClick={onNext}
        disabled={!selectedCard}
      >
        {t.confirm}
      </button>
    </div>
  </div>
);

const ProcessingStep = ({ amount, t }) => (
  <div className="modal-step processing">
    <div className="processing-animation">
      <div className="spinner"></div>
    </div>
    <h2 className="step-title">{t.processing}</h2>
    {amount && <p className="step-amount">{parseFloat(amount).toLocaleString()} ₽</p>}
  </div>
);

const SuccessStep = ({ amount, card, recipient, message, onDone, t }) => (
  <div className="modal-step success">
    <div className="success-animation">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#7FFF00">
        <circle cx="12" cy="12" r="10" strokeWidth="2"/>
        <path d="M8 12L11 15L16 9" strokeWidth="3"/>
      </svg>
    </div>
    <h2 className="step-title">{message || t.success}</h2>
    <p className="step-amount">{parseFloat(amount).toLocaleString()} ₽</p>
    {card && <p className="step-card">{t.card} ···· {card.number.slice(-4)}</p>}
    {recipient && <p className="step-recipient">{recipient}</p>}
    <button className="step-btn done" onClick={onDone}>{t.done}</button>
  </div>
);