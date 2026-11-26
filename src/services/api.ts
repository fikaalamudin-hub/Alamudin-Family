import { AyahItem, CityOption, PrayerSchedule, SurahDetail, SurahSummary } from '../types';
import { SURAH_LIST_FALLBACK } from '../data/surahFallback';

const OFFLINE_AYAH_SAMPLES: Record<number, AyahItem[]> = {
  1: [
    {
      nomorAyat: 1,
      teksArab: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ',
      teksLatin: 'Bismillāhir-raḥmānir-raḥīm(i).',
      teksIndonesia: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
    },
    {
      nomorAyat: 2,
      teksArab: 'اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ',
      teksLatin: 'Al-ḥamdu lillāhi rabbil-‘ālamīn(a).',
      teksIndonesia: 'Segala puji bagi Allah, Tuhan seluruh alam,',
    },
    {
      nomorAyat: 3,
      teksArab: 'الرَّحْمٰنِ الرَّحِيْمِۙ',
      teksLatin: 'Ar-raḥmānir-raḥīm(i).',
      teksIndonesia: 'Yang Maha Pengasih, Maha Penyayang,',
    },
    {
      nomorAyat: 4,
      teksArab: 'مٰلِكِ يَوْمِ الدِّيْنِۗ',
      teksLatin: 'Māliki yaumid-dīn(i).',
      teksIndonesia: 'Pemilik hari pembalasan.',
    },
    {
      nomorAyat: 5,
      teksArab: 'اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِيْنُۗ',
      teksLatin: 'Iyyāka na‘budu wa iyyāka nasta‘īn(u).',
      teksIndonesia: 'Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan.',
    },
    {
      nomorAyat: 6,
      teksArab: 'اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَۙ',
      teksLatin: 'Ihdinaṣ-ṣirāṭal-mustaqīm(a).',
      teksIndonesia: 'Tunjukilah kami jalan yang lurus,',
    },
    {
      nomorAyat: 7,
      teksArab: 'صِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ ەۙ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّاۤلِّيْنَ',
      teksLatin: 'Ṣirāṭal-lażīna an‘amta ‘alaihim gairil-magḍūbi ‘alaihim wa laḍ-ḍāllīn(a).',
      teksIndonesia: '(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.',
    },
  ],
  112: [
    {
      nomorAyat: 1,
      teksArab: 'قُلْ هُوَ اللّٰهُ اَحَدٌۚ',
      teksLatin: 'Qul huwallāhu aḥad(un).',
      teksIndonesia: 'Katakanlah (Nabi Muhammad), “Dialah Allah, Yang Maha Esa.',
    },
    {
      nomorAyat: 2,
      teksArab: 'اَللّٰهُ الصَّمَدُۚ',
      teksLatin: 'Allāhuṣ-ṣamad(u).',
      teksIndonesia: 'Allah tempat meminta segala sesuatu.',
    },
    {
      nomorAyat: 3,
      teksArab: 'لَمْ يَلِدْ وَلَمْ يُوْلَدْۙ',
      teksLatin: 'Lam yalid wa lam yūlad.',
      teksIndonesia: '(Allah) tidak beranak dan tidak pula diperanakkan.',
    },
    {
      nomorAyat: 4,
      teksArab: 'وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ',
      teksLatin: 'Wa lam yakul lahū kufuwan aḥad(un).',
      teksIndonesia: 'Dan tidak ada sesuatu yang setara dengan Dia.”',
    },
  ],
  113: [
    {
      nomorAyat: 1,
      teksArab: 'قُلْ اَعُوْذُ بِرَبِّ الْفَلَقِۙ',
      teksLatin: 'Qul a‘ūżu birabbil-falaq(i).',
      teksIndonesia: 'Katakanlah (Nabi Muhammad), “Aku berlindung kepada Tuhan yang (menjaga) fajar (subuh),',
    },
    {
      nomorAyat: 2,
      teksArab: 'مِنْ شَرِّ مَا خَلَقَۙ',
      teksLatin: 'Min syarri mā khalaq(a).',
      teksIndonesia: 'dari kejahatan (makhluk yang) Dia ciptakan,',
    },
    {
      nomorAyat: 3,
      teksArab: 'وَمِنْ شَرِّ غَاسِقٍ اِذَا وَقَبَۙ',
      teksLatin: 'Wa min syarri gāsiqin iżā waqab(a).',
      teksIndonesia: 'dari kejahatan malam apabila telah gelap gulita,',
    },
    {
      nomorAyat: 4,
      teksArab: 'وَمِنْ شَرِّ النَّفّٰثٰتِ فِى الْعُقَدِۙ',
      teksLatin: 'Wa min syarrin-naffāṡāti fil-‘uqad(i).',
      teksIndonesia: 'dari kejahatan perempuan-perempuan (penyihir) yang meniup pada buhul-buhul (talinya),',
    },
    {
      nomorAyat: 5,
      teksArab: 'وَمِنْ شَرِّ حَاسِدٍ اِذَا حَسَدَ',
      teksLatin: 'Wa min syarri ḥāsidin iżā ḥasad(a).',
      teksIndonesia: 'dan dari kejahatan orang yang dengki apabila dia dengki.”',
    },
  ],
  114: [
    {
      nomorAyat: 1,
      teksArab: 'قُلْ اَعُوْذُ بِرَبِّ النَّاسِۙ',
      teksLatin: 'Qul a‘ūżu birabbin-nās(i).',
      teksIndonesia: 'Katakanlah (Nabi Muhammad), “Aku berlindung kepada Tuhan manusia,',
    },
    {
      nomorAyat: 2,
      teksArab: 'مَلِكِ النَّاسِۙ',
      teksLatin: 'Malikin-nās(i).',
      teksIndonesia: 'raja manusia,',
    },
    {
      nomorAyat: 3,
      teksArab: 'اِلٰهِ النَّاسِۙ',
      teksLatin: 'Ilāhin-nās(i).',
      teksIndonesia: 'sembahan manusia',
    },
    {
      nomorAyat: 4,
      teksArab: 'مِنْ شَرِّ الْوَسْوَاسِ ەۙ الْخَنَّاسِۖ',
      teksLatin: 'Min syarril-waswāsil-khannās(i).',
      teksIndonesia: 'dari kejahatan (setan) pembisik yang bersembunyi',
    },
    {
      nomorAyat: 5,
      teksArab: 'الَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِۙ',
      teksLatin: 'Allażī yuwaswisu fī ṣudūrin-nās(i).',
      teksIndonesia: 'yang membisikkan (kejahatan) ke dalam dada manusia,',
    },
    {
      nomorAyat: 6,
      teksArab: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
      teksLatin: 'Minal jinnati wan-nās(i).',
      teksIndonesia: 'dari (golongan) jin dan manusia.”',
    },
  ],
};

