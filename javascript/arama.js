var girdi, myObj, date1, date2, regex

var Aylar=["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"]

var rastgele=["islam","müslüman","mümin","salih","cuma","namaz","zekat","deprem","intihar","haram","ibadet","muhammed","iman","nimet","tefekkür","namaz","oruç","münafık","müşrik","kafir","deccal","mesih"]

const sureAdlari=["Fâtiha","Bakara","Âl-i İmrân","Nisâ","Mâide","En'âm","A'râf","Enfâl","Tevbe","Yûnus","Hûd","Yûsuf","Ra'd","İbrâhîm","Hicr","Nahl","İsrâ","Kehf","Meryem","Tâhâ","Enbiyâ","Hac","Müminûn","Nûr","Furkân","Şuarâ","Neml","Kasas","Ankebut","Rûm","Lokman","Secde","Ahzâb","Sebe","Fâtİr","Yâsin","Sâffât","Sâd","Zümer","Mü’min","Fussilet","Şûrâ","Zuhruf","Duhân","Câsiye","Ahkâf","Muhammed","Fetih","Hucurât","Kaf","Zâriyât","Tûr","Necm","Kamer","Rahmân","Vâkıa","Hadîd","Mücadele","Haşr","Mümtehine","Saf","Cuma","Münâfikûn","Tegâbün","Talâk","Tahrîm","Mülk","Kalem","Hâkka","Meâric","Nûh","Cin","Müzzemmil","Müddessir","Kıyâmet","İnsan","Mürselât","Nebe'","Nâziât","Abese","Tekvîr","İnfitâr","Mutaffifîn","İnşikâk","Bürûc","Târık","A'lâ","Ğâşiye","Fecr","Beled","Şems","Leyl","Duha","İnşirah","Tîn","Alâk","Kadr","Beyyine","Zilzâl","Âdiyât","Kâria","Tekâsür","Asr","Hümeze","Fil","Kureyş","Mâûn","Kevser","Kâfirûn","Nasr","Mesed","İhlâs","Felâk","Nâs"];

const dilKodlari = { "tr": "Türkçe", "en": "İngilizce", "ar": "Arapça", "fr": "Fransızca", "de": "Almanca", "es": "İspanyolca", "it": "İtalyanca", "ru": "Rusça", "zh": "Çince", "ja": "Japonca", "ko": "Korece", "pt": "Portekizce", "nl": "Flemenkçe", "el": "Yunanca", "hi": "Hintçe", "sv": "İsveççe", "no": "Norveççe", "da": "Danca", "fi": "Fince", "pl": "Lehçe", "hu": "Macarca", "cs": "Çekçe", "sk": "Slovakça", "bg": "Bulgarca", "ro": "Rumence", "uk": "Ukraynaca", "sr": "Sırpça", "hr": "Hırvatça", "he": "İbranice", "fa": "Farsça" };

const kitapKategorileri = { "social science":"Sosyal Bilimler","fiction": "Kurgu", "religion": "Din", "history": "Tarih", "science": "Bilim", "biography": "Biyografi", "technology": "Teknoloji", "health": "Sağlık", "education": "Eğitim", "art": "Sanat", "business": "İş Dünyası", "self-help": "Kişisel Gelişim", "philosophy": "Felsefe", "psychology": "Psikoloji", "travel": "Seyahat", "cooking": "Yemek", "children": "Çocuk Kitapları", "poetry": "Şiir", "comics": "Çizgi Roman", "sports": "Spor", "law": "Hukuk", "music": "Müzik", "drama": "Drama", "romance": "Romantizm", "fantasy": "Fantastik", "horror": "Korku", "adventure": "Macera" };

const cevirKategori = (kategori) => kitapKategorileri[kategori.toLowerCase()] || kategori;

function id(e){return document.getElementById(e)}

function random(r){
	return r[Math.floor((Math.random()*r.length))]
	}

function baslat(){
	// Sayfa yüklendiğinde LocalStorage kontrolü yapılıyor
	var kaydedilenTur = localStorage.getItem("secilenAramaTuru");
	if (kaydedilenTur !== null) {
		id("aramaTuru").value = kaydedilenTur;
	}

	id("myInput").value=""
	
	id("myInput").addEventListener("keypress", function(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			Ara()
			}
		})
	
	//Ara()
	}

function Ara(e) {
    date1 = new Date();
    girdi = id("myInput").value;

    if (girdi === undefined || girdi === "undefined" || girdi.length < 3) {
        girdi = e || random(rastgele);
    }

    if (id("myInput").value !== girdi) {
        id("myInput").value = girdi;
    }

    girdi = kucukHarf(girdi);
    
    // Kelimeleri dinamik olarak <mark> içine alacak düzenli ifade
    regex = new RegExp("(" + girdi.trim() + ")", "gi");
    
    const arama$ = parseInt(id("aramaTuru").value);
    
    // Seçilen arama türünü anlık olarak hafızaya kaydediyoruz
    localStorage.setItem("secilenAramaTuru", arama$);

    id("sonucAlani").innerHTML = "<p>Lütfen bekleyin...</p>";

    switch (arama$) {
        case 0: kurandaAra(); break;
        case 1:  bibleGetir("0-13659,16098-22723"); break; // Tevrat
        case 2: risaleAra(); break;
        case 3: hadisAra("tur-tirmidhi"); break;
        case 4: hadisAra("tur-abudawud"); break;
        case 5: hadisAra("tur-bukhari"); break;
        case 6: hadisAra("tur-ibnmajah"); break;
        case 7: hadisAra("tur-malik"); break;
        case 8: hadisAra("tur-muslim"); break;
        case 9: hadisAra("tur-nasai"); break;
        case 10: wikipediadaAra(); break;
        case 11: tdkAra(); break;
        case 13: sozlukteAra(); break;
        case 16: avestaAra(); break;
        case 17: rigvedaAra(); break;
		case 18: tefsirAra("beyzavi"); break;
        case 19: tefsirAra("diyanet"); break;
        case 20: tefsirAra("elmali"); break;
        case 21: tefsirAra("ibnabbas"); break;
        case 22: tefsirAra("ibnkesir"); break;
        case 23: tefsirAra("maturidi"); break;
        case 24: tefsirAra("razi"); break;
        case 25: tefsirAra("zemahseri"); break;
        case 26: gitaAra(); break;
        case 27: talmudAra("Talmud/Bavli"); break;
		case 28: talmudAra("Talmud/Yerushalmi"); break;
		case 29: talmudAra("Chasidut"); break;
		case 30: talmudAra("Halakhah"); break;
		case 31: talmudAra("Jewish Thought"); break;
		case 32: talmudAra("Kabbalah"); break;
		case 33: talmudAra("Liturgy"); break;
		case 34: talmudAra("Midrash"); break;
		case 35: talmudAra("Mishnah"); break;
		case 36: talmudAra("Musar"); break;
		case 37: talmudAra("Responsa"); break;
		case 38: talmudAra("Second Temple"); break;
		case 39: talmudAra("Tanakh"); break;
		case 40: talmudAra("Tosefta"); break;
		case 41: bibleGetir("13660-16097"); break;         // Zebur
        case 42: bibleGetir("22724-30181"); break;         // İncil
    }
}

function sonucSayisi(e) {
    const date2 = new Date();
    const zamanFarki = date2.getTime() - date1.getTime();
    const saniye = (zamanFarki / 1000).toFixed(2);
    return `<p class='sonucSay'>Yaklaşık <b>${e}</b> sonuç bulundu. (${saniye} saniye)</p>`;
}

function ayetBicem(e, ee) {
    // Kurân Meali için kelime vurgulama - MARK yapİsİ
    let ayet$ = (e.text).replace(regex, "<mark>$1</mark>");
    return `
        <p class='meal'>
            <span>${ee + 1}) ${sureAdlari[e.surah.number-1]} ${e.numberInSurah}</span><br><br>
            ${ayet$}
        </p><hr style='border:0; border-top:1px dashed #ccc;'>`;
}

