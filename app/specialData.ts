// specialData.ts

export type LocalizedText = {
  th: string; en: string; de: string; zh: string; ja: string; ru: string; ar: string;
};

export type SpecialtyStep = {
  icon: string;
  desc: LocalizedText;
};

export type SpecialtyItem = {
  id: string;
  icon: string;
  title: LocalizedText;
  defaultUnit: string; // บังคับหน่วยให้เลย เช่น 'puff' หรือ 'drop'
  customWarning?: LocalizedText; // คำเตือนพิเศษที่จะแถมไปให้อัตโนมัติ
  steps: SpecialtyStep[];
};

export const specialData: SpecialtyItem[] = [
  {
    id: 'mdi',
    icon: '💨',
    title: { th: 'ยาพ่นสูด (MDI Inhaler)', en: 'MDI Inhaler', de: 'Dosieraerosol', zh: '定量吸入器 (MDI)', ja: 'MDI 吸入器', ru: 'Дозированный ингалятор', ar: 'جهاز الاستنشاق بالجرعات' },
    defaultUnit: 'puff',
    customWarning: { th: 'บ้วนปากหลังใช้ทุกครั้ง', en: 'Rinse mouth after every use', de: 'Nach jedem Gebrauch Mund ausspülen', zh: '每次使用后请漱口', ja: '使用後は毎回うがいをしてください', ru: 'Полоскать рот после каждого использования', ar: 'اشطف فمك بعد كل استخدام' },
    steps: [
      { icon: '🪇', desc: { th: 'เขย่าขวด 3-5 ครั้ง', en: 'Shake well 3-5 times', de: '3-5 mal gut schütteln', zh: '用力摇匀 3-5 次', ja: '3〜5回よく振る', ru: 'Хорошо встряхнуть 3-5 раз', ar: 'رج جيدا 3-5 مرات' } },
      { icon: '😮‍💨', desc: { th: 'หายใจออกให้สุด', en: 'Breathe out completely', de: 'Vollständig ausatmen', zh: '完全呼气', ja: '完全に息を吐く', ru: 'Полностью выдохните', ar: 'الزفير تماما' } },
      { icon: '🌬️', desc: { th: 'อมปากกระบอก กดพร้อมสูดเข้าลึกๆ', en: 'Press and inhale deeply', de: 'Drücken und tief einatmen', zh: '按下并深吸气', ja: '押して深く吸い込む', ru: 'Нажмите и глубоко вдохните', ar: 'اضغط واستنشق بعمق' } },
      { icon: '⏳', desc: { th: 'กลั้นหายใจ 10 วินาที', en: 'Hold breath for 10 seconds', de: 'Atem 10 Sekunden anhalten', zh: '屏住呼吸 10 秒', ja: '10秒間息を止める', ru: 'Задержите дыхание на 10 сек', ar: 'حبس الأنفاس لمدة 10 ثوان' } },
    ]
  },
  {
    id: 'accuhaler',
    icon: '🕹️',
    title: { th: 'ยาพ่นผงแห้ง (Accuhaler)', en: 'Accuhaler / Diskus', de: 'Pulverinhalator', zh: '干粉吸入剂 (Accuhaler)', ja: 'アキュヘラー', ru: 'Порошковый ингалятор (Accuhaler)', ar: 'جهاز الاستنشاق الجاف' },
    defaultUnit: 'puff',
    customWarning: { th: 'บ้วนปากหลังใช้ทุกครั้ง', en: 'Rinse mouth after every use', de: 'Nach jedem Gebrauch Mund ausspülen', zh: '每次使用后请漱口', ja: '使用後は毎回うがいをしてください', ru: 'Полоскать рот после каждого использования', ar: 'اشطف فمك بعد كل استخدام' },
    steps: [
      { icon: '🔓', desc: { th: 'เลื่อนเปิดและดันคันโยกจนดังกริ๊ก', en: 'Slide open & push lever until click', de: 'Aufschieben & Hebel bis zum Klick drücken', zh: '滑开并推动控制杆直到咔哒声', ja: 'スライドさせて開き、カチッと鳴るまでレバーを押す', ru: 'Сдвиньте и нажмите рычаг до щелчка', ar: 'افتح الشريحة وادفع الرافعة حتى تنقر' } },
      { icon: '😮‍💨', desc: { th: 'หายใจออกให้สุด (ห้ามเป่าใส่เครื่อง)', en: 'Breathe out (do not blow into device)', de: 'Ausatmen (nicht ins Gerät blasen)', zh: '呼气（不要吹入设备）', ja: '息を吐く（デバイスに吹き込まない）', ru: 'Выдохните (не дуйте в устройство)', ar: 'تزفر (لا تنفخ في الجهاز)' } },
      { icon: '🌬️', desc: { th: 'อมปากกระบอก สูดเข้าแรงและลึก', en: 'Inhale deeply and forcefully', de: 'Tief und kräftig einatmen', zh: '用力深吸气', ja: '深く力強く吸い込む', ru: 'Вдохните глубоко и с силой', ar: 'يستنشق بعمق وبقوة' } },
      { icon: '🔒', desc: { th: 'กลั้นหายใจ 10 วิ แล้วเลื่อนปิด', en: 'Hold breath 10s, then slide to close', de: 'Atem 10s anhalten, dann zuschieben', zh: '屏住呼吸10秒，然后滑动关闭', ja: '10秒間息を止め、スライドして閉じる', ru: 'Задержите дыхание 10с, затем закройте', ar: 'احبس أنفاسك 10 ثوانٍ ثم اغلق' } },
    ]
  },
  {
    id: 'eye_drops',
    icon: '👁️',
    title: { th: 'ยาหยอดตา (Eye Drops)', en: 'Eye Drops', de: 'Augentropfen', zh: '滴眼液', ja: '点眼薬', ru: 'Глазные капли', ar: 'قطرات العين' },
    defaultUnit: 'drop',
    steps: [
      { icon: '🧼', desc: { th: 'ล้างมือให้สะอาดก่อนใช้', en: 'Wash hands thoroughly before use', de: 'Vor Gebrauch Hände waschen', zh: '使用前彻底洗手', ja: '使用前に手をよく洗う', ru: 'Тщательно вымойте руки перед использованием', ar: 'اغسل يديك جيدا قبل الاستخدام' } },
      { icon: '🙄', desc: { th: 'แหงนหน้าขึ้น ดึงเปลือกตาล่างลง', en: 'Tilt head back, pull lower eyelid down', de: 'Kopf zurück, unteres Lid nach unten ziehen', zh: '仰起头，向下拉下眼睑', ja: '頭を後ろに傾け、下まぶたを引く', ru: 'Наклоните голову, оттяните нижнее веко', ar: 'قم بإمالة الرأس للخلف واسحب الجفن السفلي' } },
      { icon: '💧', desc: { th: 'หยอด 1 หยด (ห้ามปลายโดนตา)', en: 'Apply 1 drop (do not touch eye)', de: '1 Tropfen (Auge nicht berühren)', zh: '滴 1 滴（管口勿接触眼睛）', ja: '1滴点眼（先端が目に触れないように）', ru: 'Капните 1 каплю (не касаясь глаза)', ar: 'ضع قطرة واحدة (لا تلمس العين)' } },
      { icon: '😌', desc: { th: 'หลับตาเบาๆ 1-2 นาที', en: 'Close eye gently for 1-2 mins', de: 'Auge sanft 1-2 Min schließen', zh: '轻轻闭眼 1-2 分钟', ja: '1〜2分間優しく目を閉じる', ru: 'Мягко закройте глаз на 1-2 мин', ar: 'أغلق العين بلطف لمدة 1-2 دقيقة' } },
    ]
  }
];