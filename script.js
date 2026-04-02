// --- 1. DAKTİLO (TYPEWRITER) EFEKTİ ---
const typewriterElement = document.getElementById("typewriter-text");
const messages = [
    "Sistem başlatılıyor...",
    "Kieślowski melankolisi yükleniyor...",
    "7 yıllık veritabanı taranıyor...",
    "It'll pass.", // Fleabag Referansı
    "Seni görüyorum, seni okuyorum ve 7 yıldır buradayım."
];

let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentMessage = messages[messageIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentMessage.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentMessage.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentMessage.length) {
        typeSpeed = 2000; 
        if (messageIndex === messages.length - 1) {
            return; 
        }
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        messageIndex++;
        typeSpeed = 500; 
    }

    setTimeout(typeWriter, typeSpeed);
}
setTimeout(typeWriter, 1000);


// --- 2. SÜZÜLEN DÜŞÜNCELER (FLOATING TEXTS) - BÜTÜN ARŞİV ---
const quotes = [
    // Orijinal Sözler
    "why does nobody call fallen birds icarus too?",
    "bruised mauve, not red",
    "phantom of the pear, i eye you to death",
    "lithium came poetry",
    "hard to please kieślowski enthusiast",
    "shrinking, folding back into my mother's womb",
    "guilt of greed was able to bathe me with spring only",
    "where does a deer hide from sunlight?",
    "will the warmth of anger ever melt my insides?",
    "touch of a bare hand arches my back in disgust",
    "can you hold me when i lose my veins so i won't tear apart?",
    "time may fly like a swallow but i miss seeing it as it goes",
    "if this movie was a person, i would propose to them.",
    "kieslowski'nin sidik çiş kaka bok renklerini bu kadar iyi kullanabilmesi beni benden alıyor",
    "zihninin gürültüsünden uyuyamayanlar...",
    
    // İnstagram'dan Yeni Çıkarılan İnceler
    "bu sabah tüm kolyelerim dolanık, kulaklığım kayıp ve evde süt kalmamış",
    "i loved her, and sometimes she loved me too",
    "uçmayı hayal eden kuş ölmek üzere",
    "kırılan her kalemin ucu yeni açılmıştır",
    "tetik kimde bilmiyorum, fakat artık güçsüzüm, dokunursan aşktan düşerim",
    "ah ne kadar güzel bir gündeyim hiç kimse olmak için",
    "yaşamda kendimi perdede seyrediyor gibi hissetmem",
    "I think you loved me as a birthday cake. Only for special occasions.",
    "Gidin dedim gitmediler, bendenlermiş.",
    "çivileme atlamak benim durumumda komik bir deyiştir",
    "her gazi bir şehit, her şehit de bir gazi değil midir aklımızca?"
];

const container = document.getElementById("floating-container");

function createFloatingQuote() {
    const quoteEl = document.createElement("div");
    quoteEl.classList.add("floating-quote");
    
    quoteEl.innerText = quotes[Math.floor(Math.random() * quotes.length)];
    
    quoteEl.style.left = Math.random() * 80 + "vw"; 
    quoteEl.style.fontSize = (Math.random() * 0.6 + 0.8) + "rem"; 
    quoteEl.style.animationDuration = (Math.random() * 20 + 20) + "s"; // Daha sakin bir akış (20-40 sn)
    
    container.appendChild(quoteEl);

    setTimeout(() => {
        quoteEl.remove();
    }, 40000); 
}
setInterval(createFloatingQuote, 4000);
createFloatingQuote(); 


// --- 3. DOKUNUŞ YANKISI (SOYUT ÇİÇEK AÇMASI) ---
document.addEventListener("click", function(e) {
    // Butonlara ve Linklere tıklayınca çiçek açmasın, tıklamayı engellemesin
    if(e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.terminal-btn')) return;
    
    const flowerContainer = document.createElement("div");
    flowerContainer.classList.add("flower-container");
    
    flowerContainer.style.left = e.pageX + "px";
    flowerContainer.style.top = e.pageY + "px";
    
    for (let i = 0; i < 4; i++) {
        const petal = document.createElement("div");
        petal.classList.add("petal");
        flowerContainer.appendChild(petal);
    }
    
    const core = document.createElement("div");
    core.classList.add("flower-core");
    flowerContainer.appendChild(core);
    
    // Easter Egg: E.E. Cummings Kök Referansı (Çok nadir çıkar)
    if(Math.random() > 0.8) {
        const rootText = document.createElement("span");
        rootText.classList.add("root-text");
        rootText.innerText = "root of the root";
        flowerContainer.appendChild(rootText);
    }
    
    document.body.appendChild(flowerContainer);
    
    setTimeout(() => {
        flowerContainer.remove();
    }, 1500);
});


// --- 4. SCROLL İLE BELİREN TIMELINE (FADE-IN EFEKTİ) ---
const timelineItems = document.querySelectorAll('.timeline-item');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

timelineItems.forEach(item => {
    observer.observe(item);
});


// --- 5. FİLM ÖNERİ ALGORİTMASI VE EASTER EGGLER ---
// --- 5. VAROLUŞSAL TEŞHİS ALGORİTMASI ---
const diagnosticMovies = {
    empty: [
        { title: "Winter Light (1963)", desc: "Yönetmen: Ingmar Bergman. Reçete: Duvarların rengini ezberlediğin bir sabahın ardından, inançsızlık ve koca bir boşlukla yüzleşmek için günde 1 doz." },
        { title: "Lost Highway (1997)", desc: "Yönetmen: David Lynch. Reçete: 'Kendimi koymayacağımı bildiğim bir kapta uyanıyorum' hissinin sinematik karşılığı. Freud buna bayılırdı." }
    ],
    rage: [
        { title: "Possession (1981)", desc: "Yönetmen: Andrzej Żuławski. Reçete: Metro sahnesindeki o histerik krizi kendi odanda yaşaman için. Comfort filmin." },
        { title: "Head-On / Duvara Karşı (2004)", desc: "Yönetmen: Fatih Akın. Reçete: Dünyaya çivileme atlamak ve her şeyi yakmak istediğinde. Bitte Cahit, bitte." }
    ],
    toxic: [
        { title: "Phantom Thread (2017)", desc: "Yönetmen: Paul Thomas Anderson. Reçete: Birbirinin yarası ve merhemi olan o zehirli döngü. Bu film insan olsaydı, ona evlenme teklifi ederdin." },
        { title: "A Short Film About Love (1988)", desc: "Yönetmen: Krzysztof Kieślowski. Reçete: Saplantı, izlemek ve gözetlemek üzerine. 'Sevdiği için ömrü dolmuş anıyı bırakamayanlara'." }
    ],
    aesthetic: [
        { title: "Dekalog (1989)", desc: "Yönetmen: Krzysztof Kieślowski. Reçete: Kieślowski'nin o meşhur 'sidik, çiş, kaka, bok' renklerinin en usta işi kullanımı. Estetik krizinize kesin çözüm." }
    ],
    existential: [
        { title: "Persona (1966)", desc: "Yönetmen: Ingmar Bergman. Reçete: Kendi personanla (maskenle) çatıştığın anlarda, iki ruhun birbirine geçişini izlemek için." },
        { title: "The Fire Within (1963)", desc: "Yönetmen: Louis Malle. Reçete: 'Feeling empty with some atrocious moments.' Dikkatli tüketiniz, ağır gelebilir." }
    ]
};

const movieBtn = document.getElementById('movie-btn');
const crisisSelector = document.getElementById('crisis-selector');
const resultBox = document.getElementById('movie-result');
const resultTitle = document.getElementById('result-title');
const resultDesc = document.getElementById('result-desc');

const loadingMessages = [
    "> _calculating_masterpiece...",
    "> _bypassing_nolan_movies...",
    "> _analyzing_kieslowski_parameters...",
    "> _fetching_trauma_database..."
];

if (movieBtn) {
    movieBtn.addEventListener('click', () => {
        const randomLoadMsg = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
        movieBtn.textContent = randomLoadMsg;
        resultBox.style.opacity = 0;
        
        setTimeout(() => {
            // %5 İhtimalle Easter Egg
            const easterEggChance = Math.random();
            const symptom = crisisSelector.value;
            
            if(easterEggChance > 0.95) {
                resultTitle.textContent = "RX: sweetest_con_detected";
                resultDesc.textContent = "Semptomlarına baktım da... Forever is the sweetest con. Film izlemek yerine belki de sadece o Taylor Swift şarkısını başa sarman gerekiyordur.";
            } else {
                // Seçilen semptoma göre rastgele film çek
                const options = diagnosticMovies[symptom];
                const randomMovie = options[Math.floor(Math.random() * options.length)];
                resultTitle.textContent = randomMovie.title;
                resultDesc.textContent = randomMovie.desc;
            }
            
            resultBox.style.display = 'block';
            setTimeout(() => {
                resultBox.classList.remove('hidden');
                resultBox.style.opacity = 1;
            }, 50);
            
            movieBtn.textContent = "> _execute_prescription()";
        }, 1200); 
    });
}

// --- EASTER EGG: ECE YAZISINA (TITLE) TIKLAMA ---
const mainTitle = document.getElementById('main-title');
if(mainTitle) {
    mainTitle.addEventListener('click', () => {
        mainTitle.style.color = "var(--bruised-mauve)";
        mainTitle.style.textShadow = "0 0 30px rgba(122, 92, 97, 0.8)";
        setTimeout(() => { 
            mainTitle.style.color = "var(--text-main)"; 
            mainTitle.style.textShadow = "0 0 20px rgba(212, 175, 55, 0.2)";
        }, 800);
    });
    // --- YENİ BÖLÜM JS EKLENTİLERİ ---

// 1. Cinematic Subtitles Çevirici
const subtitles = [
    "\"Physically and spiritually, she's not for me.\"", // Godard / Claire's Knee
    "\"I love you.\" \n \"It'll pass.\"", // Fleabag
    "\"Life imitates art more than art imitates life.\"", // Lana Del Rey
    "\"Bu filme hiç ara verilmiyor.\"" // Şule Gürbüz
];

const subtitleElement = document.getElementById('cinematic-subtitle');
let subIndex = 0;

if (subtitleElement) {
    setInterval(() => {
        // Yazıyı yavaşça karart
        subtitleElement.style.opacity = 0;
        
        setTimeout(() => {
            // Metni değiştir ve tekrar görünür yap
            subIndex = (subIndex + 1) % subtitles.length;
            
            // Eğer Fleabag ise iki satır yapmak için innerHTML kullanıyoruz
            if(subtitles[subIndex].includes('\n')) {
                subtitleElement.innerHTML = subtitles[subIndex].replace('\n', '<br>');
            } else {
                subtitleElement.textContent = subtitles[subIndex];
            }
            
            subtitleElement.style.opacity = 1;
        }, 1000); // Kararma süresi kadar bekle
    }, 6000); // Her 6 saniyede bir değiştir
}

// --- EASTER EGG: KEDİ POP-UP ---
function initCatEasterEgg() {
    const catPopup = document.getElementById('cat-easter-egg');
    const closeBtn = document.querySelector('.close-btn');

    function showCat() {
        if(catPopup) {
            catPopup.classList.add('show');
            setTimeout(() => {
                catPopup.classList.remove('show');
            }, 4000); // 4 saniye sonra geri saklan
        }
    }

    // Çarpı (X) tuşuna basınca
    if(closeBtn) {
        closeBtn.addEventListener('click', showCat);
    }

    // Klavyeden 'c' tuşuna basınca
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'c') {
            showCat();
        }
    });
}

