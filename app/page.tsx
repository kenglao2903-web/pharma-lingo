'use client'
import { useState, useRef, useEffect } from 'react';
import { specialData } from './specialData';

// ==========================================
// 🛠️ Component: จัดการชื่อยาไม่ให้ล้นกรอบ (Auto-Scale)
// ==========================================
const FittedText = ({ text, isMain }: { text: string, isMain: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const resize = () => {
      if (containerRef.current && textRef.current) {
        const containerW = containerRef.current.offsetWidth;
        const textW = textRef.current.offsetWidth;
        if (textW > containerW) setScale(containerW / textW);
        else setScale(1);
      }
    };
    resize(); window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [text]);

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center overflow-visible px-2 relative z-10">
      <span ref={textRef} className={`inline-block font-black whitespace-nowrap origin-center transition-transform duration-200 ${isMain ? 'text-6xl md:text-8xl lg:text-[7rem] text-slate-900 drop-shadow-sm' : 'text-3xl md:text-4xl text-yellow-900 opacity-80'}`} style={{ transform: `scale(${scale})` }}>
        {text.toUpperCase()}
      </span>
    </div>
  );
};

// ==========================================
// 📚 ฐานข้อมูลคำศัพท์ & พจนานุกรมหน่วยวัด
// ==========================================
const unitDict: any = {
  tab: { th: 'เม็ด', en: 'tablet(s)', de: 'Tablette(n)', zh: '粒/片', ja: '錠', ru: 'таб.', ar: 'حبة' },
  cap: { th: 'แคปซูล', en: 'capsule(s)', de: 'Kapsel(n)', zh: '胶囊', ja: 'カプセル', ru: 'капс.', ar: 'كبسولة' },
  tsp: { th: 'ช้อนชา', en: 'teaspoon(s)', de: 'Teelöffel', zh: '茶匙', ja: '小さじ', ru: 'ч.л.', ar: 'ملعقة صغيرة' },
  tbsp: { th: 'ช้อนโต๊ะ', en: 'tablespoon(s)', de: 'Esslöffel', zh: '汤匙', ja: '大さじ', ru: 'ст.ล.', ar: 'ملعقة كبيرة' },
  ml: { th: 'มล. (ml)', en: 'ml', de: 'ml', zh: '毫升', ja: 'ml', ru: 'мл', ar: 'مل' },
  cc: { th: 'ซีซี (cc)', en: 'cc', de: 'cc', zh: 'cc', ja: 'cc', ru: 'куб.см', ar: 'สม مكعب' },
  drop: { th: 'หยด', en: 'drop(s)', de: 'Tropfen', zh: '滴', ja: '滴', ru: 'кап.', ar: 'قطرة' },
  puff: { th: 'กด/ปั๊ม', en: 'puff(s)/spray(s)', de: 'Sprühstoß', zh: '喷/揿', ja: 'プッシュ/噴霧', ru: 'пшик.', ar: 'بخة/رشة' },
  hr: { th: 'ชั่วโมง', en: 'hour(s)', de: 'Stunde(n)', zh: '小时', ja: '時間', ru: 'час(ов)', ar: 'ساعات' },
  day: { th: 'วัน', en: 'day(s)', de: 'Tag(e)', zh: '天', ja: '日', ru: 'дней', ar: 'أيام' },
  wk: { th: 'สัปดาห์', en: 'week(s)', de: 'Woche(n)', zh: '周', ja: '週間', ru: 'недель', ar: 'أسابيع' },
  times: { th: 'ครั้ง', en: 'time(s)', de: 'Mal', zh: '次', ja: '回', ru: 'раз(а)', ar: 'مرات' }
};