function kurandaAra() {
    const aranan = id("myInput").value.trim();
    if (aranan.length < 3) return;

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                const myObj = JSON.parse(this.responseText);
                
                // Başlangıç veya boşluk kontrolü için Regex
                const kontrolRegex = new RegExp("(^|\\s)" + aranan, "i");
                
                // Sadece kuralına uyanları filtrele
                const filtrelenmisMatches = myObj.data.matches.filter(match => 
                    kontrolRegex.test(match.text)
                );

                let a$ = sonucSayisi(filtrelenmisMatches.length);

                for (let i = 0; i < filtrelenmisMatches.length; i++) {

					const vurguRegex = new RegExp("((^|\\s)" + aranan + ")", "gi");
                    let metin = filtrelenmisMatches[i].text.replace(vurguRegex, "<mark>$1</mark>"); 
                    
                    // ayetBicem fonksiyonunu güncel metin ile çağırıyoruz
                    // Not: ayetBicem fonksiyonunun metni override ettiğinden emin olmalısın
                    let kopyaAyet = { ...filtrelenmisMatches[i], text: metin };
                    a$ += ayetBicem(kopyaAyet, i);
                }

                id("sonucAlani").innerHTML = a$;
            } else {
                id("sonucAlani").innerHTML = "<p>Bir hata oluştu. Lütfen tekrar deneyin.</p>";
            }
        } else if (this.readyState === 2) {
            id("sonucAlani").innerHTML = sonucSayisi(0);
        }
    };

    const girdi$ = "https://api.alquran.cloud/v1/search/" + encodeURIComponent(aranan) + "/all/tr.diyanet";
    xmlhttp.open("GET", girdi$, true);
    xmlhttp.send();
}



function kucukHarf(e) {	
    e = e.toLocaleLowerCase('tr-TR')
               .replace(/â/g, "a")
               .replace(/û/g, "u")
               .replace(/î/g, "i")
               .replace(/[&\/\\#,;+()$~%.'":*?<>{}]/g, '');
    return e;
}

function hadisAra(kitap) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const myObj = JSON.parse(this.responseText);
            let b$ = "";
            const girdi2 = kucukHarf(" " + girdi);
            let bulunan = 0;

            for (let i = 0; i < myObj["hadiths"].length; i++) {
                const hadis = myObj["hadiths"][i].text;
                const hadis2 = kucukHarf(hadis);

                if (hadis2.indexOf(girdi2) > -1) {
                    bulunan++;
                    // Hadis metinleri için kelime vurgulama - MARK yapİsİ
                    const highlightedHadis = hadis.replace(regex, "<mark>$1</mark>");
                    b$ += `<p class='meal'><span>${bulunan}) Hadis No: ${myObj["hadiths"][i].hadithnumber}</span><br><br>${highlightedHadis}</p><hr style='border:0; border-top:1px dashed #ccc;'>`;
                }
            }

            const a$ = sonucSayisi(bulunan) + b$;
            id("sonucAlani").innerHTML = a$;

        } else if (this.readyState == 2) {
            id("sonucAlani").innerHTML = sonucSayisi(0);
        }
    };

    xmlhttp.open("GET", "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/" + kitap + ".min.json", true);
    xmlhttp.send();
}

function wikipediadaAra() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://tr.wikipedia.org/w/api.php?action=query&prop=extracts&rvprop=content&format=json&callback=apiCallback&titles=" + encodeURIComponent(girdi) + "&redirects";
    document.body.appendChild(script);
}

function apiCallback(res) {
    veri = JSON.stringify(res.query.pages);
    veri = veri.substring(2);
    veri = veri.substring(0, veri.indexOf(":") - 1);
    
    baslik = JSON.stringify(res.query.pages[veri].title);
    icerik = JSON.stringify(res.query.pages[veri].extract);
    
    var resimURL = res.query.pages[veri].thumbnail ? res.query.pages[veri].thumbnail.source : null;

    if (icerik) {
        a$ = sonucSayisi(1);
        icerik = icerik.replace(/\\n/gi, "").slice(1);
        
        if (icerik.length == 738 || icerik.length == 737 || icerik == '""') {
            id("sonucAlani").innerHTML = sonucSayisi(0);
            return;
        }
        
        icerik = icerik.replace(/\\\"/gi, "\"");
        
        // Wikipedia içeri&eth;i için kelime vurgulama - MARK yapİsİ
        icerik = icerik.replace(regex, "<mark>$1</mark>");
        
        var resimHTML = resimURL ? "<img src='" + resimURL + "' alt='Resim' style='max-width: 100%; height: auto;'>" : "";
        id("sonucAlani").innerHTML = a$ + "<h1>" + baslik + "</h1>" + resimHTML + icerik;
    } else {
        id("sonucAlani").innerHTML = sonucSayisi(0);
    }
}

function tdkAra() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const myObj = JSON.parse(this.responseText);
            let bulunan = 0;
            let a$ = "";
            let b$ = "";

            for (let j = 0; j < myObj.length; j++) {
                b$ += "<h2>" + myObj[j].madde + "</h2>";
                const veri = myObj[j]["anhalarListe"];

                for (let i = 0; i < veri.length; i++) {
                    // TDK sözlük anlamlarİ için kelime vurgulama - MARK yapİsİ
                    let anlamHTML = veri[i].anlam.replace(regex, "<mark>$1</mark>");
                    b$ += "<p>" + (bulunan + 1) + ". " + anlamHTML + "</p>";
                    bulunan++;
                }
            }

            a$ = sonucSayisi(bulunan);
            id("sonucAlani").innerHTML = a$ + b$;
        } else if (this.readyState == 2) {
            id("sonucAlani").innerHTML = sonucSayisi(0);
        }
    };

    xmlhttp.open("GET", "https://sozluk.gov.tr/gts?ara=" + encodeURIComponent(girdi), true);
    xmlhttp.send();
}

function sozlukteAra() {
    const iframeHTML = "<iframe src='https://islamansiklopedisi.org.tr/arama/?q=" + encodeURIComponent(girdi) + "&p=m' frameborder='0' marginheight='0' marginwidth='0' style='width: 100%; height: 100%;'></iframe>";
    id("sonucAlani").innerHTML = iframeHTML;
}






function etimolojiAra() {
    // 1. Girdi kontrolü
    const girdiDegeri = id("myInput").value.trim();
    if (!girdiDegeri) {
        id("sonucAlani").innerHTML = "<p>Lütfen bir kelime girin.</p>";
        return;
    }

    // 2. Arayüzü hazırla
    id("sonucAlani").innerHTML = "<p>Sorgulanıyor: " + girdiDegeri + "...</p>";
    console.log("Sorgu başlatıldı: " + girdiDegeri);

    const regex = new RegExp("(" + girdiDegeri + ")", "gi");
    const url = "https://api.etimolojiturkce.com/word/" + encodeURIComponent(girdiDegeri);

    // 3. İsteği gerçekleştir (Fetch + Hata Yakalama)
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Sunucu " + response.status + " hatası döndürdü.");
            }
            return response.json();
        })
        .then(myObj => {
            // Başarılı olursa burası çalışır
            console.log("Veri başarıyla alındı.");

            let a$ = sonucSayisi(1);
            
            // HTML oluşturma kısmı
            let wordHTML = myObj.word ? myObj.word.replace(regex, "<mark>$1</mark>") : "Bilinmiyor";
            let explanationHTML = myObj.explanation ? myObj.explanation.replace(regex, "<mark>$1</mark>") : "Açıklama yok.";
            
            let b$ = "<h2>" + wordHTML + "</h2>";
            b$ += "<p class='meal'><span>Köken Dil:</span> " + (myObj.derivedLang || 'Bilinmiyor') + "</p>";
            b$ += "<p class='meal'><span>Açıklama:</span> " + explanationHTML + "</p>";
            
            if (myObj.root) {
                let rootHTML = myObj.root.replace(regex, "<mark>$1</mark>");
                b$ += "<p class='meal'><span>Köken (Kök):</span> " + rootHTML + "</p>";
            }
            
            if (myObj.additional) {
                let additionalHTML = myObj.additional.replace(regex, "<mark>$1</mark>");
                b$ += "<p class='meal'><span>Ek Bilgi:</span> " + additionalHTML + "</p>";
            }
            
            id("sonucAlani").innerHTML = a$ + b$;
        })
        .catch(err => {
            // Hata olursa burası çalışır
            console.error("Fetch Hatası:", err);
            id("sonucAlani").innerHTML = "<p style='color:red;'>Hata: " + err.message + "</p>" +
                                         "<p>İpucu: Eğer konsolda 'CORS' hatası görüyorsan, bu API tarayıcıdan doğrudan çağrılamaz. " +
                                         "Veriyi kendi projene bir JSON dosyası olarak kaydedip yerel okutman gerekir.</p>";
        });
}
























// Avesta İçin Özel Canlı Çeviri Yardımcısı
async function avestaTranslate(metin, kaynakDil, hedefDil) {
    if (!metin.trim()) return metin;
    try {
        var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + kaynakDil + "&tl=" + hedefDil + "&dt=t&q=" + encodeURIComponent(metin);
        var response = await fetch(url);
        if (!response.ok) return metin;
        var veri = await response.json();
        var ceviri = "";
        if (veri && veri[0]) {
            veri[0].forEach(function(satir) {
                if (satir[0]) ceviri += satir[0];
            });
        }
        return ceviri || metin;
    } catch (hata) {
        return metin;
    }
}