// Sayfa tamamen yüklendiğinde kedi tetikleyicilerini çalıştır
document.addEventListener('DOMContentLoaded', initCatEasterEgg);
// --- YENİ BÖLÜM JS: iPhone Notes Değiştirici ---
const notesData = {
    note1: {
        date: "17 July 2024 at 02:12",
        text: `fiziksel olarak rahatsızlık hissediyorum. bir aya varmak üzere günler ve benim gözüme bir damla uyku girmiyor. her gün ağlayarak yatıyor, ağlayarak kalkıyorum. kusuyorum ama içimdeki bu huzursuzluğu da yutuyorum eş zamanında. sanırım bitmesi gerekenler ertelenmemeli artık.<br><br>sevdiği için ömrü dolmuş bir anıyı bırakmamazlık yapmamalı insan. küçük olmak ve küçük görmek kendini, farklı ve tezat durumlar. hayat boyu kendimi koymayacağımı bildiğim bir kapta uyanıyorum bir süredir.`
    },
    note2: {
        date: "21 August 2024 at 23:41",
        text: `yıkıcı güçlerin hepsi basılmış bir damardan ötürü<br>ağlatan bir melodi sıkıca sarılmış bir parmaktan<br>kırıcı bir insan, bağırarak ağlayan bir anneden<br>yakıcı bir alevse çarpışan iki taştan<br><br>tetikteyim<br>susturulmuş bir vuruş yine de yok sayılabilir mi<br>çoktan kanayan bir ceylanı<br>kendileri avlamış sanar aslanlar`
    },
    note3: {
        date: "3 Temmuz 2024",
        text: `bi ateş yanardı herkesi yakan içimde.<br>azgınlaşırdım o zaman her kan kokusuna, gürültü sesine ve kadınların parfümlerine. bir kamikaze gibi dünyaya dalış yapan, o kızgınlıkla her şeyi yok etmeye. beni boğan melankolimi boynumdaki levhaya asıp narsist memenin yanına, güzel dursunlar diye yan yana.<br><br>boğuştum kendimi bildim bileli olan haksızlığa uğramışlık hissiyle çocukluktan, hiçbir zaman geçmeyecek olan ne yapsam da.`
    },
    note4: {
        date: "12 May 2024 at 03:14",
        text: `I forgot how being in love felt like. <br><br>Feeling extremely unloved and unlovable 💔<br><br>I just want to marry, have peopleless sex (?), delete all my socials and disappear into thin air.<br><br>Having second thoughts on the marriage part.<br><br>Decided i don't wanna marry tho o kısmı daksilleyin.<br><br>I hate having so much love to give. I would be quite unstoppable if i had a rack on me chest and i wrote this in british accent.`
    },
    note5: {
        date: "28 September 2024 at 04:05",
        text: `Who came up with tarhana abi... Kim bunları karıştırıp bezde kurutup takılalım dedi?<br><br>Bazen lens suyum pipimmiş gibi yapıp lens kabımı ayakta işiyormuş gibi doldurmaya çalışıyorum.<br><br>X-Files secret sextapes of Gillian Anderson and David Duchovny... and weirdly i wasn't so far off.<br><br>Marketten sadece su söyledim, 500 tl'lik sudden snack cravinglerimi söylemedim. Front lobe developed.`
    },
    note6: {
        date: "14 April 2024 at 01:23",
        text: `Doctor Who Türkiye adaptasyonu yapsalar K-9'un adını Kenan koyabilirler.<br><br>3 regl sancımdan 2'si dünyaya veda etmek gibi hissettiriyor 🫠❤️<br><br>Çok açım ve tam olarak kimi yemek istediğimi biliyorum.<br><br>Men on my socials when they realize i don't wear heavy makeup and black outfits every day. Hard launching my lonely ass.`
    }
};

const noteItems = document.querySelectorAll('.note-item');
const currentNoteDate = document.getElementById('current-note-date');
const currentNoteText = document.getElementById('current-note-text');

noteItems.forEach(item => {
    item.addEventListener('click', function() {
        // Aktif sınıfını güncelle
        noteItems.forEach(n => n.classList.remove('active'));
        this.classList.add('active');

        // İlgili notun verisini al
        const noteId = this.getAttribute('data-note');
        const noteInfo = notesData[noteId];

        // İçeriği değiştir (Hafif bir fade efekti ile)
        currentNoteText.style.opacity = 0;
        currentNoteDate.style.opacity = 0;
        
        setTimeout(() => {
            currentNoteDate.innerHTML = noteInfo.date;
            currentNoteText.innerHTML = noteInfo.text;
            
            currentNoteText.style.opacity = 1;
            currentNoteDate.style.opacity = 1;
        }, 200); // 200ms sonra yeni metni göster
    });
});

// Opacity geçişi için CSS eklemesi (JS içinden dinamik olarak)
currentNoteText.style.transition = "opacity 0.2s ease";
currentNoteDate.style.transition = "opacity 0.2s ease";

// --- YENİ BÖLÜM JS: POLAROID MOODBOARD ---
const polaroidData = [
    {
        imgUrl: "image/36.png", // Kan Portakalları
        caption: "i can't seem to exist loud enough to make you listen.",
        date: "22 Aug 2024"
    },
    {
        imgUrl: "image/35.png", // Tren Rayları
        caption: "yıkıcı güçlerin hepsi basılmış bir damardan ötürü...",
        date: "21 Aug 2024"
    },
    {
        imgUrl: "image/25.jpeg", // Siyah Beyaz Sinema
        caption: "Yaşamda kendimi perdede seyrediyor gibi hissetmem.",
        date: "27 Nov 2021"
    },
    {
        imgUrl: "ekran.png", // Deri Ceket / Anarşi
        caption: "artık o kişi de değilim, başkalaştım.",
        date: "3 Jul 2024"
    },
    {
        imgUrl: "image/32.jpeg", // Tabela / Sokak
        caption: "grocery shoppings with the lack of love in the air",
        date: "21 Aug 2024"
    },
    {
        imgUrl: "image/33.png", // İskambil Kağıtları / Yatak
        caption: "Bataklıklar pembedir Haziranla.",
        date: "14 Jul 2022"
    }
];

