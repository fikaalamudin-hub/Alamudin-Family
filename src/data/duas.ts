import { DuaItem } from '../types';

export const DUAS_DATA: DuaItem[] = [
  // Dzikir & Doa Setelah Sholat Fardhu (Berurutan)
  {
    id: 'istighfar',
    category: 'setelah-sholat',
    order: 1,
    title: 'Istighfar Setelah Sholat (3x)',
    subtitle: 'Dibaca tiga kali tepat setelah salam',
    arabic: 'أَسْتَغْفِرُ اللهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
    latin: 'Astaghfirullāhal-‘azhīmal-ladzī lā ilāha illā huwal-hayyul-qayyūmu wa atūbu ilaih.',
    translation:
      'Aku memohon ampun kepada Allah Yang Maha Agung, yang tiada Tuhan selain Dia, Yang Maha Hidup lagi Maha Berdiri Sendiri, dan aku bertaubat kepada-Nya.',
    reference: 'HR. Muslim no. 591 & Abu Dawud',
    targetCount: 3,
  },
  {
    id: 'allahumma-antas-salam',
    category: 'setelah-sholat',
    order: 2,
    title: 'Doa Keselamatan & Kedamaian',
    subtitle: 'Memohon keberkahan dan kesejahteraan dari Allah',
    arabic: 'اَللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    latin: 'Allāhumma antas-salām, wa minkas-salām, tabārakta yā dzal-jalāli wal-ikrām.',
    translation:
      'Ya Allah, Engkaulah Maha Pemberi Kedamaian dan dari-Mu lah segala kedamaian. Maha Suci Engkau, wahai Tuhan Pemilik Keagungan dan Kemuliaan.',
    reference: 'HR. Muslim no. 591',
    targetCount: 1,
  },
  {
    id: 'dzikir-tauhid',
    category: 'setelah-sholat',
    order: 3,
    title: 'Kalimat Tauhid & Ketauhidan',
    subtitle: 'Meneguhkan keyakinan hati setelah sholat',
    arabic:
      'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اَللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ وَلَا مُعْطِيَ لِمَا مَنَعْتَ وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ',
    latin:
      'Lā ilāha illallāhu wahdahū lā syarīka lah, lahul-mulku wa lahul-hamdu wa huwa ‘alā kulli syai’in qadīr. Allāhumma lā māni‘a limā a‘thaita wa lā mu‘thiya limā mana‘ta wa lā yanfa‘u dzal-jaddi minkal-jadd.',
    translation:
      'Tiada Tuhan selain Allah semata, tiada sekutu bagi-Nya. Bagi-Nya segala kerajaan dan bagi-Nya segala pujian, dan Dia Maha Kuasa atas segala sesuatu. Ya Allah, tidak ada yang dapat mencegah apa yang Engkau berikan, dan tidak ada yang dapat memberi apa yang Engkau cegah. Tidak bermanfaat kekayaan atau kemuliaan bagi pemiliknya di hadapan-Mu.',
    reference: 'HR. Bukhari & Muslim',
    targetCount: 1,
  },
  {
    id: 'ayat-kursi',
    category: 'setelah-sholat',
    order: 4,
    title: 'Ayat Kursi (QS. Al-Baqarah: 255)',
    subtitle: 'Dibaca setiap selesai sholat fardhu',
    arabic:
      'اَللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    latin:
      'Allāhu lā ilāha illā huwal-hayyul-qayyūm, lā ta’khudzuhū sinatuw wa lā naum, lahū mā fis-samāwāti wa mā fil-ardh, man dzal-ladzī yasyfa‘u ‘indahū illā bi’idznih, ya‘lamu mā baina aidīhim wa mā khalfahum, wa lā yuhīthūna bisyai’im min ‘ilmihī illā bimā syā’, wasi‘a kursiyyuhus-samāwāti wal-ardh, wa lā ya’ūduhū hifzhuhumā, wa huwal-‘aliyyul-‘azhīm.',
    translation:
      'Allah, tidak ada Tuhan selain Dia. Yang Maha Hidup, yang terus menerus mengurus makhluk-Nya, tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa yang di hadapan mereka dan apa yang di belakang mereka, dan mereka tidak mengetahui sesuatu apa pun tentang ilmu-Nya melainkan apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi. Dan Dia tidak merasa berat memelihara keduanya, dan Dia Maha Tinggi, Maha Besar.',
    reference: 'QS. Al-Baqarah: 255 · HR. An-Nasa’i',
    targetCount: 1,
  },
  {
    id: 'tasbih-33',
    category: 'setelah-sholat',
    order: 5,
    title: 'Tasbih (33x)',
    subtitle: 'Menyucikan Allah Yang Maha Tinggi',
    arabic: 'سُبْحَانَ اللهِ',
    latin: 'Subhānallāh',
    translation: 'Maha Suci Allah.',
    reference: 'HR. Muslim no. 597',
    targetCount: 33,
  },
  {
    id: 'tahmid-33',
    category: 'setelah-sholat',
    order: 6,
    title: 'Tahmid (33x)',
    subtitle: 'Memuji segala karunia dan nikmat Allah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    latin: 'Alhamdulillāh',
    translation: 'Segala puji bagi Allah.',
    reference: 'HR. Muslim no. 597',
    targetCount: 33,
  },
  {
    id: 'takbir-33',
    category: 'setelah-sholat',
    order: 7,
    title: 'Takbir (33x)',
    subtitle: 'Mengagungkan kebesaran Allah',
    arabic: 'اَللَّهُ أَكْبَرُ',
    latin: 'Allāhu Akbar',
    translation: 'Allah Maha Besar.',
    reference: 'HR. Muslim no. 597',
    targetCount: 33,
  },
  {
    id: 'doa-penutup-sholat',
    category: 'setelah-sholat',
    order: 8,
    title: 'Tahlil Penggenap 100 & Doa Penutup Sholat',
    subtitle: 'Penggenap dzikir 33x dan doa memohon pertolongan dalam ibadah',
    arabic:
      'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. اَللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    latin:
      'Lā ilāha illallāhu wahdahū lā syarīka lah, lahul-mulku wa lahul-hamdu wa huwa ‘alā kulli syai’in qadīr. Allāhumma a‘innī ‘alā dzikrika wa syukrika wa husni ‘ibādatik.',
    translation:
      'Tiada Tuhan selain Allah semata, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan pujian, dan Dia Maha Kuasa atas segala sesuatu. Ya Allah, tolonglah aku untuk senantiasa mengingat-Mu, bersyukur kepada-Mu, dan beribadah dengan baik kepada-Mu.',
    reference: 'HR. Muslim no. 597 & Abu Dawud no. 1522',
    targetCount: 1,
  },

  // Doa Harian Keluarga
  {
    id: 'doa-orang-tua',
    category: 'doa-harian',
    title: 'Doa untuk Kedua Orang Tua',
    subtitle: 'Diamalkan anak dan seluruh keluarga setiap hari',
    arabic: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    latin: 'Rabbighfirlī wa liwālidayya warhamhumā kamā rabbayānī shaghīrā.',
    translation:
      'Ya Tuhanku, ampunilah dosaku dan dosa kedua orang tuaku, serta sayangilah mereka berdua sebagaimana mereka telah mendidikku di waktu kecil.',
    reference: 'QS. Al-Isra: 24 & Nuh: 28',
    targetCount: 1,
  },
  {
    id: 'doa-sebelum-tidur',
    category: 'doa-harian',
    title: 'Doa Sebelum Tidur',
    subtitle: 'Dibaca menjelang beristirahat di malam hari',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    latin: 'Bismikallāhumma amūtu wa ahyā.',
    translation: 'Dengan menyebut nama-Mu ya Allah, aku mati (tidur) dan dengan nama-Mu pula aku hidup (bangun).',
    reference: 'HR. Bukhari no. 6324',
    targetCount: 1,
  },
  {
    id: 'doa-bangun-tidur',
    category: 'doa-harian',
    title: 'Doa Bangun Tidur',
    subtitle: 'Mengawali pagi dengan rasa syukur',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    latin: 'Alhamdulillāhil-ladzī ahyānā ba‘da mā amātanā wa ilaihin-nusyūr.',
    translation:
      'Segala puji bagi Allah yang telah menghidupkan kami kembali setelah mematikan (menidurkan) kami, dan hanya kepada-Nya kami kembali.',
    reference: 'HR. Bukhari no. 6312',
    targetCount: 1,
  },
  {
    id: 'doa-sapu-jagat',
    category: 'doa-harian',
    title: 'Doa Kebaikan Dunia & Akhirat',
    subtitle: 'Doa yang paling sering dipanjatkan Rasulullah SAW',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: 'Rabbanā ātinā fid-dunyā hasanah, wa fil-ākhirati hasanah, wa qinā ‘adzāban-nār.',
    translation:
      'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.',
    reference: 'QS. Al-Baqarah: 201',
    targetCount: 1,
  },
  {
    id: 'doa-keluar-rumah',
    category: 'doa-harian',
    title: 'Doa Keluar Rumah',
    subtitle: 'Memohon perlindungan saat berangkat sekolah atau bekerja',
    arabic: 'بِسْمِ اللهِ تَوَكَّلْتُ عَلَى اللهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ',
    latin: 'Bismillāhi tawakkaltu ‘alallāh, lā haula wa lā quwwata illā billāh.',
    translation:
      'Dengan menyebut nama Allah, aku bertawakal kepada Allah. Tiada daya dan upaya melainkan dengan pertolongan Allah.',
    reference: 'HR. Abu Dawud no. 5095 & Tirmidzi',
    targetCount: 1,
  },
  {
    id: 'doa-keluarga-sakinah',
    category: 'doa-harian',
    title: 'Doa Keluarga Sakinah & Anak Sholeh',
    subtitle: 'Memohon pasangan dan keturunan yang menyejukkan hati',
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    latin: 'Rabbanā hab lanā min azwājinā wa dzurriyyātinā qurrata a‘yuniw waj‘alnā lil-muttaqīna imāmā.',
    translation:
      'Ya Tuhan kami, anugerahkanlah kepada kami pasangan kami dan keturunan kami sebagai penyenang hati kami, dan jadikanlah kami pemimpin bagi orang-orang yang bertakwa.',
    reference: 'QS. Al-Furqan: 74',
    targetCount: 1,
  },
];