// Seçici Kelime Kontrolü (Özel isimleri korur, Türkçe kelimeleri çeviriye gönderir)
function avestaCeviriGerekliMi(kelime) {
    var ham = kelime.toLowerCase().trim();
    var ozelTerimler = ["ahura", "mazda", "zarathustra", "zoroaster", "haoma", "yasna", "sraosha", "visperad", "yazata", "atash"];
    
    if (ozelTerimler.indexOf(ham) !== -1) {
        return false; 
    }

    var turkceKarakterler = /[çşğüöıİ]/;
    if (turkceKarakterler.test(kelime)) {
        return true; 
    }

    return true; 
}

// Ana Avesta Arama Fonksiyonu (1-72 Arası Tarama & İlerleme Çubuğu)
async function avestaAra() {
    var arananKelime = girdi.trim(); 
    var aranacakIngilizceKelime = arananKelime;

    // Sonuç alanına ilerleme çubuğunu yerleştiriyoruz
    id("sonucAlani").innerHTML = 
        "<p id='avestaDurum'>Avesta Külliyatı analiz ediliyor...</p>" +
        "<div class='progress-container' id='pCont' style='display:block;'><div class='progress-bar' id='pBar'></div></div>";

    var pBar = id("pBar");
    var avestaDurum = id("avestaDurum");

    // Kelime analizi: Sadece Avesta'ya özel lokal çeviri
    if (avestaCeviriGerekliMi(arananKelime)) {
        var cevrilmis = await avestaTranslate(arananKelime, "tr", "en");
        aranacakIngilizceKelime = cevrilmis.trim().toLowerCase();
    } else {
        aranacakIngilizceKelime = arananKelime.toLowerCase();
    }

    var bulunanSonuclar = [];
    var toplamDosya = 72; // Klasördeki toplam dosya sayısı 72'ye çıkarıldı

    for (var i = 1; i <= toplamDosya; i++) {
        // İlerleme çubuğunu güncelliyoruz
        var yuzde = Math.round((i / toplamDosya) * 100);
        pBar.style.width = yuzde + "%";
        avestaDurum.innerHTML = "Avesta Külliyatı taranıyor: " + i + " / " + toplamDosya + " dosya incelendi... (%" + yuzde + ")";

        var rawUrl = "https://raw.githubusercontent.com/contexttesting/avesta/master/yasnas/" + i + ".html";
        
        try {
            var response = await fetch(rawUrl);
            if (!response.ok) continue;

            var hamHtml = await response.text();
            
            // HTML temizliği ve ayet ayrıştırma
            var temizMetin = hamHtml.replace(/<\/?[^>]+(>|$)/g, "");
            temizMetin = temizMetin.replace(/\r?\n|\r/g, " ");
            temizMetin = temizMetin.replace(/\s+/g, " ");

            // "1. ", "2. " düzenine göre ayetleri bölüyoruz
            var ayetler = temizMetin.split(/(?=\b\d+\.\s)/);

            ayetler.forEach(function(ayetMetni) {
                var hamAyet = ayetMetni.trim();
                if (hamAyet.length > 5 && hamAyet.toLowerCase().includes(aranacakIngilizceKelime)) {
                    bulunanSonuclar.push({
                        metin: hamAyet,
                        ref: "Yasnas - Dosya: " + i + ".html"
                    });
                }
            });

        } catch (e) {
            console.error(i + ".html taranırken hata.");
        }
    }

    if (bulunanSonuclar.length === 0) {
        id("sonucAlani").innerHTML = sonucSayisi(0) + "<p>Avesta içinde <b>\"" + arananKelime + "\"</b> ifadesini içeren bir ayet bulunamadı.</p>";
        return;
    }

    // Üst üste binmeyi engellemek için tüm çeviri süreçlerini adım adım (senkronize) yürütüyoruz
    avestaDurum.innerHTML = "Eşleşen ayetler Türkçeye tercüme ediliyor, lütfen bekleyin...";
    
    var limit = Math.min(bulunanSonuclar.length, 5); // İlk 5 sonucu sınırla
    var htmlAkisi = sonucSayisi(bulunanSonuclar.length);
    var dinamikTurkceRegex = new RegExp("(" + arananKelime + "|" + aranacakIngilizceKelime + ")", "gi");

    for (var n = 0; n < limit; n++) {
        var item = bulunanSonuclar[n];
        
        // Sırayla her metni çeviriyoruz (Üst üste binme bu sayede engellendi)
        var turkceMeal = await avestaTranslate(item.metin, "en", "tr");
        var vTur = turkceMeal.replace(dinamikTurkceRegex, "<mark>$1</mark>");

        // İngilizce metinleri kaldırdık, sadece Türkçe kalacak şekilde div mimarisine sokuyoruz
        htmlAkisi += "<div class='meal' style='position:relative; clear:both; margin-bottom:20px;'>" +
                     "<span>" + item.ref + "</span><br><br>" +
                     vTur + "" +
                     "</div><hr style='border:0; border-top:1px dashed #ccc; clear:both;'>";
    }

    // İlerleme çubuğunu gizle ve temiz sonuçları bas
    id("sonucAlani").innerHTML = htmlAkisi;
}












// Rigveda Arama Fonksiyonu - Boşluk Hatası Düzeltilmiş Sürüm
async function rigvedaAra() {
    var arananKelime = girdi.trim(); 
    var aranacakIngilizceKelime = arananKelime;

    id("sonucAlani").innerHTML = 
        "<p id='rigvedaDurum'>Rigveda Külliyatı GitHub üzerinden indiriliyor...</p>" +
        "<div class='progress-container' id='pCont' style='display:block;'><div class='progress-bar' id='pBar'></div></div>";

    var pBar = id("pBar");
    var rigvedaDurum = id("rigvedaDurum");

    // İÇE GÖMÜLÜ ÇEVİRİ MEKANİZMASI
    async function icCeviri(metin, kaynakDil, hedefDil) {
        if (!metin.trim()) return metin;
        try {
            var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + kaynakDil + "&tl=" + hedefDil + "&dt=t&q=" + encodeURIComponent(metin);
            var response = await fetch(url);
            if (!response.ok) return metin;
            var veri = await response.json();
            var ceviri = "";
            if (veri && veri[0]) {
                veri[0].forEach(function(satir) {
                    if (satir[0]) ceviri += satir[0];
                });
            }
            return ceviri || metin;
        } catch (hata) {
            return metin;
        }
    }

    // Türkçe aramayı arka planda İngilizceye çeviriyoruz
    var cevrilmis = await icCeviri(arananKelime, "tr", "en");
    aranacakIngilizceKelime = cevrilmis.trim();

    var aramaRegex = new RegExp(aranacakIngilizceKelime, "i"); 
    var bulunanSonuclar = [];
    var rawGithubUrl = "https://raw.githubusercontent.com/V33nom/Rigveda_api/main/data/rigveda.json";

    try {
        pBar.style.width = "50%";
        rigvedaDurum.innerHTML = "Uzak veritabanı analiz ediliyor...";

        var response = await fetch(rawGithubUrl);
        if (!response.ok) throw new Error("GitHub veritabanına erişilemedi.");

        var rigvedaVerisi = await response.json(); 
        pBar.style.width = "80%";

        if (Array.isArray(rigvedaVerisi)) {
            rigvedaVerisi.forEach(function(item) {
                if (item.translation && aramaRegex.test(item.translation)) {
                    bulunanSonuclar.push({
                        text: item.translation,
                        mandala: item.mandala,
                        hymn: item.hymn,
                        verse: item.verse
                    });
                }
            });
        }

    } catch (hata) {
        id("sonucAlani").innerHTML = "<p><b>Hata:</b> GitHub üzerindeki JSON dosyası yüklenirken bir sorun oluştu.</p>";
        console.error(hata);
        return;
    }

    if (bulunanSonuclar.length === 0) {
        id("sonucAlani").innerHTML = sonucSayisi(0) + "<div style='clear:both; padding-top:20px;'><p>Rigveda içinde <b>\"" + arananKelime + "\"</b> ifadesini içeren bir ayet bulunamadı.</p></div>";
        return;
    }

    rigvedaDurum.innerHTML = "Eşleşen kayıtlar Türkçeye tercüme ediliyor, lütfen bekleyin...";
    
    var limit = Math.min(bulunanSonuclar.length, 15); 
    var htmlAkisi = "";
    var dinamikTurkceRegex = new RegExp("(" + arananKelime + "|" + aranacakIngilizceKelime + ")", "gi");

    for (var n = 0; n < limit; n++) {
        var ayet = bulunanSonuclar[n];
        
        var turkceMeal = await icCeviri(ayet.text, "en", "tr");
        var vTur = turkceMeal.replace(dinamikTurkceRegex, "<mark>$1</mark>");

        htmlAkisi += "<div style='display: block !important; position: relative !important; clear: both !important; width: 100% !important; margin: 15px 0 !important; padding: 15px !important; background: #fff; border: 1px solid #eee; border-radius: 4px; box-sizing: border-box !important; height: auto !important;'>" +
                     "<span style='color: #d9534f !important; font-weight: bold !important; display: block !important; margin-bottom: 8px !important;'>Rigveda - Mandala: " + ayet.mandala + ", İlahi: " + ayet.hymn + ", Ayet: " + ayet.verse + "</span>" +
                     "<p style='margin: 0 !important; padding: 0 !important; display: block !important; height: auto !important; max-height: none !important; overflow: visible !important;'>" + vTur + "</p>" +
                     "</div>";
    }

    // İŞTE BURASI DÜZELTİLDİ: Yapay padding-top kaldırıldı (0 yapıldı)
    id("sonucAlani").innerHTML = 
        sonucSayisi(bulunanSonuclar.length) + 
        "<div style='clear: both !important; display: block !important; padding-top: 0px !important; width: 100% !important;'>" + 
        htmlAkisi + 
        "</div>";
}
