const polaroidBoard = document.getElementById('polaroid-board');

if (polaroidBoard) {
    polaroidData.forEach((item, index) => {
        // Rastgele açı (-15 ile +15 derece arası)
        const randomRotation = Math.floor(Math.random() * 30) - 15;
        // Rastgele dikey hizalama (-10px ile +10px arası)
        const randomY = Math.floor(Math.random() * 20) - 10;

        const polaroidHTML = `
            <div class="polaroid-card" style="transform: rotate(${randomRotation}deg) translateY(${randomY}px);">
                <img src="${item.imgUrl}" alt="Moodboard Image" class="polaroid-img" loading="lazy">
                <div class="polaroid-caption">${item.caption}</div>
                <span class="polaroid-date">${item.date}</span>
            </div>
        `;
        
        // Kartı panoya ekle
        polaroidBoard.innerHTML += polaroidHTML;
    });
}
// --- YENİ BÖLÜM JS: LETTERBOXD DIARY FILTER ---
// --- YENİ BÖLÜM JS: DEVASA LETTERBOXD DIARY FILTER ---
const letterboxdData = [
    // --- BAŞYAPITLAR & Taptıkları (4.5 - 5 Yıldız) ---
    { title: "The Conformist", year: "1970", rating: "★★★★★", type: "masterpiece" },
    { title: "The Fire Within", year: "1963", rating: "★★★★★", type: "masterpiece" },
    { title: "Three Colours: Blue", year: "1993", rating: "★★★★★", type: "masterpiece" },
    { title: "Three Colours: Red", year: "1994", rating: "★★★★★", type: "masterpiece" },
    { title: "Winter Light", year: "1963", rating: "★★★★★", type: "masterpiece" },
    { title: "Persona", year: "1966", rating: "★★★★★", type: "masterpiece" },
    { title: "Vertigo", year: "1958", rating: "★★★★★", type: "masterpiece" },
    { title: "Suspiria", year: "2018", rating: "★★★★★", type: "masterpiece" },
    { title: "Mirror", year: "1975", rating: "★★★★★", type: "masterpiece" },
    { title: "Twins in Paradise", year: "2020", rating: "★★★★★", type: "masterpiece" },
    { title: "Making The Leftovers", year: "2014", rating: "★★★★★", type: "masterpiece" },
    { title: "Björk: Vespertine Live", year: "2001", rating: "★★★★★", type: "masterpiece" },
    { title: "The Fountain", year: "2006", rating: "★★★★½", type: "masterpiece" },
    { title: "La Jetée", year: "1962", rating: "★★★★½", type: "masterpiece" },
    { title: "Blind Chance", year: "1987", rating: "★★★★½", type: "masterpiece" },
    { title: "What's Up, Doc?", year: "1972", rating: "★★★★½", type: "masterpiece" },
    { title: "Possession", year: "1981", rating: "★★★★½", type: "masterpiece" },
    { title: "Lost Highway", year: "1997", rating: "★★★★½", type: "masterpiece" },
    { title: "Dekalog", year: "1989", rating: "★★★★½", type: "masterpiece" },
    { title: "Paths of Glory", year: "1957", rating: "★★★★½", type: "masterpiece" },
    { title: "In the Darkness of Time", year: "2002", rating: "★★★★½", type: "masterpiece" },
    { title: "At Land", year: "1944", rating: "★★★★½", type: "masterpiece" },
    { title: "Ritual", year: "2000", rating: "★★★★½", type: "masterpiece" },
    { title: "Taylor Swift: The Eras Tour", year: "2023", rating: "★★★★½", type: "masterpiece" },
    { title: "Camera Buff", year: "1979", rating: "★★★★½", type: "masterpiece" },
    { title: "Time to Love", year: "1965", rating: "★★★★½", type: "masterpiece" },
    { title: "National Theatre Live: Fleabag", year: "2019", rating: "★★★★½", type: "masterpiece" },
    { title: "The Cremator", year: "1969", rating: "★★★★½", type: "masterpiece" },
    { title: "A Trip to the Moon", year: "1902", rating: "★★★★½", type: "masterpiece" },
    { title: "Open Your Eyes", year: "1997", rating: "★★★★½", type: "masterpiece" },
    { title: "Once Upon a Time in Anatolia", year: "2011", rating: "★★★★½", type: "masterpiece" },
    { title: "Meshes of the Afternoon", year: "1943", rating: "★★★★½", type: "masterpiece" },
    { title: "Thesis", year: "1996", rating: "★★★★½", type: "masterpiece" },
    { title: "The Tell-Tale Heart", year: "1953", rating: "★★★★½", type: "masterpiece" },
    { title: "A Brighter Summer Day", year: "1991", rating: "★★★★½", type: "masterpiece" },
    { title: "The Double Life of Véronique", year: "1991", rating: "★★★★½", type: "masterpiece" },
    { title: "Pride & Prejudice", year: "2005", rating: "★★★★½", type: "masterpiece" },
    { title: "Solaris", year: "1972", rating: "★★★★½", type: "masterpiece" },

    // --- ORTALAMALAR & İYİLER (2 - 4 Yıldız Arası) ---
    { title: "Bugonia", year: "2025", rating: "★★★★", type: "regular" },
    { title: "Little Miss Sunshine", year: "2006", rating: "★★★★", type: "regular" },
    { title: "The Lobster", year: "2015", rating: "★★★★", type: "regular" },
    { title: "Head-On", year: "2004", rating: "★★★★", type: "regular" },
    { title: "Parasite", year: "2019", rating: "★★★★", type: "regular" },
    { title: "Climax", year: "2018", rating: "★★★★", type: "regular" },
    { title: "Phantom Thread", year: "2017", rating: "★★★★", type: "regular" },
    { title: "Sidewalls", year: "2011", rating: "★★★★", type: "regular" },
    { title: "A Short Film About Killing", year: "1988", rating: "★★★★", type: "regular" },
    { title: "Little Fish", year: "2020", rating: "★★★★", type: "regular" },
    { title: "Taste of Cherry", year: "1997", rating: "★★★★", type: "regular" },
    { title: "Nest", year: "2022", rating: "★★★★", type: "regular" },
    { title: "Alps", year: "2011", rating: "★★★★", type: "regular" },
    { title: "Visitation", year: "2013", rating: "★★★★", type: "regular" },
    { title: "Wasp", year: "2003", rating: "★★★★", type: "regular" },
    { title: "Angel’s Egg", year: "1985", rating: "★★★★", type: "regular" },
    { title: "Knife+Heart", year: "2018", rating: "★★★★", type: "regular" },
    { title: "Women on the Verge...", year: "1988", rating: "★★★★", type: "regular" },
    { title: "Happening", year: "2021", rating: "★★★★", type: "regular" },
    { title: "On the Silver Globe", year: "1988", rating: "★★★★", type: "regular" },
    { title: "Eyes Wide Shut", year: "1999", rating: "★★★★", type: "regular" },
    { title: "The Cameraman’s Revenge", year: "1912", rating: "★★★★", type: "regular" },
    { title: "Bad Education", year: "2004", rating: "★★★★", type: "regular" },
    { title: "A Short Film About Love", year: "1988", rating: "★★★★", type: "regular" },
    { title: "Chungking Express", year: "1994", rating: "★★★★", type: "regular" },
    { title: "Rosemary’s Baby", year: "1968", rating: "★★★★", type: "regular" },
    { title: "The Tenant", year: "1976", rating: "★★★★", type: "regular" },
    { title: "Caché", year: "2005", rating: "★★★★", type: "regular" },
    { title: "Lovers of the Arctic Circle", year: "1998", rating: "★★★★", type: "regular" },
    { title: "Rejected", year: "2000", rating: "★★★★", type: "regular" },
    { title: "The Office", year: "1966", rating: "★★★★", type: "regular" },
    { title: "Talking Heads", year: "1980", rating: "★★★★", type: "regular" },
    { title: "Anima", year: "2019", rating: "★★★★", type: "regular" },
    { title: "Videodrome", year: "1983", rating: "★★★★", type: "regular" },
    { title: "Three Colours: White", year: "1994", rating: "★★★★", type: "regular" },
    { title: "The Lovers on the Bridge", year: "1991", rating: "★★★★", type: "regular" },
    { title: "Martyrs", year: "2008", rating: "★★★★", type: "regular" },
    { title: "Another Round", year: "2020", rating: "★★★★", type: "regular" },
    { title: "The Father", year: "2020", rating: "★★★★", type: "regular" },
    { title: "Eyes Without a Face", year: "1960", rating: "★★★★", type: "regular" },
    { title: "Dogtooth", year: "2009", rating: "★★★★", type: "regular" },
    { title: "mother!", year: "2017", rating: "★★★★", type: "regular" },
    { title: "Little Women", year: "2019", rating: "★★★", type: "regular" },
    { title: "Oppenheimer", year: "2023", rating: "★★★", type: "regular" },
    { title: "(500) Days of Summer", year: "2009", rating: "★★★", type: "regular" },
    { title: "Spider-Man: No Way Home", year: "2021", rating: "★★★", type: "regular" },
    { title: "Sinners", year: "2025", rating: "★★★", type: "regular" },
    { title: "Irreversible", year: "2002", rating: "★★★½", type: "regular" },
    { title: "The Substance", year: "2024", rating: "★★½", type: "regular" },
    { title: "Aunty", year: "2013", rating: "★★★", type: "regular" },
    { title: "Rendez-vous", year: "1985", rating: "★★", type: "regular" },
    { title: "Comet", year: "2014", rating: "★★★", type: "regular" },
    { title: "Girl, Slipped Inside", year: "2012", rating: "★★½", type: "regular" },
    { title: "Ara", year: "2008", rating: "★★★½", type: "regular" },
    { title: "Real Women Have Curves", year: "2002", rating: "★★★½", type: "regular" },
    { title: "Fingernails", year: "2023", rating: "★★½", type: "regular" },
    { title: "In My Skin", year: "2002", rating: "★★★", type: "regular" },
    { title: "Saw II", year: "2005", rating: "★★★", type: "regular" },
    { title: "Saw VI", year: "2009", rating: "★★★", type: "regular" },
    { title: "Saw V", year: "2008", rating: "★★★", type: "regular" },
    { title: "Saw IV", year: "2007", rating: "★★", type: "regular" },
    { title: "Saw X", year: "2023", rating: "★★★", type: "regular" },
    { title: "The Potemkinists", year: "2022", rating: "★★★", type: "regular" },
    { title: "Yannick", year: "2023", rating: "★★★", type: "regular" },
    { title: "Portrait of God", year: "2022", rating: "★★", type: "regular" },
    { title: "Crocus", year: "1971", rating: "★★★", type: "regular" },
    { title: "27", year: "2023", rating: "★★", type: "regular" },
    { title: "Titane", year: "2021", rating: "★★★½", type: "regular" },
    { title: "The Collector", year: "2009", rating: "★★★", type: "regular" },
    { title: "The Virgin Suicides", year: "1999", rating: "★★½", type: "regular" },
    { title: "Raw", year: "2016", rating: "★★★½", type: "regular" },
    { title: "Everybody Loves Jeanne", year: "2022", rating: "★★★½", type: "regular" },
    { title: "Barbie", year: "2023", rating: "★★", type: "regular" },
    { title: "The Nest of the Cuckoo Birds", year: "1965", rating: "★★", type: "regular" },
    { title: "Permanent Vacation", year: "1980", rating: "★★", type: "regular" },
    { title: "The Criminals", year: "2020", rating: "★★", type: "regular" },
    { title: "Paterson", year: "2016", rating: "★★★½", type: "regular" },
    { title: "Guinea Pig: Mermaid in the Manhole", year: "1988", rating: "★★½", type: "regular" },
    { title: "Scream VI", year: "2023", rating: "★★½", type: "regular" },
    { title: "Who You Think I Am", year: "2019", rating: "★★", type: "regular" },
    { title: "Once", year: "2007", rating: "★★★½", type: "regular" },
    { title: "You’ve Got Beautiful Stairs, You Know…", year: "1986", rating: "★★★½", type: "regular" },
    { title: "Glass Onion", year: "2022", rating: "★★", type: "regular" },
    { title: "Avatar: The Way of Water", year: "2022", rating: "★★", type: "regular" },
    { title: "Ratatouille", year: "2007", rating: "★★★½", type: "regular" },
    { title: "Everything Everywhere All at Once", year: "2022", rating: "★★½", type: "regular" },
    { title: "The Illusionist", year: "2006", rating: "★★½", type: "regular" },
    { title: "Nope", year: "2022", rating: "★★", type: "regular" },
    { title: "What We Do in the Shadows", year: "2014", rating: "★★★", type: "regular" },
    { title: "Elephant", year: "2003", rating: "★★★½", type: "regular" },
    { title: "A Study in Choreography for Camera", year: "1945", rating: "★★★½", type: "regular" },
    { title: "Goodnight Mommy", year: "2014", rating: "★★★", type: "regular" },
    { title: "Erotique", year: "1961", rating: "★★½", type: "regular" },
    { title: "The Green Ray", year: "1986", rating: "★★★½", type: "regular" },
    { title: "Inception", year: "2010", rating: "★★½", type: "regular" },
    { title: "The Killing of a Sacred Deer", year: "2017", rating: "★★★", type: "regular" },
    { title: "Cecil B. Demented", year: "2000", rating: "★★★", type: "regular" },
    { title: "Frances Ha", year: "2012", rating: "★★★½", type: "regular" },
    { title: "A Woman Is a Woman", year: "1961", rating: "★★★", type: "regular" },
    { title: "Six Men Getting Sick", year: "1967", rating: "★★★", type: "regular" },
    { title: "Demolition", year: "2015", rating: "★★", type: "regular" },
    { title: "The Runaways", year: "2010", rating: "★★★", type: "regular" },
    { title: "From a Night Porter’s Point of View", year: "1979", rating: "★★★½", type: "regular" },
    { title: "May", year: "2002", rating: "★★★", type: "regular" },
    { title: "Love Steaks", year: "2013", rating: "★★½", type: "regular" },
    { title: "The Matrix Resurrections", year: "2021", rating: "★★", type: "regular" },
    { title: "Sing Street", year: "2016", rating: "★★★½", type: "regular" },
    { title: "To the Bone", year: "2017", rating: "★★", type: "regular" },
    { title: "The Man Who Was Afraid of Falling", year: "2011", rating: "★★", type: "regular" },
    { title: "Killing Time at Home", year: "2003", rating: "★★★", type: "regular" },
    { title: "Splinter", year: "2008", rating: "★★", type: "regular" },
    { title: "The Big Lebowski", year: "1998", rating: "★★½", type: "regular" },
    { title: "Identity", year: "2003", rating: "★★½", type: "regular" },
    { title: "Autumn Sonata", year: "1978", rating: "★★★½", type: "regular" },
    { title: "Nimic", year: "2019", rating: "★★★", type: "regular" },
    { title: "My Summer of Love", year: "2004", rating: "★★", type: "regular" },
    { title: "The Perks of Being a Wallflower", year: "2012", rating: "★★★", type: "regular" },
    { title: "Whiplash", year: "2014", rating: "★★★½", type: "regular" },
    { title: "Drive", year: "2011", rating: "★★", type: "regular" },
    { title: "Only Lovers Left Alive", year: "2013", rating: "★★", type: "regular" },
    { title: "Fat Girl", year: "2001", rating: "★★½", type: "regular" },
    { title: "9", year: "2009", rating: "★★½", type: "regular" },
    { title: "The Worst Person in the World", year: "2021", rating: "★★½", type: "regular" },
    { title: "The Handmaiden", year: "2016", rating: "★★★½", type: "regular" },
    { title: "Brokeback Mountain", year: "2005", rating: "★★★½", type: "regular" },
    { title: "La Haine", year: "1995", rating: "★★★½", type: "regular" },
    { title: "Swallow", year: "2019", rating: "★★½", type: "regular" },
    { title: "Kill List", year: "2011", rating: "★★½", type: "regular" },
    { title: "The Advocate: A Missing Body", year: "2015", rating: "★★", type: "regular" },
    { title: "Squid Game", year: "2021", rating: "★★★", type: "regular" },
    { title: "Concert of Requests", year: "1967", rating: "★★★½", type: "regular" },
    { title: "Antichrist", year: "2009", rating: "★★★", type: "regular" },
    { title: "Nekromantik", year: "1988", rating: "★★", type: "regular" },
    { title: "The Girl Next Door", year: "2007", rating: "★★★", type: "regular" },
    { title: "Black Widow", year: "2021", rating: "★★", type: "regular" },
    { title: "Damage", year: "1992", rating: "★★½", type: "regular" },
    { title: "Lux Æterna", year: "2019", rating: "★★", type: "regular" },
    { title: "Under the Skin", year: "2013", rating: "★★½", type: "regular" },
    { title: "Seaspiracy", year: "2021", rating: "★★★", type: "regular" },
    { title: "21-87", year: "1963", rating: "★★★½", type: "regular" },
    { title: "La Vie en Rose", year: "2007", rating: "★★★½", type: "regular" },
    { title: "Zack Snyder’s Justice League", year: "2021", rating: "★★", type: "regular" },
    { title: "Nomadland", year: "2020", rating: "★★★½", type: "regular" },
    { title: "Shock", year: "1977", rating: "★★★", type: "regular" },
    { title: "Pan’s Labyrinth", year: "2006", rating: "★★★", type: "regular" },
    { title: "Girl, Interrupted", year: "1999", rating: "★★★", type: "regular" },
    { title: "Nosferatu the Vampyre", year: "1979", rating: "★★★", type: "regular" },
    { title: "Malcolm & Marie", year: "2021", rating: "★★", type: "regular" },
    { title: "A Girl Walks Home Alone at Night", year: "2014", rating: "★★★½", type: "regular" },
    { title: "Lolita", year: "1962", rating: "★★★½", type: "regular" },
    { title: "Saw", year: "2004", rating: "★★★½", type: "regular" },
    { title: "Lost in Translation", year: "2003", rating: "★★★½", type: "regular" },
    { title: "The Wicker Man", year: "1973", rating: "★★★½", type: "regular" },

    // --- NEFRET ETTİKLERİ & ÇÖPLER (0.5 - 1.5 Yıldız) ---
    { title: "Damsel", year: "2024", rating: "½", type: "trash" },
    { title: "Talk to Me", year: "2022", rating: "½", type: "trash" },
    { title: "Smile", year: "2022", rating: "½", type: "trash" },
    { title: "Fall", year: "2022", rating: "★½", type: "trash" },
    { title: "Saw 3D", year: "2010", rating: "★", type: "trash" },
    { title: "Spiral", year: "2021", rating: "½", type: "trash" },
    { title: "Her Şey Olması Gerektiği Gibi", year: "2021", rating: "½", type: "trash" },
    { title: "The Collection", year: "2012", rating: "★½", type: "trash" },
    { title: "Bihter: A Forbidden Passion", year: "2023", rating: "½", type: "trash" },
    { title: "Saltburn", year: "2023", rating: "★", type: "trash" },
    { title: "Last Call for Istanbul", year: "2023", rating: "½", type: "trash" },
    { title: "No Hard Feelings", year: "2023", rating: "★", type: "trash" },
    { title: "Overlord", year: "2018", rating: "★½", type: "trash" },
    { title: "The Resistance", year: "2022", rating: "★½", type: "trash" },
    { title: "Black Mirror: Joan Is Awful", year: "2023", rating: "★", type: "trash" },
    { title: "Guinea Pig Part 2: Flower of Flesh...", year: "1985", rating: "★", type: "trash" },
    { title: "Guinea Pig: Devil’s Experiment", year: "1985", rating: "★½", type: "trash" },
    { title: "Fresh", year: "2022", rating: "★½", type: "trash" },
    { title: "Charlie’s Angels", year: "2019", rating: "½", type: "trash" },
    { title: "M3GAN", year: "2022", rating: "★", type: "trash" },
    { title: "Terrifier 2", year: "2022", rating: "★", type: "trash" },
    { title: "The Menu", year: "2022", rating: "★½", type: "trash" },
    { title: "New Year’s Eve", year: "2022", rating: "★", type: "trash" },
    { title: "Enola Holmes 2", year: "2022", rating: "½", type: "trash" },
    { title: "Crimes of the Future", year: "2022", rating: "★½", type: "trash" },
    { title: "Barbarian", year: "2022", rating: "½", type: "trash" },
    { title: "Werewolf by Night", year: "2022", rating: "★", type: "trash" },
    { title: "Don’t Worry Darling", year: "2022", rating: "★", type: "trash" },
    { title: "Knight and Day", year: "2010", rating: "½", type: "trash" },
    { title: "Old", year: "2021", rating: "½", type: "trash" },
    { title: "The Perfection", year: "2018", rating: "½", type: "trash" },
    { title: "Kitchen Sink", year: "1989", rating: "★", type: "trash" },
    { title: "Sodomites", year: "1998", rating: "½", type: "trash" },
    { title: "A Dangerous Method", year: "2011", rating: "★½", type: "trash" },
    { title: "My Friend Dahmer", year: "2017", rating: "★", type: "trash" },
    { title: "Dogs Don’t Wear Pants", year: "2019", rating: "★½", type: "trash" },
    { title: "John Wick: Chapter 2", year: "2017", rating: "★½", type: "trash" },
    { title: "The Gray Man", year: "2022", rating: "½", type: "trash" },
    { title: "Persuasion", year: "2022", rating: "½", type: "trash" },
    { title: "Match Point", year: "2005", rating: "½", type: "trash" },
    { title: "Shivers", year: "1975", rating: "★½", type: "trash" },
    { title: "Thor: Love and Thunder", year: "2022", rating: "★½", type: "trash" },
    { title: "High Tension", year: "2003", rating: "★½", type: "trash" },
    { title: "Dagon", year: "2001", rating: "★½", type: "trash" },
    { title: "The Descent", year: "2005", rating: "★½", type: "trash" },
    { title: "ABCs of Death 2", year: "2014", rating: "★", type: "trash" },
    { title: "The ABCs of Death", year: "2012", rating: "★", type: "trash" },
    { title: "Mortal Kombat", year: "2021", rating: "★", type: "trash" },
    { title: "To All the Boys: Always and Forever", year: "2021", rating: "½", type: "trash" },
    { title: "The Midnight Sky", year: "2020", rating: "★", type: "trash" },
    { title: "Hillbilly Elegy", year: "2020", rating: "½", type: "trash" },
    { title: "Dragonball Evolution", year: "2009", rating: "½", type: "trash" },
    { title: "Grotesque", year: "2009", rating: "★", type: "trash" },
    { title: "It Chapter Two", year: "2019", rating: "½", type: "trash" },
    { title: "Split", year: "2016", rating: "★½", type: "trash" },
    { title: "Anora", year: "2024", rating: "★", type: "trash" }
];

