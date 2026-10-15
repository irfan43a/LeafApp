import type { Plant } from '../types/plant';

export const initialPlants: Plant[] = [
  {
    id: 'kunyit',
    name: 'Kunyit',
    scientificName: 'Curcuma longa',
    family: 'Zingiberaceae',
    localNames: ['Koneng (Sunda)', 'Kunit (Banjar)', 'Turmeric (Inggris)', 'Kunir (Jawa)'],
    category: 'herbal',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80',
    description: 'Kunyit adalah tanaman rempah dan obat asli Asia Tenggara. Rimpang kuning-oranye khasnya telah digunakan selama ribuan tahun dalam sistem pengobatan tradisional Ayurveda dan Jamu Nusantara.',
    origin: 'Asia Tenggara dan India',
    activeCompounds: ['Kurkumin', 'Desmetoksikurkumin', 'Bisdesmetoksikurkumin', 'Minyak Atsiri (Turmeron, Zingiberen)', 'Polifenol'],
    healthBenefits: [
      {
        title: 'Meredakan Radang Lambung & Sakit Maag',
        description: 'Kurkumin membantu melindungi lapisan mukosa lambung, menurunkan asam lambung berlebih, dan mempercepat pemulihan tukak lambung.',
        targetCategory: 'Pencernaan'
      },
      {
        title: 'Anti-inflamasi & Pereda Nyeri Sendi (Artritis)',
        description: 'Bekerja menekan molekul inflamasi (seperti COX-2 dan sitokin), efektif meredakan radang sendi dan pembengkakan.',
        targetCategory: 'Sendi & Nyeri'
      },
      {
        title: 'Meningkatkan Daya Tahan Tubuh & Antioksidan Kuat',
        description: 'Menangkal radikal bebas dan menstimulasi sel darah putih dalam melawan infeksi virus dan bakteri.',
        targetCategory: 'Imunitas'
      },
      {
        title: 'Mendukung Detoksifikasi Hati (Hepatoprotektor)',
        description: 'Merangsang produksi cairan empedu dan melindungi sel hati dari racun atau obat-obatan kimia.',
        targetCategory: 'Hati & Detoks'
      }
    ],
    usageAndRecipes: [
      {
        title: 'Jamu Kunyit Asam Segar',
        purpose: 'Menyegarkan tubuh, melancarkan haid, dan meredakan peradangan lambung.',
        ingredients: [
          '150 gram rimpang kunyit segar (kupas, cuci bersih)',
          '50 gram asam jawa',
          '80 gram gula aren/merah',
          '1 liter air bersih',
          'Sejumput garam Himalaya (opsional)'
        ],
        steps: [
          'Parut atau blender kunyit dengan sedikit air hingga halus, lalu peras airnya.',
          'Rebus air perasan kunyit bersama sisa air, asam jawa, dan gula aren dengan api sedang.',
          'Aduk perlahan hingga mendidih dan aroma wangi keluar (sekitar 10-15 menit).',
          'Saring dan nikmati hangat atau dingin dengan es batu.'
        ],
        dosage: '1 gelas (200 ml) 2-3 kali seminggu.'
      },
      {
        title: 'Golden Milk (Susu Kunyit Lada Hitam)',
        purpose: 'Tidur nyenyak, meningkatkan imunitas, dan meredakan batuk pilek.',
        ingredients: [
          '1 sdt bubuk kunyit murni / 1 ruas kunyit parut',
          '250 ml susu hangat (sapi / almond / oat)',
          'Sejumput lada hitam bubuk (meningkatkan penyerapan kurkumin hingga 2000%)',
          '1 sdt madu alami'
        ],
        steps: [
          'Campurkan kunyit dan sejumput lada hitam ke dalam susu hangat.',
          'Aduk rata selama 2 menit.',
          'Tambahkan madu setelah suhu agak hangat agar enzim madu tidak rusak.'
        ],
        dosage: '1 cangkir sebelum tidur di malam hari.'
      }
    ],
    careGuide: {
      difficulty: 'Mudah',
      sunlight: 'Sinar matahari parsial hingga penuh (4 - 6 jam/hari).',
      watering: '1 kali sehari atau setiap 2 hari, jaga tanah tetap lembab tetapi tidak tergenang.',
      soil: 'Campuran tanah gembur, pupuk kandang/kompos matang, dan sekam bakar (perbandingan 1:1:1).',
      fertilizer: 'Pupuk organik cair (POC) atau kompos setiap 3 minggu sekali.',
      temperature: 'Optimal pada suhu tropis 25°C - 35°C.',
      propagation: 'Tunas rimpang yang sudah memiliki mata tunas (potong rimpang tua seukuran 2-3 ruas).',
      commonPests: ['Ulat daun', 'Busuk rimpang karena drainase buruk', 'Kutu putih'],
      harvestingTips: 'Dapat dipanen saat tanaman berumur 8-10 bulan ketika daun mulai menguning dan mengering.'
    },
    cautions: {
      warnings: [
        'Konsumsi kurkumin dosis tinggi dalam jangka panjang dapat menyebabkan iritasi lambung ringan pada sebagian orang.',
        'Hentikan konsumsi 2 minggu sebelum operasi bedah terencana karena kunyit memiliki efek pengencer darah alami.'
      ],
      contraindications: [
        'Penderita batu empedu atau sumbatan saluran empedu harus berkonsultasi dengan dokter.',
        'Wanita hamil dilarang mengonsumsi suplemen ekstrak kunyit dosis tinggi.'
      ],
      maxDailyIntake: 'Tidak melebihi 2.000 mg bubuk kunyit atau sekitar 5-10 gram rimpang segar per hari.'
    },
    wikiSlug: 'Kunyit',
    tags: ['Anti-inflamasi', 'Lambung', 'Imunitas', 'Sendi', 'Rimpang']
  },
  {
    id: 'jahe-merah',
    name: 'Jahe Merah',
    scientificName: 'Zingiber officinale var. rubrum',
    family: 'Zingiberaceae',
    localNames: ['Red Ginger', 'Jahe Suntik', 'Lia Huja'],
    category: 'herbal',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1000&q=80',
    description: 'Varian jahe dengan rimpang berwarna merah keunguan dan rasa paling pedas dibanding jenis jahe lainnya. Mengandung konsentrasi gingerol dan shogaol tertinggi yang sangat berkhasiat menghangatkan tubuh.',
    origin: 'Asia Tenggara Tropis',
    activeCompounds: ['Gingerol', 'Shogaol', 'Zingeron', 'Kapsaisin', 'Minyak Atsiri Cineol'],
    healthBenefits: [
      {
        title: 'Meredakan Flu, Batuk, dan Menghangatkan Paru-paru',
        description: 'Membantu mengencerkan dahak, melegakan saluran napas, dan menekan refleks batuk berkat kandungan gingerol pedas alami.',
        targetCategory: 'Pernapasan'
      },
      {
        title: 'Memperlancar Sirkulasi Darah & Menjaga Jantung',
        description: 'Mencegah penggumpalan darah dan merelaksasi pembuluh darah sehingga tekanan darah lebih stabil.',
        targetCategory: 'Jantung & Sirkulasi'
      },
      {
        title: 'Meningkatkan Stamina Pria & Vitalitas',
        description: 'Secara empiris meningkatkan sirkulasi darah ke organ reproduksi dan mengurangi kelelahan kronis.',
        targetCategory: 'Stamina'
      },
      {
        title: 'Mengatasi Mual, Masuk Angin & Perut Kembung',
        description: 'Zingeron bekerja menenangkan saraf di sistem pencernaan dan mengurangi sensasi mabuk perjalanan.',
        targetCategory: 'Pencernaan'
      }
    ],
    usageAndRecipes: [
      {
        title: 'Wedang Jahe Merah Sereh Madu',
        purpose: 'Menghilangkan masuk angin, menghangatkan tubuh, dan melegakan tenggorokan.',
        ingredients: [
          '2 ruas jari jahe merah (memarkan/geprek)',
          '1 batang sereh (memarkan bagian putihnya)',
          '1 ruas kayu manis kecil (opsional)',
          '400 ml air matang',
          '1-2 sdm madu murni'
        ],
        steps: [
          'Rebus jahe merah, sereh, dan kayu manis dalam air hingga tersisa sekitar 250 ml.',
          'Biarkan uap panas sedikit turun hingga suhu hangat kuku.',
          'Tambahkan madu murni, aduk rata, lalu minum selagi hangat.'
        ],
        dosage: '1 cangkir saat masuk angin atau malam hari.'
      }
    ],
    careGuide: {
      difficulty: 'Mudah',
      sunlight: 'Sinar matahari penuh atau sedikit naungan (minimum 5 jam sehari).',
      watering: 'Siram 1-2 hari sekali. Jahe merah rentan busuk akar jika tanah terlalu becek.',
      soil: 'Tanah berpasir kaya bahan organik dengan pH 6.0 - 7.0.',
      fertilizer: 'Beri pupuk kandang atau kompos sebulan sekali, hindari pupuk kimia nitrogen berlebih.',
      temperature: 'Suhu ideal 24°C - 32°C.',
      propagation: 'Potongan rimpang tua bertunas yang telah diangin-anginkan 2-3 hari.',
      commonPests: ['Bakteri layu Pseudomonas', 'Kutu daun', 'Penggerek batang'],
      harvestingTips: 'Panen pada umur 10-12 bulan untuk mendapatkan kandungan minyak atsiri dan pedas maksimal.'
    },
    cautions: {
      warnings: [
        'Rasa pedas yang kuat dapat memicu asam lambung jika diminum saat perut benar-benar kosong.',
        'Dapat berinteraksi dengan obat pengencer darah (antikoagulan).'
      ],
      contraindications: [
        'Orang dengan riwayat perdarahan aktif.',
        'Hindari konsumsi berlebih pada trimester akhir kehamilan.'
      ],
      maxDailyIntake: 'Maksimal 3-4 gram jahe merah kering atau 10-15 gram rimpang segar per hari.'
    },
    wikiSlug: 'Jahe',
    tags: ['Pernapasan', 'Stamina', 'Menghangatkan', 'Sirkulasi Darah', 'Rimpang']
  },
  {
    id: 'lidah-buaya',
    name: 'Lidah Buaya',
    scientificName: 'Aloe vera (Aloe barbadensis miller)',
    family: 'Asphodelaceae',
    localNames: ['Aloe Vera', 'Jadam', 'Crocodile Tongue'],
    category: 'herbal',
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=1000&q=80',
    description: 'Tanaman sukulen abadi dengan daun tebal berdaging yang mengandung gel bening berkhasiat tinggi. Dikenal sebagai "tanaman keabadian" sejak zaman Mesir Kuno untuk kecantikan kulit dan penyembuhan luka.',
    origin: 'Semenanjung Arab dan Afrika Utara',
    activeCompounds: ['Aloin', 'Aloesin', 'Acemannan (Polisakarida)', 'Vitamin A, C, E, B12', 'Enzim Bradikinase'],
    healthBenefits: [
      {
        title: 'Mempercepat Penyembuhan Luka Bakar & Regenerasi Kulit',
        description: 'Gel aloe vera meningkatkan sintesis kolagen dan mempercepat migrasi sel kulit baru pada luka bakar ringan dan lecet.',
        targetCategory: 'Kulit & Kecantikan'
      },
      {
        title: 'Meredakan Asam Lambung (GERD) & Mengatasi Sembelit',
        description: 'Jus gel lidah buaya yang dibersihkan getah kuningnya memberikan lapisan pelindung pada esofagus dan menenangkan iritasi saluran cerna.',
        targetCategory: 'Pencernaan'
      },
      {
        title: 'Menghidrasi dan Mengatasi Ketombe pada Rambut',
        description: 'Mengandung enzim proteolitik yang membersihkan sel kulit mati di kulit kepala dan menutrisi akar rambut.',
        targetCategory: 'Rambut'
      },
      {
        title: 'Membantu Menstabilkan Gula Darah',
        description: 'Acemannan dan fitosterol membantu meningkatkan sensitivitas insulin pada penderita pradiabetes.',
        targetCategory: 'Diabetes'
      }
    ],
    usageAndRecipes: [
      {
        title: 'Minuman Segar Gel Lidah Buaya Bersih',
        purpose: 'Meredakan panas dalam, menyehatkan lambung, dan melancarkan BAB.',
        ingredients: [
          '1 pelepah lidah buaya besar dan segar',
          '1 sdm air perasan jeruk nipis',
          '1 sdm madu atau gula batu cair',
          'Air matang secukupnya'
        ],
        steps: [
          'Kupas kulit hijau lidah buaya, buang getah kuning (aloin) di bawah air mengalir hingga benar-benar bersih dan tidak berlendir kuning.',
          'Potong daging gel menjadi dadu kecil 1x1 cm.',
          'Rendam dalam air hangat bergaram selama 10 menit, lalu bilas bersih.',
          'Rebus gel selama 3-5 menit untuk menghilangkan bau langu.',
          'Sajikan dalam gelas bersama air perasan jeruk nipis dan madu.'
        ],
        dosage: '1 gelas (150-200 ml) 1 kali sehari.'
      },
      {
        title: 'Masker Wajah & Kulit Kepala Alami',
        purpose: 'Menyejukkan jerawat meradang dan melembabkan rambut kering.',
        ingredients: [
          '2 sdm gel lidah buaya murni segar',
          '1 sdt minyak zaitun atau minyak kelapa murni'
        ],
        steps: [
          'Blender gel murni lidah buaya hingga lembut berbusa.',
          'Oleskan merata ke kulit wajah atau kulit kepala yang sudah bersih.',
          'Diamkan selama 20 menit lalu bilas bersih dengan air dingin.'
        ],
        dosage: 'Gunakan 2-3 kali seminggu.'
      }
    ],
    careGuide: {
      difficulty: 'Mudah',
      sunlight: 'Sinar matahari terang tidak langsung atau matahari pagi 4-6 jam.',
      watering: 'Cukup 1-2 minggu sekali saat tanah atas benar-benar kering (sukulen menyimpan banyak air).',
      soil: 'Campuran tanah berpasir, perlit/sekam bakar, dan sedikit kompos berdrainase sangat baik (media kaktus).',
      fertilizer: 'Pupuk sukulen berkadar nitrogen rendah 2-3 bulan sekali.',
      temperature: '18°C - 32°C, tidak menyukai suhu dingin lembab yang terus-menerus.',
      propagation: 'Pemisahan anakan (pup) yang tumbuh di samping tanaman induk.',
      commonPests: ['Busuk pangkal batang akibat overwatering', 'Kutu sisik', 'Kutu putih'],
      harvestingTips: 'Potong pelepah terluar dan paling bawah dengan pisau steril yang tajam tanpa merusak batang utama.'
    },
    cautions: {
      warnings: [
        'Getah kuning (aloin lateks) di antara kulit dan gel bersifat laksatif keras yang dapat memicu kram perut parah atau diare jika tidak dicuci bersih.',
        'Lakukan tes tempel (patch test) pada kulit tangan sebelum memakai masker untuk menguji alergi.'
      ],
      contraindications: [
        'Wanita hamil dan menyusui dilarang meminum getah lidah buaya karena dapat merangsang kontraksi rahim.',
        'Pasien dengan gagal ginjal atau gangguan elektrolit.'
      ],
      maxDailyIntake: 'Gel murni olahan tanpa aloin maksimal 30 ml per konsumsi.'
    },
    wikiSlug: 'Lidah_buaya',
    tags: ['Kulit', 'Pencernaan', 'Luka Bakar', 'Kecantikan', 'Sukulen']
  },
  {
    id: 'daun-kelor',
    name: 'Daun Kelor',
    scientificName: 'Moringa oleifera',
    family: 'Moringaceae',
    localNames: ['Moringa', 'Miracle Tree', 'Marunggai', 'Kelor'],
    category: 'sayur_buah',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    description: 'Dikenal oleh WHO sebagai "The Miracle Tree" karena kepadatan nutrisinya yang luar biasa. Mengandung protein nabati lengkap, kalsium, zat besi, vitamin C 7x lebih banyak dari jeruk, dan kalium 3x lebih banyak dari pisang.',
    origin: 'Asia Selatan (India utara) dan telah dinaturalisasi di seluruh daerah tropis',
    activeCompounds: ['Kuersetin', 'Asam Klorogenat', 'Isotiosianat', 'Flavonoid', 'Beta-karoten', '9 Asam Amino Esensial'],
    healthBenefits: [
      {
        title: 'Nutrisi Superfood & Mencegah Stunting/Malnutrisi',
        description: 'Sangat kaya protein, zat besi, kalsium, dan vitamin lengkap untuk tumbuh kembang anak dan ibu menyusui.',
        targetCategory: 'Nutrisi & Gizi'
      },
      {
        title: 'Menurunkan Kadar Gula Darah & Kolesterol',
        description: 'Asam klorogenat dan isotiosianat membantu memperlambat penyerapan glukosa setelah makan dan menurunkan LDL.',
        targetCategory: 'Diabetes & Jantung'
      },
      {
        title: 'Meningkatkan Produksi ASI (Galaktagog Alami)',
        description: 'Mengandung fitosterol yang merangsang hormon prolaktin dan oksitosin untuk memperbanyak kuantitas dan kualitas ASI.',
        targetCategory: 'Ibu & Bayi'
      },
      {
        title: 'Antioksidan Seluler & Perlindungan Fungsi Otak',
        description: 'Melindungi sel saraf dari stres oksidatif dan memperbaiki memori kognitif berkat kadar vitamin C dan E tinggi.',
        targetCategory: 'Antioksidan'
      }
    ],
    usageAndRecipes: [
      {
        title: 'Sayur Bening Kelor Jagung Manis',
        purpose: 'Menu harian keluarga kaya zat besi dan antioksidan.',
        ingredients: [
          '2 genggam daun kelor muda (petik daunnya saja)',
          '1 buah jagung manis (potong-potong)',
          '3 siung bawang merah (iris tipis)',
          '2 ruas kunci atau temu kunci (memarkan)',
          '1 liter air',
          'Garam dan gula secukupnya'
        ],
        steps: [
          'Rebus air, irisan bawang merah, dan temu kunci hingga harum.',
          'Masukkan jagung manis, masak hingga jagung empuk.',
          'Beri garam dan gula sesuai selera.',
          'Masukkan daun kelor TERAKHIR, masak sebentar saja (cukup 1-2 menit) agar nutrisi dan warna hijau segarnya tidak rusak.',
          'Matikan api dan sajikan hangat.'
        ],
        dosage: '1 mangkuk sayur setiap hari.'
      },
      {
        title: 'Teh Hijau Daun Kelor Kering',
        purpose: 'Detoksifikasi alami, menurunkan tekanan darah dan gula darah.',
        ingredients: [
          '1 sdm daun kelor kering yang diangin-anginkan (bukan dijemur matahari langsung)',
          '200 ml air panas 80°C',
          'Madu atau lemon sesuai selera'
        ],
        steps: [
          'Seduh daun kelor kering dengan air panas.',
          'Tutup cangkir dan diamkan selama 5-7 menit.',
          'Saring dan minum selagi hangat dengan sedikit madu.'
        ],
        dosage: '1 cangkir sehari di pagi atau sore hari.'
      }
    ],
    careGuide: {
      difficulty: 'Mudah',
      sunlight: 'Sinar matahari penuh (Full sun sepanjang hari).',
      watering: 'Kebutuhan air sedang; toleran terhadap kekeringan. Cukup siram 2-3 hari sekali.',
      soil: 'Tumbuh di hampir segala jenis tanah, termasuk tanah liat atau berpasir, asalkan tidak tergenang.',
      fertilizer: 'Kompos atau kotoran kambing setiap 3 bulan sekali.',
      temperature: '25°C - 38°C (sangat tahan panas).',
      propagation: 'Stek batang (tancapkan batang berdiameter 3-5 cm) atau dari biji polong kelor.',
      commonPests: ['Ulat daun pada musim hujan', 'Belalang'],
      harvestingTips: 'Petik pucuk daun muda secara rutin untuk merangsang percabangan baru yang lebat.'
    },
    cautions: {
      warnings: [
        'Jangan merebus daun kelor terlalu lama (maksimal 2 menit) agar kandungan vitamin C dan antioksidannya tidak rusak.',
        'Akar dan kulit batang kelor mengandung alkaloid moringinine yang berbahaya dan TIDAK untuk dikonsumsi sembarangan.'
      ],
      contraindications: [
        'Penderita tekanan darah rendah (hipotensi) berat harus membatasi konsumsi berlebih.',
        'Hindari konsumsi akar dan kulit batang selama kehamilan.'
      ],
      maxDailyIntake: 'Sekitar 50 gram daun segar atau 10-15 gram bubuk kelor per hari.'
    },
    wikiSlug: 'Kelor',
    tags: ['Superfood', 'ASI', 'Diabetes', 'Vitamin', 'Pohon Mudah Tumbuh']
  },
  {
    id: 'sambiloto',
    name: 'Sambiloto',
    scientificName: 'Andrographis paniculata',
    family: 'Acanthaceae',
    localNames: ['King of Bitters', 'Ki Oray (Sunda)', 'Bidara (Madura)', 'Chuan Xin Lian (Tiongkok)'],
    category: 'herbal',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=80',
    description: 'Dikenal sebagai "Raja Pahit", sambiloto adalah tanaman herbal tropis dengan khasiat antiviral dan imunostimulan terkuat di dunia botani. Menjadi herbal resmi di Thailand untuk terapi suportif infeksi saluran pernapasan.',
    origin: 'India dan Sri Lanka, tersebar luas di Indonesia',
    activeCompounds: ['Andrografolid', 'Neoandrografolid', 'Dideoksianndrografolid', 'Flavonoid', 'Diterpenoid'],
    healthBenefits: [
      {
        title: 'Antiviral Alami & Mengatasi Infeksi Saluran Pernapasan',
        description: 'Andrografolid menghambat replikasi virus flu, meredakan demam, batuk, dan sakit radang tenggorokan akut.',
        targetCategory: 'Pernapasan & Virus'
      },
      {
        title: 'Imunomodulator (Meningkatkan Sel Imun CD4 & NK)',
        description: 'Menstimulasi produksi sel darah putih dan mempercepat pembersihan patogen dari dalam tubuh.',
        targetCategory: 'Imunitas'
      },
      {
        title: 'Menurunkan Kadar Gula Darah Penderita Diabetes Melitus',
        description: 'Merangsang pelepasan insulin dan meningkatkan penyerapan glukosa oleh sel otot.',
        targetCategory: 'Diabetes'
      },
      {
        title: 'Menurunkan Tekanan Darah Tinggi & Pelindung Kardiovaskular',
        description: 'Membantu melebarkan pembuluh darah tepi (vasodilatasi) dan mencegah penumpukan plak aterosklerosis.',
        targetCategory: 'Jantung & Tensi'
      }
    ],
    usageAndRecipes: [
      {
        title: 'Rebusan Sambiloto Penurun Demam & Radang Tenggorokan',
        purpose: 'Menurunkan demam tinggi, meredakan flu berat, dan radang amandel.',
        ingredients: [
          '10-15 lembar daun sambiloto segar atau 5 gram kering',
          '3 gelas air bersih (600 ml)',
          '1 sdm madu murni (untuk meredam rasa pahit)'
        ],
        steps: [
          'Cuci bersih daun sambiloto.',
          'Rebus dalam 3 gelas air dengan api kecil hingga air menyusut menjadi 1 gelas.',
          'Saring air rebusan, biarkan hangat.',
          'Tambahkan madu murni sebelum diminum.'
        ],
        dosage: 'Minum 1/2 cangkir, 2 kali sehari selama maksimal 5 hari berturut-turut.'
      }
    ],
    careGuide: {
      difficulty: 'Mudah',
      sunlight: 'Sinar matahari penuh atau semi-ternaung (minimum 4 jam).',
      watering: 'Siram setiap hari pada musim kemarau, jaga kelembaban tanah tanpa becek.',
      soil: 'Tanah lempung berpasir gembur dengan bahan organik yang cukup.',
      fertilizer: 'Pupuk kandang halus atau kompos sebulan sekali.',
      temperature: '22°C - 34°C.',
      propagation: 'Biji atau stek pucuk batang.',
      commonPests: ['Ulat grayak', 'Kutu daun kecil'],
      harvestingTips: 'Panen daun tepat saat tanaman mulai memunculkan kuncup bunga, karena pada fase inilah kadar andrografolid berada pada puncaknya.'
    },
    cautions: {
      warnings: [
        'Rasa sangat pahit; jangan dikonsumsi terus-menerus lebih dari 2 minggu tanpa jeda untuk menjaga fungsi ginjal dan lambung.',
        'Dapat menurunkan tekanan darah dan gula darah secara signifikan.'
      ],
      contraindications: [
        'Wanita hamil dilarang keras mengonsumsi sambiloto karena memiliki efek abortifum (dapat memicu keguguran).',
        'Penderita penyakit autoimun (seperti lupus atau MS) tanpa pengawasan dokter.'
      ],
      maxDailyIntake: 'Maksimal 3-6 gram simplisia kering per hari.'
    },
    wikiSlug: 'Sambiloto',
    tags: ['Antivirus', 'Demam', 'Diabetes', 'Imunitas', 'Herbal Pahit']
  },
  {
    id: 'temulawak',
    name: 'Temulawak',
    scientificName: 'Curcuma zanthorrhiza',
    family: 'Zingiberaceae',
    localNames: ['Koneng Gede (Sunda)', 'Temu Labak (Madura)', 'Javanese Turmeric'],
    category: 'herbal',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
    description: 'Tanaman obat endemik asli Indonesia yang menjadi primadona jamu tradisional. Terkenal dengan kemampuannya melindungi organ hati, meningkatkan nafsu makan, dan memperlancar sekresi empedu.',
    origin: 'Pulau Jawa, Indonesia',
    activeCompounds: ['Xanthorrhizol', 'Kurkuminoid', 'Minyak Atsiri (Kamfer, Mirsen)', 'Pati & Serat Alami'],
    healthBenefits: [
      {
        title: 'Hepatoprotektor (Melindungi & Meregenerasi Sel Hati)',
        description: 'Xanthorrhizol bekerja sebagai agen pelindung sel hati dari kerusakan akibat toksin, alkohol, atau perlemakan hati (fatty liver).',
        targetCategory: 'Hati & Detoks'
      },
      {
        title: 'Menambah Nafsu Makan & Memperbaiki Pencernaan',
        description: 'Memicu sekresi enzim pencernaan dan cairan empedu sehingga penyerapan nutrisi meningkat optimal.',
        targetCategory: 'Pencernaan & Anak'
      },
      {
        title: 'Menurunkan Kolesterol Jahat (LDL) & Trigliserida',
        description: 'Membantu proses metabolisme lemak di hati dan mencegah pengendapan kolesterol di dinding arteri.',
        targetCategory: 'Jantung & Kolesterol'
      },
      {
        title: 'Antibakteri Alami Terhadap Kuman Rongga Mulut',
        description: 'Xanthorrhizol efektif membunuh Streptococcus mutans penyebab plak gigi dan radang gusi.',
        targetCategory: 'Gigi & Mulut'
      }
    ],
    usageAndRecipes: [
      {
        title: 'Jamu Temulawak Rebus Alami',
        purpose: 'Menjaga kesehatan organ liver, membersihkan darah, dan meningkatkan nafsu makan.',
        ingredients: [
          '2 ruas temulawak segar (iris tipis)',
          '1 ruas jahe (iris tipis)',
          '1 sdm gula aren atau madu',
          '500 ml air bersih',
          '1 lembar daun pandan (opsional untuk aroma)'
        ],
        steps: [
          'Rebus irisan temulawak, jahe, dan daun pandan dalam 500 ml air.',
          'Masak dengan api kecil hingga air tersisa 300 ml.',
          'Saring ke dalam cangkir dan tambahkan gula aren atau madu.',
          'Minum hangat di pagi atau sore hari.'
        ],
        dosage: '1 cangkir per hari.'
      }
    ],
    careGuide: {
      difficulty: 'Mudah',
      sunlight: 'Toleran terhadap naungan ringan hingga sinar matahari penuh (60-80% intensitas).',
      watering: 'Siram setiap 1-2 hari sekali, kurangi penyiraman saat mendekati masa panen.',
      soil: 'Tanah subur gembur, tekstur lempung berpasir dengan kandungan humus tebal.',
      fertilizer: 'Pupuk kandang matang 1-2 kg per lubang tanam saat awal tanam dan POC tiap bulan.',
      temperature: '24°C - 33°C.',
      propagation: 'Rimpang induk atau rimpang cabang yang telah memiliki 2-3 mata tunas aktif.',
      commonPests: ['Lalat rimpang', 'Ulat daun', 'Karat daun'],
      harvestingTips: 'Panen pada umur 9-11 bulan ketika batang semu mulai rebah dan daun menguning.'
    },
    cautions: {
      warnings: [
        'Konsumsi dosis sangat tinggi dapat meningkatkan produksi asam lambung pada orang yang hipersensitif.'
      ],
      contraindications: [
        'Penderita penyumbatan total saluran empedu.',
        'Hindari konsumsi bersamaan dengan obat antikoagulan dosis kuat tanpa saran dokter.'
      ],
      maxDailyIntake: '10-15 gram rimpang basah per hari.'
    },
    wikiSlug: 'Temulawak',
    tags: ['Hati', 'Nafsu Makan', 'Pencernaan', 'Kolesterol', 'Endemik Indonesia']
  },
  {
    id: 'sirih-hijau',
    name: 'Sirih Hijau',
    scientificName: 'Piper betle',
    family: 'Piperaceae',
    localNames: ['Suruh (Jawa)', 'Seureuh (Sunda)', 'Sireh (Melayu)', 'Betel Leaf'],
    category: 'herbal',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=80',
    description: 'Tanaman merambat aromatik dengan daun berbentuk hati yang kaya minyak atsiri. Simbol keramahan Nusantara yang telah terbukti secara ilmiah memiliki efek antiseptik dan antibakteri spektrum luas.',
    origin: 'Asia Tenggara dan Asia Selatan',
    activeCompounds: ['Kavibetol', 'Kavikol', 'Eugenol', 'Karvakrol', 'Tanin', 'Terpenoid'],
    healthBenefits: [
      {
        title: 'Antiseptik Kuat & Menjaga Kebersihan Organ Kewanitaan',
        description: 'Kavikol memiliki daya bunuh bakteri 5x lebih kuat dari fenol biasa, efektif mengatasi keputihan berlebih dan gatal jamur Candida.',
        targetCategory: 'Kewanitaan & Jamur'
      },
      {
        title: 'Menghentikan Mimisan & Mempercepat Pembekuan Darah',
        description: 'Tanin dalam daun sirih membantu mengontraksikan pembuluh kapiler yang pecah di rongga hidung.',
        targetCategory: 'Pertolongan Pertama'
      },
      {
        title: 'Meredakan Batuk & Mengatasi Bau Mulut (Halitosis)',
        description: 'Eugenol membunuh bakteri anaerob penyebab bau mulut dan mengencerkan lendir pada saluran napas.',
        targetCategory: 'Mulut & Napas'
      },
      {
        title: 'Mempercepat Penyembuhan Luka Luar & Gatal Kulit',
        description: 'Rebusan daun sirih dapat digunakan sebagai bilasan kompres pada ruam, bisul, atau gigitan serangga.',
        targetCategory: 'Kulit'
      }
    ],
    usageAndRecipes: [
      {
        title: 'Air Rebusan Daun Sirih untuk Kumur & Bilas Antiseptik',
        purpose: 'Menghilangkan bau mulut, meredakan sariawan, dan antiseptik luar.',
        ingredients: [
          '5-7 lembar daun sirih hijau segar yang tua',
          '500 ml air bersih'
        ],
        steps: [
          'Cuci daun sirih hingga bersih di bawah air mengalir.',
          'Rebus daun sirih dalam air mendidih selama 10 menit.',
          'Biarkan air mendingin hingga suhu ruang.',
          'Gunakan untuk berkumur setelah menyikat gigi, atau sebagai bilasan luar area kulit yang gatal.'
        ],
        dosage: 'Gunakan 1-2 kali sehari sesuai kebutuhan.'
      },
      {
        title: 'Gulungan Daun Sirih Penghenti Mimisan',
        purpose: 'Menghentikan pendarahan hidung (mimisan) seketika.',
        ingredients: [
          '1 lembar daun sirih muda yang bersih'
        ],
        steps: [
          'Cuci bersih daun sirih dan remas perlahan agar minyak asirinya sedikit keluar.',
          'Gulung menyerupai corong silinder kecil.',
          'Sumbatkan dengan lembut ke lubang hidung yang mengalami pendarahan selama 10-15 menit dalam posisi duduk tegak.'
        ],
        dosage: 'Digunakan saat terjadi mimisan mendadak.'
      }
    ],
    careGuide: {
      difficulty: 'Mudah',
      sunlight: 'Sinar matahari teduh / parsial (tidak menyukai sinar matahari terik menyengat langsung).',
      watering: 'Siram 1 kali sehari, suka kondisi tanah dan lingkungan yang lembab.',
      soil: 'Tanah kaya humus dengan campuran kompos dan sabut kelapa (cocopeat).',
      fertilizer: 'Pupuk kandang halus atau pupuk daun organik cair tiap 2 minggu.',
      temperature: '22°C - 30°C.',
      propagation: 'Stek sulur batang yang telah memiliki akar lekat (panjang 20-30 cm).',
      commonPests: ['Kutu putih di balik daun', 'Bercak daun jamur Cercospora'],
      harvestingTips: 'Petik daun sirih yang sudah cukup lebar dan berwarna hijau tua pada pagi hari.'
    },
    cautions: {
      warnings: [
        'Penggunaan bilasan antiseptik sirih pada organ intim wanita tidak boleh dilakukan setiap hari secara terus menerus agar tidak mematikan bakteri baik (Lactobacillus).',
        'Menyirih bersama kapur dan pinang dalam jangka panjang berkorelasi dengan peningkatan risiko kanker mulut.'
      ],
      contraindications: [
        'Jangan diteteskan langsung ke dalam mata tanpa sterilisasi medis karena risiko infeksi jamur spora.'
      ],
      maxDailyIntake: 'Penggunaan kumur 2 kali sehari, konsumsi minum maksimal 1 cangkir rebusan encer.'
    },
    wikiSlug: 'Sirih',
    tags: ['Antiseptik', 'Mimisan', 'Kewanitaan', 'Mulut', 'Tanaman Merambat']
  },
  {
    id: 'pegagan',
    name: 'Pegagan (Antanan)',
    scientificName: 'Centella asiatica',
    family: 'Apiaceae',
    localNames: ['Gotu Kola', 'Antanan Gede (Sunda)', 'Daun Kaki Kuda', 'Asiatic Pennywort'],
    category: 'herbal',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    description: 'Tanaman herba merambat kecil berdaun bundar seperti ginjal atau kipas. Populer di industri kosmetik dunia sebagai "Cica" dan dalam pengobatan timur sebagai tonik otak (Brain Booster) untuk meningkatkan daya ingat.',
    origin: 'Kawasan tropis Asia, Afrika, dan Australia',
    activeCompounds: ['Asiatikosida', 'Madekasosida', 'Asam Asiatat', 'Asam Madekasat', 'Triterpenoid', 'Flavonoid'],
    healthBenefits: [
      {
        title: 'Meningkatkan Daya Ingat & Konsentrasi (Brain Tonic)',
        description: 'Meningkatkan sirkulasi darah ke mikrosirkulasi otak, merangsang faktor pertumbuhan saraf (BDNF), dan mencegah penurunan kognitif.',
        targetCategory: 'Otak & Memori'
      },
      {
        title: 'Meredakan Kecemasan (Anxiolytic) & Membantu Tidur',
        description: 'Mempengaruhi reseptor GABA di otak sehingga memberikan efek menenangkan alami tanpa rasa kantuk berat.',
        targetCategory: 'Stres & Tidur'
      },
      {
        title: 'Menstimulasi Kolagen & Mengatasi Bekas Luka / Stretch Mark',
        description: 'Madekasosida dan asiatikosida memicu produksi kolagen tipe I, mempercepat penyembuhan luka dan mengencangkan kulit.',
        targetCategory: 'Kulit & Cica'
      },
      {
        title: 'Memperlancar Aliran Darah Vena & Varises',
        description: 'Menguatkan dinding pembuluh darah vena dan mengurangi pembengkakan di tungkai kaki.',
        targetCategory: 'Sirkulasi Darah'
      }
    ],
    usageAndRecipes: [
      {
        title: 'Teh Seduh Pegagan Penambah Fokus & Memori',
        purpose: 'Meningkatkan konsentrasi belajar, meredakan stres mental, dan menjaga ketajaman ingatan.',
        ingredients: [
          '1 sdm daun pegagan kering atau 10 lembar daun segar',
          '250 ml air panas',
          '1 sdt madu atau perasan lemon'
        ],
        steps: [
          'Cuci bersih daun pegagan jika menggunakan daun segar.',
          'Seduh dalam air panas selama 5-10 menit dalam cangkir tertutup.',
          'Saring dan tambahkan madu.',
          'Minum di pagi hari sebelum memulai aktivitas.'
        ],
        dosage: '1 cangkir per hari.'
      },
      {
        title: 'Lalapan Segar Pegagan Sambal Terasi',
        purpose: 'Menu lalapan tradisional Sunda kaya serat dan antioksidan.',
        ingredients: [
          '1 genggam daun pegagan segar muda',
          'Sambal terasi atau sambal tomat'
        ],
        steps: [
          'Rendam daun pegagan dalam air garam selama 5 menit untuk memastikan bebas telur cacing, lalu bilas air matang mengalir.',
          'Sajikan sebagai lalap mentah pendamping makanan utama.'
        ],
        dosage: 'Dapat dinikmati sebagai lalapan mingguan.'
      }
    ],
    careGuide: {
      difficulty: 'Mudah',
      sunlight: 'Sinar matahari pagi atau semi-teduh.',
      watering: 'Suka air melimpah; siram 1-2 kali sehari, jaga tanah tetap selalu basah dan lembab.',
      soil: 'Tanah humus basah, gembur, atau lumpur dangkal (bisa tumbuh merayap di pot ceper).',
      fertilizer: 'Kompos organik halus sebulan sekali.',
      temperature: '20°C - 30°C.',
      propagation: 'Stolon (geragih) / sulur yang memiliki akar pada buku-buku batangnya.',
      commonPests: ['Siput / keong pemakan daun', 'Ulat tanah'],
      harvestingTips: 'Gunting daun beserta tangkainya, sisakan buku-buku akar agar terus tumbuh merambat kembali.'
    },
    cautions: {
      warnings: [
        'Jangan dikonsumsi berlebihan dalam dosis tinggi (lebih dari 6 minggu berturut-turut) karena dapat membebani organ liver.',
        'Dapat berinteraksi dengan obat penenang tidur atau antidiabetes.'
      ],
      contraindications: [
        'Wanita hamil dan berencana hamil (dapat memicu relaksasi otot rahim).',
        'Penderita riwayat hepatitis berat.'
      ],
      maxDailyIntake: 'Maksimal 2-4 gram kering per hari atau 1 genggam daun segar.'
    },
    wikiSlug: 'Pegagan',
    tags: ['Otak & Memori', 'Cica Skincare', 'Kecemasan', 'Kolagen', 'Herba Air']
  },
  {
    id: 'kumis-kucing',
    name: 'Kumis Kucing',
    scientificName: 'Orthosiphon aristatus',
    family: 'Lamiaceae',
    localNames: ['Cat’s Whiskers', 'Giri-giri Maram', 'Rembujung (Jawa)'],
    category: 'herbal',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    description: 'Tanaman herba berbunga putih kebiruan cantik dengan benang sari panjang mencuat menyerupai kumis kucing. Sangat terkenal sebagai peluruh batu ginjal dan pembersih saluran kemih alami terbaik.',
    origin: 'Asia Tenggara dan Australia Tropis',
    activeCompounds: ['Sinensetin', 'Asam Rosmarinat', 'Ortosifonin', 'Kalium Tinggi', 'Flavonoid Eupatorin'],
    healthBenefits: [
      {
        title: 'Meluruhkan Batu Ginjal & Infeksi Saluran Kemih (ISK)',
        description: 'Senyawa ortosifonin dan kalium tinggi melarutkan asam urat dan kristal kalsium fosfat dalam ginjal serta melancarkan kencing.',
        targetCategory: 'Ginjal & Kemih'
      },
      {
        title: 'Diuretik Alami & Menurunkan Tekanan Darah Tinggi',
        description: 'Membuang kelebihan natrium dan cairan dari dalam tubuh melalui urin tanpa menguras kalium esensial.',
        targetCategory: 'Tekanan Darah'
      },
      {
        title: 'Menurunkan Kadar Asam Urat (Gout)',
        description: 'Membantu ekskresi kelebihan purin melalui urine sehingga mengurangi peradangan sendi jempol kaki.',
        targetCategory: 'Asam Urat'
      },
      {
        title: 'Anti-inflamasi & Antibakteri Saluran Kencing',
        description: 'Sinensetin menghambat pertumbuhan bakteri Escherichia coli yang menempel pada dinding kandung kemih.',
        targetCategory: 'Antibakteri'
      }
    ],
    usageAndRecipes: [
      {
        title: 'Teh Seduhan Daun Kumis Kucing Peluruh Ginjal',
        purpose: 'Melancarkan buang air kecil, meredakan anyang-anyangan dan melarutkan kristal ginjal.',
        ingredients: [
          '5-8 lembar daun kumis kucing segar (atau 1 sdt daun kering)',
          '1 ruas jari rimpang temulawak (opsional untuk menambah efektivitas)',
          '400 ml air bersih'
        ],
        steps: [
          'Cuci bersih daun kumis kucing.',
          'Rebus dengan air hingga tersisa 200 ml.',
          'Saring dan minum selagi hangat.',
          'Pastikan memperbanyak minum air putih hangat setelah mengonsumsi ramuan ini.'
        ],
        dosage: '1 gelas sehari selama 5-7 hari berturut-turut.'
      }
    ],
    careGuide: {
      difficulty: 'Mudah',
      sunlight: 'Sinar matahari penuh atau semi-ternaung (5-6 jam/hari).',
      watering: 'Siram rutin 1-2 kali sehari karena kumis kucing membutuhkan tanah yang cukup basah.',
      soil: 'Tanah liat berpasir kaya humus dengan aerasi baik.',
      fertilizer: 'Pupuk kandang matang atau kompos tiap 3 minggu sekali.',
      temperature: '22°C - 32°C.',
      propagation: 'Stek batang setengah tua sepanjang 15-20 cm.',
      commonPests: ['Ulat grayak daun', 'Belalang'],
      harvestingTips: 'Petik 4-6 helai daun teratas dari pucuk yang sedang mekar berbunga.'
    },
    cautions: {
      warnings: [
        'Karena memiliki efek diuretik kuat, wajib diimbangi dengan asupan air putih minimal 2.5 liter per hari untuk mencegah dehidrasi.',
        'Hentikan penggunaan jika batu ginjal sudah keluar atau gejala anyang-anyangan sembuh.'
      ],
      contraindications: [
        'Penderita gagal jantung kongestif atau edema karena penurunan fungsi ginjal stadium lanjut harus dalam pengawasan dokter nefrologi.'
      ],
      maxDailyIntake: 'Maksimal 6-12 gram simplisia daun kering per hari.'
    },
    wikiSlug: 'Kumis_kucing',
    tags: ['Ginjal', 'Asam Urat', 'Diuretik', 'Hipertensi', 'Bunga Cantik']
  },
  {
    id: 'daun-salam',
    name: 'Daun Salam',
    scientificName: 'Syzygium polyanthum',
    family: 'Myrtaceae',
    localNames: ['Indonesian Bay Leaf', 'Ubar Serai', 'Mantang'],
    category: 'rempah',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    description: 'Pohon rempah daun aromatik wajib masakan nusantara. Selain memberikan aroma sedap pada gulai dan sayur lodeh, daun salam memiliki reputasi klinis kuat sebagai penurun kolesterol dan asam urat.',
    origin: 'Indonesia, Malaysia, Indochina',
    activeCompounds: ['Eugenol', 'Flavonoid', 'Tanin', 'Seskuiterpen', 'Saponin'],
    healthBenefits: [
      {
        title: 'Menurunkan Kadar Kolesterol Total & LDL',
        description: 'Flavonoid dan antioksidan daun salam membantu menghambat sintesis kolesterol di hati.',
        targetCategory: 'Kolesterol & Jantung'
      },
      {
        title: 'Mengontrol Gula Darah Penderita Diabetes Tipe 2',
        description: 'Meningkatkan penyerapan glukosa oleh sel tubuh dan meningkatkan fungsi reseptor insulin.',
        targetCategory: 'Diabetes'
      },
      {
        title: 'Menurunkan Asam Urat & Meredakan Pegal Linu',
        description: 'Membantu pengeluaran asam urat dan menekan peradangan sendi.',
        targetCategory: 'Asam Urat'
      },
      {
        title: 'Menurunkan Tekanan Darah Tinggi',
        description: 'Kandungan eugenol dan kalium membantu merilekskan dinding pembuluh darah arteri.',
        targetCategory: 'Hipertensi'
      }
    ],
    usageAndRecipes: [
      {
        title: 'Rebusan Daun Salam Penurun Kolesterol & Asam Urat',
        purpose: 'Menormalkan profil lipid darah dan menurunkan asam urat.',
        ingredients: [
          '10 lembar daun salam segar (pilih daun yang sudah tua berwarna hijau pekat)',
          '3 gelas air bersih (600 ml)'
        ],
        steps: [
          'Cuci bersih daun salam.',
          'Rebus dengan 3 gelas air hingga mendidih dan menyusut menjadi 1 gelas.',
          'Saring dan minum dalam keadaan hangat sebelum sarapan atau malam hari.'
        ],
        dosage: '1 gelas per hari selama 1 minggu, lalu evaluasi hasil lab.'
      }
    ],
    careGuide: {
      difficulty: 'Mudah',
      sunlight: 'Sinar matahari penuh (Full sun).',
      watering: 'Siram 1 kali sehari pada bibit muda; pohon dewasa tahan kekeringan.',
      soil: 'Tumbuh baik pada berbagai jenis tanah kebun.',
      fertilizer: 'Kompos atau NPK seimbang 3 bulan sekali.',
      temperature: '23°C - 35°C.',
      propagation: 'Cangkok dahan atau dari persemaian biji buah salam matang.',
      commonPests: ['Kutu putih', 'Ulat penggerek batang muda'],
      harvestingTips: 'Petik daun tua yang berwarna hijau gelap karena kandungan senyawa aktifnya paling padat.'
    },
    cautions: {
      warnings: [
        'Konsumsi air rebusan dalam jumlah berlebih dapat menurunkan kadar gula darah terlalu rendah (hipoglikemia) pada pengguna obat diabetes.'
      ],
      contraindications: [
        'Pasien yang akan menjalani operasi anestesi dalam 2 minggu.'
      ],
      maxDailyIntake: 'Maksimal 10-15 lembar per hari.'
    },
    wikiSlug: 'Salam_(tumbuhan)',
    tags: ['Kolesterol', 'Asam Urat', 'Diabetes', 'Rempah Dapur', 'Pohon Peneduh']
  },
  {
    id: 'binahong',
    name: 'Binahong',
    scientificName: 'Anredera cordifolia',
    family: 'Basellaceae',
    localNames: ['Madeira Vine', 'Deng San Chi', 'Tanaman Penutup Luka'],
    category: 'herbal',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=80',
    description: 'Tanaman obat merambat berdaging tebal dengan umbi udara khas di ketiak daun. Terkenal legendaris untuk mempercepat penyembuhan luka operasi pasca melahirkan atau pembedahan.',
    origin: 'Amerika Selatan tropis dan telah dibudidayakan luas di Nusantara',
    activeCompounds: ['Saponin', 'Flavonoid', 'Polifenol', 'Minyak Atsiri', 'Asam Oleanolat'],
    healthBenefits: [
      {
        title: 'Mempercepat Pengeringan Luka Operasi & Jahitan',
        description: 'Asam oleanolat dan saponin merangsang proliferasi fibroblas dan sintesis kolagen sehingga luka bedah cepat menutup kering.',
        targetCategory: 'Luka & Operasi'
      },
      {
        title: 'Mengatasi Wasir (Ambeien) & Radang Usus',
        description: 'Zat anti-inflamasi alami meredakan pembengkakan pembuluh vena pada anus dan melunakkan feses.',
        targetCategory: 'Pencernaan'
      },
      {
        title: 'Menstabilkan Tekanan Darah & Memulihkan Stamina Lemah',
        description: 'Membantu sirkulasi darah dan mengembalikan energi pasca sakit berkepanjangan.',
        targetCategory: 'Stamina & Darah'
      },
      {
        title: 'Mengatasi Jerawat Parah & Bisul',
        description: 'Sebagai masker alami yang meredakan nanah dan infeksi bakteri Staphylococcus pada kulit.',
        targetCategory: 'Kulit'
      }
    ],
    usageAndRecipes: [
      {
        title: 'Rebusan Daun Binahong Pasca Operasi',
        purpose: 'Mempercepat pemulihan luka dalam dan jahitan setelah operasi.',
        ingredients: [
          '7 lembar daun binahong segar (cuci bersih)',
          '2 gelas air (400 ml)'
        ],
        steps: [
          'Rebus daun binahong dalam air mendidih selama 10-15 menit hingga tersisa 1 gelas.',
          'Saring dan minum selagi hangat.'
        ],
        dosage: '1 gelas per hari selama 5-7 hari pasca tindakan medis.'
      },
      {
        title: 'Tapal Tumbuk Daun Binahong untuk Luka Luar / Jerawat',
        purpose: 'Mengeringkan bisul, memar bengkak, dan luka sayat.',
        ingredients: [
          '3-5 lembar daun binahong bersih'
        ],
        steps: [
          'Tumbuk halus daun binahong hingga berlendir.',
          'Tempelkan langsung pada area kulit yang memar atau jerawat meradang.',
          'Biarkan selama 20-30 menit lalu bilas bersih.'
        ],
        dosage: '1-2 kali sehari.'
      }
    ],
    careGuide: {
      difficulty: 'Mudah',
      sunlight: 'Sinar matahari pagi hingga terik penuh.',
      watering: 'Cukup siram 1-2 hari sekali, sangat adaptif dan tangguh.',
      soil: 'Semua jenis tanah, asalkan gembur dan ada rambatan pagar atau teralis.',
      fertilizer: 'Pupuk kandang atau kompos tiap 2 bulan.',
      temperature: '20°C - 35°C.',
      propagation: 'Umbi udara (katak) yang tumbuh di ketiak batang atau stek sulur.',
      commonPests: ['Bekicot / keong tanah', 'Belalang'],
      harvestingTips: 'Petik daun yang berukuran sedang hingga lebar dari bagian sulur tengah.'
    },
    cautions: {
      warnings: [
        'Tidak disarankan dikonsumsi berlebihan oleh penderita penyakit jantung yang mengonsumsi obat digitalis tanpa konsultasi dokter.'
      ],
      contraindications: [
        'Wanita hamil dan menyusui sebaiknya menghindari konsumsi oral dosis pekat.'
      ],
      maxDailyIntake: 'Maksimal 7-10 lembar daun segar per hari.'
    },
    wikiSlug: 'Binahong',
    tags: ['Luka Operasi', 'Wasir', 'Kulit & Jerawat', 'Stamina', 'Tanaman Merambat']
  },
  {
    id: 'rosemary',
    name: 'Rosemary',
    scientificName: 'Salvia rosmarinus',
    family: 'Lamiaceae',
    localNames: ['Embun Laut', 'Rosemary Herb'],
    category: 'herbal',
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1000&q=80',
    description: 'Semak aromatik abadi berdaun jarum dengan wangi herbal segar khas Mediterania. Selain bumbu masakan steak berkelas, rosemary terbukti ilmiah merangsang pertumbuhan rambut dan meningkatkan konsentrasi kognitif.',
    origin: 'Kawasan Mediterania',
    activeCompounds: ['Asam Rosmarinat', 'Karnosol', 'Asam Karnosat', 'Kamfer', 'Sineol'],
    healthBenefits: [
      {
        title: 'Merangsang Pertumbuhan Rambut & Mengatasi Kebotakan',
        description: 'Minyak rosemary memiliki efikasi setara minoxidil 2% dalam meningkatkan mikrosirkulasi folikel rambut tanpa efek samping gatal berlebih.',
        targetCategory: 'Rambut & Kulit Kepala'
      },
      {
        title: 'Meningkatkan Memori & Ketajaman Mental (Aromaterapi)',
        description: 'Aroma 1,8-sineol rosemary menghambat enzim asetilkolinesterase di otak sehingga mempertajam fokus memori jangka pendek.',
        targetCategory: 'Otak & Fokus'
      },
      {
        title: 'Antioksidan Kuat & Pengawet Makanan Alami',
        description: 'Asam karnosat melindungi sel tubuh dan minyak pangan dari oksidasi dan pembusukan radikal bebas.',
        targetCategory: 'Antioksidan'
      },
      {
        title: 'Meredakan Nyeri Otot & Pegal Linu',
        description: 'Minyak oles rosemary memberikan sensasi hangat relaksasi pada sendi dan otot kaku.',
        targetCategory: 'Nyeri Otot'
      }
    ],
    usageAndRecipes: [
      {
        title: 'Rosemary Hair Rinse Water (Air Bilasan Rambut)',
        purpose: 'Menumbuhkan rambut baru, memperkuat akar rambut, dan menghilangkan ketombe.',
        ingredients: [
          '3 tangkai rosemary segar (atau 2 sdm rosemary kering)',
          '500 ml air bersih',
          '1 sdt cuka apel (opsional untuk kilau rambut)'
        ],
        steps: [
          'Rebus tangkai rosemary dalam air selama 15 menit hingga air berubah warna kecoklatan kemerahan.',
          'Dinginkan sepenuhnya, lalu saring ke dalam botol semprot (spray bottle).',
          'Semprotkan ke kulit kepala setelah keramas, pijat lembut selama 3 menit tanpa perlu dibilas.'
        ],
        dosage: 'Gunakan 3-4 kali seminggu setelah keramas.'
      },
      {
        title: 'Teh Herbal Rosemary & Lemon',
        purpose: 'Meningkatkan fokus belajar, meredakan sakit kepala migrain, dan menyegarkan napas.',
        ingredients: [
          '1 tangkai kecil rosemary segar',
          '200 ml air mendidih',
          '1 sdt madu dan 1 irisan lemon'
        ],
        steps: [
          'Seduh tangkai rosemary dalam air mendidih selama 5 menit.',
          'Keluarkan tangkai, tambahkan irisan lemon dan madu.',
          'Nikmati hangat di pagi hari saat bekerja.'
        ],
        dosage: '1 cangkir per hari.'
      }
    ],
    careGuide: {
      difficulty: 'Sedang',
      sunlight: 'Sinar matahari penuh terik (minimal 6-8 jam sehari). Sangat suka cahaya.',
      watering: 'Sedikit air (siram hanya saat tanah bagian atas 2-3 cm sudah kering). Musuh utama rosemary adalah tanah becek basah!',
      soil: 'Media tanam sangat porous berpasir dengan campuran perlit, pasir malang, dan sedikit kompos.',
      fertilizer: 'Sedikit saja; pupuk organik cair ringan setiap 1-2 bulan.',
      temperature: '18°C - 30°C dengan sirkulasi angin yang lancar.',
      propagation: 'Stek pucuk batang muda sepanjang 10 cm yang direndam air berakar.',
      commonPests: ['Busuk akar akibat overwatering', 'Tungau laba-laba (Spider mites)', 'Embun jelaga'],
      harvestingTips: 'Gunting tangkai pucuk muda di pagi hari setelah embun kering.'
    },
    cautions: {
      warnings: [
        'Jangan meminum minyak esensial rosemary murni secara langsung karena sangat pekat dan berbahaya bagi lambung.',
        'Dosis konsumsi herbal berlebih dapat memicu peningkatan tekanan darah pada sebagian orang.'
      ],
      contraindications: [
        'Ibu hamil dilarang meminum rebusan rosemary dosis tinggi (dapat merangsang kontraksi rahim).',
        'Penderita epilepsi atau gangguan kejang.'
      ],
      maxDailyIntake: 'Maksimal 1-2 tangkai segar dalam masakan atau teh per hari.'
    },
    wikiSlug: 'Rosemary',
    tags: ['Pertumbuhan Rambut', 'Otak & Fokus', 'Aromaterapi', 'Bumbu Masak', 'Mediterania']
  },
  {
    id: 'lavender',
    name: 'Lavender',
    scientificName: 'Lavandula angustifolia',
    family: 'Lamiaceae',
    localNames: ['English Lavender', 'Bunga Pengusir Nyamuk'],
    category: 'hias',
    image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=1000&q=80',
    description: 'Bunga ungu anggun dengan aroma lembut relaksasi yang paling dicintai di dunia aromaterapi. Efektif meredakan insomnia, kecemasan berlebih, dan secara alami mengusir nyamuk serta serangga rumah.',
    origin: 'Kawasan Mediterania barat',
    activeCompounds: ['Linalool', 'Linalil Asetat', 'Lavandulol', 'Geraniol', 'Tannin'],
    healthBenefits: [
      {
        title: 'Mengatasi Insomnia & Meningkatkan Kualitas Tidur',
        description: 'Inhalasi aroma linalool memperlambat denyut jantung, menurunkan kadar kortisol, dan memicu gelombang otak alfa untuk tidur lelap.',
        targetCategory: 'Tidur & Relaksasi'
      },
      {
        title: 'Meredakan Kecemasan & Serangan Panik Ringan',
        description: 'Bekerja menenangkan sistem saraf pusat simpatis tanpa menimbulkan adiksi kimiawi.',
        targetCategory: 'Kesehatan Mental'
      },
      {
        title: 'Mengusir Nyamuk & Serangga Secara Alami',
        description: 'Aroma linalool sangat tidak disukai oleh nyamuk Aedes aegypti dan ngengat.',
        targetCategory: 'Anti Nyamuk'
      },
      {
        title: 'Menenangkan Iritasi Kulit & Gigitan Serangga',
        description: 'Minyak lavender memiliki sifat antiseptik dan anti-gatal ringan saat dioleskan ke kulit.',
        targetCategory: 'Kulit'
      }
    ],
    usageAndRecipes: [
      {
        title: 'Teh Bunga Lavender & Chamomile Pengantar Tidur',
        purpose: 'Menenangkan pikiran gelisah dan membantu tidur pulas tanpa terbangun tengah malam.',
        ingredients: [
          '1/2 sdt kuncup bunga lavender kering food-grade',
          '1 sdt bunga chamomile kering',
          '250 ml air mendidih',
          '1 sdt madu alami'
        ],
        steps: [
          'Seduh kuncup bunga lavender dan chamomile dalam cangkir tertutup selama 5-7 menit.',
          'Saring bunga.',
          'Tambahkan madu murni dan minum 30 menit sebelum tidur di malam hari.'
        ],
        dosage: '1 cangkir di malam hari.'
      },
      {
        title: 'Semprotan Aromaterapi Bantal (Pillow Spray)',
        purpose: 'Mengharumkan ruangan kamar dan mengusir nyamuk serta merelaksasi tidur.',
        ingredients: [
          '10 tetes minyak esensial lavender murni',
          '50 ml air distilasi / air mawar',
          '10 ml alkohol 70% atau witch hazel'
        ],
        steps: [
          'Campurkan semua bahan ke dalam botol spray kaca.',
          'Kocok kuat sebelum digunakan.',
          'Semprotkan ringan ke bantal dan sekeliling kamar tidur sebelum berbaring.'
        ],
        dosage: 'Semprot 2-3 kali setiap malam.'
      }
    ],
    careGuide: {
      difficulty: 'Sedang',
      sunlight: 'Sinar matahari penuh (Full sun minimal 6 jam sehari).',
      watering: 'Sangat hemat air. Siram hanya ketika media tanam sudah kering.',
      soil: 'Tanah berpasir atau berkerikil dengan drainase sangat baik dan pH netral hingga sedikit basa (6.5 - 7.5).',
      fertilizer: 'Jangan beri pupuk nitrogen tinggi karena akan mengurangi produksi bunga dan aroma minyaknya.',
      temperature: '15°C - 28°C (lebih menyukai dataran tinggi dengan udara sejuk kering).',
      propagation: 'Stek pucuk dahan berkayu lunak di musim semi / awal kemarau.',
      commonPests: ['Busuk akar jamur Phytophthora jika terlalu lembab', 'Kutu daun'],
      harvestingTips: 'Panen tangkai bunga saat kuncup pertama baru mulai membuka warna ungunya.'
    },
    cautions: {
      warnings: [
        'Pastikan menggunakan lavender berlabel "Food Grade" jika ingin diseduh sebagai teh, jangan gunakan lavender untuk potpourri atau pajangan sintetis.',
        'Minyak esensial murni tidak untuk diminum langsung.'
      ],
      contraindications: [
        'Anak laki-laki pra-pubertas sebaiknya tidak menggunakan produk lavender pekat harian dalam jangka panjang.',
        'Hindari konsumsi bersamaan dengan obat sedatif medis dosis tinggi.'
      ],
      maxDailyIntake: '1-2 cangkir seduhan teh food-grade per hari.'
    },
    wikiSlug: 'Lavender',
    tags: ['Insomnia', 'Relaksasi', 'Anti Nyamuk', 'Aromaterapi', 'Bunga Hias']
  },
  {
    id: 'daun-pandan',
    name: 'Pandan Wangi',
    scientificName: 'Pandanus amaryllifolius',
    family: 'Pandanaceae',
    localNames: ['Pandan Rampeh', 'Fragrant Pandan', 'Seuke Bango'],
    category: 'rempah',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    description: 'Tanaman tropis dengan daun memanjang beraroma manis khas yang berasal dari senyawa 2-asetil-1-pirolin (senyawa yang sama pada beras melati/basmati). Penurun tensi darah alami dan pewarna hijau makanan tradisional.',
    origin: 'Kepulauan Maluku, Indonesia',
    activeCompounds: ['2-Asetil-1-Pirolin', 'Alkaloid', 'Flavonoid', 'Polifenol', 'Tanin'],
    healthBenefits: [
      {
        title: 'Menurunkan Tekanan Darah Tinggi (Hipertensi)',
        description: 'Membantu menenangkan pembuluh darah dan menstabilkan irama denyut jantung.',
        targetCategory: 'Hipertensi'
      },
      {
        title: 'Meredakan Nyeri Sendi, Rematik & Asam Urat',
        description: 'Minyak esensial pandan memiliki efek analgetik alami yang meredakan kekakuan sendi.',
        targetCategory: 'Sendi & Nyeri'
      },
      {
        title: 'Mengatasi Ketombe dan Rambut Rontok',
        description: 'Rebusan perasan daun pandan menghitamkan rambut alami dan menyegarkan kulit kepala.',
        targetCategory: 'Rambut'
      },
      {
        title: 'Menenangkan Pikiran & Meredakan Sakit Kepala',
        description: 'Aroma khas pandan menstimulasi ketenangan pikiran dan meredakan rasa cemas berlebih.',
        targetCategory: 'Relaksasi'
      }
    ],
    usageAndRecipes: [
      {
        title: 'Air Rebusan Teh Pandan Wangi',
        purpose: 'Menurunkan tensi, meredakan stres, dan mengharumkan napas.',
        ingredients: [
          '3-4 lembar daun pandan wangi segar (potong-potong 3 cm atau ikat simpul)',
          '500 ml air bersih',
          '1 sdm madu atau gula batu secukupnya'
        ],
        steps: [
          'Rebus air bersama daun pandan hingga mendidih dan aroma wangi semerbak keluar (sekitar 10 menit).',
          'Saring ke cangkir, tambahkan sedikit madu jika suka manis.',
          'Nikmati hangat di sore hari.'
        ],
        dosage: '1 cangkir sehari.'
      }
    ],
    careGuide: {
      difficulty: 'Mudah',
      sunlight: 'Sinar matahari sebagian (Partial shade) atau cahaya tersaring.',
      watering: 'Suka air melimpah; siram 1-2 kali sehari, jaga tanah tetap lembab basah.',
      soil: 'Tanah humus lempung yang kaya nutrisi dan basah.',
      fertilizer: 'Pupuk kompos atau pupuk daun organik cair tiap 1 bulan.',
      temperature: '23°C - 35°C (sangat tahan iklim tropis).',
      propagation: 'Anakan tunas samping yang tumbuh dari pangkal rumpun induk.',
      commonPests: ['Ulat daun', 'Kutu daun'],
      harvestingTips: 'Potong daun terluar dari bagian bawah, biarkan pucuk daun tengah terus tumbuh bertunas.'
    },
    cautions: {
      warnings: [
        'Konsumsi air rebusan pandan dalam jumlah sangat banyak memiliki efek laksatif pencahar ringan.'
      ],
      contraindications: [
        'Penderita penyakit ginjal berat sebaiknya membatasi karena kandungan mineral tertentu.'
      ],
      maxDailyIntake: 'Maksimal 3-5 lembar daun per hari dalam rebusan.'
    },
    wikiSlug: 'Pandan_wangi',
    tags: ['Hipertensi', 'Aroma Tradisional', 'Rambut', 'Relaksasi', 'Rempah']
  }
];