const dict = {
  th: {
    dashboard: 'แดชบอร์ดเภสัชกร', change_lang: 'เปลี่ยนภาษา', tab_history: '📋 ซักประวัติ', tab_dispense: '💊 จ่ายยา', tab_special: '🪄 เทคนิคพิเศษ',
    q_name: 'ถามชื่อ', q_dob: 'ถามวันเกิด', q_allergy: 'ถามแพ้ยา', q_inj: 'วันนี้ฉีดยาหรือยัง?', q_med: 'วันนี้กินยามาหรือยัง?', 
    ans_yes: 'ใช่', ans_no: 'ไม่ใช่', ans_dont_know: 'ไม่ทราบ', drug_name: 'ยา (Medicine):', ind_title: 'ข้อบ่งใช้ (Indication):',
    indication: ['ลดไข้ / แก้ปวด', 'แก้แพ้ / ลดน้ำมูก', 'แก้ไอ / ละลายเสมหะ', 'ยาฆ่าเชื้อ', 'แก้ท้องเสีย', 'ลดกรด / ปวดท้อง', 'แก้คลื่นไส้ / อาเจียน', 'ลดอักเสบ / ปวดกล้ามเนื้อ'],
    ind_icons: ['🤒', '🤧', '🗣️', '🦠', '🚽', '🤢', '🤮', '⚡'],
    dose: ['ครึ่งเม็ด (1/2)', '1 เม็ด', '2 เม็ด', '1 ช้อนชา', '1 ช้อนโต๊ะ', '1 กด/ปั๊ม', '1 หยด'],
    side: ['ตาซ้าย', 'ตาขวา', 'ตาทั้งสองข้าง', 'หูซ้าย', 'หูขวา', 'หูทั้งสองข้าง'], side_icons: ['👁️⬅️', '👁️➡️', '👁️👁️', '👂⬅️', '👂➡️', '👂👂'],
    freq: ['วันละ 1 ครั้ง', 'วันละ 2 ครั้ง', 'วันละ 3 ครั้ง', 'วันละ 4 ครั้ง', 'ทุก 4-6 ชม.', 'ทุก 6 ชม.', 'ทุก 8 ชม.'],
    time: ['ก่อนอาหาร', 'หลังอาหาร', 'หลังอาหารทันที', 'ก่อนหรือหลังอาหารก็ได้'],
    period: ['เช้า', 'กลางวัน', 'เย็น', 'ก่อนนอน', 'เวลามีอาการ'], period_icons: ['☀️', '🕛', '🌆', '🌙', '🩹'],
    warn: ['ต้องกินจนหมด', 'อาจทำให้ง่วงนอน', 'ห้ามดื่มแอลกอฮอล์', 'ห้ามกินพร้อมนม', 'ระวังแสงแดดจัด', 'ดื่มน้ำตามมากๆ', 'เปลี่ยนสีปัสสาวะ', 'เคี้ยวให้ละเอียด', 'เก็บในตู้เย็น', 'ละลายน้ำก่อนดื่ม (ยาฟู่)'],
    warn_icons: ['💊', '😴', '🍺', '🥛', '☀️', '💧', '🚽', '🦷', '❄️', '🫧'],
    allergy_alert: 'หยุดใช้ยาและพบแพทย์ทันที หากมีผื่นคัน หายใจติดขัด หรือมีอาการแพ้',
    show_card: '🚀 โชว์ Boarding Pass', edit_rx: '⬅️ กลับไปแก้ไข', photo_prompt: '📸 ถ่ายรูปหน้าจอนี้เก็บไว้ (Take a photo)',
    smart_dose: 'ใช้ครั้งละ {n} {u}', smart_hour: 'ทุกๆ {n} {u}', smart_apply: 'ทาวันละ {n} {u}', smart_days: 'ติดต่อกัน {n} {u}',
    add_to_cart: '📥 เก็บลงตะกร้า', cart: 'ตะกร้ายา', items: 'รายการ', swipe_hint: '👈 ปัดซ้าย-ขวา ดูยาตัวอื่น 👉', scroll_down: '⬇️ เลื่อนลงเพื่อดูคำเตือน',
    taper_mode: '📉 โหมดลดโดส / กินไม่เท่ากัน', standard_mode: 'กลับไปโหมดปกติ', add_step: '➕ เพิ่มขั้น',
    duration: 'ระยะเวลา', dosage: 'ปริมาณ', time_col: 'มื้ออาหาร / เวลา', rx_title: 'วิธีใช้ยา (Prescription)', warn_title: 'คำเตือน (Warnings)', spec_guide: 'คู่มือการใช้ยา (How to Use)'
  },
  en: { 
    hello: 'Hello 👋', tap_to_select: '👆 Please tap an option below', q_name: 'What is your name?', q_dob: 'When is your birthday?', q_allergy: 'Are you allergic to any medicine?', yes: 'Yes', no: 'No', dont_know: 'Not sure', writePaper: 'Please write the medicine name and symptoms on paper.',
    q_inj: 'Did the doctor give you an injection today?', q_med: 'Did the doctor give you any oral medication today?', rx_title: 'Prescription Info', warn_title: 'Warnings', drug_name: 'Medicine:', ind_title: 'Indication:', 
    indication: ['Fever / Pain relief', 'Allergy / Runny nose', 'Cough / Expectorant', 'Antibiotic', 'Diarrhea', 'Antacid / Stomachache', 'Nausea / Vomiting', 'Anti-inflammatory / Muscle pain'], ind_icons: ['🤒', '🤧', '🗣️', '🦠', '🚽', '🤢', '🤮', '⚡'],
    dose: ['Half (1/2) Tablet', '1 Tablet/Capsule', '2 Tablets/Capsules', '1 Teaspoon (5ml)', '1 Tablespoon (15ml)', '1 Puff/Spray', '1 Drop'],
    side: ['Left eye', 'Right eye', 'Both eyes', 'Left ear', 'Right ear', 'Both ears'], side_icons: ['👁️⬅️', '👁️➡️', '👁️👁️', '👂⬅️', '👂➡️', '👂👂'],
    freq: ['Once daily', 'Twice daily', '3 times a day', '4 times a day', 'Every 4-6 hours', 'Every 6 hours', 'Every 8 hours'],
    time: ['Before meal', 'After meal', 'Immediately after meal', 'With or without food'],
    period: ['Morning', 'Noon', 'Evening', 'Night', 'As needed'], period_icons: ['☀️', '🕛', '🌆', '🌙', '🩹'],
    warn: ['Finish the entire course.', 'May cause drowsiness.', 'Avoid alcohol.', 'Do not take with milk or antacids.', 'Avoid strong sunlight.', 'Drink plenty of water.', 'May change urine/stool color.', 'Chew well before swallowing.', 'Store in the refrigerator.', 'Dissolve in water before drinking'],
    allergy_alert: 'Stop use and seek medical help immediately if you develop a rash, breathing problems, or signs of an allergic reaction.',
    show_card: '🚀 Show Boarding Pass', edit_rx: '⬅️ Edit', photo_prompt: '📸 Please take a photo of this screen',
    smart_dose: 'Take/Use {n} {u}', smart_hour: 'Every {n} {u}', smart_apply: 'Apply {n} {u} a day', smart_days: 'For {n} {u}',
    add_to_cart: '📥 Add to Cart', cart: 'Cart', items: 'items', swipe_hint: '👈 Swipe left/right for other meds 👉', scroll_down: '⬇️ Scroll down for warnings',
    taper_mode: '📉 Step-down / Tapering Mode', standard_mode: 'Back to Standard Mode', add_step: '➕ Add Step', duration: 'Duration', dosage: 'Dose', time_col: 'Food / Time',
    tab_history: '📋 History', tab_dispense: '💊 Dispense', tab_special: '🪄 Specialty', spec_guide: 'How to Use'
  },
  de: { 
    hello: 'Hallo 👋', tap_to_select: '👆 Bitte tippen Sie auf eine Option', q_name: 'Wie heißen Sie?', q_dob: 'Wann ist Ihr Geburtstag?', q_allergy: 'Haben Sie Medikamentenallergien?', yes: 'Ja', no: 'Nein', dont_know: 'Weiß nicht', writePaper: 'Bitte schreiben Sie den Medikamentennamen und die Symptome auf.',
    q_inj: 'Haben Sie heute eine Spritze bekommen?', q_med: 'Haben Sie heute Medikamente zum Einnehmen bekommen?', rx_title: 'Einnahmeempfehlung', warn_title: 'Warnhinweise', drug_name: 'Medikament:', ind_title: 'Anwendungsgebiet:', 
    indication: ['Fieber / Schmerzlinderung', 'Allergie / Laufende Nase', 'Husten / Schleimlöser', 'Antibiotikum', 'Durchfall', 'Antazidum / Magenschmerzen', 'Übelkeit / Erbrechen', 'Entzündungshemmend / Muskelschmerzen'], ind_icons: ['🤒', '🤧', '🗣️', '🦠', '🚽', '🤢', '🤮', '⚡'],
    dose: ['Halbe (1/2) Tablette', '1 Tablette/Kapsel', '2 Tabletten/Kapseln', '1 Teelöffel (5ml)', '1 Esslöffel (15ml)', '1 Sprühstoß', '1 Tropfen'],
    side: ['Linkes Auge', 'Rechtes Auge', 'Beide Augen', 'Linkes Ohr', 'Rechtes Ohr', 'Beide Ohren'], side_icons: ['👁️⬅️', '👁️➡️', '👁️👁️', '👂⬅️', '👂➡️', '👂👂'],
    freq: ['Einmal täglich', 'Zweimal täglich', '3-mal täglich', '4-mal täglich', 'Alle 4-6 Stunden', 'Alle 6 Stunden', 'Alle 8 Stunden'],
    time: ['Vor der Mahlzeit', 'Nach der Mahlzeit', 'Direkt nach der Mahlzeit', 'Vor oder nach dem Essen'],
    period: ['Morgens', 'Mittags', 'Abends', 'Nachts', 'Bei Bedarf'], period_icons: ['☀️', '🕛', '🌆', '🌙', '🩹'],
    warn: ['Packung vollständig aufbrauchen.', 'Kann Schläfrigkeit verursachen.', 'Alkohol vermeiden.', 'Nicht mit Milch oder Antazida einnehmen.', 'Starke Sonneneinstrahlung vermeiden.', 'Viel Wasser trinken.', 'Kann Urin-/Stuhlfarbe verändern.', 'Vor dem Schlucken gut kauen.', 'Im Kühlschrank aufbewahren.', 'Vor dem Trinken in Wasser auflösen'],
    allergy_alert: 'Brechen Sie die Anwendung ab und suchen Sie sofort einen Arzt auf, falls ein Hautausschlag, Atemnot oder Anzeichen einer allergischen Reaktion auftreten.',
    show_card: '🚀 Zeigen Boarding Pass', edit_rx: '⬅️ Bearbeiten', photo_prompt: '📸 Bitte fotografieren Sie diesen Bildschirm',
    smart_dose: '{n} {u} einnehmen', smart_hour: 'Alle {n} {u}', smart_apply: '{n}-mal täglich', smart_days: 'Für {n} {u}',
    add_to_cart: '📥 In den Warenkorb', cart: 'Korb', items: 'Artikel', swipe_hint: '👈 Wischen für andere 👉', scroll_down: '⬇️ Für Warnungen nach unten scrollen',
    taper_mode: '📉 Ausschleichende Dosierung', standard_mode: 'Standardmodus', add_step: '➕ Schritt hinzufügen', duration: 'Dauer', dosage: 'Dosis', time_col: 'Essen / Zeit',
    tab_history: '📋 Verlauf', tab_dispense: '💊 Ausgabe', tab_special: '🪄 Spezialität', spec_guide: 'Anwendung'
  },
  zh: { 
    hello: '你好 👋', tap_to_select: '👆 请点击下方选项', q_name: '请问你叫什么名字？', q_dob: '你的生日是哪天？', q_allergy: '你对什么药过敏吗？', yes: '是', no: '否', dont_know: '不清楚', writePaper: '请将药物名称和症状写在纸上。',
    q_inj: '医生今天给您打针了吗？', q_med: '医生今天给您开过口服药了吗？', rx_title: '服药方法', warn_title: '注意事项', drug_name: '药物：', ind_title: '主治：', 
    indication: ['退烧 / 止痛', '过敏 / 流鼻涕', '咳嗽 / 化痰', '抗生素', '腹泻', '抗酸药 / 胃痛', '恶心 / 呕吐', '消炎 / 肌肉疼痛'], ind_icons: ['🤒', '🤧', '🗣️', '🦠', '🚽', '🤢', '🤮', '⚡'],
    dose: ['半 (1/2) 片', '1 粒/片', '2 粒/片', '1 茶匙 (5ml)', '1 汤匙 (15ml)', '1 喷/揿', '1 滴'],
    side: ['左眼', '右眼', '双眼', '左耳', '右耳', '双耳'], side_icons: ['👁️⬅️', '👁️➡️', '👁️👁️', '👂⬅️', '👂➡️', '👂👂'],
    freq: ['每天 1 次', '每天 2 次', '每天 3 次', '每天 4 次', '每 4-6 小时 1 次', '每 6 小时 1 次', '每 8 小时 1 次'],
    time: ['饭前', '饭后', '饭后立即服用', '饭前或饭后均可'],
    period: ['早上', '中午', '晚上', '睡前', '需要时'], period_icons: ['☀️', '🕛', '🌆', '🌙', '🩹'],
    warn: ['请服完整个疗程。', '可能引起嗜睡。', '避免饮酒。', '请勿与牛奶或抗酸药同服。', '避免强烈的阳光照射。', '多喝水。', '可能改变尿液/粪便的颜色。', '吞咽前须嚼碎。', '在冰箱中冷藏。', '饮用前将其溶解在水中'],
    allergy_alert: '如果出现皮疹、呼吸困难或过敏反应迹象，请立即停药并就医。',
    show_card: '🚀 显示登机牌', edit_rx: '⬅️ 编辑', photo_prompt: '📸 请拍照保存此屏幕',
    smart_dose: '每次使用 {n} {u}', smart_hour: '每 {n} {u}一次', smart_apply: '每天 {n} {u}', smart_days: '连续使用 {n} {u}',
    add_to_cart: '📥 加入购物车', cart: '购物车', items: '项目', swipe_hint: '👈 左右滑动查看其他 👉', scroll_down: '⬇️ 向下滚动查看警告',
    taper_mode: '📉 递减/不规则剂量模式', standard_mode: '返回标准模式', add_step: '➕ 添加步骤', duration: '期间', dosage: '剂量', time_col: '餐/时间',
    tab_history: '📋 历史', tab_dispense: '💊 配药', tab_special: '🪄 专科药物', spec_guide: '如何使用'
  },
  ja: { 
    hello: 'こんにちは 👋', tap_to_select: '👆 オプションをタップしてください', q_name: 'お名前を教えてください。', q_dob: '誕生日はいつですか？', q_allergy: '薬のアレルギーはありますか？', yes: 'はい', no: 'いいえ', dont_know: 'わからない', writePaper: '薬の名前と症状を紙に書いてください。',
    q_inj: '今日、注射をしましたか？', q_med: '今日、飲み薬を飲みましたか？', rx_title: '服用方法', warn_title: '注意事項', drug_name: '薬の名前：', ind_title: '効能：', 
    indication: ['解熱 / 鎮痛', 'アレルギー / 鼻水', '咳 / 去痰', '抗生物質', '下痢', '制酸剤 / 胃痛', '吐き気 / 嘔吐', '抗炎症 / 筋肉痛'], ind_icons: ['🤒', '🤧', '🗣️', '🦠', '🚽', '🤢', '🤮', '⚡'],
    dose: ['半 (1/2) 錠', '1 錠/カプセル', '2 錠/カプセル', '小さじ 1 杯 (5ml)', '大さじ 1 杯 (15ml)', '1 プッシュ/噴霧', '1 滴'],
    side: ['左目', '右目', '両目', '左耳', '右耳', '両耳'], side_icons: ['👁️⬅️', '👁️➡️', '👁️👁️', '👂⬅️', '👂➡️', '👂👂'],
    freq: ['1日 1回', '1日 2回', '1日 3回', '1日 4回', '4〜6 時間ごと', '6 時間ごと', '8 時間ごと'],
    time: ['食前', '食後', '食直後', '食前または食後'],
    period: ['朝', '昼', '夕方', '就寝前', '症状がある時'], period_icons: ['☀️', '🕛', '🌆', '🌙', '🩹'],
    warn: ['処方された分は最後まで飲みきってください。', '眠気を催すことがあります。', 'アルコールは避けてください。', '牛乳や制酸剤と一緒に飲まないでください。', '強い日差しを避けてください。', '多めに水を飲んでください。', '尿や便の色が変わることがあります。', '飲み込む前にしっかり噛んでください。', '冷蔵庫で保管してください。', '飲む前に水に溶かしてください'],
    allergy_alert: '発疹、息苦しさ、またはアレルギー反応の兆候が現れた場合は、直ちに使用を中止し、医師の診察を受けてください。',
    show_card: '🚀 搭乗券を表示', edit_rx: '⬅️ 編集', photo_prompt: '📸 この画面の写真を撮って保存してください',
    smart_dose: '1回 {n} {u} 使用', smart_hour: '{n} {u}ごと', smart_apply: '1日 {n} {u} 適用', smart_days: '{n} {u}間 連続',
    add_to_cart: '📥 カートに追加', cart: 'カート', items: 'アイテム', swipe_hint: '👈 左右にスワイプして他の薬を表示 👉', scroll_down: '⬇️ 下にスクロールして警告を表示',
    taper_mode: '📉 漸減・不規則服用モード', standard_mode: '標準モードに戻る', add_step: '➕ ステップを追加', duration: '期間', dosage: '用量', time_col: '食事 / 時間',
    tab_history: '📋 履歴', tab_dispense: '💊 調剤', tab_special: '🪄 特殊機器', spec_guide: '使い方'
  },
  ru: { 
    hello: 'Привет 👋', tap_to_select: '👆 Пожалуйста, выберите вариант', q_name: 'Как вас зовут?', q_dob: 'Когда ваш день рождения?', q_allergy: 'У вас есть аллергия на лекарства?', yes: 'Да', no: 'Нет', dont_know: 'Не уверен', writePaper: 'Пожалуйста, напишите название лекарства и симптомы на бумаге.',
    q_inj: 'Делали ли вам сегодня укол?', q_med: 'Давали ли вам сегодня какие-либо лекарства внутрь?', rx_title: 'Способ применения', warn_title: 'Предупреждения', drug_name: 'Лекарство:', ind_title: 'Показания:', 
    indication: ['Жар / Обезболивающее', 'Аллергия / Насморк', 'Кашель / Отхаркивающее', 'Антибиотики', 'Диарея', 'Антацид / Боль в животе', 'Тошнота / Рвота', 'Противовоспалительное / Мышечная боль'], ind_icons: ['🤒', '🤧', '🗣️', '🦠', '🚽', '🤢', '🤮', '⚡'],
    dose: ['Половина (1/2) таблетки', '1 таблетка/капсула', '2 таблетки/капсулы', '1 чайная ложка (5 мл)', '1 столовая ложка (15 мл)', '1 пшик', '1 капля'],
    side: ['Левый глаз', 'Правый глаз', 'Оба глаза', 'Левое ухо', 'Правое ухо', 'Оба уха'], side_icons: ['👁️⬅️', '👁️➡️', '👁️👁️', '👂⬅️', '👂➡️', '👂👂'],
    freq: ['1 раз в день', '2 раза в день', '3 раза в день', '4 раза в день', 'Каждые 4-6 часов', 'Каждые 6 часов', 'Каждые 8 часов'],
    time: ['Перед едой', 'После едой', 'Сразуหลังจาก едой', 'До илиหลังจาก едой'],
    period: ['Утром', 'Днем', 'Вечером', 'На ночь', 'При симптомах'], period_icons: ['☀️', '🕛', '🌆', '🌙', '🩹'],
    warn: ['Пройдите полный курс лечения.', 'Может вызывать сонливость.', 'Избегайте употребления алкоголя.', 'Не принимайте с молоком или антацидами.', 'Избегайте сильного солнечного света.', 'Пейте больше воды.', 'Может изменить цвет мочи/кала.', 'Тщательно разжевать перед проглатыванием.', 'Хранить в холодильнике.', 'Растворить в воде перед приемом'],
    allergy_alert: 'Немедленно прекратите использование и обратитесь к врачу при появлении сыпи, затрудненного дыхания или других признаков аллергической реакции.',
    show_card: '🚀 Показать', edit_rx: '⬅️ Назад', photo_prompt: '📸 Пожалуйста, сфотографируйте этот экран',
    smart_dose: 'Принимать по {n} {u}', smart_hour: 'Каждые {n} {u}', smart_apply: 'Применять {n} {u} в день', smart_days: 'В течение {n} {u}',
    add_to_cart: '📥 В корзину', cart: 'Корзина', items: 'шт.', swipe_hint: '👈 Проведите для просмотра 👉', scroll_down: '⬇️ Прокрутите вниз для предупреждений',
    taper_mode: '📉 Режим снижения дозы', standard_mode: 'Стандартный режим', add_step: '➕ Добавить шаг', duration: 'Период', dosage: 'Доза', time_col: 'Еда / Время',
    tab_history: '📋 История', tab_dispense: '💊 Выдача', tab_special: '🪄 Специальные', spec_guide: 'Как использовать'
  },
  ar: { 
    hello: 'مرحباً 👋', tap_to_select: 'الرجاء الضغط على أحد الخيارات 👆', q_name: 'ما اسمك؟', q_dob: 'متى تاريخ ميلادك؟', q_allergy: 'هل لديك حساسية من أي دواء؟', yes: 'نعم', no: 'لا', dont_know: 'غير متأكد', writePaper: 'يرجى كتابة اسم الدواء والأعراض على الورق.',
    q_inj: 'هل أعطاك الطبيب حقنة اليوم؟', q_med: 'هل أخذت أي دواء عن طريق الفم اليوم؟', rx_title: 'كيفية تناول الدواء', warn_title: 'تحذيرات', drug_name: 'الدواء:', ind_title: 'دواعي الإستعمال:', 
    indication: ['حمى / مسكن للألم', 'حساسية / سيلان الأنف', 'سعال / طارد للبلغم', 'مضاد حيوي', 'إسهال', 'مضاد للحموضة / ألم في المعدة', 'غثيان / قيء', 'مضاد للالتهابات / ألم عضلي'], ind_icons: ['🤒', '🤧', '🗣️', '🦠', '🚽', '🤢', '🤮', '⚡'],
    dose: ['نصف (1/2) حبة', 'حبة/كبسولة واحدة', 'حبتان/كبسولتان', 'ملعقة صغيرة (5 مل)', 'ملعقة كبيرة (15 مل)', 'بخة/رشة واحدة', 'قطرة واحدة'],
    side: ['العين اليسرى', 'العين اليمنى', 'كلتا العينين', 'الأذن اليسرى', 'الأذن اليمنى', 'كلتا الأذنين'], side_icons: ['👁️⬅️', '👁️➡️', '👁️👁️', '👂⬅️', '👂➡️', '👂👂'],
    freq: ['مرة واحدة يومياً', 'مرتين يومياً', '3 مرات يومياً', '4 مرات يومياً', 'كل 4-6 ساعات', 'كل 6 ساعات', 'كل 8 ساعات'],
    time: ['قبل الأكل', 'بعد الأكل', 'مباشرة بعد الأكل', 'قبل أو بعد الأكل'],
    period: ['الصباح', 'الظهر', 'المساء', 'الليل', 'عند الحاجة'], period_icons: ['☀️', '🕛', '🌆', '🌙', '🩹'],
    warn: ['أكمل الجرعة بالكامل.', 'قد يسبب النعاس.', 'تجنب الكحول.', 'لا تتناوله مع الحليب أو مضادات الحموضة.', 'تجنب أشعة الشمس القوية.', 'اشرب كمية كافية من الماء.', 'قد يغير لون البول/البراز.', 'امضغ جيداً قبل البلع.', 'يحفظ في الثلاجة.', 'تذوب في الماء قبل الشرب'],
    allergy_alert: 'توقف عن الاستخدام واطلب المساعدة الطبية فوراً إذا ظهر طفح جلدي أو صعوبة في التنفس أو علامات رد فعل تحسسي.',
    show_card: '🚀 عرض بطاقة الصعود', edit_rx: '⬅️ تعديل', photo_prompt: '📸 يرجى التقاط صورة لهذه الشاشة',
    smart_dose: 'استخدم {n} {u}', smart_hour: 'كل {n} {u}', smart_apply: 'تطبيق {n} {u} يومياً', smart_days: 'لمدة {n} {u}',
    add_to_cart: '📥 أضف إلى السلة', cart: 'سلة', items: 'عناصر', swipe_hint: '👈 اسحب لعرض أدوية أخرى 👉', scroll_down: '⬇️ قم بالتمرير لأسفل للتحذيرات',
    taper_mode: '📉 وضع تقليل الجرعة', standard_mode: 'الوضع القياسي', add_step: '➕ إضافة خطوة', duration: 'المدة', dosage: 'الجرعة', time_col: 'طعام / وقت',
    tab_history: '📋 سجل', tab_dispense: '💊 صرف', tab_special: '🪄 تخصص', spec_guide: 'كيف تستعمل'
  }
};