// Data listen aynı kalacak (const letterboxdData = [ ... ])

const vaultGrid = document.getElementById('vault-grid');
const vaultTabs = document.querySelectorAll('.vault-tab');

function renderVault(filterType) {
    if(!vaultGrid) return;
    vaultGrid.innerHTML = ''; 
    
    // Kısa bir fade-out efekti için
    vaultGrid.style.opacity = 0;
    
    setTimeout(() => {
        const filteredData = letterboxdData.filter(movie => {
            if (filterType === 'all') return true;
            return movie.type === filterType;
        });
        
        filteredData.forEach(movie => {
            const card = document.createElement('div');
            card.className = `vault-card ${movie.type}`;
            
            // Kartın içine yerleştirilecek HTML yapısı
            card.innerHTML = `
                <div>
                    <div class="v-title">${movie.title}</div>
                    <span class="v-year">${movie.year}</span>
                </div>
                <div class="v-rating">${movie.rating}</div>
            `;
            vaultGrid.appendChild(card);
        });
        
        // İçerik dolduktan sonra fade-in
        vaultGrid.style.opacity = 1;
        vaultGrid.style.transition = "opacity 0.4s ease";
    }, 200);
}

// Başlangıçta tümünü yükle
if(vaultGrid) {
    renderVault('all');
}