async function gitaAra() {
    var arananKelime = id("myInput").value.trim();
    if (arananKelime.length < 3) return;

    id("sonucAlani").innerHTML = "<p id='gitaDurum'>Bhagavad Gita aranıyor...</p>";

    try {
        var aranacakIngilizceKelime = await avestaTranslate(arananKelime, "tr", "en");
        var regex = new RegExp("(" + arananKelime + "|" + aranacakIngilizceKelime + ")", "gi");

        var response = await fetch("Books/bhagavat_gita_verse.json");
        var veri = await response.json(); 
        
        var bulunanlar = veri.filter(item => 
            item.text.toLowerCase().includes(arananKelime.toLowerCase()) || 
            item.meaning.toLowerCase().includes(aranacakIngilizceKelime.toLowerCase())
        );

        if (bulunanlar.length === 0) {
            id("sonucAlani").innerHTML = sonucSayisi(0) + "<p>Sonuç bulunamadı.</p>";
            return;
        }

        var htmlAkisi = sonucSayisi(bulunanlar.length);
        var limit = Math.min(bulunanlar.length, 20);

        // Double Danda (U+0965) ile tam isabet
        var danda = "\u0965"; 

        for (var i = 0; i < limit; i++) {
            var item = bulunanlar[i];
            
            var index = item.text.indexOf(danda);
            var temizText = (index !== -1) ? item.text.substring(0, index).trim() : item.text;
            var ayetNo = (index !== -1) ? item.text.substring(index + 1).replace(/[^0-9]/g, "").trim() : "";
            
            var turkceMeal = await avestaTranslate(item.meaning, "en", "tr");
            var vTur = turkceMeal.replace(regex, "<mark>$1</mark>");

            htmlAkisi += `
                <p style='margin: 20px 0; border-bottom: 1px solid #ccc; padding-bottom: 15px;'>
                    <b style='color: #a30; font-size: 1.1em;'>Bölüm ${item.chapter_number}:${ayetNo}</b><br><br>
                    <span style='font-family: Amiri, serif; font-size: 22px; display: block; line-height: 1.5; direction: ltr; unicode-bidi: embed; text-align: left;'>${temizText}</span><br>
                    <span style='display: block; line-height: 1.6; margin-top: 10px;'>${vTur}</span>
                </p>`;
        }
        
        id("sonucAlani").innerHTML = htmlAkisi;
    } catch (hata) {
        id("sonucAlani").innerHTML = "<p>Bir hata oluştu: " + hata.message + "</p>";
    }
}































// Dosyaları açmak için odaklama özellikli güncellenmiş fonksiyon
async function dosyayiAc(url, dil, dosyaAdi) {
    // "TalmudOkuyucu" ismi ile hep aynı pencereyi kullanıyoruz
    let yeniPencere = window.open("", "TalmudOkuyucu");
    
    // Pencere içeriğini tamamen yeniden yazıyoruz
    yeniPencere.document.open();
    yeniPencere.document.write(`
        <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=windows-1254">
            <link href="https://fonts.googleapis.com/css2?family=Amiri&family=Quicksand&display=swap" rel="stylesheet">
            <title>${dosyaAdi}</title>
            <style>
                body { font-family: 'Quicksand', sans-serif; padding: 40px; }
                h1 { color: #a30; font-family: 'Quicksand', sans-serif; }
                p { color: #000; font-family: 'Quicksand', sans-serif; font-size: 20px; line-height: 1.6; }
            </style>
        </head>
        <body>
            <h1>${dosyaAdi}</h1>
            <div id="icerik">Yükleniyor...</div>
        </body>
        </html>
    `);
    yeniPencere.document.close();
    
    // Pencereyi ön plana getir
    yeniPencere.focus();

    try {
        let res = await fetch(url);
        let text = await res.text();
        let lines = text.split('\n');
        
        let container = yeniPencere.document.getElementById('icerik');
        container.innerHTML = ""; // Yükleniyor yazısını sil

        for (let line of lines) {
            if (line.trim().length > 0) {
                let metin = line;
                if (dil === 'tr') {
                    metin = await avestaTranslate(line, "en", "tr");
                }
                let p = yeniPencere.document.createElement('p');
                p.innerText = metin;
                container.appendChild(p);
            }
        }
    } catch (e) {
        yeniPencere.document.getElementById('icerik').innerText = "Hata oluştu: " + e.message;
    }
}

// Dil algılama fonksiyonu
async function diliAlgila(metin) {
    try {
        var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=" + encodeURIComponent(metin);
        var response = await fetch(url);
        var veri = await response.json();
        // Google, cevabın içinde algılanan dili [2] indexinde verir
        return veri[2]; 
    } catch (e) {
        return "en"; // Hata olursa varsayılan olarak İngilizce kabul et
    }
}

async function talmudAra(talmudTuru) {
    var arananKelime = id("myInput").value.trim();
    if (arananKelime.length < 3) {
        id("sonucAlani").innerHTML = "<p>Lütfen en az 3 karakter girin.</p>";
        return;
    }

    // CSS eklemeleri buraya (eğer daha önce yoksa)
    var style = document.createElement('style');
    style.innerHTML = `
        .bayrakLink { opacity: 0.5; transition: opacity 0.3s ease; cursor: pointer; }
        .bayrakLink:hover { opacity: 1.0; }
    `;
    document.head.appendChild(style);

    id("sonucAlani").innerHTML = 
        `<p id='talmudDurum'>${talmudTuru} taranıyor, lütfen bekleyin...</p>` +
        `<p id='pBarDurum' style='width:100%; background:#eee; height:12px; border-radius:4px;'><span id='pBar' style='display:block; width:0%; height:100%; background:#e76f51; border-radius:4px;'></span></p>` +
        `<div id='sonucListesi'></div>`;

    var pBar = id("pBar");
    var talmudDurum = id("talmudDurum");
    var sonucListesi = id("sonucListesi");
    
    var algilananDil = await diliAlgila(arananKelime);
    var aranacakIngilizceKelime;

    if (algilananDil === "tr") {
        aranacakIngilizceKelime = await avestaTranslate(arananKelime, "tr", "en");
    } else {
        aranacakIngilizceKelime = arananKelime;
    }

    var regex = new RegExp("(" + arananKelime + "|" + aranacakIngilizceKelime + ")", "gi");
    var repoUrl = `https://huggingface.co/api/datasets/RockyCo/jude-judaic-data/tree/main/sefaria_rag_markdown/en/${talmudTuru}?recursive=true`;
    
    try {
        var response = await fetch(repoUrl);
        var files = await response.json();
        var mdFiles = files.filter(f => f.type === "file" && f.path.endsWith(".md"));
        var toplamDosya = mdFiles.length;
        var bulunanSayac = 0;

        for (let i = 0; i < toplamDosya; i++) {
            let file = mdFiles[i];
            let dosyaAdi = file.path.split('/').pop().replace(/\.md$/, "");
            let rawUrl = `https://huggingface.co/datasets/RockyCo/jude-judaic-data/resolve/main/${file.path}`;
            
            try {
                let res = await fetch(rawUrl);
                let text = await res.text();
                
                let lines = text.split('\n');
                let eslesenSatirlar = lines.filter(l => l.toLowerCase().includes(aranacakIngilizceKelime.toLowerCase()));

                if (eslesenSatirlar.length > 0) {
                    for (let snippet of eslesenSatirlar) {
                        bulunanSayac++;
                        let turkceMetin = await avestaTranslate(snippet, "en", "tr");
                        let vurgulu = turkceMetin.replace(regex, "<mark>$1</mark>");
                        
                        let yeniSonuc = document.createElement('p');
                        yeniSonuc.style = 'margin: 15px 0; border-bottom: 1px dashed #ccc; padding-bottom: 10px; line-height: 1.6;';
                        // Class eklendi: bayrakLink
                        yeniSonuc.innerHTML = `<b style='color:#a30;'> ${bulunanSayac}) ${dosyaAdi} </b> 
                        <span class="bayrakLink" onclick="dosyayiAc('${rawUrl}', 'tr', '${dosyaAdi}')">&#127481;&#127479;</span> 
                        <span class="bayrakLink" onclick="dosyayiAc('${rawUrl}', 'en', '${dosyaAdi}')">&#127468;&#127463;</span>
                        <br>${vurgulu}`;
                        sonucListesi.appendChild(yeniSonuc);
                    }
                }
            } catch (e) {}

            let yuzde = Math.round(((i + 1) / toplamDosya) * 100);
            pBar.style.width = yuzde + "%";
            talmudDurum.innerHTML = `<b>${dosyaAdi}</b> taranıyor ${i + 1}/${toplamDosya} dosya (Bulunan: ${bulunanSayac})`;
        }

        if (bulunanSayac === 0) {
            sonucListesi.innerHTML = "<p>Sonuç bulunamadı.</p>";
        } else {
            talmudDurum.innerHTML = `Arama tamamlandı. Toplam ${bulunanSayac} sonuç bulundu.`;
        }

    } catch (hata) {
        id("sonucAlani").innerHTML = "<p>Talmud aranırken bir hata oluştu: " + hata.message + "</p>";
    }
}










