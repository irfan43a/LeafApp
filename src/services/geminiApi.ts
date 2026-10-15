import { GoogleGenAI } from '@google/genai';
import type { Plant } from '../types/plant';
import { getGeminiApiKey } from './storage';

/**
 * Tanya Pakar Botani & Konsultan Herbal AI
 */
export async function askBotanistAi(
  question: string,
  history: Array<{ role: 'user' | 'model'; text: string }> = []
): Promise<string> {
  const apiKey = getGeminiApiKey();

  // If user provided a real Gemini API Key, use official @google/genai SDK with gemini-3.8-flash
  if (apiKey && apiKey.length > 10) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `Anda adalah "Dr. Botanika", seorang ahli botani senior, etnobotanik, dan dokter herbalis klinis terkemuka di Indonesia.
Tugas Anda:
1. Memberikan jawaban ilmiah, praktis, dan ramah seputar khasiat tanaman bagi kesehatan manusia serta panduan perawatan tanaman (berkebun, media tanam, pemupukan, hama).
2. Jika membahas khasiat herbal: jelaskan senyawa aktifnya, cara pengolahan/resep yang aman, serta PERINGATAN atau kontraindikasi medis jika ada.
3. Selalu ingatkan bahwa pengobatan herbal adalah komplementer dan anjurkan konsultasi dokter untuk kondisi darurat medis.
4. Gunakan bahasa Indonesia yang santun, runtut, jelas, dan menggunakan poin-poin terstruktur dengan emoji botani.`;

      const contents = [
        ...history.map(h => ({
          role: h.role,
          parts: [{ text: h.text }]
        })),
        {
          role: 'user',
          parts: [{ text: question }]
        }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contents as any,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (error: any) {
      console.warn('Gemini API call failed, falling back to smart botanical knowledge engine:', error);
      return `⚠️ **Catatan Sistem:** Panggilan Gemini API mengalami kendala (${error?.message || 'Cek koneksi/API Key Anda'}).\n\nBerikut panduan umum dari ensiklopedia lokal:\n${getSmartSimulatedAnswer(question)}`;
    }
  }

  // Fallback smart response when API key is not yet configured
  return getSmartSimulatedAnswer(question);
}

/**
 * Generate Artikel Tanaman Lengkap dengan AI
 */