// Buton tıklamalarını dinle
vaultTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        vaultTabs.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const filterValue = e.target.getAttribute('data-filter');
        renderVault(filterValue);
    });
});
// --- YENİ BÖLÜM JS: THE BRUISED MAUVE MIXTAPE ---
const trackData = {
    teoman: {
        note: `"Müziğim bitti çoktan, sözcüklerim de tükeniyor... 2 Eylül 2023. Tramvayda Gonca Vuslateri diyaloglarını cebelleşerek not alışım. Ben yalnız bir adam; artık genç olmayan, artık aşık da olamayan."`,
        color: "var(--anarchy-green)"
    },
    taylor: {
        note: `"With your boots beneath my bed, forever is the sweetest con... Bu şarkı birbirini dolandırmaya çalışan iki aşık hakkında. Sonsuzluk en tatlı aldatmacadır ve o bu yalana gönüllü olarak inanmak ister."`,
        color: "var(--apricity)"
    },
    sibylle: {
        note: `"9 Eylül 2022. 'you seem hurt, do try to speak a word to me'. Sıradan gülleri değil, soyu tükenmiş olanları sevmek... it's the end, sweet friend."`,
        color: "var(--bruised-mauve)"
    },
    lana: {
        note: `"Life imitates art more than art imitates life... Sanki dünyası gerçek değilmiş gibi hissediyor, sanki hayatı bir fantastik kurgu ve o bu filmi izlerken delirmek üzere."`,
        color: "#1DB954" // Spotify yeşili detay
    }
};

const tracks = document.querySelectorAll('.track');
const spotifyIframe = document.getElementById('spotify-iframe');
const trackNotes = document.getElementById('track-notes');
const vinylLabel = document.getElementById('vinyl-label');
const vinylRecord = document.getElementById('vinyl-record');