async function bibleGetir(aralik) {
    id("sonucAlani").innerHTML = "<p>Lütfen bekleyin, veriler analiz ediliyor...</p>";

    try {
        const response = await fetch('Books/bible.json');
        const tumVeri = await response.json();
        
        const araliklar = aralik.split(',');
        let seciliAyetler = [];

        araliklar.forEach(a => {
            const parcalar = a.split('-').map(Number);
            const baslangic = parcalar[0];
            const bitis = parcalar[1];
            const parca = tumVeri.verses.slice(baslangic, bitis + 1);
            seciliAyetler = seciliAyetler.concat(parca);
        });

        const aranan = id("myInput").value.trim();
        if (aranan.length < 3) return;

        // ^ başlangıç veya \s boşluk. Ardından aranan kelime.
        // Kelimenin devamı herhangi bir karakter olabilir (adamlar, adamlarda vb.)
        const kontrolRegex = new RegExp("(^|\\s)" + aranan, "i");
        
        // Vurgulama için global regex: Sadece kelime başlangıcını yakalar
        const vurguRegex = new RegExp("((^|\\s)" + aranan + ")", "gi");

        const bulunanlar = seciliAyetler.filter(verse => 
            kontrolRegex.test(verse.text)
        );

        let htmlAkisi = sonucSayisi(bulunanlar.length);
        
        bulunanlar.forEach((item, i) => {
            // Metindeki eşleşmeleri vurgula
            // $1 yakalanan grup (boşluk veya başlangıç + aranan kelime)
            let metin = item.text.replace(vurguRegex, "<mark>$1</mark>");
            
            htmlAkisi += `
                <p class='meal'>
                    <span>${i + 1}) ${item.book_name.trim()} ${item.chapter}:${item.verse}</span>
                    <br><br>
                    ${metin}
                </p>
                <hr style='border:0; border-top:1px dashed #ccc;'>`;
        });

        id("sonucAlani").innerHTML = htmlAkisi;

    } catch (error) {
        console.error("Bible yükleme hatası:", error);
        id("sonucAlani").innerHTML = "<p>Veri yüklenirken bir hata oluştu.</p>";
    }
}




async function tefsirAra(tefsirAdi) {

    var arananKelime = id("myInput").value.trim();

    if (arananKelime.length < 3) return;


    id("sonucAlani").innerHTML = `

        <div id="progressContainer" style="width:100%; background:#eee; margin-bottom:15px; height:8px;">

            <div id="progressBar" style="width:0%; height:100%; background:#a30;"></div>

        </div>

        <p id="progressText" style="color:#70757a;">Taranıyor...</p>`;


    const sozluk = { "Ey": ["nî Ë", "îY"] };

    var url = "Tefsir/" + tefsirAdi + ".json";

    var sureOnbellek = {};

    var gorunenTefsirler = new Set();


    try {

        var response = await fetch(url);

        var veri = await response.json();

        

        // Kelime sınırı kontrolü için Regex (Başında boşluk veya başlangıç, sonunda boşluk veya noktalama işaretleri)

        // \b kelime sınırını ifade eder, ancak Türkçe karakterler için esnek bir yapı kuruyoruz:

        var aramaRegex = new RegExp("(^|\\s|[\\.,;!?])" + arananKelime + "($|\\s|[\\.,;!?])", "gi");

        

        var eslesenler = [];

        for (const [key, value] of Object.entries(veri)) {

            let metin = value || "";

            for (const [duzgun, bozuklar] of Object.entries(sozluk)) {

                bozuklar.forEach(b => { metin = metin.split(b).join(duzgun); });

            }

            

            // Regex ile tam kelime eşleşmesi kontrolü

            if (aramaRegex.test(metin)) {

                eslesenler.push({ key, metin });

            }

        }


        var htmlAkisi = "";

        var gecerliSonucSayisi = 0;

        var toplam = eslesenler.length;


        for (let i = 0; i < toplam; i++) {

            let { key, metin } = eslesenler[i];

            

            if (gorunenTefsirler.has(metin)) continue;

            

            gorunenTefsirler.add(metin);

            gecerliSonucSayisi++;


            let parcalar = key.split(/[-:]/);

            let sureNo = parseInt(parcalar[0]) || 1;

            let ayetNo = parseInt(parcalar[1]) || 1;


            if (!sureOnbellek[sureNo]) {

                try {

                    let mRes = await fetch("https://api.alquran.cloud/v1/surah/" + sureNo + "/tr.diyanet");

                    let mData = await mRes.json();

                    sureOnbellek[sureNo] = mData.data.ayahs;

                } catch (e) {

                    console.error("API Hatası:", e);

                    sureOnbellek[sureNo] = []; 

                }

            }


            let dogruMeal = sureOnbellek[sureNo][ayetNo - 1]?.text || "Meal bulunamadı.";

            

            // Regex ile vurgulama

            let vurguluMetin = metin.replace(aramaRegex, (match, p1, p2) => {

                return p1 + "<mark>" + arananKelime + "</mark>" + p2;

            });


            htmlAkisi += `

                <p style='color:#a30; font-weight:bold; margin-bottom:5px;'>“${dogruMeal}” (${sureAdlari[sureNo - 1]} ${ayetNo})</p>

                <p style='margin-bottom:20px; color:#2c2c2c;'>${gecerliSonucSayisi}) ${vurguluMetin}</p>`;

            

            let yuzde = ((i + 1) / toplam) * 100;

            id("progressBar").style.width = yuzde + "%";

            id("progressText").innerText = "İşleniyor: " + (i + 1) + " / " + toplam;

        }


        id("sonucAlani").innerHTML = sonucSayisi(gecerliSonucSayisi) + htmlAkisi;

    } catch (hata) {

        id("sonucAlani").innerHTML = "Hata: " + hata.message;

    }

}

