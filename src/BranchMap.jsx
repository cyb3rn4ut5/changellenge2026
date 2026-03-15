import React, { useState } from 'react';
import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import './BranchMap.css';

export default function BranchMap({ language, onBack, onSelect }) {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedMetro, setSelectedMetro] = useState('');
  const [mapInstance, setMapInstance] = useState(null);

  // OTP Bank branches in Moscow with real coordinates
  const branches = [
    {
      id: 1,
      name: 'ОТП Банк - Тверская',
      nameEn: 'OTP Bank - Tverskaya',
      address: 'ул. Тверская, 18, Москва',
      addressEn: '18 Tverskaya St, Moscow',
      metro: 'Тверская',
      metroEn: 'Tverskaya',
      coords: [55.7648, 37.6065],
      hours: 'Пн-Пт: 9:00-20:00, Сб: 10:00-17:00',
      hoursEn: 'Mon-Fri: 9:00-20:00, Sat: 10:00-17:00',
      services: ['Открытие счета', 'Обмен валют', 'Студенческий сервис'],
      servicesEn: ['Account opening', 'Currency exchange', 'Student services']
    },
    {
      id: 2,
      name: 'ОТП Банк - Арбат',
      nameEn: 'OTP Bank - Arbat',
      address: 'ул. Новый Арбат, 15, Москва',
      addressEn: '15 Novy Arbat St, Moscow',
      metro: 'Арбатская',
      metroEn: 'Arbatskaya',
      coords: [55.7527, 37.5975],
      hours: 'Пн-Пт: 9:00-21:00, Сб: 10:00-18:00',
      hoursEn: 'Mon-Fri: 9:00-21:00, Sat: 10:00-18:00',
      services: ['Открытие счета', 'Кредиты', 'Переводы'],
      servicesEn: ['Account opening', 'Loans', 'Transfers']
    },
    {
      id: 3,
      name: 'ОТП Банк - Павелецкая',
      nameEn: 'OTP Bank - Paveletskaya',
      address: 'Павелецкая пл., 2, Москва',
      addressEn: '2 Paveletskaya Square, Moscow',
      metro: 'Павелецкая',
      metroEn: 'Paveletskaya',
      coords: [55.7297, 37.6378],
      hours: 'Пн-Пт: 9:00-19:00, Сб: 10:00-16:00',
      hoursEn: 'Mon-Fri: 9:00-19:00, Sat: 10:00-16:00',
      services: ['Открытие счета', 'Депозиты', 'Студенческий сервис'],
      servicesEn: ['Account opening', 'Deposits', 'Student services']
    },
    {
      id: 4,
      name: 'ОТП Банк - Киевская',
      nameEn: 'OTP Bank - Kievskaya',
      address: 'пл. Киевского Вокзала, 1, Москва',
      addressEn: '1 Kievsky Station Square, Moscow',
      metro: 'Киевская',
      metroEn: 'Kievskaya',
      coords: [55.7435, 37.5678],
      hours: 'Пн-Пт: 9:00-20:00, Сб: 10:00-17:00',
      hoursEn: 'Mon-Fri: 9:00-20:00, Sat: 10:00-17:00',
      services: ['Открытие счета', 'Обмен валют', 'Ипотека'],
      servicesEn: ['Account opening', 'Currency exchange', 'Mortgage']
    },
    {
      id: 5,
      name: 'ОТП Банк - Курская',
      nameEn: 'OTP Bank - Kurskaya',
      address: 'ул. Земляной Вал, 29, Москва',
      addressEn: '29 Zemlyanoy Val St, Moscow',
      metro: 'Курская',
      metroEn: 'Kurskaya',
      coords: [55.7575, 37.6595],
      hours: 'Пн-Пт: 9:00-20:00, Сб: 11:00-17:00',
      hoursEn: 'Mon-Fri: 9:00-20:00, Sat: 11:00-17:00',
      services: ['Открытие счета', 'Кредиты', 'Переводы'],
      servicesEn: ['Account opening', 'Loans', 'Transfers']
    },
    {
      id: 6,
      name: 'ОТП Банк - Университет',
      nameEn: 'OTP Bank - University',
      address: 'Ломоносовский пр-т, 27, Москва',
      addressEn: '27 Lomonosovsky Ave, Moscow',
      metro: 'Университет',
      metroEn: 'Universitet',
      coords: [55.7015, 37.5312],
      hours: 'Пн-Пт: 9:00-19:00, Сб: 10:00-16:00',
      hoursEn: 'Mon-Fri: 9:00-19:00, Sat: 10:00-16:00',
      services: ['Открытие счета', 'Студенческий сервис', 'Обмен валют'],
      servicesEn: ['Account opening', 'Student services', 'Currency exchange']
    }
  ];

  // Get unique metro stations for filter
  const metroStations = [...new Set(branches.map(b => 
    language === 'ru' ? b.metro : b.metroEn
  ))].sort();

  // Filter branches by metro
  const filteredBranches = selectedMetro
    ? branches.filter(b => 
        (language === 'ru' ? b.metro : b.metroEn) === selectedMetro
      )
    : branches;

  // Translations
  const texts = {
    ru: {
      title: 'Выберите отделение',
      search: 'Поиск по метро',
      allStations: 'Все станции',
      selectBranch: 'Выбрать отделение',
      branchSelected: 'Отделение выбрано',
      hours: 'Часы работы',
      services: 'Услуги',
      back: 'Назад',
      map: 'Карта отделений ОТП Банка в Москве'
    },
    en: {
      title: 'Select Branch',
      search: 'Search by metro',
      allStations: 'All stations',
      selectBranch: 'Select Branch',
      branchSelected: 'Branch selected',
      hours: 'Working hours',
      services: 'Services',
      back: 'Back',
      map: 'OTP Bank Branches in Moscow'
    },
    zh: {
      title: '选择分行',
      search: '按地铁搜索',
      allStations: '所有车站',
      selectBranch: '选择分行',
      branchSelected: '已选择分行',
      hours: '营业时间',
      services: '服务',
      back: '返回',
      map: '莫斯科OTP银行分行'
    },
    hi: {
      title: 'शाखा चुनें',
      search: 'मेट्रो द्वारा खोजें',
      allStations: 'सभी स्टेशन',
      selectBranch: 'शाखा चुनें',
      branchSelected: 'शाखा चुनी गई',
      hours: 'कार्य घंटे',
      services: 'सेवाएं',
      back: 'वापस',
      map: 'मास्को में ओटीपी बैंक शाखाएं'
    },
    ar: {
      title: 'اختر الفرع',
      search: 'البحث بالمترو',
      allStations: 'جميع المحطات',
      selectBranch: 'اختر الفرع',
      branchSelected: 'تم اختيار الفرع',
      hours: 'ساعات العمل',
      services: 'الخدمات',
      back: 'رجوع',
      map: 'فروع بنك OTP في موسكو'
    },
    kk: {
      title: 'Бөлімшені таңдаңыз',
      search: 'Метро бойынша іздеу',
      allStations: 'Барлық станциялар',
      selectBranch: 'Бөлімшені таңдау',
      branchSelected: 'Бөлімше таңдалды',
      hours: 'Жұмыс уақыты',
      services: 'Қызметтер',
      back: 'Артқа',
      map: 'Мәскеудегі ОТП Банк бөлімшелері'
    },
    tg: {
      title: 'Шӯъбаро интихоб кунед',
      search: 'Ҷустуҷӯ аз рӯи метро',
      allStations: 'Ҳамаи станцияҳо',
      selectBranch: 'Шӯъбаро интихоб кунед',
      branchSelected: 'Шӯъба интихоб шуд',
      hours: 'Соатҳои корӣ',
      services: 'Хизматрасониҳо',
      back: 'Бозгашт',
      map: 'Шӯъбаҳои Бонки ОТП дар Маскав'
    },
    uz: {
      title: 'Filialni tanlang',
      search: 'Metro boʻyicha qidirish',
      allStations: 'Barcha stansiyalar',
      selectBranch: 'Filialni tanlash',
      branchSelected: 'Filial tanlandi',
      hours: 'Ish vaqti',
      services: 'Xizmatlar',
      back: 'Orqaga',
      map: 'Moskvadagi OTP Bank filiallari'
    }
  };

  const t = texts[language] || texts.en;

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    // Center map on selected branch
    if (mapInstance) {
      mapInstance.panTo(branch.coords, { duration: 300 });
    }
    if (window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
  };

  const handleConfirm = () => {
    if (selectedBranch) {
      onSelect(selectedBranch);
    }
  };

  // Map state with dark theme
  const mapState = {
    center: [55.751574, 37.573856], // Moscow center
    zoom: 11,
    controls: [],
    theme: 'dark' // Dark theme
  };

  return (
    <div className="branch-container">
      <div className="branch-card">
        {/* Back Button */}
        <button 
          className="back-button"
          onClick={() => {
            if (window.navigator.vibrate) {
              window.navigator.vibrate(10);
            }
            onBack();
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#7FFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{t.back}</span>
        </button>

        <h1 className="branch-title">{t.title}</h1>

        {/* Yandex Map with Dark Theme */}
        <div className="map-container">
          <YMaps>
            <Map 
              state={mapState}
              instanceRef={(ref) => setMapInstance(ref)}
              style={{ width: '100%', height: '300px', borderRadius: '16px' }}
              options={{ 
                suppressMapOpenBlock: true,
                minZoom: 9,
                maxZoom: 15,
                theme: 'dark' // Dark theme option
              }}
            >
              <ZoomControl options={{ float: 'right' }} />
              
              {/* Branch Markers */}
              {branches.map(branch => (
                <Placemark
                  key={branch.id}
                  geometry={branch.coords}
                  properties={{
                    hintContent: language === 'ru' ? branch.name : branch.nameEn,
                    balloonContent: `
                      <div style="background: #2A2A2A; color: white; border-radius: 12px; padding: 12px; border: 1px solid #7FFF00; max-width: 200px; font-family: 'Inter', sans-serif;">
                        <b style="color: #7FFF00; font-size: 14px;">${language === 'ru' ? branch.name : branch.nameEn}</b><br/>
                        <span style="color: #ccc; font-size: 12px;">${language === 'ru' ? branch.address : branch.addressEn}</span><br/>
                        <span style="color: #ccc; font-size: 12px;">🚇 ${language === 'ru' ? branch.metro : branch.metroEn}</span><br/>
                        <span style="color: #7FFF00; font-size: 11px; display: block; margin-top: 6px;">▼ Нажмите чтобы выбрать</span>
                      </div>
                    `
                  }}
                  options={{
                    iconColor: selectedBranch?.id === branch.id ? '#FFFFFF' : '#7FFF00',
                    preset: 'islands#circleIcon',
                    draggable: false,
                    openBalloonOnClick: true,
                    balloonOffset: [0, -30]
                  }}
                  onClick={() => handleBranchSelect(branch)}
                />
              ))}
            </Map>
          </YMaps>
        </div>

        {/* Metro Filter */}
        <div className="metro-filter">
          <label>{t.search}</label>
          <select
            value={selectedMetro}
            onChange={(e) => {
              setSelectedMetro(e.target.value);
              setSelectedBranch(null);
              if (e.target.value && mapInstance) {
                // Find first branch with this metro and center map
                const branch = branches.find(b => 
                  (language === 'ru' ? b.metro : b.metroEn) === e.target.value
                );
                if (branch) {
                  mapInstance.panTo(branch.coords, { duration: 300 });
                }
              }
            }}
            className="metro-select"
          >
            <option value="">{t.allStations}</option>
            {metroStations.map(station => (
              <option key={station} value={station}>{station}</option>
            ))}
          </select>
        </div>

        {/* Branches List */}
        <div className="branches-list">
          {filteredBranches.map(branch => (
            <button
              key={branch.id}
              className={`branch-item ${selectedBranch?.id === branch.id ? 'selected' : ''}`}
              onClick={() => handleBranchSelect(branch)}
            >
              <div className="branch-item-header">
                <span className="branch-item-name">
                  {language === 'ru' ? branch.name : branch.nameEn}
                </span>
                {selectedBranch?.id === branch.id && (
                  <span className="checkmark">✓</span>
                )}
              </div>
              <div className="branch-item-address">
                {language === 'ru' ? branch.address : branch.addressEn}
              </div>
              <div className="branch-item-metro">
                🚇 {language === 'ru' ? branch.metro : branch.metroEn}
              </div>
              
              {selectedBranch?.id === branch.id && (
                <div className="branch-details">
                  <div className="branch-detail-item">
                    <span className="detail-label">{t.hours}:</span>
                    <span>{language === 'ru' ? branch.hours : branch.hoursEn}</span>
                  </div>
                  <div className="branch-detail-item">
                    <span className="detail-label">{t.services}:</span>
                    <span>{language === 'ru' ? branch.services.join(' · ') : branch.servicesEn.join(' · ')}</span>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Confirm Button */}
        {selectedBranch && (
          <button 
            className="confirm-button"
            onClick={handleConfirm}
          >
            {t.selectBranch} →
          </button>
        )}
      </div>
    </div>
  );
}