tracks.forEach(track => {
    track.addEventListener('click', function() {
        // Aktif sınıfı güncelle
        tracks.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        // İlgili verileri çek
        const trackId = this.getAttribute('data-track');
        const spotifyUrl = this.getAttribute('data-spotify');
        const info = trackData[trackId];

        // Iframe'i güncelle (Spotify)
        spotifyIframe.src = spotifyUrl;

        // Plak animasyonunu sıfırla ve rengini değiştir
        vinylRecord.style.animation = 'none';
        vinylRecord.offsetHeight; /* Trigger reflow */
        vinylRecord.style.animation = null; 
        vinylLabel.style.background = info.color;

        // Notu yumuşak geçişle değiştir
        trackNotes.style.opacity = 0;
        setTimeout(() => {
            trackNotes.innerHTML = `<p>${info.note}</p>`;
            trackNotes.style.opacity = 1;
        }, 300);
    });
});

// --- INFINITE SOUNDWALL DATA ---
const eceSpotifyLibrary = [
    // Melankolik & Indie (Elliott Smith, Sibylle Baier, Mitski)
    "Albatross - Halou", "I Lost Something in the Hills - Sibylle Baier", "Messenger - Blonde Redhead", "Milkdrunk - Halou", "Birdback - Devics", "Misery Is a Butterfly - Blonde Redhead", "Love's Boy - Sol Seppy", "Red Morning - Devics", "Elephant Woman - Blonde Redhead", "Come Running - Sol Seppy", "Pitseleh - Elliott Smith", "Dandelion - Daughter", "The Shrine / An Argument - Fleet Foxes", "two reverse - Adrianne Lenker", "Paul - Big Thief", "Farewell Your Heart - Sol Seppy", "Hope Leaves - Opeth", "Smother - Daughter", "Paul - Big Thief", "Francis Forever - Mitski", "First Love/Late Spring - Mitski", "Your Best American Girl - Mitski", "I Want You - Mitski", "Pagan Poetry - Björk", "I Bet on Losing Dogs - Mitski", "Goodbye, My Danish Sweetheart - Mitski", "Texas Reznikoff - Mitski", "Class of 2013 - Mitski", "Brand New City - Mitski", "Liquid Smooth - Mitski",
    
    // Rock & Alternative (Arctic Monkeys, Radiohead, Lana Del Rey)
    "Decks Dark - Radiohead", "Black Bathing Suit - Lana Del Rey", "Ingenue - Atoms For Peace", "Old Money - Lana Del Rey", "Warning Sign - Coldplay", " peace - Taylor Swift", "Weird Fishes / Arpeggi - Radiohead", "Let Down - Radiohead", "Ode To The Mets - The Strokes", "I've Seen It All - Björk, Thom Yorke", "California - Mazzy Star", "That Joke Isn't Funny Anymore - The Smiths", "Vienna - Billy Joel", "Slow Show - The National", "Time - Pink Floyd", "Wonderful Woman - The Smiths", "Futile Devices - Sufjan Stevens", "I Need My Girl - The National", "Soul Meets Body - Death Cab for Cutie", "Someday - The Strokes", "Concorde - Black Country, New Road", "Fix You - Coldplay", "Exit Music (For a Film) - Radiohead", "How To Disappear Completely - Radiohead", "Asleep - The Smiths", "Black - Pearl Jam", "I Know It's Over - The Smiths", "Electricity - Arctic Monkeys", "Do Me a Favour - Arctic Monkeys", "Crying Lightning - Arctic Monkeys", "Mardy Bum - Arctic Monkeys", "Stop The World I Wanna Get Off With You - Arctic Monkeys", "You're So Dark - Arctic Monkeys", "Fake Tales Of San Francisco - Arctic Monkeys",
    
    // Metal & Sert Tonlar (Slayer, Pantera, Rammstein, Opeth)
    "Necrophiliac - Slayer", "Prism and Gate - Scar Symmetry", "Slaughtered - Pantera", "Misanthrope - Death", "Thousandfold - Eluveitie", "Autumn Eternal - Panopticon", "I Am The Bloody Earth - My Dying Bride", "Hollow - Pantera", "66,50'N,28,40'E - Swallow The Sun", "Persephone - Opeth", "L'appel Du Vide - Sylvaine", "Wiener Blut - Rammstein", "Haifisch - Rammstein", "Ich tu dir weh - Rammstein", "Du riechst so gut - Rammstein", "Mein Herz brennt - Rammstein", "Ich will - Rammstein", "Puppe - Rammstein", "Genesis - Deftones", "Root - Deftones", "Around the Fur - Deftones", "Sextape - Deftones", "Lotion - Deftones", "Chelsea Smile - Bring Me The Horizon",
    
    // Türkçe Melankoli & Klasikler (Teoman, Kalben, Deniz Tekin)
    "Gezegen - Kalben", "Seni Değil Dünyayı Affettim - Ati ve Aşk Üçgeni", "Aramayı Bırakınca - Deniz Tekin", "Bende Bir Problem Var - Deniz Tekin", "Hep Oturup Bekledim - Deniz Tekin", "Koca Bir Saçmalık - Jakuzi", "Yalnızlık Kanında Var - Ari Barokas", "Aşk, Virüs - Redd", "Ellerinin İzi - Selin Çıngır", "Oyunbozan - mor ve ötesi", "Od - Şebnem Ferah", "Çoban Yıldızı - Teoman", "Paramparça - Teoman", "Senden Önce Senden Sonra - Teoman", "İki Yabancı - Teoman, Şebnem Ferah", "Güzel Bir Gün Ölmek İçin - Teoman", "Sil Baştan - Şebnem Ferah", "Vazgeçtim Dünyadan - Şebnem Ferah", "Gönül - Fikret Kızılok", "Kadınım - Tanju Okan", "Resimdeki Gözyaşı - Cem Karaca", "Tek Başına - Ayten Alpman", "Son Arzum - Nilüfer", "Gitme Sana Muhtacım - Zeki Müren",
    
    // Klasik & Enstrümantal (Chopin, Preisner, Satie)
    "Chopin: Aeolian Harp - Frédéric Chopin", "Consolation No. 3 - Franz Liszt", "Raindrop Prelude - Frédéric Chopin", "Clair de lune - Claude Debussy", "Spiegel im spiegel - Arvo Pärt", "Le Cygne - Saint-Saëns", "Träumerei - Schumann", "Song for the Unification of Europe - Zbigniew Preisner", "Van Den Budenmayer - Zbigniew Preisner", "Olivier and Julie - Zbigniew Preisner", "Ulysses' Gaze: Ulysses' Theme - Eleni Karaindrou", "Gnossienne: No. 1 - Erik Satie", "Gymnopédie No. 1 - Erik Satie", "Oblivion - Gidon Kremer", "The Departure - Max Richter",
    
    // Atmosferik & Diğer
    "Sleep Thru Ur Alarms - Lontalius", "Who Is She ? - I Monster", "Claude's Girl - Marika Hackman", "Night Shift - Lucy Dacus", "The Leanover - Life Without Buildings", "Andromeda - Weyes Blood", "Fitzpleasure - alt-J", "Breezeblocks - alt-J", "Chamber Of Reflection - Mac DeMarco", "Million Dollar Man - Lana Del Rey", "Hallelujah - Leonard Cohen", "Stan - Eminem", "Stan - Dido", "N.Y. State of Mind - Nas", "Stan - Eminem", "Stan - Dido", "Stan - Eminem", "Stan - Dido", "Stan - Eminem", "Stan - Dido", "Stan - Eminem", "Stan - Dido", "Stan - Eminem", "Stan - Dido"
];

function populateMarquees() {
    for (let i = 1; i <= 4; i++) {
        const marquee = document.getElementById(`marquee-${i}`);
        if (!marquee) continue;

        // Şarkıları karıştır ve birleştir
        const shuffled = [...eceSpotifyLibrary].sort(() => 0.5 - Math.random());
        const content = shuffled.join(" • ");
        
        // Sonsuz döngü için içeriği iki kez yazıyoruz
        marquee.innerHTML = `<span>${content}</span><span>${content}</span>`;
    }
}