var risaleler = {
  "RisaleTxt": {
    "AnaDosyalar": [
      "sonuc.txt",
      "Yeni Metin Belgesi.txt"
    ],
    "Kategoriler": {
      "01 Sözler": [
        "Sözler-01-Birinci Söz.txt",
        "Sözler-02-İkinci Söz.txt",
        "Sözler-03-Üçüncü Söz.txt",
        "Sözler-04-Dördüncü Söz.txt",
        "Sözler-05-Beşinci Söz.txt",
        "Sözler-06-Altıncı Söz.txt",
        "Sözler-07-Yedinci Söz.txt",
        "Sözler-08-Sekizinci Söz.txt",
        "Sözler-09-Dokuzuncu Söz.txt",
        "Sözler-10-Onuncu Söz.txt",
        "Sözler-11-On Birinci Söz.txt",
        "Sözler-12-On İkinci Söz.txt",
        "Sözler-13-On Üçüncü Söz.txt",
        "Sözler-14-On Dördüncü Söz.txt",
        "Sözler-15-On Beşinci Söz.txt",
        "Sözler-16-On Altıncı Söz.txt",
        "Sözler-17-On Yedinci Söz.txt",
        "Sözler-18-On Sekizinci Söz.txt",
        "Sözler-19-On Dokuzuncu Söz.txt",
        "Sözler-20-Yirminci Söz.txt",
        "Sözler-21-Yirmi Birinci Söz.txt",
        "Sözler-22-Yirmi İkinci Söz.txt",
        "Sözler-23-Yirmi Üçüncü Söz.txt",
        "Sözler-24-Yirmi Dördüncü Söz.txt",
        "Sözler-25-Yirmi Beşinci Söz.txt",
        "Sözler-26-Yirmi Altıncı Söz.txt",
        "Sözler-27-Yirmi Yedinci Söz.txt",
        "Sözler-28-Yirmi Sekizinci Söz.txt",
        "Sözler-29-Yirmi Dokuzuncu Söz.txt",
        "Sözler-30-Otuzuncu Söz.txt",
        "Sözler-31-Otuz Birinci Söz.txt",
        "Sözler-32-Otuz İkinci Söz.txt",
        "Sözler-33-Otuz Üçüncü Söz.txt",
        "Sözler-34-Lemaat (Sözler).txt",
        "Sözler-35-Konferans (Sözler).txt",
        "Sözler-36-Fihrist (Sözler).txt"
      ],
      "02 Mektubat": [
        "Mektubat-01-Birinci Mektup.txt",
        "Mektubat-02-İkinci Mektup.txt",
        "Mektubat-03-Üçüncü Mektup.txt",
        "Mektubat-04-Dördüncü Mektup.txt",
        "Mektubat-05-Beşinci Mektup.txt",
        "Mektubat-06-Altıncı Mektup.txt",
        "Mektubat-07-Yedinci Mektup.txt",
        "Mektubat-08-Sekizinci Mektup.txt",
        "Mektubat-09-Dokuzuncu Mektup.txt",
        "Mektubat-10-Onuncu Mektup.txt",
        "Mektubat-11-On Birinci Mektup.txt",
        "Mektubat-12-On İkinci Mektup.txt",
        "Mektubat-13-On Üçüncü Mektup.txt",
        "Mektubat-14-On Dördüncü Mektup.txt",
        "Mektubat-15-On Beşinci Mektup.txt",
        "Mektubat-16-On Altıncı Mektup.txt",
        "Mektubat-17-On Yedinci Mektup.txt",
        "Mektubat-18-On Sekizinci Mektup.txt",
        "Mektubat-19-On Dokuzuncu Mektup.txt",
        "Mektubat-20-Yirminci Mektup.txt",
        "Mektubat-21-Yirmi Birinci Mektup.txt",
        "Mektubat-22-Yirmi İkinci Mektup.txt",
        "Mektubat-23-Yirmi Üçüncü Mektup.txt",
        "Mektubat-24-Yirmi Dördüncü Mektup.txt",
        "Mektubat-25-Yirmi Beşinci Mektup.txt",
        "Mektubat-26-Yirmi Altıncı Mektup.txt",
        "Mektubat-27-Yirmi Yedinci Mektup.txt",
        "Mektubat-28-Yirmi Sekizinci Mektup.txt",
        "Mektubat-29-Yirmi Dokuzuncu Mektup.txt",
        "Mektubat-30-Otuzuncu Mektup.txt",
        "Mektubat-31-Otuz Birinci Mektup.txt",
        "Mektubat-32-Otuz İkinci Mektup.txt",
        "Mektubat-33-Otuz Üçüncü Mektup.txt",
        "Mektubat-34-İşarat-ı Gaybiye Hakkında Bir Takriz.txt",
        "Mektubat-35-Hakikat Çekirdekleri.txt",
        "Mektubat-36-Gönüller Fatihi Büyük Üstada.txt",
        "Mektubat-37-Fihriste-i Mektubat.txt",
        "Mektubat-38-Hakikat Işıkları.txt",
        "Mektubat-39-Dua (Mektubat).txt"
      ],
      "03 Lem'alar": [
        "Lem'alar-01-Birinci Lem'a.txt",
        "Lem'alar-02-İkinci Lem'a.txt",
        "Lem'alar-03-Üçüncü Lem'a.txt",
        "Lem'alar-04-Dördüncü Lem'a.txt",
        "Lem'alar-05-Beşinci Lem'a.txt",
        "Lem'alar-06-Altıncı Lem'a.txt",
        "Lem'alar-07-Yedinci Lem'a.txt",
        "Lem'alar-08-Sekizinci Lem'a.txt",
        "Lem'alar-09-Dokuzuncu Lem'a.txt",
        "Lem'alar-10-Onuncu Lem'a.txt",
        "Lem'alar-11-On Birinci Lem'a.txt",
        "Lem'alar-12-On İkinci Lem'a.txt",
        "Lem'alar-13-On Üçüncü Lem'a.txt",
        "Lem'alar-14-On Dördüncü Lem'a.txt",
        "Lem'alar-15-On Beşinci Lem'a.txt",
        "Lem'alar-16-On Altıncı Lem'a.txt",
        "Lem'alar-17-On Yedinci Lem'a.txt",
        "Lem'alar-18-On Sekizinci Lem'a.txt",
        "Lem'alar-19-On Dokuzuncu Lem'a.txt",
        "Lem'alar-20-Yirminci Lem'a.txt",
        "Lem'alar-21-Yirmi Birinci Lem'a.txt",
        "Lem'alar-22-Yirmi İkinci Lem'a.txt",
        "Lem'alar-23-Yirmi Üçüncü Lem'a.txt",
        "Lem'alar-24-Yirmi Dördüncü Lem'a.txt",
        "Lem'alar-25-Yirmi Beşinci Lem'a.txt",
        "Lem'alar-26-Yirmi Altıncı Lem'a.txt",
        "Lem'alar-27-Yirmi Yedinci Lem'a.txt",
        "Lem'alar-28-Yirmi Sekizinci Lem'a.txt",
        "Lem'alar-29-Yirmi Dokuzuncu Lem'a.txt",
        "Lem'alar-30-Otuzuncu Lem'a.txt",
        "Lem'alar-31-Otuz Birinci Lem'a.txt",
        "Lem'alar-32-Otuz İkinci Lem'a.txt",
        "Lem'alar-33-Otuz Üçüncü Lem'a.txt",
        "Lem'alar-34-Münâcat (Lem'alar).txt",
        "Lem'alar-35-Fihrist (Lem'alar).txt",
        "Lem'alar-36-Dua (Lem'alar).txt"
      ],
      "04 Şuâlar": [
        "Şuâlar-01-Birinci Şuâ.txt",
        "Şuâlar-02-İkinci Şuâ.txt",
        "Şuâlar-03-Üçüncü Şuâ.txt",
        "Şuâlar-04-Dördüncü Şuâ.txt",
        "Şuâlar-05-Beşinci Şuâ.txt",
        "Şuâlar-06-Altıncı Şuâ.txt",
        "Şuâlar-07-Yedinci Şuâ.txt",
        "Şuâlar-08-Sekizinci Şuâ.txt",
        "Şuâlar-09-Dokuzuncu Şuâ.txt",
        "Şuâlar-10-On Birinci Şuâ.txt",
        "Şuâlar-11-On İkinci Şuâ.txt",
        "Şuâlar-12-On Üçüncü Şuâ.txt",
        "Şuâlar-13-On Dördüncü Şuâ.txt",
        "Şuâlar-14-On Beşinci Şuâ.txt",
        "Şuâlar-15-Yirmi Dokuzuncu Lem'a'dan İkinci Bab.txt",
        "Şuâlar-16-Eddâî.txt",
        "Şuâlar-17-Dua (Şuâlar).txt",
        "Şuâlar-18-İçindekiler (Şuâlar).txt"
      ],
      "05 Tarihçe-i Hayat": [
        "Tarihçe-i Hayat-01-Ön söz.txt",
        "Tarihçe-i Hayat-02-Giriş.txt",
        "Tarihçe-i Hayat-03-İlk Hayatı.txt",
        "Tarihçe-i Hayat-04-Barla Hayatı.txt",
        "Tarihçe-i Hayat-05-Eskişehir Hayatı.txt",
        "Tarihçe-i Hayat-06-Kastamonu Hayatı.txt",
        "Tarihçe-i Hayat-07-Denizli Hayatı.txt",
        "Tarihçe-i Hayat-08-Emirdağ Hayatı.txt",
        "Tarihçe-i Hayat-09-Afyon Hayatı.txt",
        "Tarihçe-i Hayat-10-Isparta Hayatı.txt",
        "Tarihçe-i Hayat-11-Hariç Memleketler.txt",
        "Tarihçe-i Hayat-12-Bedîüzzaman ve Risale-i Nur.txt",
        "Tarihçe-i Hayat-13-Dua (Tarihçe-i Hayatı).txt",
        "Tarihçe-i Hayat-14-İçindekiler.txt"
      ],
      "06 Mesnevî-i Nuriye": [
        "Mesnevî-i Nuriye-01-İ'tizar.txt",
        "Mesnevî-i Nuriye-02-Mukaddime.txt",
        "Mesnevî-i Nuriye-03-Lem'alar Risalesi.txt",
        "Mesnevî-i Nuriye-04-Reşhalar.txt",
        "Mesnevî-i Nuriye-05-Lâsiyyemalar.txt",
        "Mesnevî-i Nuriye-06-Katre.txt",
        "Mesnevî-i Nuriye-07-Hubab.txt",
        "Mesnevî-i Nuriye-08-Habbe.txt",
        "Mesnevî-i Nuriye-09-Zühre.txt",
        "Mesnevî-i Nuriye-10-Zerre.txt",
        "Mesnevî-i Nuriye-11-Şemme Risalesi.txt",
        "Mesnevî-i Nuriye-12-Onuncu Risale.txt",
        "Mesnevî-i Nuriye-13-Şule.txt",
        "Mesnevî-i Nuriye-14-Nokta.txt",
        "Mesnevî-i Nuriye-15-Münderecat Hakkında.txt",
        "Mesnevî-i Nuriye-16-Fihrist (Mesnevî).txt"
      ],
      "07 İşaratü'l-i'caz": [
        "İşaratü'l-i'caz-01-Tenbih.txt",
        "İşaratü'l-i'caz-02-İfadetü'l-Meram.txt",
        "İşaratü'l-i'caz-03-Kur'an'ın Tarifi.txt",
        "İşaratü'l-i'caz-04-Fatiha Suresi.txt",
        "İşaratü'l-i'caz-05-Bakara Suresi 1- 2- 3. âyetler.txt",
        "İşaratü'l-i'caz-06-Bakara Suresi 4-5. âyetler.txt",
        "İşaratü'l-i'caz-07-Bakara Suresi 6. âyet.txt",
        "İşaratü'l-i'caz-08-Bakara Suresi 7. âyet.txt",
        "İşaratü'l-i'caz-09-Bakara Suresi 8. âyet.txt",
        "İşaratü'l-i'caz-10-Bakara Suresi 9-10. âyetler.txt",
        "İşaratü'l-i'caz-11-Bakara Suresi 11-12. âyetler.txt",
        "İşaratü'l-i'caz-12-Bakara Suresi 13. âyet.txt",
        "İşaratü'l-i'caz-13-Bakara Suresi 14-15. âyetler.txt",
        "İşaratü'l-i'caz-14-Bakara Suresi 16. âyet.txt",
        "İşaratü'l-i'caz-15-Bakara Suresi 17-18-19-20. âyetler.txt",
        "İşaratü'l-i'caz-16-Bakara Suresi 21-22. âyetler.txt",
        "İşaratü'l-i'caz-17-Bakara Suresi 23-24. âyetler.txt",
        "İşaratü'l-i'caz-18-Bakara Suresi 25. âyet.txt",
        "İşaratü'l-i'caz-19-Bakara Suresi 26-27. âyetler.txt",
        "İşaratü'l-i'caz-20-Bakara Suresi 28. âyet.txt",
        "İşaratü'l-i'caz-21-Bakara Suresi 29. âyet.txt",
        "İşaratü'l-i'caz-22-Bakara Suresi 30. âyet.txt",
        "İşaratü'l-i'caz-23-Bakara Suresi 31-32-33. âyetler.txt",
        "İşaratü'l-i'caz-24-Ecnebi Feylesofların Kur'an Hakkındaki Beyanatları.txt",
        "İşaratü'l-i'caz-25-Mehmed Kayalar'ın Bir Müdafaası.txt",
        "İşaratü'l-i'caz-26-Dua (İşaratü'l-İ'caz).txt",
        "İşaratü'l-i'caz-27-Fihrist (İşaratü'l-İ'caz).txt"
      ],
      "08 Sikke-i Tasdik-i Gaybî": [
        "Sikke-i Tasdik-i Gaybî-01-Parlak Fıkralar ve Güzel Mektuplar 1.txt",
        "Sikke-i Tasdik-i Gaybî-02-Birinci Şuâ.txt",
        "Sikke-i Tasdik-i Gaybî-03-Sekizinci Şuâ.txt",
        "Sikke-i Tasdik-i Gaybî-04-On Sekizinci Lem'a.txt",
        "Sikke-i Tasdik-i Gaybî-05-Yirmi Sekizinci Lem'a.txt",
        "Sikke-i Tasdik-i Gaybî-06-Sekizinci Lem'a.txt",
        "Sikke-i Tasdik-i Gaybî-07-Parlak Fıkralar ve Güzel Mektuplar 2.txt",
        "Sikke-i Tasdik-i Gaybî-08-Dua (Sikke-i Tasdik-i Gaybî).txt"
      ],
      "09 Barla Lâhikası": [
        "Barla Lâhikası-01-Barla Lâhikası - Takdim.txt",
        "Barla Lâhikası-02-Barla Lâhikası - Yedinci Risale.txt",
        "Barla Lâhikası-03-Barla Lâhikası s.21-39.txt",
        "Barla Lâhikası-04-Barla Lâhikası s.40-58.txt",
        "Barla Lâhikası-05-Barla Lâhikası s.59-80.txt",
        "Barla Lâhikası-06-Barla Lâhikası s.80-102.txt",
        "Barla Lâhikası-07-Barla Lâhikası s.103-121.txt",
        "Barla Lâhikası-08-Barla Lâhikası s.121-146.txt",
        "Barla Lâhikası-09-Barla Lâhikası s.146-159.txt",
        "Barla Lâhikası-10-Barla Lâhikası s.160-180.txt",
        "Barla Lâhikası-11-Barla Lâhikası s.181-201.txt",
        "Barla Lâhikası-12-Barla Lâhikası s.202-221.txt",
        "Barla Lâhikası-13-Barla Lâhikası s.221-240.txt",
        "Barla Lâhikası-14-Barla Lâhikası s.241-261.txt",
        "Barla Lâhikası-15-Barla Lâhikası s.262-280.txt",
        "Barla Lâhikası-16-Barla Lâhikası s.280-299.txt",
        "Barla Lâhikası-17-Barla Lâhikası s.300-321.txt",
        "Barla Lâhikası-18-Barla Lâhikası s.321-340.txt",
        "Barla Lâhikası-19-Barla Lâhikası s.340-362.txt",
        "Barla Lâhikası-20-Barla Lâhikası s.363-392.txt"
      ],
      "10 Kastamonu Lâhikası": [
        "Kastamonu Lâhikası-01-Kastamonu Lâhikası - Takdim.txt",
        "Kastamonu Lâhikası-02-Kastamonu Lâhikası s.10-30.txt",
        "Kastamonu Lâhikası-03-Kastamonu Lâhikası s.30-51.txt",
        "Kastamonu Lâhikası-04-Kastamonu Lâhikası s.52-69.txt",
        "Kastamonu Lâhikası-05-Kastamonu Lâhikası s.70-91.txt",
        "Kastamonu Lâhikası-06-Kastamonu Lâhikası s.91-109.txt",
        "Kastamonu Lâhikası-07-Kastamonu Lâhikası s.110-129.txt",
        "Kastamonu Lâhikası-08-Kastamonu Lâhikası s.130-149.txt",
        "Kastamonu Lâhikası-09-Kastamonu Lâhikası s.150-166 (Lemaat'tan).txt",
        "Kastamonu Lâhikası-10-Kastamonu Lâhikası s.167-189.txt",
        "Kastamonu Lâhikası-11-Kastamonu Lâhikası s.190-210.txt",
        "Kastamonu Lâhikası-12-Kastamonu Lâhikası s.211-230.txt",
        "Kastamonu Lâhikası-13-Kastamonu Lâhikası s.231-255.txt"
      ],
      "11 Emirdağ Lâhikası 1": [
        "Emirdağ Lâhikası 1-01-Emirdağ Lâhikası - I - Takdim.txt",
        "Emirdağ Lâhikası 1-02-Emirdağ Lâhikası - I s.10-31.txt",
        "Emirdağ Lâhikası 1-03-Emirdağ Lâhikası - I s.31-50.txt",
        "Emirdağ Lâhikası 1-04-Emirdağ Lâhikası - I s.50-69.txt",
        "Emirdağ Lâhikası 1-05-Emirdağ Lâhikası - I s.70-90.txt",
        "Emirdağ Lâhikası 1-06-Emirdağ Lâhikası - I s.90-110.txt",
        "Emirdağ Lâhikası 1-07-Emirdağ Lâhikası - I s.110-130.txt",
        "Emirdağ Lâhikası 1-08-Emirdağ Lâhikası - I s.131-150.txt",
        "Emirdağ Lâhikası 1-09-Emirdağ Lâhikası - I s.150-170.txt",
        "Emirdağ Lâhikası 1-10-Emirdağ Lâhikası - I s.170-190.txt",
        "Emirdağ Lâhikası 1-11-Emirdağ Lâhikası - I s.190-211.txt",
        "Emirdağ Lâhikası 1-12-Emirdağ Lâhikası - I s.212-230.txt",
        "Emirdağ Lâhikası 1-13-Emirdağ Lâhikası - I s.230-251.txt",
        "Emirdağ Lâhikası 1-14-Emirdağ Lâhikası - I s.251-270.txt",
        "Emirdağ Lâhikası 1-15-Emirdağ Lâhikası - I s.271-288.txt"
      ],
      "12 Emirdağ Lâhikası 2": [
        "Emirdağ Lâhikası 2-01-Emirdağ Lâhikası - I.txt",
        "Emirdağ Lâhikası 2-02-Emirdağ Lâhikası - II s.6-26.txt",
        "Emirdağ Lâhikası 2-03-Emirdağ Lâhikası - II s.27-50.txt",
        "Emirdağ Lâhikası 2-04-Emirdağ Lâhikası - II s.51-70.txt",
        "Emirdağ Lâhikası 2-05-Emirdağ Lâhikası - II s.70-90.txt",
        "Emirdağ Lâhikası 2-06-Emirdağ Lâhikası - II s.91-109.txt",
        "Emirdağ Lâhikası 2-07-Emirdağ Lâhikası - II s.110-128.txt",
        "Emirdağ Lâhikası 2-08-Emirdağ Lâhikası - II s.129-148.txt",
        "Emirdağ Lâhikası 2-09-Emirdağ Lâhikası - II s.149-170.txt",
        "Emirdağ Lâhikası 2-10-Emirdağ Lâhikası - II s.171-189.txt",
        "Emirdağ Lâhikası 2-11-Emirdağ Lâhikası - II s.190-210.txt",
        "Emirdağ Lâhikası 2-12-Emirdağ Lâhikası - II s.210-229.txt",
        "Emirdağ Lâhikası 2-13-Emirdağ Lâhikası - II s.230-247.txt"
      ],
      "13 Asâ-yı Musa": [
        "Asâ-yı Musa-01-Mukaddimat.txt",
        "Asâ-yı Musa-02-Asâ-yı Musa'dan Birinci Kısım.txt",
        "Asâ-yı Musa-03-Birinci Mesele.txt",
        "Asâ-yı Musa-04-İkinci Mesele.txt",
        "Asâ-yı Musa-05-Üçüncü Mesele.txt",
        "Asâ-yı Musa-06-Dördüncü Mesele.txt",
        "Asâ-yı Musa-07-Beşinci Mesele.txt",
        "Asâ-yı Musa-08-Altıncı Mesele.txt",
        "Asâ-yı Musa-09-Yedinci Mesele.txt",
        "Asâ-yı Musa-10-Sekizinci Mesele.txt",
        "Asâ-yı Musa-11-Dokuzuncu Mesele.txt",
        "Asâ-yı Musa-12-Onuncu Mesele.txt",
        "Asâ-yı Musa-13-On Birinci Mesele.txt",
        "Asâ-yı Musa-14-Asâ-yı Musa'dan İkinci Kısım.txt",
        "Asâ-yı Musa-15-Birinci Hüccet-i İmaniye.txt",
        "Asâ-yı Musa-16-İkinci Hüccet-i İmaniye.txt",
        "Asâ-yı Musa-17-Üçüncü Hüccet-i İmaniye.txt",
        "Asâ-yı Musa-18-Dördüncü Hüccet-i İmaniye.txt",
        "Asâ-yı Musa-19-Beşinci Hüccet-i İmaniye.txt",
        "Asâ-yı Musa-20-Altıncı Hüccet-i İmaniye.txt",
        "Asâ-yı Musa-21-Yedinci Hüccet-i İmaniye.txt",
        "Asâ-yı Musa-22-Sekizinci Hüccet-i İmaniye.txt",
        "Asâ-yı Musa-23-Dokuzuncu Hüccet-i İmaniye.txt",
        "Asâ-yı Musa-24-Onuncu Hüccet-i İmaniye.txt",
        "Asâ-yı Musa-25-On Birinci Hüccet-i İmaniye.txt",
        "Asâ-yı Musa-26-Fihrist (Asâ-yı Musa).txt"
      ],
      "14 Küçük Kitaplar": [
        "Di·van-i Harb-i· Örfî.txt",
        "Gençli·k Rehberi·.txt",
        "Hanimlar Rehberi·.txt",
        "Hutbe-i· Şami·ye.txt",
        "Konferans.txt",
        "Münazarat.txt",
        "Nur Çeşmesi·.txt",
        "Nur'un İlk Kapısı.txt",
        "Sünuhat.txt",
        "Tulûat.txt",
        "İşarat.txt"
      ],
      "15 Muhakemat": [
        "Muhakemat-01-Giriş.txt",
        "Muhakemat-02-Birinci Makale.txt",
        "Muhakemat-03-İkinci Makale.txt",
        "Muhakemat-04-Üçüncü Makale.txt",
        "Muhakemat-05-Fihrist (Muhakemat).txt",
        "Muhakemat-06-Takriz.txt"
      ]
    }
  }
}