type Lang = keyof typeof dict;
type AppMode = 'history' | 'dispense' | 'specialty';
type DispenseState = 'input' | 'present'; 

// Tapering Step Structure
type TaperStep = {
  days: number; dose: string | number; unit: string; time: number | null; periods: number[];
};

// Prescription Object Structure
type Prescription = {
  drugInput: string; drugName: string;
  rxIndication: number | null; customIndication: string;
  isTapering: boolean; taperSteps: TaperStep[];
  rxDose: number | null; rxSide: number | null; rxFreq: number | null; rxTime: number | null; rxPeriod: number[]; 
  rxWarnings: number[]; customWarnings: string[];
  cDose: string | number; cDoseUnit: string; cHour: string | number; cHourUnit: string;
  cApply: string | number; cApplyUnit: string; cDays: string | number; cDaysUnit: string;
};

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧', label: 'United Kingdom' }, { code: 'de', flag: '🇩🇪', label: 'Germany' },
  { code: 'ru', flag: '🇷🇺', label: 'Russia' }, { code: 'zh', flag: '🇨🇳', label: 'China' },
  { code: 'ja', flag: '🇯🇵', label: 'Japan' }, { code: 'ar', flag: '🇦🇪', label: 'United Arab Emirates' }
];

export default function PharmaLingoApp() {
  const [hasStarted, setHasStarted] = useState(false);
  const [animatingLang, setAnimatingLang] = useState<string | null>(null); 
  const [patientLang, setPatientLang] = useState<Lang>('en');
  const [voiceGender, setVoiceGender] = useState<'female' | 'male'>('female');
  
  const [appMode, setAppMode] = useState<AppMode>('history');
  const [dispenseState, setDispenseState] = useState<DispenseState>('input'); 
  const [isFullscreen, setIsFullscreen] = useState(false); 
  
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [boolAnswer, setBoolAnswer] = useState<string | null>(null); 
  const [activeGuide, setActiveGuide] = useState<any>(null);

  const [cart, setCart] = useState<Prescription[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // State: Dispense Form
  const [drugInput, setDrugInput] = useState('');
  const [drugName, setDrugName] = useState('');
  const [isTranslatingDrug, setIsTranslatingDrug] = useState(false);
  const [rxIndication, setRxIndication] = useState<number | null>(null);
  const [indInput, setIndInput] = useState('');
  const [customIndication, setCustomIndication] = useState('');
  const [isTranslatingInd, setIsTranslatingInd] = useState(false);

  const [isTaperingMode, setIsTaperingMode] = useState(false);
  const [taperSteps, setTaperSteps] = useState<TaperStep[]>([{ days: 3, dose: 1, unit: 'tab', time: null, periods: [0] }]);

  const [rxDose, setRxDose] = useState<number | null>(null);
  const [rxSide, setRxSide] = useState<number | null>(null);
  const [rxFreq, setRxFreq] = useState<number | null>(null);
  const [rxTime, setRxTime] = useState<number | null>(null);
  const [rxPeriod, setRxPeriod] = useState<number[]>([]); 
  const [rxWarnings, setRxWarnings] = useState<number[]>([]);
  
  const [isSmartOpen, setIsSmartOpen] = useState(false); 
  const [cDose, setCDose] = useState<string | number>(0);
  const [cDoseUnit, setCDoseUnit] = useState<string>('tab');
  const [cHour, setCHour] = useState<string | number>(0);
  const [cHourUnit, setCHourUnit] = useState<string>('hr');
  const [cApply, setCApply] = useState<string | number>(0);
  const [cApplyUnit, setCApplyUnit] = useState<string>('times');
  const [cDays, setCDays] = useState<string | number>(0);
  const [cDaysUnit, setCDaysUnit] = useState<string>('day');

  const [warnInput, setWarnInput] = useState('');
  const [customWarnings, setCustomWarnings] = useState<string[]>([]);
  const [isTranslatingWarn, setIsTranslatingWarn] = useState(false);

  const [customText, setCustomText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => { if (typeof window !== 'undefined') synthRef.current = window.speechSynthesis; }, []);

  // ==========================================
  // 🛠️ ฟังก์ชันการจัดการ UI และ Data
  // ==========================================
  const togglePeriod = (index: number) => setRxPeriod(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index].sort());
  const toggleWarning = (index: number) => setRxWarnings(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  const handleNumberInput = (setter: any, value: string) => { if (value === '' || /^\d*\.?\d*$/.test(value)) setter(value); };

  const handleTranslate = async () => {
    if (!customText.trim()) return;
    setIsTranslating(true);
    try {
      const langMap: any = { th: 'th', en: 'en', de: 'de', zh: 'zh-CN', ja: 'ja', ru: 'ru', ar: 'ar' };
      const targetLang = langMap[patientLang];
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=th&tl=${targetLang}&dt=t&q=${encodeURIComponent(customText)}`);
      const data = await res.json(); setTranslatedText(data[0][0][0]); setActiveQuestion('custom_msg'); setAppMode('history'); speakText(data[0][0][0], patientLang); setCustomText('');
    } catch (error) { console.error(error); }
    setIsTranslating(false);
  };

  // 🎙️ อัปเกรดระบบดึงเสียงให้รองรับ Siri / เพศหญิงชาย
  const speakText = (text: string, langCode: string, forceEnglish: boolean = false) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synthRef.current.getVoices();
    const targetLangMatch = forceEnglish ? 'en' : langCode;
    
    let filteredVoices = voices.filter(v => v.lang.startsWith(targetLangMatch));
    
    let preferredVoice = filteredVoices.find(v => {
      const name = v.name.toLowerCase();
      const isPremium = name.includes('premium') || name.includes('siri') || name.includes('enhanced');
      if (voiceGender === 'male') return isPremium && (name.includes('male') || name.includes('otoya') || name.includes('aaron'));
      return isPremium && (name.includes('female') || name.includes('kyoko') || name.includes('samantha'));
    });

    if (!preferredVoice) {
      preferredVoice = filteredVoices.find(v => {
        const name = v.name.toLowerCase();
        if (voiceGender === 'male') return name.includes('male') || name.includes('otoya') || name.includes('aaron');
        return name.includes('female') || name.includes('kyoko') || name.includes('samantha'));
      });
    }

    if (!preferredVoice && filteredVoices.length > 0) preferredVoice = filteredVoices[0];
    if (preferredVoice) utterance.voice = preferredVoice;

    const voiceLangMap: any = { ar: 'ar-SA', de: 'de-DE', en: 'en-US', zh: 'zh-CN', ja: 'ja-JP', ru: 'ru-RU' };
    utterance.lang = voiceLangMap[targetLangMatch] || targetLangMatch;
    utterance.rate = 0.85; 
    utterance.onend = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    synthRef.current.speak(utterance);
  };

  const speakSpecificRx = (rx: Prescription) => {
    if (!synthRef.current) return;
    const text = generateSpeechText(rx);
    if (text) speakText(text.replace(/\|/g, ','), patientLang);
  };

  const speakSpecificWarnings = (rx: Prescription) => {
    if (!synthRef.current) return;
    const text = generateWarningsSpeechText(rx);
    if (text) speakText(text, patientLang);
  };

  const speakGuide = (guide: any) => {
    if (!synthRef.current) return;
    let text = (guide.title[patientLang] || guide.title.en) + '.\n';
    guide.steps.forEach((step: any, i: number) => {
       text += `Step ${i + 1}: ${step.desc[patientLang] || step.desc.en}.\n`;
    });
    speakText(text, patientLang);
  };

  const toggleHistorySpeech = () => {
    if (!synthRef.current) return;
    if (isSpeaking || synthRef.current.speaking) { synthRef.current.cancel(); setIsSpeaking(false); } 
    else {
      const text = activeQuestion ? (dict[patientLang] as any)[activeQuestion] : translatedText;
      speakText(text, patientLang);
    }
  };

  const handleLangSelect = (code: string, label: string) => { 
    setPatientLang(code as Lang); 
    setAnimatingLang(code); 
    speakText(label, 'en', true);
    setTimeout(() => { setHasStarted(true); setAnimatingLang(null); }, 1000); 
  };

  const askQuestion = (qId: string) => { setAppMode('history'); setActiveQuestion(qId); setTranslatedText(''); setBoolAnswer(null); speakText((dict[patientLang] as any)[qId], patientLang); };
  const parseSmartText = (template: string, value: string | number, unitKey: string) => { const numValue = Number(value) || 0; return template.replace('{n}', numValue.toString()).replace('{u}', unitDict[unitKey][patientLang]); };

  const translateDrugName = async () => {
    if (!drugInput.trim()) return;
    setIsTranslatingDrug(true);
    try {
      const langMap: any = { th: 'th', en: 'en', de: 'de', zh: 'zh-CN', ja: 'ja', ru: 'ru', ar: 'ar' };
      const targetLang = langMap[patientLang];
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=th&tl=${targetLang}&dt=t&q=${encodeURIComponent(drugInput)}`);
      const data = await res.json(); setDrugName(data[0][0][0]);
    } catch (error) { console.error(error); }
    setIsTranslatingDrug(false);
  };

  const translateIndication = async () => {
    if (!indInput.trim()) return;
    setIsTranslatingInd(true);
    try {
      const langMap: any = { th: 'th', en: 'en', de: 'de', zh: 'zh-CN', ja: 'ja', ru: 'ru', ar: 'ar' };
      const targetLang = langMap[patientLang];
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=th&tl=${targetLang}&dt=t&q=${encodeURIComponent(indInput)}`);
      const data = await res.json(); setCustomIndication(data[0][0][0]); setIndInput(''); setRxIndication(null); 
    } catch (error) { console.error(error); }
    setIsTranslatingInd(false);
  };

  const translateWarning = async () => {
    if (!warnInput.trim()) return;
    setIsTranslatingWarn(true);
    try {
      const langMap: any = { th: 'th', en: 'en', de: 'de', zh: 'zh-CN', ja: 'ja', ru: 'ru', ar: 'ar' };
      const targetLang = langMap[patientLang];
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=th&tl=${targetLang}&dt=t&q=${encodeURIComponent(warnInput)}`);
      const data = await res.json(); setCustomWarnings([...customWarnings, data[0][0][0]]); setWarnInput('');
    } catch (error) { console.error(error); }
    setIsTranslatingWarn(false);
  };

  const removeCustomWarning = (index: number) => setCustomWarnings(customWarnings.filter((_, i) => i !== index));

  const addToCart = () => {
    const newItem: Prescription = {
      drugInput, drugName, rxIndication, customIndication, isTapering: isTaperingMode, taperSteps: [...taperSteps],
      rxDose, rxSide, rxFreq, rxTime, rxPeriod: [...rxPeriod], rxWarnings: [...rxWarnings], customWarnings: [...customWarnings],
      cDose, cDoseUnit, cHour, cHourUnit, cApply, cApplyUnit, cDays, cDaysUnit
    };
    setCart([...cart, newItem]);
    resetFormOnly();
  };

  const resetFormOnly = () => {
    setDrugInput(''); setDrugName(''); setRxIndication(null); setCustomIndication(''); setIndInput('');
    setIsTaperingMode(false); setTaperSteps([{ days: 3, dose: 1, unit: 'tab', time: null, periods: [0] }]);
    setRxDose(null); setRxSide(null); setRxFreq(null); setRxTime(null); setRxPeriod([]);  
    setRxWarnings([]); setCustomWarnings([]); setWarnInput('');
    setCDose(0); setCHour(0); setCApply(0); setCDays(0); setIsSmartOpen(false);
  };

  const clearAll = () => { resetFormOnly(); setCart([]); setDispenseState('input'); setIsFullscreen(false); setActiveGuide(null); if(synthRef.current) synthRef.current.cancel(); setIsSpeaking(false); };

  const showBoardingPass = () => {
    if (drugInput || rxIndication !== null || rxDose !== null || isTaperingMode) addToCart();
    setDispenseState('present'); setIsFullscreen(true); setIsSpeaking(false); setCurrentCardIndex(0);
    if(synthRef.current) synthRef.current.cancel(); 
  };

  const generateSpeechText = (rx: Prescription) => {
    if (!rx) return '';
    const p = dict[patientLang] as any;
    let parts = []; let drugText = rx.drugName ? `${p.drug_name} ${rx.drugName}.\n` : ''; let indText = '';
    if (rx.rxIndication !== null) indText = p.indication[rx.rxIndication] + '. ';
    if (rx.customIndication) indText = rx.customIndication + '. ';

    if (rx.isTapering) { parts.push('Complex Tapering Dosing.'); } else {
      if (rx.rxDose !== null) parts.push(p.dose[rx.rxDose]);
      if (Number(rx.cDose) > 0) parts.push(parseSmartText(p.smart_dose, rx.cDose, rx.cDoseUnit));
      if (rx.rxSide !== null) parts.push(p.side[rx.rxSide]);
      if (rx.rxFreq !== null) parts.push(p.freq[rx.rxFreq]);
      if (Number(rx.cHour) > 0) parts.push(parseSmartText(p.smart_hour, rx.cHour, rx.cHourUnit));
      if (Number(rx.cApply) > 0) parts.push(parseSmartText(p.smart_apply, rx.cApply, rx.cApplyUnit));
      if (rx.rxTime !== null) parts.push(p.time[rx.rxTime]); 
      if (rx.rxPeriod.length > 0) parts.push(rx.rxPeriod.map(i => p.period[i]).join(', '));
      if (Number(rx.cDays) > 0) parts.push(parseSmartText(p.smart_days, rx.cDays, rx.cDaysUnit));
    }
    let text = drugText + indText + (parts.length > 0 ? parts.join(' | ') + '.\n' : '');
    return text;
  };

  const generateWarningsSpeechText = (rx: Prescription) => {
    if (!rx) return '';
    const p = dict[patientLang] as any;
    let text = '';
    if (rx.rxWarnings.length > 0 || rx.customWarnings.length > 0) {
      text += p.warn_title + ':\n';
      rx.rxWarnings.forEach(w => text += p.warn[w] + '\n');
      rx.customWarnings.forEach(cw => text += cw + '\n');
    }
    text += p.allergy_alert + '\n';
    return text;
  };

  const p = dict[patientLang] as any;
  const th = dict.th as any;
  const isRTL = patientLang === 'ar';

  if (!hasStarted) {
    return (
      <div className="min-h-[100dvh] w-full bg-[#0f172a] flex flex-col items-center justify-center relative overflow-hidden font-sans">
        <div className={`absolute top-8 md:top-20 text-center z-20 transition-opacity duration-300 ${animatingLang ? 'opacity-0' : 'opacity-100'}`}>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-widest drop-shadow-md">Assistance Dispenser</h1>
          <p className="text-slate-400 mt-2 text-sm md:text-base font-bold tracking-widest uppercase">Tap to Select Patient Language</p>
          
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => setVoiceGender('female')} className={`px-6 py-3 rounded-full font-black text-sm md:text-base transition-all border-2 ${voiceGender === 'female' ? 'bg-pink-600 text-white border-pink-400 shadow-[0_0_15px_rgba(219,39,119,0.5)]' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'}`}>👩🏻 Female Voice</button>
            <button onClick={() => setVoiceGender('male')} className={`px-6 py-3 rounded-full font-black text-sm md:text-base transition-all border-2 ${voiceGender === 'male' ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'}`}>👨🏻 Male Voice</button>
          </div>
        </div>

        <div className="relative w-[320px] h-[320px] flex items-center justify-center mt-10 md:mt-20">
          <div className={`absolute w-full h-full rounded-full border-[4px] border-slate-800 transition-opacity duration-300 ${animatingLang ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`absolute text-slate-600 text-5xl animate-pulse transition-opacity duration-300 ${animatingLang ? 'opacity-0' : 'opacity-100'}`}>👆</div>
          {LANGUAGES.map((l, index) => {
            const rotation = index * 60; 
            const isAnimating = animatingLang === l.code;
            const isOther = animatingLang && animatingLang !== l.code;
            return (
              <button key={l.code} onClick={() => handleLangSelect(l.code, l.label)}
                className={`absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 flex flex-col items-center justify-center outline-none transition-all duration-[800ms] ease-[cubic-bezier(0.8,0,0.2,1)] ${isOther ? 'opacity-0 scale-0' : ''} ${isAnimating ? 'z-50' : 'z-10 hover:scale-110 cursor-pointer'}`}
                style={isAnimating ? { transform: 'translate(0px, 0px) scale(80)' } : { transform: `rotate(${rotation}deg) translateY(-160px)` }}
              >
                <div className={`flex flex-col items-center justify-center w-full h-full rounded-full transition-all duration-300 ${isAnimating ? 'bg-slate-50' : ''}`} style={{ transform: `rotate(${-rotation}deg)` }}>
                  <div className={`transition-all duration-[800ms] ${isAnimating ? 'text-[1px] opacity-0' : 'text-4xl'}`}>{l.flag}</div>
                  <span className={`mt-1 font-black text-[10px] md:text-xs bg-slate-900/80 px-2 py-0.5 rounded-md border text-slate-300 border-slate-700 transition-all duration-300 whitespace-nowrap ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>{l.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  let patientHeightClass = 'h-[25dvh] p-6'; 
  if (appMode === 'history' && activeQuestion) patientHeightClass = 'h-[75dvh] p-6'; 
  if (appMode === 'dispense' && dispenseState === 'input') patientHeightClass = 'h-[8dvh] p-2'; 
  if (appMode === 'dispense' && dispenseState === 'present') patientHeightClass = 'h-[100dvh]'; 

  // ==========================================
  // 🪄 Render ฟังก์ชัน: การ์ด Instant Guide (ยาเทคนิคพิเศษ)
  // ==========================================
  const renderGuideCard = (guide: any) => {
    return (
      <div className="w-full h-full lg:max-w-5xl bg-white lg:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border-0 lg:border-4 border-teal-200 relative" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="bg-gradient-to-r from-teal-700 to-emerald-900 p-4 md:p-6 text-center relative shrink-0 flex justify-between items-center shadow-inner pt-12 lg:pt-6">
          <span className="text-3xl opacity-30">🪄</span>
          <div className="flex flex-col items-center">
            <h1 className="text-white font-black text-base md:text-2xl tracking-widest uppercase leading-none">Bangkok Pattaya Hospital</h1>
            <p className="text-teal-200 text-base md:text-lg font-bold mt-1 tracking-widest">{p.spec_guide}</p>
          </div>
          <button onClick={() => speakGuide(guide)} className={`w-14 h-14 md:w-16 md:h-16 rounded-full text-2xl md:text-3xl shadow-lg flex items-center justify-center transition-all ${isSpeaking ? 'bg-white text-teal-600 animate-pulse' : 'bg-slate-800/50 text-white border border-white/20 hover:bg-slate-700'}`}>
            {isSpeaking ? '🛑' : '🔊'}
          </button>
        </div>

        <div className="bg-teal-50/30 flex flex-col lg:flex-row gap-4 flex-1 relative overflow-y-auto p-4 md:p-6 custom-scrollbar scroll-smooth">
          <div className="lg:flex-1 bg-gradient-to-r from-teal-100 to-emerald-100 border-2 border-teal-400 rounded-3xl p-5 flex items-center justify-center gap-4 shadow-sm text-center shrink-0">
            <span className="text-6xl md:text-7xl drop-shadow-md">{guide.icon}</span>
            <span className="text-teal-900 font-black text-3xl md:text-4xl leading-tight drop-shadow-sm">{guide.title[patientLang] || guide.title.en}</span>
          </div>
          <div className="flex flex-col lg:flex-1 lg:grid lg:grid-cols-2 gap-3 mt-3 lg:mt-0">
            {guide.steps.map((step: any, sIdx: number) => (
              <div key={sIdx} className="flex items-center gap-4 bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-teal-100/50">
                <div className="text-5xl md:text-6xl shrink-0 drop-shadow-sm">{step.icon}</div>
                <div className="flex flex-col leading-tight">
                  <span className="text-teal-500 text-xs md:text-sm font-black uppercase tracking-widest mb-1">Step {sIdx + 1}</span>
                  <span className="font-black text-2xl md:text-3xl text-slate-800">{step.desc[patientLang] || step.desc.en}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // 🎟️ Render Boarding Pass Component
  // ==========================================
  const renderBoardingPass = (rx: Prescription, index: number) => {
    const displayDrugEn = rx.drugInput.trim();
    const displayDrugLocal = rx.drugName && rx.drugName.toLowerCase() !== rx.drugInput.toLowerCase() ? rx.drugName : '';
    const totalW = rx.rxWarnings.length + rx.customWarnings.length;
    const warnPadding = totalW >= 5 ? 'p-2' : 'p-3 md:p-4'; 
    const warnGap = totalW >= 5 ? 'gap-1' : 'gap-2 md:gap-3';
    const warnTextSize = totalW >= 6 ? 'text-sm md:text-base' : totalW >= 4 ? 'text-base md:text-lg' : 'text-lg md:text-2xl';
    const warnIconSize = totalW >= 6 ? 'text-2xl md:text-3xl' : 'text-4xl md:text-5xl';

    let instCount = 0;
    if (rx.rxDose !== null || Number(rx.cDose) > 0) instCount++; if (rx.rxSide !== null) instCount++;
    if (rx.rxFreq !== null || Number(rx.cHour) > 0 || Number(rx.cApply) > 0) instCount++;
    if (rx.rxTime !== null || Number(rx.cDays) > 0) instCount++; if (rx.rxPeriod.length > 0) instCount++;
    const instPadding = instCount >= 4 ? 'p-3 md:p-4' : 'p-5 md:p-6'; const instGap = instCount >= 4 ? 'gap-2' : 'gap-3 md:gap-4';
    const instTextSize = instCount >= 4 ? 'text-lg md:text-xl' : 'text-xl md:text-3xl';

    return (
      <div key={index} data-index={index} className="drug-slide w-full h-full flex-shrink-0 snap-center overflow-x-hidden overflow-y-auto snap-y snap-mandatory hide-scrollbar transform-gpu pt-16 sm:pt-10" style={{ WebkitOverflowScrolling: 'touch' }} dir={isRTL ? 'rtl' : 'ltr'}>
        
        {/* 🔵 ใบที่ 1: วิธีใช้ยา (หน้าจอที่ 1) */}
        <div className="w-full h-full flex items-center justify-center p-4 sm:p-6 snap-center">
          <div className="w-full max-w-5xl h-full max-h-[850px] flex flex-col bg-white rounded-[2rem] shadow-2xl border-2 border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-3 md:p-4 text-center relative shadow-inner shrink-0 flex justify-between items-center">
              <span className="text-2xl opacity-20">🏥</span>
              <div className="flex flex-col items-center">
                <h1 className="text-white font-black text-lg md:text-2xl tracking-widest uppercase leading-none">Bangkok Pattaya Hospital</h1>
                <p className="text-blue-200 text-xs md:text-base font-bold mt-1 tracking-widest">{p.rx_title} {cart.length > 1 && `(${index + 1}/${cart.length})`}</p>
              </div>
              <button onClick={() => speakSpecificRx(rx)} className={`w-12 h-12 md:w-14 md:h-14 rounded-full text-lg md:text-xl shadow-md flex items-center justify-center transition-all ${isSpeaking ? 'bg-white text-blue-600 animate-pulse' : 'bg-blue-800 text-white border border-blue-600 hover:bg-blue-700'}`}>
                {isSpeaking ? '🛑' : '🔊'}
              </button>
            </div>

            <div className={`bg-blue-50/30 flex flex-col ${instGap} flex-1 relative overflow-y-auto custom-scrollbar p-3 md:p-6`}>
              {(displayDrugEn || displayDrugLocal) && (
                <div className="bg-gradient-to-r from-amber-100 to-yellow-200 border-2 border-yellow-400 rounded-[1.5rem] md:rounded-[2rem] py-4 md:py-6 flex flex-col items-center justify-center shadow-sm text-center relative shrink-0">
                  <span className="text-yellow-800 text-xs md:text-base font-black uppercase mb-1 tracking-widest relative z-10">💊 {p.drug_name}</span>
                  <div className="flex flex-col items-center justify-center w-full overflow-hidden px-2 gap-1 relative z-10">
                    {displayDrugLocal && <FittedText text={displayDrugLocal} isMain={true} />}
                    {displayDrugEn && <FittedText text={displayDrugLocal ? `(${displayDrugEn})` : displayDrugEn} isMain={!displayDrugLocal} />}
                  </div>
                </div>
              )}

              {(rx.rxIndication !== null || rx.customIndication) && (
                <div className="bg-blue-100/50 border-l-4 md:border-l-8 border-blue-400 rounded-r-2xl p-2 md:p-3 flex items-center gap-3 shadow-sm shrink-0">
                  <span className="text-2xl md:text-4xl shrink-0">🎯</span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-blue-500 text-xs md:text-sm uppercase font-black">{p.ind_title}</span>
                    <span className="text-blue-800 font-black text-lg md:text-3xl mt-1 line-clamp-2">{rx.rxIndication !== null ? p.indication[rx.rxIndication] : rx.customIndication}</span>
                  </div>
                </div>
              )}

              {rx.isTapering ? (
                <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col min-h-[150px]">
                  <div className="text-indigo-600 font-black text-base md:text-lg uppercase mb-1 text-center border-b pb-1">📉 {p.taper_mode}</div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                    <table className="w-full text-center border-collapse">
                      <thead>
                        <tr className="text-slate-400 text-xs md:text-base uppercase border-b-2 border-slate-100">
                          <th className="pb-1 text-left">💊 {p.dosage}</th>
                          <th className="pb-1">🍽️ {p.time_col}</th>
                          <th className="pb-1 text-right">🗓️ {p.duration}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rx.taperSteps.map((step, idx) => (
                          <tr key={idx} className="border-b border-slate-50 last:border-0">
                            <td className="py-2.5 font-black text-sm md:text-base text-blue-600 whitespace-nowrap text-left">{step.dose} {unitDict[step.unit][patientLang]}</td>
                            <td className="py-2.5 text-sm md:text-base leading-tight">
                               {step.time !== null && <div className="text-teal-600 font-bold mb-0.5">{p.time[step.time]}</div>}
                               <div className="text-orange-600 font-bold">{step.periods.map(i => `${p.period_icons[i]} ${p.period[i]}`).join(', ')}</div>
                            </td>
                            <td className="py-2.5 font-black text-sm md:text-base text-slate-700 whitespace-nowrap text-right">{step.days} {p.day}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className={`flex flex-col ${instGap} shrink-0`}>
                  {(rx.rxDose !== null || Number(rx.cDose) > 0 || rx.rxSide !== null) && (
                    <div className={`flex items-center gap-3 bg-white rounded-2xl border border-slate-100 shadow-sm ${instPadding}`}>
                      <span className="text-3xl md:text-4xl shrink-0">💊</span>
                      <div className={`flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3 font-black text-slate-800 ${instTextSize}`}>
                        {(rx.rxDose !== null || Number(rx.cDose) > 0) && <span>{rx.rxDose !== null ? p.dose[rx.rxDose] : parseSmartText(p.smart_dose, rx.cDose, rx.cDoseUnit)}</span>}
                        {rx.rxSide !== null && <span className="text-purple-600 bg-purple-50 px-3 py-1.5 rounded-xl border-2 border-purple-200 text-xs md:text-sm flex items-center gap-2">{p.side_icons[rx.rxSide]} {p.side[rx.rxSide]}</span>}
                      </div>
                    </div>
                  )}
                  
                  {(rx.rxFreq !== null || Number(rx.cHour) > 0 || Number(rx.cApply) > 0) && (
                    <div className={`flex items-center gap-3 bg-white rounded-2xl border border-slate-100 shadow-sm ${instPadding}`}>
                      <span className="text-3xl md:text-4xl shrink-0">🔄</span>
                      <span className={`font-black text-slate-800 ${instTextSize}`}>
                        {rx.rxFreq !== null && <div>{p.freq[rx.rxFreq]}</div>}
                        {Number(rx.cHour) > 0 && <div className="text-indigo-600">{parseSmartText(p.smart_hour, rx.cHour, rx.cHourUnit)}</div>}
                        {Number(rx.cApply) > 0 && <div className="text-indigo-600">{parseSmartText(p.smart_apply, rx.cApply, rx.cApplyUnit)}</div>}
                      </span>
                    </div>
                  )}

                  {(rx.rxTime !== null || Number(rx.cDays) > 0) && (
                    <div className={`flex items-center gap-3 bg-white rounded-2xl border border-slate-100 shadow-sm ${instPadding}`}>
                      <span className="text-3xl md:text-4xl shrink-0">🍽️</span>
                      <span className={`font-black text-slate-800 ${instTextSize}`}>
                        {rx.rxTime !== null && <div>{p.time[rx.rxTime]}</div>}
                        {Number(rx.cDays) > 0 && <div className="text-emerald-600 mt-1">{parseSmartText(p.smart_days, rx.cDays, rx.cDaysUnit)}</div>}
                      </span>
                    </div>
                  )}

                  {rx.rxPeriod.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 md:gap-2.5 mt-1.5">
                      {rx.rxPeriod.map((i: number) => (
                        <span key={i} className={`bg-orange-50 text-orange-600 px-4.5 py-2.5 rounded-xl font-black border-2 border-orange-200 shadow-sm ${instTextSize}`}>
                          {p.period_icons[i]} {p.period[i]}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className="shrink-0 text-center py-3 text-blue-500 font-bold animate-bounce text-sm sm:text-base mt-auto opacity-80">
                  {p.scroll_down}
              </div>
            </div>
          </div>
        </div>

        {/* 🔴 ใบที่ 2: คำเตือน (หน้าจอที่ 2) */}
        <div className="w-full h-full flex items-center justify-center p-4 sm:p-6 snap-center">
          <div className="w-full max-w-5xl h-full max-h-[850px] flex flex-col bg-white rounded-[2rem] shadow-2xl border-2 border-red-100 overflow-hidden">
            <div className="bg-gradient-to-r from-red-800 to-rose-900 p-3 md:p-4 text-center relative shadow-inner shrink-0 flex justify-between items-center">
              <span className="text-2xl opacity-20">⚠️</span>
              <div className="flex flex-col items-center">
                <h1 className="text-white font-black text-lg md:text-2xl tracking-widest uppercase leading-none">Bangkok Pattaya Hospital</h1>
                <p className="text-red-200 text-xs md:text-base font-bold mt-1 tracking-widest">{p.warn_title}</p>
              </div>
              <button onClick={() => speakSpecificWarnings(rx)} className={`w-12 h-12 md:w-14 md:h-14 rounded-full text-lg md:text-xl shadow-md flex items-center justify-center transition-all ${isSpeaking ? 'bg-white text-red-600 animate-pulse' : 'bg-red-800 text-white border border-red-600 hover:bg-red-700'}`}>
                {isSpeaking ? '🛑' : '🔊'}
              </button>
            </div>

            <div className={`bg-red-50/50 flex flex-col flex-1 overflow-y-auto custom-scrollbar justify-center p-3 md:p-6`}>
              <h3 className="text-red-600 font-black text-base md:text-lg uppercase tracking-widest mb-2 border-b-2 border-red-200 pb-2 shrink-0 text-center">⚠️ {p.warn_title}</h3>
              <div className={`flex-1 flex flex-col ${warnGap} justify-center overflow-y-auto min-h-[100px]`}>
                {(rx.rxWarnings.length > 0 || rx.customWarnings.length > 0) ? (
                  <>
                    {rx.rxWarnings.map((wIdx: number) => (
                      <div key={wIdx} className={`flex items-center bg-white rounded-2xl shadow-sm border border-red-100 w-full ${warnPadding} shrink-0`}>
                        <span className={`shrink-0 ${warnIconSize} mr-3`}>{th.warn_icons[wIdx]}</span>
                        <span className={`text-red-700 font-black leading-tight ${warnTextSize}`}>{p.warn[wIdx]}</span>
                      </div>
                    ))}
                    {rx.customWarnings.map((cw: string, i: number) => (
                      <div key={i} className={`flex items-center bg-red-100/50 rounded-2xl shadow-sm border border-red-200 w-full ${warnPadding} shrink-0`}>
                        <span className={`shrink-0 ${warnIconSize} mr-3`}>🚨</span>
                        <span className={`text-red-800 font-black leading-tight ${warnTextSize}`}>{cw}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-300 opacity-60"><span className="text-5xl mb-2">✅</span><span className="font-black text-sm">No special warnings</span></div>
                )}
              </div>
              <div className="mt-3 bg-red-600 text-white rounded-2xl p-4 flex items-center gap-3 shadow-md shrink-0">
                 <span className="text-3xl shrink-0">🛑</span><span className="font-black text-xs md:text-base leading-tight">{p.allergy_alert}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="h-[100dvh] w-full bg-[#0f172a] font-sans flex flex-col overflow-hidden relative">
      
      {/* 👑 ฝั่งคนไข้ (ตีลังกากลับหัว) */}
      <div className={`w-full flex justify-center items-center rotate-180 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]
        ${isFullscreen ? 'fixed inset-0 z-[100] bg-slate-900 h-full' : `bg-slate-100 ${patientHeightClass}`}`}>
        
        {activeGuide ? (
          <div className="w-full h-full flex flex-col relative" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="w-full shrink-0 flex items-center justify-end p-4 z-50 absolute top-0 left-0 pointer-events-none">
              <button onClick={() => { setIsFullscreen(false); setDispenseState('input'); setActiveGuide(null); if(synthRef.current) synthRef.current.cancel(); setIsSpeaking(false); }} className="bg-red-500 hover:bg-red-400 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full text-2xl font-black shadow-2xl flex items-center justify-center active:scale-95 border-2 border-red-300 pointer-events-auto">
                ✕
              </button>
            </div>
            <div className="flex-1 w-full h-full flex items-center justify-center p-4 pt-16 sm:pt-10">
               {renderGuideCard(activeGuide)}
            </div>
          </div>
        ) : dispenseState === 'present' ? (
          <div className="w-full h-full flex flex-col bg-slate-900 relative" dir={isRTL ? 'rtl' : 'ltr'}>
            
            {/* 📸 Top Bar แจ้งเตือน + นำทาง (Centered & Visible) */}
            <div className="w-full shrink-0 bg-slate-900 flex justify-between items-center p-4 pt-10 sm:pt-4 z-50">
               <div className="flex-1 flex justify-center pointer-events-none">
                  <div className="bg-blue-600 text-white font-black px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg border-2 border-blue-400 animate-pulse text-xs sm:text-lg flex items-center gap-2 pointer-events-auto">
                    <span className="text-lg sm:text-2xl">📸</span> <span className="hidden sm:inline">{p.photo_prompt}</span>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                 {cart.length > 1 && (
                   <div className="flex items-center gap-3 sm:gap-4 bg-slate-800 px-4 py-1.5 sm:py-2 rounded-full border border-slate-700">
                     <button onClick={() => scrollToCard(currentCardIndex - 1)} disabled={currentCardIndex === 0} className="text-white text-xl disabled:opacity-30 active:scale-90">◀</button>
                     <span className="text-white font-black text-sm sm:text-lg">{currentCardIndex + 1} / {cart.length}</span>
                     <button onClick={() => scrollToCard(currentCardIndex + 1)} disabled={currentCardIndex === cart.length - 1} className="text-white text-xl disabled:opacity-30 active:scale-90">▶</button>
                   </div>
                 )}
                 <button onClick={() => { setIsFullscreen(false); setDispenseState('input'); setActiveGuide(null); if(synthRef.current) synthRef.current.cancel(); setIsSpeaking(false); }} className="bg-red-500 hover:bg-red-400 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full text-xl font-black shadow-lg flex items-center justify-center active:scale-95 border-2 border-red-300">
                    ✕
                 </button>
               </div>
            </div>

            {/* 🚀 แกนปัดแนวนอน 60 FPS (Fit Screen & Centered) */}
            <div className="flex-1 w-full overflow-hidden relative">
               {cart.length > 1 && <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-slate-400 text-[10px] sm:text-sm font-bold uppercase tracking-widest animate-bounce z-50 pointer-events-none">{p.swipe_hint}</div>}
               <div id="horizontal-scroll-container" className="w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex hide-scrollbar scroll-smooth transform-gpu" style={{ WebkitOverflowScrolling: 'touch' }}>
                   {cart.length > 0 ? (
                     cart.map((rx, idx) => renderBoardingPass(rx, idx))
                   ) : (
                     renderBoardingPass({
                       drugInput, drugName, rxIndication, customIndication, isTapering: isTaperingMode, taperSteps,
                       rxDose, rxSide, rxFreq, rxTime, rxPeriod, rxWarnings, customWarnings,
                       cDose, cDoseUnit, cHour, cHourUnit, cApply, cApplyUnit, cDays, cDaysUnit
                     }, 0)
                   )}
               </div>
            </div>
          </div>
        ) : (
          <div dir={isRTL ? 'rtl' : 'ltr'} 
            className={`relative transition-all duration-500 flex flex-col w-full h-full bg-white rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden
            ${activeQuestion ? 'opacity-100 p-6 pt-16 sm:pt-10' : 'opacity-0'}`}>
            
            {appMode === 'history' && (
              <div className="text-center w-full flex flex-col h-full justify-center overflow-hidden pt-10 sm:pt-0">
                {activeQuestion === 'custom_msg' ? (
                  <div className="animate-in"><div className="text-6xl mb-6 bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-inner">💬</div><h2 className="text-3xl md:text-5xl font-black text-blue-600 mb-4 leading-snug">{translatedText}</h2></div>
                ) : (
                  <>
                    {(['q_dob', 'q_allergy', 'q_inj', 'q_med'].includes(activeQuestion as string)) && !boolAnswer && (
                      <div className="mb-4 text-blue-600 text-lg font-bold bg-blue-50 px-6 py-3 rounded-full animate-pulse self-center border border-blue-100 shadow-sm">{p.tap_to_select}</div>
                    )}
                    
                    {(!boolAnswer || !['q_allergy', 'q_inj', 'q_med'].includes(activeQuestion as string)) && (
                      <div className="animate-in relative">
                        <div className="text-6xl mb-4 bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-inner">
                          {activeQuestion === 'q_name' ? '👤' : activeQuestion === 'q_dob' ? '📅' : activeQuestion === 'q_allergy' ? '🚫' : activeQuestion === 'q_inj' ? '💉' : '💊'}
                        </div>
                        <div className="flex items-center justify-center gap-4 mb-4">
                           <h2 className="text-3xl md:text-5xl font-black text-slate-800">{activeQuestion ? p[activeQuestion] : ''}</h2>
                           {activeQuestion && (
                             <button onClick={toggleHistorySpeech} className={`w-14 h-14 rounded-full text-2xl shadow-md flex items-center justify-center border-2 transition-all active:scale-95 ${isSpeaking ? 'bg-blue-600 text-white border-blue-400 animate-pulse' : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'}`}>
                               {isSpeaking ? '🛑' : '🔊'}
                             </button>
                           )}
                        </div>
                      </div>
                    )}
                    
                    {activeQuestion === 'q_dob' && (
                      <div className="w-full max-w-md mx-auto mt-2 animate-in fade-in">
                        <div className="flex gap-4 justify-center w-full" dir="ltr">
                          <div className="flex flex-col items-center flex-1">
                            <div className="bg-slate-100 border-2 border-slate-200 rounded-2xl p-4 font-black text-slate-400 text-2xl w-full text-center shadow-inner">DD</div>
                            <span className="text-xs text-slate-500 font-bold mt-2 uppercase tracking-widest">Day</span>
                          </div>
                          <div className="flex flex-col items-center flex-1">
                            <div className="bg-slate-100 border-2 border-slate-200 rounded-2xl p-4 font-black text-slate-400 text-2xl w-full text-center shadow-inner">MM</div>
                            <span className="text-xs text-slate-500 font-bold mt-2 uppercase tracking-widest">Month</span>
                          </div>
                          <div className="flex flex-col items-center flex-[1.2]">
                            <div className="bg-blue-600 border-2 border-blue-500 rounded-2xl p-4 font-black text-white text-2xl w-full text-center shadow-[0_10px_20px_rgba(37,99,235,0.4)]">YYYY</div>
                            <span className="text-xs text-slate-500 font-bold mt-2 uppercase tracking-widest">Year</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {['q_allergy', 'q_inj', 'q_med'].includes(activeQuestion as string) && (
                      <div className="w-full max-w-2xl mx-auto mt-2">
                        {!boolAnswer ? (
                          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <button onClick={() => setBoolAnswer('yes')} className="flex-1 py-5 md:py-6 rounded-[2rem] text-2xl md:text-3xl font-black bg-red-50 text-red-600 border-2 border-red-200 active:scale-95 transition-transform shadow-sm">🚨 {p.yes}</button>
                            <button onClick={() => setBoolAnswer('no')} className="flex-1 py-5 md:py-6 rounded-[2rem] text-2xl md:text-3xl font-black bg-green-50 text-green-600 border-2 border-green-200 active:scale-95 transition-transform shadow-sm">✅ {p.no}</button>
                            {activeQuestion === 'q_allergy' && (
                              <button onClick={() => setBoolAnswer('dont_know')} className="flex-1 py-5 md:py-6 rounded-[2rem] text-2xl md:text-3xl font-black bg-yellow-50 text-yellow-700 border-2 border-yellow-300 active:scale-95 transition-transform shadow-sm">🤷‍♂️ {p.dont_know}</button>
                            )}
                          </div>
                        ) : boolAnswer === 'yes' ? (
                          (activeQuestion === 'q_allergy' || activeQuestion === 'q_med') ? (
                            <div className="bg-red-500 text-white rounded-[2rem] p-8 shadow-2xl flex flex-col items-center animate-in"><div className="text-6xl mb-4 bg-white/20 w-24 h-24 rounded-full flex items-center justify-center">📝</div><p className="text-2xl md:text-4xl font-black">{p.writePaper}</p></div>
                          ) : (
                            <div className="bg-blue-500 text-white rounded-[2rem] p-8 shadow-2xl font-black text-5xl animate-in">✅ OK!</div>
                          )
                        ) : boolAnswer === 'no' ? ( <div className="bg-green-500 text-white rounded-[2rem] p-8 shadow-2xl font-black text-5xl animate-in">✅ OK!</div>
                        ) : ( <div className="bg-yellow-500 text-white rounded-[2rem] p-8 shadow-2xl font-black text-5xl animate-in">⚠️ OK</div> )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 👨‍⚕️ ฝั่งเภสัชกร */}
      {!isFullscreen && (
        <div className="flex-1 bg-[#0f172a] rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] relative z-10 flex flex-col min-h-0 border-t border-slate-700/50 transition-all duration-700">
          
          <div className="flex justify-between items-center p-4 md:p-6 pb-2 shrink-0">
            <div className="flex bg-slate-800 rounded-xl p-1 border border-slate-700 shadow-inner">
              <button onClick={() => { setAppMode('history'); setDispenseState('input'); }} className={`px-4 py-2 md:py-3 rounded-lg text-sm md:text-base font-black transition-all ${appMode === 'history' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>{th.tab_history}</button>
              <button onClick={() => { setAppMode('dispense'); setActiveQuestion(null); setDispenseState('input'); }} className={`px-4 py-2 md:py-3 rounded-lg text-sm md:text-base font-black transition-all ${appMode === 'dispense' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>{th.tab_dispense}</button>
              <button onClick={() => { setAppMode('specialty'); setActiveQuestion(null); setDispenseState('input'); }} className={`px-4 py-2 md:py-3 rounded-lg text-sm md:text-base font-black transition-all ${appMode === 'specialty' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>{th.tab_special}</button>
            </div>
            
            <div className="flex gap-2">
              {appMode === 'dispense' && (
                <button onClick={clearAll} className="text-xs md:text-sm font-black text-white bg-red-900/40 px-4 py-2 md:py-3 rounded-xl border border-red-800 hover:bg-red-800 transition-colors animate-in fade-in">🗑️ เคลียร์ตะกร้า</button>
              )}
              <button onClick={() => { setHasStarted(false); setActiveQuestion(null); resetFormOnly(); }} className="text-xs md:text-sm font-black text-white bg-slate-800 px-4 py-2 md:py-3 rounded-xl border border-slate-700 hover:bg-slate-700 flex items-center gap-2">
                <span className="text-xl">{LANGUAGES.find(l => l.code === patientLang)?.flag}</span> <span className="hidden md:inline">{th.change_lang}</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 pt-0 custom-scrollbar relative">
            {appMode === 'history' && (
              <>
                {activeQuestion ? (
                  <div className="flex flex-col items-center justify-center h-full gap-5 animate-in">
                    <div className="text-cyan-400 font-bold text-xl md:text-2xl flex items-center gap-3">
                      <span className="text-4xl animate-pulse">🗣️</span> กำลังถาม: {th[activeQuestion as keyof typeof th]}
                      <button onClick={toggleHistorySpeech} className={`p-3 rounded-full text-2xl shadow-md flex items-center justify-center active:scale-95 transition-all border-2 ${isSpeaking ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse' : 'bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700'}`}>
                        {isSpeaking ? '🛑' : '🔊'}
                      </button>
                    </div>
                    <button onClick={() => { setActiveQuestion(null); setBoolAnswer(null); }} className="bg-red-600 hover:bg-red-500 text-white font-black py-4 px-10 rounded-full text-2xl shadow-lg active:scale-95 border-2 border-red-400 mt-4">
                      ❌ ปิดหน้าจอคำถาม
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 animate-in">
                    <div className="grid grid-cols-3 gap-4 w-full mt-4">
                      {[{ id: 'q_name', icon: '👤', text: th.q_name, bg: 'bg-cyan-600' }, { id: 'q_dob', icon: '📅', text: th.q_dob, bg: 'bg-blue-600' }, { id: 'q_allergy', icon: '🚫', text: th.q_allergy, bg: 'bg-red-600' }].map(q => (
                        <button key={q.id} onClick={() => askQuestion(q.id)} className={`flex flex-col items-center justify-center gap-3 p-4 rounded-3xl border-2 min-h-[140px] shadow-lg transition-all active:scale-95 ${activeQuestion === q.id ? `${q.bg} border-transparent text-white ring-4 ring-white/20` : `bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700`}`}>
                          <div className="text-5xl">{q.icon}</div><span className="font-black text-base">{q.text}</span>
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full mt-2">
                      {[{ id: 'q_inj', icon: '💉', text: th.q_inj, bg: 'bg-purple-600' }, { id: 'q_med', icon: '💊', text: th.q_med, bg: 'bg-pink-600' }].map(q => (
                        <button key={q.id} onClick={() => askQuestion(q.id)} className={`flex items-center justify-center gap-3 p-5 rounded-2xl border-2 shadow-md transition-all active:scale-95 ${activeQuestion === q.id ? `${q.bg} border-transparent text-white ring-4 ring-white/20` : `bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700`}`}>
                          <div className="text-3xl">{q.icon}</div><span className="font-black text-sm">{q.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {appMode === 'dispense' && dispenseState === 'input' && (
              <div className="flex flex-col gap-6 pb-[150px] md:pb-[100px] animate-in relative z-0">
                
                <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 p-4 md:p-5 rounded-[2rem] border border-blue-800/50 flex flex-col gap-4 shadow-inner">
                  <div className="flex flex-col gap-2">
                    <span className="text-blue-300 text-sm font-black uppercase tracking-widest flex items-center gap-2 relative z-10">💊 {th.drug_name}</span>
                    <div className="flex gap-3">
                      <input type="text" value={drugInput} onChange={(e) => setDrugInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && translateDrugName()} placeholder="พิมพ์ชื่อยา (เช่น Paracetamol)..." className="flex-1 bg-slate-900/80 border-2 border-slate-700 text-white placeholder-slate-500 text-base rounded-2xl px-5 py-3 outline-none focus:border-blue-500 font-bold transition-colors" />
                      <button onClick={translateDrugName} disabled={!drugInput.trim() || isTranslatingDrug} className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-black px-6 py-3 rounded-2xl active:scale-95 disabled:opacity-50 shadow-md">
                        {isTranslatingDrug ? '⏳' : 'ตกลง'}
                      </button>
                    </div>
                    {drugName && <span className="text-amber-400 text-sm font-black mt-1 ml-2">✨ ชื่อแปลบนตั๋ว: {drugName}</span>}
                  </div>

                  <div className="flex flex-col gap-2 border-t border-blue-800/30 pt-4 mt-1">
                    <span className="text-blue-300 text-sm font-black uppercase tracking-widest flex items-center gap-2">🎯 {th.ind_title}</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {th.indication.map((ind: string, i: number) => (
                        <button key={i} onClick={() => { setRxIndication(rxIndication === i ? null : i); setCustomIndication(''); }} className={`px-2 py-2 rounded-xl text-xs md:text-sm font-black border transition-all active:scale-95 flex items-center gap-1 ${rxIndication === i ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-500'}`}>
                          <span className="text-base">{th.ind_icons[i]}</span> {ind}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-2">
                      <input type="text" value={indInput} onChange={(e) => setIndInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && translateIndication()} placeholder="ระบุข้อบ่งใช้อื่นๆ (แปลอัตโนมัติ)..." className="flex-1 bg-slate-900/80 border-2 border-slate-700 text-white placeholder-slate-500 text-sm rounded-2xl px-5 py-3 outline-none focus:border-blue-500 transition-colors" />
                      <button onClick={translateIndication} disabled={!indInput.trim() || isTranslatingInd} className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-black px-6 py-3 rounded-2xl active:scale-95 disabled:opacity-50 shadow-md">แปล</button>
                    </div>
                    {customIndication && <span className="text-emerald-400 text-sm font-black mt-1 ml-2">✅ แปลแล้ว: {customIndication}</span>}
                  </div>
                </div>

                <div className="flex items-center justify-between bg-slate-800/50 p-3 rounded-2xl border border-slate-700">
                   <span className="text-indigo-400 font-black text-sm px-4">📉 {th.taper_mode}</span>
                   <button onClick={() => setIsTaperingMode(!isTaperingMode)} className={`w-14 h-8 rounded-full p-1 transition-colors ${isTaperingMode ? 'bg-indigo-600' : 'bg-slate-600'}`}>
                      <div className={`w-6 h-6 bg-white rounded-full transition-transform ${isTaperingMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                   </button>
                </div>

                {isTaperingMode ? (
                  <div className="bg-indigo-900/20 p-4 md:p-5 rounded-[2rem] border border-indigo-800/50 flex flex-col gap-4 shadow-inner">
                     <h3 className="text-indigo-400 text-sm md:text-base font-black uppercase tracking-widest text-center relative z-10">ระบบจัดการลดโดส / กินไม่เท่ากัน</h3>
                     {taperSteps.map((step, idx) => (
                       <div key={idx} className="bg-slate-900 p-4 rounded-2xl border border-slate-700 flex flex-col gap-3">
                         <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                            <span className="text-slate-400 font-black text-sm">Step {idx + 1}</span>
                            {taperSteps.length > 1 && <button onClick={() => setTaperSteps(taperSteps.filter((_, i) => i !== idx))} className="text-red-500 font-black text-sm">✕ ลบ</button>}
                         </div>
                         <div className="flex gap-3 items-center">
                            <div className="flex-1 flex flex-col gap-1">
                               <span className="text-xs md:text-sm text-slate-500 uppercase font-bold">ระยะเวลา (วัน)</span>
                               <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-600">
                                 <button onClick={() => { const ns = [...taperSteps]; ns[idx].days = Math.max(1, ns[idx].days-1); setTaperSteps(ns);}} className="w-8 h-8 bg-slate-700 text-white rounded font-black">-</button>
                                 <input type="text" value={step.days} onChange={(e) => { const val = e.target.value; if (/^\d*$/.test(val)) { const ns = [...taperSteps]; ns[idx].days = Number(val); setTaperSteps(ns); } }} className="flex-1 w-8 text-center font-black text-white bg-transparent outline-none focus:bg-slate-700 rounded text-sm" />
                                 <button onClick={() => { const ns = [...taperSteps]; ns[idx].days++; setTaperSteps(ns);}} className="w-8 h-8 bg-indigo-600 text-white rounded font-black">+</button>
                               </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                               <span className="text-xs md:text-sm text-slate-500 uppercase font-bold">ปริมาณ (เม็ด/แคป)</span>
                               <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-600">
                                 <button onClick={() => { const ns = [...taperSteps]; ns[idx].dose = Math.max(0.5, Number(ns[idx].dose)-0.5); setTaperSteps(ns);}} className="w-8 h-8 bg-slate-700 text-white rounded font-black">-</button>
                                 <input type="text" value={step.dose} onChange={(e) => { const val = e.target.value; if (/^\d*\.?\d*$/.test(val)) { const ns = [...taperSteps]; ns[idx].dose = val; setTaperSteps(ns); } }} className="flex-1 w-8 text-center font-black text-white bg-transparent outline-none focus:bg-slate-700 rounded text-sm" />
                                 <button onClick={() => { const ns = [...taperSteps]; ns[idx].dose = Number(ns[idx].dose) + 0.5; setTaperSteps(ns);}} className="w-8 h-8 bg-indigo-600 text-white rounded font-black">+</button>
                               </div>
                            </div>
                         </div>
                         <div className="flex flex-col gap-2 mt-2">
                            <span className="text-xs md:text-sm text-slate-500 uppercase font-bold">เวลาอาหาร</span>
                            <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                              {th.time.map((tFood: string, tIdx: number) => (
                                <button key={tIdx} onClick={() => { const ns = [...taperSteps]; ns[idx].time = ns[idx].time === tIdx ? null : tIdx; setTaperSteps(ns); }} className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-black border transition-all active:scale-95 ${step.time === tIdx ? 'bg-teal-600 border-teal-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>🍽️ {tFood}</button>
                              ))}
                            </div>
                         </div>
                         <div className="flex flex-col gap-2 mt-1">
                            <span className="text-xs md:text-sm text-slate-500 uppercase font-bold">ช่วงเวลา</span>
                            <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                              {th.period.map((pr: string, pIdx: number) => (
                                <button key={pIdx} onClick={() => { const ns = [...taperSteps]; if(ns[idx].periods.includes(pIdx)) ns[idx].periods = ns[idx].periods.filter(i => i !== pIdx); else ns[idx].periods.push(pIdx); ns[idx].periods.sort(); setTaperSteps(ns); }} className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-black border transition-all active:scale-95 ${step.periods.includes(pIdx) ? 'bg-orange-500 border-orange-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>{th.period_icons[pIdx]} {pr}</button>
                              ))}
                            </div>
                         </div>
                       </div>
                     ))}
                     <button onClick={() => setTaperSteps([...taperSteps, { days: 3, dose: 1, unit: 'tab', time: null, periods: [0] }])} className="border-2 border-dashed border-indigo-500/50 text-indigo-400 py-3 rounded-2xl font-black text-sm hover:bg-indigo-900/30 relative z-10">
                       ➕ เพิ่มช่วงเวลาใหม่ (Add Step)
                     </button>
                  </div>
                ) : (
                  <div className="bg-slate-800/40 p-4 md:p-5 rounded-[2rem] border border-slate-700 flex flex-col gap-4 shadow-inner">
                    <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar items-center">
                      <span className="text-slate-500 text-xs md:text-sm font-black uppercase w-14 shrink-0 relative z-10">ปริมาณ:</span>
                      {th.dose.map((item: string, i: number) => (
                        <button key={i} onClick={() => { setRxDose(rxDose === i ? null : i); setCDose(0); }} className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs md:text-sm font-black border transition-all active:scale-95 ${rxDose === i ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'}`}>
                          {i === 0 ? '🌗' : i > 4 ? (i > 6 ? '💧' : '💨') : '💊'} {item}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar items-center">
                      <span className="text-slate-500 text-xs md:text-sm font-black uppercase w-14 shrink-0 relative z-10">ข้าง:</span>
                      {th.side.map((item: string, i: number) => (
                        <button key={i} onClick={() => setRxSide(rxSide === i ? null : i)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs md:text-sm font-black border transition-all active:scale-95 ${rxSide === i ? 'bg-purple-600 border-purple-400 text-white shadow-lg' : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'}`}>
                          {th.side_icons[i]} {item}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar items-center">
                      <span className="text-slate-500 text-xs md:text-sm font-black uppercase w-14 shrink-0 relative z-10">ความถี่:</span>
                      {th.freq.map((item: string, i: number) => (
                        <button key={i} onClick={() => { setRxFreq(rxFreq === i ? null : i); setCHour(0); setCApply(0); }} className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs md:text-sm font-black border transition-all active:scale-95 ${rxFreq === i ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'}`}>
                          🔄 {item}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar items-center">
                      <span className="text-slate-500 text-xs md:text-sm font-black uppercase w-14 shrink-0 relative z-10">อาหาร:</span>
                      {th.time.map((item: string, i: number) => (
                        <button key={i} onClick={() => setRxTime(rxTime === i ? null : i)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs md:text-sm font-black border transition-all active:scale-95 ${rxTime === i ? 'bg-teal-600 border-teal-400 text-white shadow-lg' : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'}`}>
                          🍽️ {item}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar items-center">
                      <span className="text-slate-500 text-xs md:text-sm font-black uppercase w-14 shrink-0 relative z-10">เวลา:</span>
                      {th.period.map((pTime: string, i: number) => (
                        <button key={i} onClick={() => togglePeriod(i)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs md:text-sm font-black border transition-all active:scale-95 ${rxPeriod.includes(i) ? 'bg-orange-500 border-orange-400 text-white shadow-lg' : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'}`}>
                          {th.period_icons[i]} {pTime}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!isTaperingMode && (
                  <div className="bg-slate-800/40 p-4 rounded-[2rem] border border-slate-700 shadow-inner flex flex-col items-center transition-all duration-300">
                    <button onClick={() => setIsSmartOpen(!isSmartOpen)} className="w-full flex items-center justify-between text-slate-300 hover:text-white font-black uppercase tracking-widest text-sm outline-none relative z-10">
                      <span className="flex items-center gap-2">🔢 ระบบระบุตัวเลข (แปลอัตโนมัติ)</span>
                      <span className="text-2xl bg-slate-700/50 w-10 h-10 rounded-full flex items-center justify-center border border-slate-600 shadow-md transition-colors hover:bg-slate-600">{isSmartOpen ? '➖' : '➕'}</span>
                    </button>
                    
                    {isSmartOpen && (
                      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl mt-4 animate-in fade-in relative z-0">
                        {[
                          { label: 'ใช้ครั้งละ', val: cDose, setVal: setCDose, unit: cDoseUnit, setUnit: setCDoseUnit, step: 0.5, uOptions: ['tab', 'cap', 'tsp', 'tbsp', 'ml', 'cc', 'puff', 'drop'], icon: '💊', reset: () => setRxDose(null) },
                          { label: 'ทุกๆ', val: cHour, setVal: setCHour, unit: cHourUnit, setUnit: setCHourUnit, step: 1, uOptions: ['hr'], icon: '⏳', reset: () => setRxFreq(null) },
                          { label: 'ทาวันละ', val: cApply, setVal: setCApply, unit: cApplyUnit, setUnit: setCApplyUnit, step: 1, uOptions: ['times'], icon: '🧴', reset: () => setRxFreq(null) },
                          { label: 'ติดต่อกัน', val: cDays, setVal: setCDays, unit: cDaysUnit, setUnit: setCDaysUnit, step: 1, uOptions: ['day', 'wk'], icon: '🗓️', reset: () => {} }
                        ].map((input, idx) => (
                          <div key={idx} className="bg-slate-900 border-2 border-slate-700 rounded-2xl p-3 flex flex-col items-center gap-2 shadow-inner">
                            <span className="text-slate-300 text-sm md:text-base font-black flex items-center gap-2 relative z-10">{input.icon} {input.label}</span>
                            <div className="flex items-center gap-2 relative z-10">
                              <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-600 shadow-inner">
                                <button onClick={() => input.setVal(Math.max(0, Number(input.val) - input.step))} className="w-10 h-10 rounded-lg bg-slate-700 text-white font-black text-xl hover:bg-slate-600 active:scale-90">-</button>
                                <input type="text" value={input.val} onChange={(e) => handleNumberInput(input.setVal, e.target.value)} className="font-black text-2xl text-cyan-400 w-12 text-center bg-transparent outline-none focus:bg-slate-700 rounded transition-colors" />
                                <button onClick={() => { input.setVal(Number(input.val) + input.step); input.reset(); }} className="w-10 h-10 rounded-lg bg-cyan-700 text-white font-black text-xl hover:bg-cyan-600 active:scale-90">+</button>
                              </div>
                              <select value={input.unit} onChange={(e) => input.setUnit(e.target.value)} className="bg-slate-800 text-slate-300 border border-slate-600 text-sm md:text-base font-bold rounded-xl py-3 px-2 outline-none focus:border-cyan-500 cursor-pointer shadow-md">
                                {input.uOptions.map(u => <option key={u} value={u}>{unitDict[u].th}</option>)}
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-red-900/10 p-4 md:p-5 rounded-[2rem] border border-red-900/30 flex flex-col gap-4 shadow-inner relative z-0">
                  <span className="text-red-400 text-sm font-black uppercase tracking-widest flex items-center gap-2 relative z-10">⚠️ คำเตือน (Warnings)</span>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 relative z-10">
                    {th.warn.map((w: string, i: number) => (
                      <button key={i} onClick={() => toggleWarning(i)} className={`px-3 py-3 rounded-xl text-[10px] md:text-xs font-black border transition-all active:scale-95 flex items-center gap-2 shadow-sm ${rxWarnings.includes(i) ? 'bg-red-500 border-red-400 text-white shadow-lg' : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'}`}>
                        <span className="text-xl shrink-0">{th.warn_icons[i]}</span> <span className="text-left leading-tight line-clamp-2">{w}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3 border-t border-red-900/30 pt-4 mt-1 relative z-10">
                    <input type="text" value={warnInput} onChange={(e) => setWarnInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && translateWarning()} placeholder="พิมพ์คำเตือนพิเศษ (แปลอัตโนมัติ)..." className="flex-1 bg-slate-900/80 border-2 border-slate-700 text-white placeholder-slate-500 text-base rounded-2xl px-5 py-3 outline-none focus:border-red-500 font-bold transition-colors" />
                    <button onClick={translateWarning} disabled={!warnInput.trim() || isTranslatingWarn} className="bg-red-600 hover:bg-red-500 text-white text-sm font-black px-6 py-3 rounded-2xl active:scale-95 disabled:opacity-50 shadow-md">เพิ่ม</button>
                  </div>
                  {customWarnings.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 relative z-10">
                      {customWarnings.map((cw, i) => (
                        <div key={i} className="bg-red-500/20 text-red-200 border-2 border-red-500/50 text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-inner">
                          🚨 {cw} <button onClick={() => removeCustomWarning(i)} className="text-red-400 hover:text-red-300 ml-2 font-black text-xl leading-none transition-colors">&times;</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {appMode === 'specialty' && (
              <div className="flex flex-col gap-6 pb-24 animate-in relative z-0">
                <div className="bg-gradient-to-br from-teal-900/40 to-emerald-900/40 p-5 md:p-6 rounded-[2rem] border border-teal-800/50 shadow-inner">
                  <h2 className="text-teal-300 font-black text-xl md:text-2xl mb-4 flex items-center gap-2 relative z-10">🪄 เลือกอุปกรณ์เทคนิคพิเศษ เพื่อแสดงคู่มือให้คนไข้ทันที</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-0">
                    {specialData.map(item => (
                      <button key={item.id} onClick={() => { setActiveGuide(item); setIsFullscreen(true); }} className="bg-slate-800 border-2 border-slate-700 hover:border-teal-400 hover:bg-slate-700 rounded-2xl p-4 md:p-5 flex items-center gap-4 transition-all active:scale-95 text-left group shadow-lg">
                        <span className="text-4xl md:text-5xl group-hover:scale-110 transition-transform">{item.icon}</span>
                        <span className="text-slate-200 font-black text-base md:text-lg leading-tight relative z-10">{item.title.th}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* แถบ Sticky Bottom สำหรับ Cart */}
          {appMode === 'dispense' && dispenseState === 'input' && (
            <div className="absolute bottom-0 left-0 w-full p-4 bg-slate-900/95 backdrop-blur-md border-t border-slate-700 flex flex-col md:flex-row items-center gap-3 z-50 transform-gpu shadow-inner">
               <button onClick={addToCart} disabled={!drugInput && rxIndication === null} className="w-full md:w-auto bg-slate-800 border-2 border-slate-600 hover:border-cyan-500 text-white font-black px-6 py-4 md:py-5 rounded-2xl active:scale-95 disabled:opacity-30 transition-all flex items-center justify-center gap-2 shadow-lg">
                 {th.add_to_cart}
               </button>
               <button onClick={showBoardingPass} disabled={cart.length === 0 && !drugInput} className="flex-1 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-lg md:text-xl py-4 md:py-5 rounded-2xl shadow-xl active:scale-95 disabled:opacity-30 transition-all flex items-center justify-center gap-3 border-2 border-indigo-400/50">
                 🚀 โชว์การ์ดทั้งหมด {cart.length > 0 ? `(${cart.length} ${th.items})` : ''}
               </button>
            </div>
          )}

          {appMode === 'history' && !activeQuestion && (
            <div className="p-6 pt-4 border-t-2 border-slate-800 shrink-0 pb-safe bg-[#0f172a] animate-in relative z-50">
              <div className="flex gap-3 items-center">
                <input type="text" value={customText} onChange={(e) => setCustomText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleTranslate()} placeholder="พิมพ์สื่อสารทั่วไป (ภาษาไทย)..." className="flex-1 bg-slate-900 border-2 border-slate-700 text-white placeholder-slate-500 text-base md:text-lg rounded-2xl px-5 py-4 outline-none focus:border-cyan-500 transition-colors font-bold shadow-inner" />
                <button onClick={handleTranslate} disabled={!customText.trim() || isTranslating} className="bg-cyan-600 hover:bg-cyan-500 text-white font-black px-8 py-4 md:py-5 rounded-2xl active:scale-95 disabled:opacity-50 transition-all shadow-[0_5px_15px_rgba(8,145,178,0.4)] text-base md:text-lg border-2 border-cyan-400/50">ส่ง 💬</button>
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@700;900&display=swap');
        .font-arabic { font-family: 'Noto Sans Arabic', sans-serif !important; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 24px); }
        .animate-in { animation: popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-in { animation: fadeIn 0.3s ease-in-out forwards; }
        @keyframes popIn { from { opacity: 0; transform: translateY(15px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        select { -webkit-appearance: none; -moz-appearance: none; appearance: none; background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>"); background-repeat: no-repeat; background-position-x: 95%; background-position-y: 50%; }
      `}</style>
    </div>
  );
}