// Sayfa yüklendiğinde doldur
document.addEventListener('DOMContentLoaded', populateMarquees);
}
// --- YENİ BÖLÜM JS: THE LOST ARCHIVES (Story Switcher) ---
const stories = [
   "\"Janis Joplini hak etmiyorduk o yüzden öldü.\"",
        "\"Yamuk parmaklarıma yüz çizince anne babası sarılan mutlu aile tablosu oluşuyor.\"",
        "\"Atamın coğrafyası kötüydü o yüzden ilk hedefiniz akdeniz dedi yoksa ege daha güzel.\"",
        "\"Kapıyı açmak için anahtarı nereye çevireceğimi asla öğrenemeyeceğim sadece hisler.\"",
        "\"Aile evi gibisi var mı yaaaa (bulduğum en keskin şeyi boynuma saplayacağım).\"",
        "\"Klitorisi ararken Frankfurt'a geldik.\"",
        "\"Rhinoplasty ile aramdaki çekim...\"",
        "\"Zeybek: garip turn onlar.\"",
        "\"İçimdeki bu duman duman bulutlar...\"",
        "\"Birbirimizin yarası mıyız yoksa merhemi mi? Asla bilemeyeceğiz.\"",
        "\"Who came up with tarhana abi... Kim bunları karıştırıp bezde kurutup takılalım dedi?\"",
        "\"Bazen lens suyum pipimmiş gibi yapıp lens kabımı ayakta işiyormuş gibi doldurmaya çalışıyorum.\"",
        "\"Letterboxd wrappedimi merak dahi etmiyorum and that sums up how bad 2025 was for me.\"",
        "\"Herhangi bi türkçe şarkının sözünde şey kelimesi geçince şarkı otomatikman midleşiyor ve cringe oluyor.\"",
        "\"Nobody prayin on my downfall more than i do.\"",
        "\"Shoutout to my former best friend named 'sleep'... you would have loved me.\"",
        "\"Marketten su söyledim just su, 500 tl'lik sudden snack cravinglerimi söylemedim. Front lobe developed.\"",
        "\"I forgot how being in love felt like.\"",
        "\"Feeling extremely unloved and unlovable 💔\"",
        "\"I just want to marry, have peopleless sex (?), delete all my socials and disappear into thin air.\"",
        "\"Decided i don't wanna marry tho o kısmı daksilleyin.\"",
        "\"I hate having so much love to give.\"",
        "\"I would be quite unstoppable if i had a rack on me chest and i wrote this in british accent.\"",
        "\"Birine crushım olduğunu birden kendimi onunla tavla oynarken hayal edip gülümsediğimde anlıyorum.\"",
        "\"I make out passionately with every single one of my exes ex in my wettest dreams #iamyourbiggestfan\"",
        "\"Hard launching my lonely ass.\"",
        "\"Men on my socials when they realize i don't wear heavy makeup and black outfits every day.\"",
        "\"3 regl sancımdan 2'si dünyaya veda etmek gibi hissettiriyor 🫠❤️\"",
        "\"Doctor Who Türkiye adaptasyonu yapsalar K-9'un adını Kenan koyabilirler.\"",
        "\"Çok açım ve tam olarak kimi yemek istediğimi biliyorum.\"",
        "\"Eshotta ilk sıradaki ters koltuklara oturunca çok kötü oluyo herkesin yüzüne bakıyosun kötü.\"",
        "\"Hepiniz bana 10 tl atarsanız 280 tlm oluyo çok saçma??? 100 tl atın anlaşalım.\"",
        "\"Beni bunu anlayacak kadar sevdin mi?\""
  
];

let currentStory = 0;
const storyText = document.getElementById('story-text');
const vhsTime = document.getElementById('vhs-time');

// Story değiştirme ve glitch efekti
function rotateStories() {
    if(!storyText) return;

    storyText.style.opacity = 0;
    storyText.style.transform = "scale(0.95) skewX(10deg)";

    setTimeout(() => {
        currentStory = (currentStory + 1) % stories.length;
        storyText.textContent = stories[currentStory];
        
        // Rastgele glitch parlama efekti
        storyText.style.opacity = 1;
        storyText.style.transform = "scale(1) skewX(0deg)";
        storyText.style.color = (Math.random() > 0.8) ? "#ff00c1" : "#fff";
    }, 150);
}

// Zaman sayacı (VHS tarzı)
function updateVHSTime() {
    if(!vhsTime) return;
    const now = new Date();
    vhsTime.textContent = now.toLocaleTimeString('tr-TR');
}

if(storyText) {
    setInterval(rotateStories, 3500); // Her 3.5 saniyede bir story değişir
    setInterval(updateVHSTime, 1000);
}
// --- YENİ BÖLÜM JS: THE SCRATCHED MEMORY REEL (Interactive Photos) ---
const memoryPhotos = [
    "image/1.jpeg", "image/2.jpeg", "image/3.jpeg", "image/4.jpeg", "image/5.jpeg", "image/6.jpeg", "image/7.jpeg", "image/8.jpeg", 
    "image/9.jpeg", "image/10.jpeg", "image/11.jpeg", "image/12.jpeg", "image/13.jpeg", "image/14.jpeg", "image/15.jpeg", "image/16.jpeg", 
    "image/17.jpeg", "image/18.jpeg", "image/19.jpeg", "image/20.jpeg", "image/21.jpeg", "image/22.jpeg", "image/23.jpeg", "image/24.jpeg", 
    "image/25.jpeg", "image/26.jpeg", "image/27.jpeg", "image/28.jpeg", "image/29.jpeg", "image/30.jpeg", "image/31.jpeg", "image/32.jpeg",
    "image/33.png", "image/34.png", "image/35.png", "image/36.png" // BUNLARI EKLEDİK (DİKKAT: Uzantıları .png)
];

const reelContainer = document.getElementById('reel-container');
const photoViewer = document.getElementById('photo-viewer');

// Fotoğrafları DOM'a yükle
function loadReelPhotos() {
    if(!photoViewer) return;
    memoryPhotos.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'reel-photo';
        img.id = `photo-${index}`;
        photoViewer.appendChild(img);
    });
}

// --- GÜNCELLENMİŞ SCRATCH FONKSİYONU ---
let lastScratchTime = 0;
const scratchThrottle = 100; // 100'den 400'e çıkardık: Fareyi ne kadar hızlı sallasın da fotoğraflar birbirine girmesin

function scratchMemory(e) {
    const now = new Date().getTime();
    if (now - lastScratchTime < scratchThrottle) return;
    lastScratchTime = now;

    const allPhotos = document.querySelectorAll('.reel-photo');
    allPhotos.forEach(img => {
        img.style.opacity = 0;
        img.style.zIndex = 1;
    });

    const randomIndex = Math.floor(Math.random() * memoryPhotos.length);
    const selectedPhoto = allPhotos[randomIndex];
    
    if(selectedPhoto) {
        // Fotoğrafın belirmesi
        selectedPhoto.style.opacity = 1;
        selectedPhoto.style.zIndex = 10;
        selectedPhoto.style.transform = `scale(1.05) rotate(${Math.random() * 4 - 2}deg)`;
        
        // SÜRE AYARI: 150ms yerine 800ms yapıyoruz (neredeyse 1 saniye)
        // Böylece Ece fotoğrafı net bir şekilde görebilecek
        setTimeout(() => {
            selectedPhoto.style.opacity = 0;
        }, 4000); 
    }
}