async function risaleAra() {
    var arananKelime = id("myInput").value.trim();
    if (arananKelime.length < 3) return;

    var sonucAlani = id("sonucAlani");
    
    // Sabit yapı (Div yok, position yok, sadece p ve span)
    sonucAlani.innerHTML = `
        <p id="bilgiSatiri">Başlıyor...</p>
        <p id="progressContainer" style="width:100%; height:8px; background:#eee; margin:5px 0;">
            <span id="progressBar" style="display:block; width:0%; height:100%; background:#a30;"></span>
        </p><br>
        <p id="sonuclarListesi" style="margin:0;"></p>`;

    var listeP = id("sonuclarListesi");
    var bilgiSatiri = id("bilgiSatiri");
    var progressBar = id("progressBar");
    
    var aramaRegex = new RegExp("(^|\\s|[\\.,;!?])" + arananKelime + "($|\\s|[\\.,;!?])", "gi");
    var gecerliSonucSayisi = 0;

    var taranacakDosyalar = [];
    for (var klasor in risaleler.RisaleTxt.Kategoriler) {
        risaleler.RisaleTxt.Kategoriler[klasor].forEach(dosya => {
            taranacakDosyalar.push({ klasor: klasor, dosya: dosya });
        });
    }

    var toplam = taranacakDosyalar.length;

    for (let i = 0; i < toplam; i++) {
        let item = taranacakDosyalar[i];
        let url = "https://raw.githubusercontent.com/Akhenaton41/Dinler-Tarihi-Arama-Motoru/main/Books/RisaleTxt/" + 
                  encodeURIComponent(item.klasor) + "/" + encodeURIComponent(item.dosya);

        // İnteraktif bilgi satırı
        bilgiSatiri.innerHTML = "Taranıyor: <b>" + item.dosya + "</b> " + (i + 1) + "/" + toplam + " (" + gecerliSonucSayisi + " sonuç)";

        try {
            let res = await fetch(url);
            let metin = await res.text();
            let satirlar = metin.split('\n');
            
            satirlar.forEach(satir => {
                if (aramaRegex.test(satir)) {
                    gecerliSonucSayisi++;
                    let vurguluSatir = satir.replace(aramaRegex, (match, p1, p2) => {
                        return p1 + "<mark>" + arananKelime + "</mark>" + p2;
                    });

                    // Sonuçlar akışta alt alta ekleniyor
                    listeP.innerHTML += `
                        <p>
                            <b style='color:#a30;'>${item.klasor} / ${item.dosya}</b><br>
                            <span>${vurguluSatir}</span>
                        </p>`;
                }
            });
        } catch (e) { console.log("Hata: " + item.dosya); }

        progressBar.style.width = ((i + 1) / toplam * 100) + "%";
    }

    bilgiSatiri.innerHTML = "Arama tamamlandı: Toplam " + gecerliSonucSayisi + " sonuç bulundu.";
}