export async function generatePlantArticleWithAi(plantName: string): Promise<Plant | null> {
  const apiKey = getGeminiApiKey();

  if (!apiKey || apiKey.length < 10) {
    throw new Error('Silakan masukkan Google Gemini API Key Anda di menu Pengaturan untuk menggunakan fitur Generate Artikel AI.');
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Buatkan data ensiklopedia tanaman lengkap dan terstruktur dalam format JSON MURNI (tanpa markdown backtick jika memungkinkan, atau dalam block json) untuk tanaman: "${plantName}".

JSON harus memiliki format persis seperti ini:
{
  "name": "${plantName}",
  "scientificName": "Nama ilmiah latin tanaman",
  "family": "Famili botani",
  "localNames": ["Nama lokal 1", "Nama lokal 2"],
  "category": "herbal" | "hias" | "sayur_buah" | "rempah" | "liar_berkhasiat",
  "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80",
  "description": "Deskripsi tanaman dan habitatnya...",
  "origin": "Asal persebaran tanaman...",
  "activeCompounds": ["Senyawa 1", "Senyawa 2", "Senyawa 3"],
  "healthBenefits": [
    {
      "title": "Judul Khasiat",
      "description": "Penjelasan mekanisme dan manfaat bagi manusia...",
      "targetCategory": "Imunitas / Pencernaan / Sendi / dll"
    }
  ],
  "usageAndRecipes": [
    {
      "title": "Nama Ramuan / Olahan",
      "purpose": "Tujuan khasiat...",
      "ingredients": ["Bahan 1", "Bahan 2"],
      "steps": ["Langkah 1", "Langkah 2"],
      "dosage": "Dosis konsumsi..."
    }
  ],
  "careGuide": {
    "difficulty": "Mudah" | "Sedang" | "Tantangan",
    "sunlight": "Kebutuhan sinar matahari...",
    "watering": "Frekuensi penyiraman...",
    "soil": "Jenis media tanah...",
    "fertilizer": "Rekomendasi pemupukan...",
    "temperature": "Rentang suhu...",
    "propagation": "Cara perbanyakan bibit...",
    "commonPests": ["Hama 1", "Hama 2"],
    "harvestingTips": "Tips memanen..."
  },
  "cautions": {
    "warnings": ["Peringatan penggunaan..."],
    "contraindications": ["Kontraindikasi untuk pasien/kondisi tertentu..."],
    "maxDailyIntake": "Batas takaran per hari..."
  },
  "tags": ["Tag1", "Tag2", "Tag3"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text || '';
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    const plant: Plant = {
      ...parsed,
      id: parsed.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now(),
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    return plant;
  } catch (error: any) {
    console.error('Failed to generate plant with Gemini:', error);
    throw new Error(`Gagal menghasilkan artikel tanaman via AI: ${error?.message || 'Error tidak diketahui'}`);
  }
}

/**
 * Smart Botanical Knowledge Simulator (saat API key belum diisi)
 */
function getSmartSimulatedAnswer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('lambung') || q.includes('maag') || q.includes('gerd')) {
    return `🌿 **Rekomendasi Tanaman untuk Lambung & GERD:**
1. **Kunyit (*Curcuma longa*)**: Mengandung kurkumin yang mempercepat regenerasi mukosa dinding lambung dan menetralkan keasaman berlebih.
2. **Lidah Buaya (*Aloe vera*)**: Gel alaminya memberikan lapisan pelindung anti-iritasi pada esofagus dan lambung (pastikan getah kuning aloin dicuci bersih).
3. **Temulawak (*Curcuma zanthorrhiza*)**: Meredakan peradangan dan merangsang produksi enzim pencernaan yang seimbang.

💡 **Cara Racik:** Rebus 2 ruas kunyit segar yang diparut dengan 300 ml air hingga hangat kuku, tambahkan 1 sdm madu murni. Minum 30 menit sebelum makan.

*(💡 Tips: Anda dapat memasukkan Google Gemini API Key di menu Pengaturan (ikon ⚙️) untuk berkonsultasi secara interaktif tanpa batas!)*`;
  }

  if (q.includes('batuk') || q.includes('flu') || q.includes('tenggorokan')) {
    return `🌿 **Rekomendasi Tanaman untuk Batuk & Radang Tenggorokan:**
1. **Jahe Merah (*Zingiber officinale var. rubrum*)**: Mengandung *gingerol* dan *shogaol* tertinggi yang mengencerkan dahak, menghangatkan dada, dan menekan refleks batuk.
2. **Jeruk Nipis & Kecap/Madu**: Asam sitrat membantu meluruhkan lendir dan madu melapisi dinding tenggorokan yang lecet.
3. **Daun Sirih Hijau**: Kandungan *eugenol* dan minyak atsiri membunuh kuman patogen di rongga mulut dan tenggorokan.

☕ **Resep Wedang Jahe Hangat:** Geprek 2 ruas jahe merah dan 1 batang sereh, rebus dengan 400 ml air selama 10 menit. Minum hangat sebelum tidur.`;
  }

  if (q.includes('kuning') || q.includes('daun menguning') || q.includes('hama') || q.includes('layu')) {
    return `🌱 **Diagnosis Perawatan Tanaman (Daun Menguning/Layu):**
1. **Penyiraman Berlebih (*Overwatering*)**: Penyebab nomor 1 daun menguning. Periksa bagian bawah pot—jika tanah becek dan berbau basah, kurangi frekuensi siram dan pastikan lubang drainase lancar.
2. **Kekurangan Unsur Hara (Nitrogen/Besi)**: Jika daun muda menguning sementara tulang daun tetap hijau (klorosis), berikan pupuk organik cair atau kompos kaya nitrogen.
3. **Kurang Sinar Matahari**: Tanaman tidak mampu berfotosintesis optimal sehingga klorofil daun berkurang. Pindahkan ke area dengan sinar matahari pagi.

💡 **Tindakan Cepat:** Cek kelembaban dengan menancapkan jari 2 cm ke tanah. Jika masih basah dingin, jangan disiram dahulu!`;
  }

  return `🌿 **Dr. Botanika (Pakar Herbal & Tanaman):**
Terima kasih atas pertanyaan Anda seputar dunia botani dan kesehatan alami!

Tanaman herbal Nusantara seperti **Kunyit, Jahe Merah, Daun Kelor, Temulawak, dan Lidah Buaya** memiliki sinergi zat fitokimia luar biasa:
- **Flavonoid & Polifenol**: Menangkal radikal bebas dan memperkuat imunitas.
- **Minyak Atsiri**: Bersifat antiseptik dan melegakan sistem organ.
- **Klorofil & Serat Alami**: Membantu detoksifikasi organ hati dan ginjal.

🌱 **Tips Perawatan Tanaman:** Kunci utama tanaman subur adalah perpaduan tepat antara **intensitas cahaya, sirkulasi udara, media tanam berpori (drainase baik), dan penyiraman teratur.**

*(🔑 Sambungkan Google Gemini API Key Anda di menu Pengaturan untuk analisis AI mendalam dan konsultasi interaktif tanpa batas!)*`;
}