if(reelContainer) {
    loadReelPhotos();
    reelContainer.addEventListener('mousemove', scratchMemory);
    // Mobilde dokunma için
    reelContainer.addEventListener('touchmove', scratchMemory);
}
// --- CUSTOM CURSOR LOGIC ---
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
const cursorText = document.querySelector('.cursor-text');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Nokta anında takip eder
    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    // Halka biraz geriden (yumuşak) takip eder (Animate ile de yapılabilir ama bu en hafifi)
    outline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});



    document.addEventListener('DOMContentLoaded', () => {

        // ==========================================
        // 1. DATA POOLS (VERİ HAVUZLARI)
        // ==========================================
        const eceQuotes = [
            "\"Janis Joplini hak etmiyorduk o yüzden öldü.\"",
            "\"Yamuk parmaklarıma yüz çizince anne babası sarılan mutlu aile tablosu oluşuyor.\"",
            "\"Atamın coğrafyası kötüydü o yüzden ilk hedefiniz akdeniz dedi yoksa ege daha güzel.\"",
            "\"Kapıyı açmak için anahtarı nereye çevireceğimi asla öğrenemeyeceğim sadece hisler.\"",
            "\"Aile evi gibisi var mı yaaaa (bulduğum en keskin şeyi boynuma saplayacağım).\"",
            "\"Klitorisi ararken Frankfurt'a geldik.\"",
            "\"Rhinoplasty ile aramdaki çekim...\"",
            "\"Zeybek: garip turn onlar.\"",
            "\"İçimdeki bu duman duman bulutlar...\"",
            "\"Birbirimizin yarası mıyız yoksa merhemi mi? Asla bilemeyeceğiz.\"",
            "\"Who came up with tarhana abi... Kim bunları karıştırıp bezde kurutup takılalım dedi?\"",
            "\"Bazen lens suyum pipimmiş gibi yapıp lens kabımı ayakta işiyormuş gibi doldurmaya çalışıyorum.\"",
            "\"Letterboxd wrappedimi merak dahi etmiyorum and that sums up how bad 2025 was for me.\"",
            "\"Herhangi bi türkçe şarkının sözünde şey kelimesi geçince şarkı otomatikman midleşiyor ve cringe oluyor.\"",
            "\"Nobody prayin on my downfall more than i do.\"",
            "\"Shoutout to my former best friend named 'sleep'... you would have loved me.\"",
            "\"Marketten su söyledim just su, 500 tl'lik sudden snack cravinglerimi söylemedim. Front lobe developed.\"",
            "\"I forgot how being in love felt like.\"",
            "\"Feeling extremely unloved and unlovable 💔\"",
            "\"I just want to marry, have peopleless sex (?), delete all my socials and disappear into thin air.\"",
            "\"Decided i don't wanna marry tho o kısmı daksilleyin.\"",
            "\"I hate having so much love to give.\"",
            "\"I would be quite unstoppable if i had a rack on me chest and i wrote this in british accent.\"",
            "\"Birine crushım olduğunu birden kendimi onunla tavla oynarken hayal edip gülümsediğimde anlıyorum.\"",
            "\"I make out passionately with every single one of my exes ex in my wettest dreams #iamyourbiggestfan\"",
            "\"Hard launching my lonely ass.\"",
            "\"Men on my socials when they realize i don't wear heavy makeup and black outfits every day.\"",
            "\"3 regl sancımdan 2'si dünyaya veda etmek gibi hissettiriyor 🫠❤️\"",
            "\"Doctor Who Türkiye adaptasyonu yapsalar K-9'un adını Kenan koyabilirler.\"",
            "\"Çok açım ve tam olarak kimi yemek istediğimi biliyorum.\"",
            "\"Eshotta ilk sıradaki ters koltuklara oturunca çok kötü oluyo herkesin yüzüne bakıyosun kötü.\"",
            "\"Hepiniz bana 10 tl atarsanız 280 tlm oluyo çok saçma??? 100 tl atın anlaşalım.\"",
            "\"Beni bunu anlayacak kadar sevdin mi?\""
        ];
    
        // ==========================================
        // 2. DAKTİLO (TYPEWRITER) EFEKTİ
        // ==========================================
        const typewriterElement = document.getElementById("typewriter-text");
        const messages = [
            "Sistem başlatılıyor...",
            "Kieślowski melankolisi yükleniyor...",
            "7 yıllık veritabanı taranıyor...",
            "It'll pass.", // Fleabag Referansı
            "Seni görüyorum, seni okuyorum ve 7 yıldır buradayım."
        ];
    
        let messageIndex = 0, charIndex = 0, isDeleting = false;
    
        function typeWriter() {
            if (!typewriterElement) return;
            const currentMessage = messages[messageIndex];
            
            typewriterElement.textContent = isDeleting 
                ? currentMessage.substring(0, charIndex - 1) 
                : currentMessage.substring(0, charIndex + 1);
            
            charIndex += isDeleting ? -1 : 1;
            let typeSpeed = isDeleting ? 30 : 60;
    
            if (!isDeleting && charIndex === currentMessage.length) {
                typeSpeed = 2000; isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false; messageIndex++; typeSpeed = 500; 
                if (messageIndex === messages.length) messageIndex = 0; // Başa sar
            }
            setTimeout(typeWriter, typeSpeed);
        }
        setTimeout(typeWriter, 1000);
    
        // ==========================================
        // 3. GÜNÜN SIZISI (DAKSİL EFEKTİ VE BUTON)
        // ==========================================
        const quoteDisplay = document.getElementById('daily-quote');
        const quoteBtn = document.getElementById('new-quote-btn');
    
        function updateDailyQuote() {
            if (!quoteDisplay) return;
            quoteDisplay.classList.add('daksille'); // Daksili çek
    
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * eceQuotes.length);
                quoteDisplay.textContent = eceQuotes[randomIndex];
                quoteDisplay.classList.remove('daksille'); // Daksili kaldır
            }, 350);
        }
    
        if (quoteBtn) {
            quoteBtn.addEventListener('click', updateDailyQuote);
        }
        updateDailyQuote(); // İlk açılışta çalıştır
    
    })
    // ==========================================
    // 11. ECE'S TAROT DECK (KADER KARTLARI)
    // ==========================================
    // ==========================================
// 11. ECE'S TAROT DECK (KADER KARTLARI) - FIX
// ==========================================
const tarotData = {
    past: [
        // Ece'nin Kendi Sözleri
        "\"Kırılan her kalemin ucu yeni açılmıştır.\"",
        "\"Shoutout to my former best friend named 'sleep'... you would have loved me.\"",
        "\"Sevdiği için ömrü dolmuş bir anıyı bırakmamazlık yapmamalı insan.\"",
        "\"No other men taught me how disloyal men can be better than my own male friends.\"",
        "\"Janis Joplini hak etmiyorduk o yüzden öldü.\"",
        // Yeni Üretilenler (Ece'nin Ruhundan)
        "\"My villain origin story, kötü demlenmiş bir espresso ve tutulmayan sözlerle başladı.\"",
        "\"Phantom Thread izlerken anladım ki, bazı yaralar sadece onlara tuz basanlarla iyileşiyor.\"",
        "\"Geçmiş, Lanthimos'un kadrajları gibi; hem çok rahatsız edici hem de gözümü alamıyorum.\"",
        "\"O kadar çok duvar rengi ezberledim ki, artık hiçbir anıya ait hissedemiyorum.\"",
        "\"Atamın coğrafyası kötüydü o yüzden ilk hedefiniz akdeniz dedi yoksa ege daha güzel.\""
    ],
    present: [
        // Ece'nin Kendi Sözleri
        "\"İçimdeki bu duman duman bulutlar...\"",
        "\"Kendimi koymayacağımı bildiğim bir kapta uyanıyorum.\"",
        "\"Bugün günlerden lityum...\"",
        "\"Feeling extremely unloved and unlovable 💔\"",
        "\"Marketten su söyledim just su, 500 tl'lik sudden snack cravinglerimi söylemedim. Front lobe developed.\"",
        "\"Hard launching my lonely ass.\"",
        "\"Çok açım ve tam olarak kimi yemek istediğimi biliyorum.\"",
        // Yeni Üretilenler (Ece'nin Ruhundan)
        "\"Zihnimin gürültüsünden Kieślowski'nin Mavi'sine sığınıyorum. Orada bile huzur yok.\"",
        "\"Şu anki ruh halim: Bir Avrupa sanat filminde arka planda garip hareketler yapan o depresif figüran.\"",
        "\"Grocery shoppings with the lack of love in the air. Sadece su ve varoluşsal kriz alıp çıkıyorum.\"",
        "\"Herkesin kupa kızı olduğu bir masada, ben masanın kendisiymişim gibi hissediyorum.\""
    ],
    future: [
        // Ece'nin Kendi Sözleri
        "\"Birine crushım olduğunu birden kendimi onunla tavla oynarken hayal edip gülümsediğimde anlıyorum.\"",
        "\"I just want to marry, have peopleless sex (?), delete all my socials and disappear into thin air.\"",
        "\"Decided i don't wanna marry tho o kısmı daksilleyin.\"",
        "\"I would be quite unstoppable if i had a rack on me chest and i wrote this in british accent.\"",
        "\"Everytime a man tries to talk to me it just makes me feel sure that i'm gonna die alone.\"",
        // Yeni Üretilenler (Ece'nin Ruhundan)
        "\"I'll probably end up writing a 10-page Letterboxd review instead of going to therapy.\"",
        "\"Eğer bir gün bir şeye 5 yıldız verirsem, bil ki o gün dünya gerçekten yaşanmaya değer bir yer olmuştur.\"",
        "\"Bir gün her şeyi bırakıp sadece sinema eleştirip kedi seveceğim. (Yalan, üç güne delirim.)\"",
        "\"Forever is the sweetest con... ve ben bu dolandırıcılığa gönüllü olarak inanmaya devam edeceğim.\"",
        "\"Kaderimde bol bol 'şey' kelimesi geçen cringe Türkçe şarkılar ve yarım kalmış senaryolar görüyorum.\""
    ]
};

// Kartları ve butonu seçiyoruz
const tarotCards = document.querySelectorAll('.tarot-card');
    const resetTarotBtn = document.getElementById('reset-tarot-btn');
    let flippedCardsCount = 0;

    tarotCards.forEach(card => {
        card.addEventListener('click', function() {
            if (!this.classList.contains('flipped')) {
                const cardType = this.id.replace('card-', ''); 
                const textEl = document.getElementById(`text-${cardType}`);
                
                if (textEl && tarotData[cardType]) {
                    const quotesList = tarotData[cardType];
                    textEl.textContent = quotesList[Math.floor(Math.random() * quotesList.length)];
                }
                
                this.classList.add('flipped');
                flippedCount++;

                if (flippedCount === 3 && resetTarotBtn) {
                    setTimeout(() => { resetTarotBtn.style.display = "inline-block"; }, 800);
                }
            }
        });
    });

    if (resetTarotBtn) {
        resetTarotBtn.addEventListener('click', () => {
            tarotCards.forEach(c => c.classList.remove('flipped'));
            flippedCount = 0;
            resetTarotBtn.style.display = "none";
            setTimeout(() => {
                document.getElementById('text-past').textContent = "...";
                document.getElementById('text-present').textContent = "...";
                document.getElementById('text-future').textContent = "...";
            }, 600);
        });
    }
 