function addMinutes(timeStr: string, minutesToAdd: number): string {
  const [hStr, mStr] = timeStr.split(':');
  const total = (Number(hStr) || 0) * 60 + (Number(mStr) || 0) + minutesToAdd;
  const normalized = ((total % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export async function fetchPrayerTimesForCity(
  city: CityOption
): Promise<{ schedule: PrayerSchedule; source: 'aladhan' | 'offline' }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    // Method 20 = Kemenag RI (Kementerian Agama Republik Indonesia)
    const url = `https://api.aladhan.com/v1/timings?latitude=${city.lat}&longitude=${city.lng}&method=20`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error('Aladhan fetch failed');
    }

    const json = await res.json();
    const timings = json?.data?.timings;
    if (!timings?.Fajr) {
      throw new Error('Invalid timings payload');
    }

    const clean = (v: string) => v.split(' ')[0];
    const fajr = clean(timings.Fajr);
    const sunrise = clean(timings.Sunrise);
    const imsak = timings.Imsak ? clean(timings.Imsak) : addMinutes(fajr, -10);
    const dhuha = addMinutes(sunrise, 28);

    return {
      schedule: {
        Imsak: imsak,
        Subuh: fajr,
        Terbit: sunrise,
        Dhuha: dhuha,
        Dzuhur: clean(timings.Dhuhr),
        Ashar: clean(timings.Asr),
        Maghrib: clean(timings.Maghrib),
        Isya: clean(timings.Isha),
      },
      source: 'aladhan',
    };
  } catch {
    return {
      schedule: city.fallbackTimes,
      source: 'offline',
    };
  }
}

export async function fetchSurahList(): Promise<{ surahs: SurahSummary[]; isOffline: boolean }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch('https://equran.id/api/v2/surat', { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error('equran.id unavailable');
    }
    const json = await res.json();
    if (Array.isArray(json?.data) && json.data.length > 0) {
      return { surahs: json.data as SurahSummary[], isOffline: false };
    }
    throw new Error('Empty surah list');
  } catch {
    return { surahs: SURAH_LIST_FALLBACK, isOffline: true };
  }
}

export async function fetchSurahDetail(nomor: number): Promise<SurahDetail> {
  // Primary: equran.id v2 (Kemenag RI + Latin + Murottal audio per ayah & full surah)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);
    const res = await fetch(`https://equran.id/api/v2/surat/${nomor}`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json?.data?.ayat) {
        return json.data as SurahDetail;
      }
    }
  } catch {
    // Try secondary API below
  }

  // Secondary fallback: api.alquran.cloud (Arabic + Indonesian Kemenag translation + Alafasy audio)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);
    const res = await fetch(
      `https://api.alquran.cloud/v1/surah/${nomor}/editions/quran-uthmani,id.indonesian,ar.alafasy`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      const editions = json?.data;
      if (Array.isArray(editions) && editions.length >= 2) {
        const arabEd = editions[0];
        const idEd = editions[1];
        const audioEd = editions[2];
        const summary = SURAH_LIST_FALLBACK.find((s) => s.nomor === nomor) || {
          nomor,
          nama: arabEd.name,
          namaLatin: arabEd.englishName,
          jumlahAyat: arabEd.numberOfAyahs,
          tempatTurun: arabEd.revelationType === 'Meccan' ? 'Mekah' : 'Madinah',
          arti: arabEd.englishNameTranslation,
        };

        const ayat: AyahItem[] = arabEd.ayahs.map((a: { numberInSurah: number; text: string }, idx: number) => ({
          nomorAyat: a.numberInSurah,
          teksArab: a.text,
          teksLatin: '',
          teksIndonesia: idEd.ayahs?.[idx]?.text || '',
          audio: audioEd?.ayahs?.[idx]?.audio ? { '05': audioEd.ayahs[idx].audio } : undefined,
        }));

        return {
          ...summary,
          audioFull: {
            '05': `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${nomor}.mp3`,
          },
          ayat,
        };
      }
    }
  } catch {
    // Fallback to offline sample if available
  }

  const summary = SURAH_LIST_FALLBACK.find((s) => s.nomor === nomor)!;
  if (OFFLINE_AYAH_SAMPLES[nomor]) {
    return {
      ...summary,
      ayat: OFFLINE_AYAH_SAMPLES[nomor],
    };
  }

  throw new Error('Tidak dapat memuat ayat surah ini. Periksa koneksi internet Anda dan coba lagi.');
}
