/* ============================================================
   鮨づくり体験 まる音 — スクリプト（依存ライブラリなし）
   1. 日英切替（多言語対応・辞書方式）
   2. 予約リクエストフォーム（送信中・成功・失敗の3状態）
   3. ハンバーガーメニュー・スクロール出現・固定CTA
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     多言語対応の仕組み
     ------------------------------------------------------------
     ・日本語の原文は HTML にそのまま書かれています
     ・初期化時に [data-i18n] 要素の日本語を自動で記憶し、
       下の I18N_EN 辞書と切り替えます
     ・文言を修正したいとき:
       日本語 → index.html を直接編集
       英語   → この I18N_EN の該当キーを編集
     ・data-i18n      … テキストを切替
       data-i18n-html … 太字や改行を含むHTMLごと切替
       data-i18n-ph   … 入力欄の placeholder を切替
     ・本番でURLを /en/ に分ける構成に変える場合は、この辞書を
       en/index.html に展開し hreflang を設定する方式に拡張できます
     ============================================================ */
  var I18N_EN = {
    _title: 'Sushi Making Experience Marune | Asakusa, Tokyo',
    _desc: 'Make real nigiri sushi with a professional chef in Asakusa, Tokyo. English interpreter on site. Eat what you make, certificate included. 5 min from Asakusa Station.',

    'logo.sub': 'Sushi Making Experience — Asakusa',
    'nav.flow': 'Experience',
    'nav.reasons': 'Why Marune',
    'nav.plans': 'Plans',
    'nav.faq': 'FAQ',
    'nav.access': 'Access',
    'nav.cta': 'Book Now',
    'nav.menu': 'MENU',

    'fv.catch': 'Make it. Eat it.<br>Never forget it.',
    'fv.sub': 'A working sushi chef teaches you everything, from the temperature of the rice to the way the fish is sliced. You make eight pieces with your own hands and eat them on the spot. One day of your trip becomes a story for life.',
    'fv.badge1': '5 min walk from Asakusa Sta.',
    'fv.badge2': 'English interpreter on site',
    'fv.badge3': 'Certificate & happi photos',
    'fv.cta': 'Book Your Experience',
    'fv.ctaSub': 'From 2 guests / book up to 1 day ahead',

    'flow.title': 'How It Works (approx. 90 min)',
    'flow.s1t': 'Welcome & Dress Up',
    'flow.s1d': 'Change into a happi coat and chef’s hat, then wash up and get ready. You’ll want photos at this point already.',
    'flow.s2t': 'Chef’s Demonstration',
    'flow.s2d': 'Watch the chef make sushi right in front of you, with full commentary. The rice temperature, the angle of the slice — everything has a reason.',
    'flow.s3t': 'Make 8 Pieces Yourself',
    'flow.s3d': 'Tuna, salmon, shrimp, tamago and more — eight pieces by your own hands, with the chef correcting your form one on one.',
    'flow.s4t': 'Eat & Get Certified',
    'flow.s4d': 'Enjoy your sushi on the spot with miso soup. You’ll leave with a certificate bearing your name, and your photos.',

    'reasons.title': 'Why Guests Choose Marune',
    'reasons.r1t': 'Taught by a working sushi chef',
    'reasons.r1d': 'Your instructor has spent 25 years behind the counter. This is no watered-down tourist show — <strong>you learn the real movements of a professional</strong>, starting with how to hold the knife.',
    'reasons.r2t': 'An English interpreter, start to finish',
    'reasons.r2d': 'An English-speaking staff member stays with the group for the whole session, so no one gets left behind. <strong>Mixed groups of Japanese and international guests work beautifully</strong> — popular for hosting overseas colleagues, too.',
    'reasons.r3t': 'Take home skills, a certificate, and photos',
    'reasons.r3d': 'At the end you receive a <strong>certificate with your name on it</strong>. Our staff photographs you in your happi coat and sends the pictures the same day. Social-media worthy, we promise.',

    'midcta.copy': 'Save just 90 minutes of your trip for this.',
    'midcta.cta': 'Check Availability',

    'plans.title': 'Plans & Pricing',
    'plans.lead': 'All prices include tax and ingredients. Sessions run from 2 guests.',
    'plans.per': '/ person',
    'plans.p1t': 'Standard Experience',
    'plans.p1f1': '8 pieces of nigiri + soup & tea',
    'plans.p1f2': 'Approx. 90 min, certificate included',
    'plans.p1f3': 'Happi photo service',
    'plans.p2tag': 'Most Popular',
    'plans.p2t': 'Premium Experience',
    'plans.p2f1': '10 pieces incl. fatty tuna, uni & ikura',
    'plans.p2f2': 'Approx. 120 min, one cup of sake (20+)',
    'plans.p2f3': 'Photo with the chef, framed certificate',
    'plans.p3t': 'Private Booking',
    'plans.p3per': 'and up / group (max 8)',
    'plans.p3f1': 'The whole venue to yourselves (max 8)',
    'plans.p3f2': 'Team events, client dinners, anniversaries',
    'plans.p3f3': 'Customizable contents',
    'plans.note': '* Please tell us about allergies or ingredients you avoid when booking. We will prepare alternatives.',

    'voice.title': 'Guest Voices',
    'voice.v1c': 'Couple from Canada',
    'voice.v2': '"We booked a private session for six members of our overseas branch. Thanks to the interpreter, everyone laughed at the same moments. The best team-building we’ve ever done."',
    'voice.v2c': 'IT company, team event',

    'faq.title': 'FAQ',
    'faq.q1': 'Can children join?',
    'faq.a1': 'Yes, from age 6. We have step stools and mini happi coats. For kids who don’t eat raw fish, we can switch to tamago and cucumber.',
    'faq.q2': 'I don’t eat raw fish / I have allergies.',
    'faq.a2': 'Tell us when you book and we’ll switch to cooked toppings (shrimp, tamago, sea eel) or vegetables. For your safety, please always let us know about allergies in advance.',
    'faq.q3': 'I don’t speak Japanese — will I be OK?',
    'faq.a3': 'Absolutely. The session runs in both Japanese and English, so guests of either language enjoy it equally.',
    'faq.q4': 'Is there a cancellation fee?',
    'faq.a4': 'Free until 6 p.m. the day before. After that we charge 50% of the fee due to ingredient costs. One date change is free.',

    'access.title': 'Access',
    'access.d1t': 'Name',
    'access.d1d': 'Marune Sushi Making Experience',
    'access.d2t': 'Address',
    'access.d2d': '1-2-3 Asakusa, Taito-ku, Tokyo / Marune Bldg. 1F',
    'access.demo': '* This is a portfolio demo site (fictional venue)',
    'access.d3t': 'Directions',
    'access.d3d': '5 min walk from Asakusa Station (Ginza Line / Asakusa Line), 7 min from Kaminarimon Gate',
    'access.d4t': 'Sessions',
    'access.d4d': '11:00 and 15:00 (reservation only, max 8 guests per session)',
    'access.d5t': 'Closed',
    'access.d5d': 'Tuesdays',

    'booking.title': 'Request a Reservation',
    'booking.lead': 'Send us your preferred date and group size. We’ll reply with availability within 24 hours.',
    'booking.name': 'Name',
    'booking.req': 'Required',
    'booking.email': 'Email',
    'booking.date': 'Preferred date',
    'booking.guests': 'Guests',
    'booking.guestsPh': 'Select',
    'booking.guests8': '8 (private)',
    'booking.plan': 'Preferred plan',
    'booking.planStd': 'Standard (¥9,800)',
    'booking.planPre': 'Premium (¥16,500)',
    'booking.planPri': 'Private (from ¥88,000)',
    'booking.msg': 'Allergies / requests',
    'booking.namePh': 'e.g. Hanako Marune',
    'booking.msgPh': 'e.g. One guest has a shrimp allergy / It’s our anniversary',
    'booking.err': 'Some required fields are missing. Please check.',
    'booking.submit': 'Send Request',
    'booking.demo': '* Demo site: nothing is actually sent (the submission is simulated)',
    'booking.doneT': 'Request received',
    'booking.doneD': 'Thank you! We’ll check availability and reply by email within 24 hours. (This demo site does not send real emails.)',

    'footer.copy': '© 2026 Marune Sushi Making Experience (fictional demo site, LP portfolio)',
    'fixed.cta': 'Book Now / from 2 guests'
  };

  var LANG_KEY = 'marune-lang';
  var jaStore = {ti: document.title, de: ''};
  var descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) jaStore.de = descMeta.content;

  // 初期化: 各要素の日本語原文を記憶しておく
  var i18nEls = document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-ph]');
  i18nEls.forEach(function (el) {
    if (el.hasAttribute('data-i18n-ph')) {
      el.dataset.ja = el.getAttribute('placeholder') || '';
    } else if (el.hasAttribute('data-i18n-html')) {
      el.dataset.ja = el.innerHTML;
    } else {
      el.dataset.ja = el.textContent;
    }
  });

  var langJa = document.getElementById('langJa');
  var langEn = document.getElementById('langEn');

  function setLang(lang) {
    var en = lang === 'en';
    i18nEls.forEach(function (el) {
      if (el.hasAttribute('data-i18n-ph')) {
        var phKey = el.getAttribute('data-i18n-ph');
        el.setAttribute('placeholder', en ? (I18N_EN[phKey] || el.dataset.ja) : el.dataset.ja);
        return;
      }
      if (el.hasAttribute('data-i18n-html')) {
        var htmlKey = el.getAttribute('data-i18n-html');
        el.innerHTML = en ? (I18N_EN[htmlKey] || el.dataset.ja) : el.dataset.ja;
        return;
      }
      var key = el.getAttribute('data-i18n');
      el.textContent = en ? (I18N_EN[key] || el.dataset.ja) : el.dataset.ja;
    });
    document.documentElement.lang = en ? 'en' : 'ja';
    document.title = en ? I18N_EN._title : jaStore.ti;
    if (descMeta) descMeta.content = en ? I18N_EN._desc : jaStore.de;
    langJa.classList.toggle('is-active', !en);
    langEn.classList.toggle('is-active', en);
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* プライベートモード等 */ }
  }

  langJa.addEventListener('click', function () { setLang('ja'); });
  langEn.addEventListener('click', function () { setLang('en'); });

  // 前回選択した言語を復元
  try {
    if (localStorage.getItem(LANG_KEY) === 'en') setLang('en');
  } catch (e) { /* localStorage不可の環境では日本語のまま */ }

  /* ---- 予約フォーム（3状態UI／デモは擬似送信） ----
     本番でFormspreeを使う場合は fakeSubmit() を fetch() に差し替え
     （詳細手順は 02_aozora-cleaning/js/script.js のコメント参照） */
  var form = document.getElementById('bookingForm');
  var formError = document.getElementById('formError');
  var formDone = document.getElementById('formDone');

  function fakeSubmit() {
    return new Promise(function (resolve) { setTimeout(resolve, 1200); });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var invalid = false;
    form.querySelectorAll('[required]').forEach(function (input) {
      var bad = !input.value.trim() ||
        (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value));
      input.classList.toggle('is-invalid', bad);
      if (bad) invalid = true;
    });
    formError.hidden = !invalid;
    if (invalid) return;

    form.classList.add('is-sending');
    fakeSubmit()
      .then(function () {
        form.hidden = true;
        formDone.hidden = false;
        formDone.scrollIntoView({ behavior: 'smooth', block: 'center' });
      })
      .catch(function () {
        formError.textContent = document.documentElement.lang === 'en'
          ? 'Failed to send. Please try again later.'
          : '送信に失敗しました。お手数ですが、時間をおいて再度お試しください。';
        formError.hidden = false;
      })
      .finally(function () {
        form.classList.remove('is-sending');
      });
  });

  /* ---- ハンバーガーメニュー ---- */
  var menuBtn = document.getElementById('menuBtn');
  var gnav = document.getElementById('gnav');
  function closeMenu() {
    gnav.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  menuBtn.addEventListener('click', function () {
    var open = gnav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  gnav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---- スクロール出現アニメーション ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-shown');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    reveals.forEach(function (n) { io.observe(n); });
  } else {
    reveals.forEach(function (n) { n.classList.add('is-shown'); });
  }

  /* ---- スマホ固定CTA（FV通過後に表示、予約セクションでは隠す） ---- */
  var fixedCta = document.getElementById('fixedCta');
  var fv = document.querySelector('.fv');
  var booking = document.getElementById('booking');
  if (fixedCta && fv && 'IntersectionObserver' in window) {
    var pastFv = false, inBooking = false;
    function updateCta() {
      var show = pastFv && !inBooking;
      fixedCta.classList.toggle('is-visible', show);
      fixedCta.setAttribute('aria-hidden', String(!show));
      fixedCta.querySelector('a').tabIndex = show ? 0 : -1;
    }
    new IntersectionObserver(function (entries) {
      pastFv = !entries[0].isIntersecting;
      updateCta();
    }, { threshold: 0.1 }).observe(fv);
    new IntersectionObserver(function (entries) {
      inBooking = entries[0].isIntersecting;
      updateCta();
    }, { threshold: 0.12 }).observe(booking);
  }
})();
