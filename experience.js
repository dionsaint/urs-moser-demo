/* A plain-language introduction and a six-step example, using the existing demo records. */
(() => {
  const t = (de, en) => L2(de, en);
  const icon = (name) => {
    const paths = {
      arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
      home: '<path d="m3 10 9-7 9 7v11H3zM9 21v-8h6v8"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18m-14 4h3m4 0h3"/>',
      paper: '<path d="M6 3h9l4 4v14H6zM15 3v5h4M9 12h7m-7 4h7"/>',
      phone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/>',
      people: '<circle cx="9" cy="7" r="3"/><path d="M3 21v-5a6 6 0 0 1 12 0v5m2-17a3 3 0 0 1 0 6m2 4a5 5 0 0 1 2 4v3"/>',
      spark: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z"/>'
    };
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.paper}</svg>`;
  };
  const picture = (kind, alt, cls = '', eager = false) => `<img class="${cls}" src="assets/${kind}-1400.jpg" srcset="assets/${kind}-700.jpg 700w, assets/${kind}-1400.jpg 1400w" sizes="(max-width: 700px) 100vw, 52vw" width="1400" height="788" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  const photoNote = () => t('KI-generiertes Beispielbild · kein Kundenprojekt', 'AI-generated example image · not a customer project');
  const arrow = () => icon('arrow');

  const baseShow = show;
  const baseRender = render;
  const baseReset = resetDemo;
  let guide = null;
  try { guide = JSON.parse(localStorage.getItem('um-guide-v2')); } catch {}
  if (guide && (!Array.isArray(guide.done) || !Number.isInteger(guide.step) || guide.step < 0 || guide.step > 6 || (guide.ref && !D.leads.some(l => l.ref === guide.ref)))) guide = null;
  let previousFocus = null;

  Object.assign(EN, {
    'Start': 'Start', 'Beispiel starten': 'Start example', 'Bereiche': 'Explore',
    'Website für Kunden': 'Customer website', 'Anfrage ausprobieren': 'Try an enquiry',
    'Büro & Planung': 'Office & planning', 'Bereich für Kunden': 'Customer area',
    'Handy der Mitarbeitenden': 'Staff phone', 'Sprache': 'Language',
    'Demo zurücksetzen': 'Reset demo', 'Einfacher arbeiten.': 'Make work simpler.',
    'Ein Vorschlag von Dion · zum Ausprobieren, ohne echte Buchung': 'A concept by Dion · try it without making a real booking',
    'Anfragen & Kunden': 'Requests & customers', 'Mein Arbeitstag': 'My working day',
    'Erinnerungen': 'Reminders', 'Büro-Hilfe': 'Office help',
    'Offerte vorbereiten': 'Prepare quote', 'Im Büro ansehen →': 'View in the office →',
    'Anfrage abgeschlossen': 'Enquiry completed', 'Schliessen': 'Close'
  });
  const coreLabels = {
    fr: ['Accueil', 'Voir un exemple', 'Explorer', 'Site pour les clients', 'Essayer une demande', 'Bureau et planning', 'Espace clients', 'Téléphone des employés', 'Langue', 'Réinitialiser la démo'],
    it: ['Inizio', 'Prova un esempio', 'Esplora', 'Sito per i clienti', 'Prova una richiesta', 'Ufficio e pianificazione', 'Area clienti', 'Telefono dei collaboratori', 'Lingua', 'Reimposta la demo']
  };
  const labelKeys = ['Start', 'Beispiel starten', 'Bereiche', 'Website für Kunden', 'Anfrage ausprobieren', 'Büro & Planung', 'Bereich für Kunden', 'Handy der Mitarbeitenden', 'Sprache', 'Demo zurücksetzen'];
  Object.entries(coreLabels).forEach(([lang, values]) => labelKeys.forEach((key, i) => DICT[lang][key] = values[i]));

  render = function () {
    if (VIEW === 'guide') { renderGuide(); save(); }
    else baseRender();
  };
  show = function (view) {
    document.querySelectorAll('.nav-menu').forEach(menu => menu.open = false);
    document.body.style.background = '';
    baseShow(view);
    history.replaceState(null, '', '#' + view);
    const contexts = {
      pub: [t('Die Website für Ihre Kunden', 'The website your customers see'), t('Hier entdecken Kunden Ihr Angebot und fragen eine Offerte an.', 'Customers discover your services and request a quote here.')],
      wiz: [t('Eine Anfrage ausprobieren', 'Try an enquiry'), t('Nur ein Beispiel: Bitte verwenden Sie erfundene Angaben.', 'This is a demo: please use fictional details.')],
      adm: [t('Ihr Büro', 'Your office'), t('Hier behalten Sie Anfragen, Termine und Rechnungen im Blick.', 'Keep track of enquiries, appointments and invoices here.')],
      portal: [t('Der Bereich für Ihre Kunden', 'Your customer area'), t('So können Kunden ihre Termine, Berichte und Rechnungen selbst ansehen.', 'Customers can check their appointments, reports and invoices here.')],
      emp: [t('Das Handy Ihrer Mitarbeitenden', 'Your staff’s phone'), t('Hier sieht Marco, wo er arbeitet und was zu erledigen ist.', 'Marco can see where he is working and what needs doing.')]
    };
    const context = $('view-context');
    context.hidden = !contexts[view];
    if (contexts[view]) context.innerHTML = `<div class="w context-inner"><button class="back-link" onclick="show('feat')">← ${t('Zur Startseite', 'Back to start')}</button><div><b>${contexts[view][0]}</b><span>${contexts[view][1]}</span></div><button class="text-button" onclick="tour()">${t('Schritt für Schritt ansehen', 'See it step by step')} ${arrow()}</button></div>`;
    document.querySelectorAll('#topnav button[data-v]').forEach(button => {
      if (button.dataset.v === view) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    const main = document.querySelector(`#v-${view} h1`) || document.querySelector(`#v-${view}`);
    if (main) { main.tabIndex = -1; main.focus({preventScroll:true}); }
    document.querySelector('.skip-link').href = '#v-' + view;
  };
  $('topnav').onclick = event => {
    const button = event.target.closest('[data-v]');
    if (button) show(button.dataset.v);
  };
  go = function (view, section) {
    show(view);
    requestAnimationFrame(() => $('s-' + section)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}));
    return false;
  };
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-menu')) document.querySelectorAll('.nav-menu').forEach(menu => menu.open = false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      document.querySelectorAll('.nav-menu').forEach(menu => menu.open = false);
      closeD();
      if (previousFocus?.isConnected) previousFocus.focus();
    }
    const action = event.target.closest('[role="button"][tabindex="0"]');
    if (action && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); action.click(); }
  });
  const baseOpenD = openD;
  openD = function (html) {
    previousFocus = document.activeElement;
    baseOpenD(html);
    $('drawer').setAttribute('role', 'dialog');
    $('drawer').setAttribute('aria-label', t('Details', 'Details'));
    $('drawer').querySelector('button')?.focus({preventScroll:true});
  };
  const accessibleActions = root => root.querySelectorAll('div[onclick],tr[onclick]').forEach(el => { el.setAttribute('role','button'); el.tabIndex=0; });
  new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
    if (node.nodeType === 1) { accessibleActions(node); }
  }))).observe(document.body, {childList:true, subtree:true});

  window.rFeat = function () {
    $('fmain').innerHTML = `
      <div class="intro-hero">
        <div class="intro-copy">
          <p class="eyebrow"><span></span>${t('Eine Idee für Urs Moser Allround-Service', 'A concept for Urs Moser Allround-Service')}</p>
          <h1>${t('Mehr Zeit für Ihre Arbeit.<br><em>Weniger Büro.</em>', 'More time for your work.<br><em>Less paperwork.</em>')}</h1>
          <p class="intro-lead">${t('Eine neue Website bringt Anfragen. Ein einfaches Büro hält alles zusammen: Kunden, Offerten, Einsätze und Rechnungen.', 'A new website brings in enquiries. One simple workspace keeps customers, quotes, jobs and invoices together.')}</p>
          <div class="intro-actions"><button class="btn large" onclick="tour()">${t('Beispiel Schritt für Schritt starten', 'Try the step-by-step example')} ${arrow()}</button><button class="text-button" onclick="show('pub')">${t('Neue Website ansehen', 'See the new website')} ${arrow()}</button></div>
          <div class="quiet-note">${icon('check')} ${t('Etwa 2 Minuten · keine Anmeldung · alles zum Ausprobieren', 'About 2 minutes · no sign-up · safe to explore')}</div>
        </div>
        <div class="intro-visual">
          ${picture('home', t('Heller, gepflegter Wohnraum als Beispiel für die Reinigungsdienstleistung', 'A bright, well-kept home illustrating the cleaning service'), 'intro-photo', true)}
          <div class="photo-label">${photoNote()}</div>
          <div class="job-preview"><div class="preview-top"><span class="soft-icon">${icon('paper')}</span><span><small>${t('SO KÖNNTE IHR ALLTAG AUSSEHEN', 'A GLIMPSE OF YOUR WORKING DAY')}</small><b>${t('Eine Anfrage. Alles im Blick.', 'One enquiry. Everything in view.')}</b></span></div><div class="preview-person"><span class="avatar">AM</span><span><b>Anna Muster</b><small>${t('Wohnungsreinigung · 3.5 Zimmer · Biel', 'Apartment cleaning · 3.5 rooms · Biel')}</small></span><span class="mini-badge">${t('Beispiel', 'Example')}</span></div><div class="preview-flow"><span>${icon('check')}${t('Anfrage', 'Enquiry')}</span><i></i><span>${icon('paper')}${t('Offerte', 'Quote')}</span><i></i><span>${icon('calendar')}${t('Einsatz', 'Job')}</span></div></div>
        </div>
      </div>
      <div class="benefit-strip"><div>${icon('paper')}<span><b>${t('Weniger abtippen', 'Less typing')}</b>${t('Angaben einmal erfassen.', 'Enter the details once.')}</span></div><div>${icon('calendar')}<span><b>${t('Klarer planen', 'Clearer planning')}</b>${t('Wer macht was und wann?', 'Who does what, and when?')}</span></div><div>${icon('check')}<span><b>${t('Den Überblick behalten', 'Keep track')}</b>${t('Vom ersten Kontakt bis zur Rechnung.', 'From first contact to invoice.')}</span></div></div>
      <section class="intro-section" id="demo-how"><div class="section-heading"><div><p class="eyebrow">${t('SO GREIFT ALLES INEINANDER', 'HOW IT ALL CONNECTS')}</p><h2>${t('Ein Auftrag. Drei einfache Schritte.', 'One job. Three simple stages.')}</h2></div><p>${t('Sie müssen keine Technik verstehen. Die Demo zeigt Ihnen an einem Beispiel, was passiert.', 'You don’t need technical knowledge. Follow one example to see what happens.')}</p></div><div class="journey-row">${[
        ['01', 'home', t('Der Kunde fragt an', 'The customer enquires'), t('Anna braucht eine Wohnungsreinigung. Sie schickt ihre Angaben über Ihre Website.', 'Anna needs her apartment cleaned. She sends the details through your website.')],
        ['02', 'paper', t('Sie prüfen und planen', 'You review and plan'), t('Sie prüfen die vorbereitete Offerte und teilen die Arbeit Ihrem Team zu.', 'You review the prepared quote and assign the work to your team.')],
        ['03', 'check', t('Ihr Team erledigt den Rest', 'Your team does the work'), t('Marco bestätigt die erledigten Arbeiten. Sie prüfen den Bericht und erstellen die Rechnung.', 'Marco confirms what is done. You check the report and create the invoice.')]
      ].map(([n,ic,title,body])=>`<article><span class="journey-number">${n}</span><div class="journey-icon">${icon(ic)}</div><h3>${title}</h3><p>${body}</p></article>`).join('')}</div></section>
      <section class="website-teaser"><div class="teaser-image">${picture('cleaning',t('Reinigung einer Küchenoberfläche, KI-generiertes Beispielbild','Cleaning a kitchen counter, AI-generated example image'))}<span class="photo-label">${photoNote()}</span></div><div class="teaser-copy"><p class="eyebrow">${t('IHR ERSTER EINDRUCK IM INTERNET', 'YOUR FIRST IMPRESSION ONLINE')}</p><h2>${t('Ein Auftritt, der<br>Vertrauen schafft.', 'A website that<br>feels reassuring.')}</h2><p>${t('Klare Leistungen, freundliche Bilder und eine einfache Anfrage. So finden Kunden schneller, was sie brauchen.', 'Clear services, welcoming imagery and a straightforward enquiry. Help customers find what they need.')}</p><button class="btn" onclick="show('pub')">${t('Kunden-Website öffnen', 'Open the customer website')} ${arrow()}</button></div></section>
      <section class="intro-section" id="explore"><div class="section-heading"><div><p class="eyebrow">${t('SELBST AUSPROBIEREN', 'EXPLORE FOR YOURSELF')}</p><h2>${t('Für jeden der passende Überblick.', 'The right view for each person.')}</h2></div><p>${t('Öffnen Sie einen Bereich. Über «Zur Startseite» kommen Sie jederzeit hierher zurück.', 'Open an area. Use “Back to start” to return here at any time.')}</p></div><div class="role-grid">${[
        ['adm','paper',t('Für Sie im Büro','For you in the office'),t('Anfragen beantworten, Arbeit planen und Rechnungen im Blick behalten.','Answer enquiries, plan the work and keep track of invoices.'),t('Büro öffnen','Open office')],
        ['emp','phone',t('Für Ihr Team unterwegs','For your team on site'),t('Adresse finden, Aufgaben abhaken und den Arbeitsbericht senden.','Find the address, tick off tasks and send the work report.'),t('Handy-Ansicht öffnen','Open staff view')],
        ['portal','people',t('Für Ihre Kunden','For your customers'),t('Termine, erledigte Arbeiten und Rechnungen selbst nachschauen.','Check appointments, completed work and invoices.'),t('Kundenbereich öffnen','Open customer area')]
      ].map(([v,ic,title,body,button])=>`<article class="role-card"><span class="soft-icon">${icon(ic)}</span><h3>${title}</h3><p>${body}</p><button class="text-button" onclick="show('${v}')">${button} ${arrow()}</button></article>`).join('')}</div></section>
      <section class="intro-section details-section"><div><p class="eyebrow">${t('GUT ZU WISSEN', 'GOOD TO KNOW')}</p><h2>${t('Einfach erklärt.', 'Simply explained.')}</h2><p class="mut">${t('Die wichtigsten Fragen, ohne Fachsprache.', 'The essentials, without technical jargon.')}</p></div><div class="simple-faq">
        <details><summary>${t('Was kann ich hier ausprobieren?', 'What can I try here?')}</summary><p>${t('Den vollständigen Ablauf mit erfundenen Beispieldaten: Anfrage, Offerte, Planung, Arbeitsbericht und Rechnung. Es werden keine E-Mails versendet und keine Zahlungen ausgelöst.', 'Try the full journey with fictional data: enquiry, quote, scheduling, work report and invoice. No emails are sent and no payments are made.')}</p></details>
        <details><summary>${t('Was macht die automatische Hilfe?', 'What does the automatic help do?')}</summary><p>${t('Sie bereitet zum Beispiel eine Offerte vor. Das ist ein Vorschlag, den Sie lesen und ändern können. Sie bestimmen, welcher Preis gilt und wann etwas versendet wird. In dieser Demo sind die Antworten simuliert.', 'It can prepare a quote for you to read and edit. You decide the price and when it is sent. Responses in this demo are simulated.')}</p></details>
        <details><summary>${t('Was bedeutet «Offerte» oder «Rapport»?', 'What do “quote” and “report” mean?')}</summary><p>${t('Eine Offerte ist Ihr schriftliches Preisangebot. Ein Rapport ist ein kurzer Arbeitsbericht: Was wurde erledigt, wie lange dauerte es, gibt es etwas zu beachten?', 'A quote is your written price offer. A report records what was done, how long it took and anything that needs attention.')}</p></details>
        <details><summary>${t('Ist das schon ein fertiges Geschäftssystem?', 'Is this already a live business system?')}</summary><p>${t('Dies ist ein Vorschlag zum Ansehen und Ausprobieren. Für den echten Betrieb werden Ihre Preise, echten Fotos, Benutzerkonten, Datensicherung und E-Mail-Versand eingerichtet. Diese Demo speichert Beispieldaten nur in diesem Browser.', 'This is a concept to explore. Real use needs your prices, real photos, user accounts, backups and email delivery to be set up. This demo saves sample data only in this browser.')}</p></details>
        <details class="all-features"><summary>${t('Welche weiteren Möglichkeiten sind geplant?', 'What other features are planned?')}</summary><p>${t('Diese Übersicht beschreibt den möglichen Ausbau. Die Schaltflächen öffnen den jeweiligen Beispielbereich.', 'This overview describes possible future additions. The buttons open the relevant demo area.')}</p><div class="feature-list">${FEAT.filter(f=>f.go).map(f=>`<div><h3>${t(f.de,f.en).replace('CRM','Kundenverwaltung')}</h3><p>${t(f.dd,f.de_)}</p><button class="text-button" onclick="goFeat('${f.go}')">${t('Beispiel ansehen','View example')} ${arrow()}</button></div>`).join('')}</div></details>
      </div></section>
      <div class="demo-end"><div><h2>${t('Am besten versteht man es beim Ausprobieren.', 'The easiest way to understand it is to try it.')}</h2><p>${t('Wir begleiten Anna von der Anfrage bis zur Rechnung.', 'Follow Anna’s job from enquiry to invoice.')}</p></div><button class="btn light" onclick="tour()">${t('Beispiel starten','Start example')} ${arrow()}</button></div>
      <div class="concept-footer"><span>Urs Moser Allround-Service · ${t('Konzept von Dion','Concept by Dion')}</span><span>${t('Beispieldaten und KI-generierte Bilder · keine echte Buchung','Sample data and AI-generated images · no real booking')}</span></div>`;
  };

  const baseWiz = rWiz;
  rWiz = function () {
    baseWiz();
    const heading = document.querySelector('#v-wiz h1');
    if (!$('wizard-intro')) heading.insertAdjacentHTML('afterend', `<div id="wizard-intro" class="wizard-help"><p>${t('Probieren Sie die Anfrage mit erfundenen Angaben aus. Es wird nichts versendet.', 'Try an enquiry with fictional details. Nothing will be sent.')}</p><button class="text-button" onclick="fillSampleEnquiry()">${t('Beispielangaben einsetzen', 'Use sample details')}</button></div>`);
    if (W.s === 7) $('wstep').textContent = t('Anfrage abgeschlossen', 'Enquiry completed');
    $('wizard-intro').hidden = W.s === 7;
    const error = document.createElement('p'); error.id='wizard-error'; error.className='inline-error'; error.setAttribute('role','alert'); error.hidden=true; $('wbody').append(error);
    const upload = $('wbody').querySelector('input[type="file"]');
    if (upload) upload.setAttribute('aria-label',t('Fotos auswählen (optional)','Choose photos (optional)'));
  };
  const baseWNav = wNav;
  wNav = function (n) {
    if (n > 0) {
      const errors = [!W.d.svc && t('Bitte wählen Sie eine Dienstleistung.','Please choose a service.'), !W.d.ct && t('Bitte wählen Sie, wer anfragt.','Please choose who is making the enquiry.'), (!W.d.str?.trim() || !W.d.plz?.trim()) && t('Bitte geben Sie Strasse und Ort an.','Please enter the street and town.'), false, false, (!W.d.name?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(W.d.email||'') || !W.d.consent) && t('Bitte geben Sie einen Namen und eine gültige E-Mail-Adresse an und bestätigen Sie die Einwilligung.','Please enter a name and valid email address and confirm consent.')];
      if (errors[W.s]) { const e=$('wizard-error');e.textContent=errors[W.s];e.hidden=false;e.tabIndex=-1;e.focus();return; }
    }
    baseWNav(n);
    $('wbody').querySelector('h2,h3')?.setAttribute('tabindex','-1');
    $('wbody').querySelector('h2,h3')?.focus({preventScroll:true});
  };
  window.fillSampleEnquiry = function () {
    W = {s:0,d:{svc:'wohnung',ct:'Mieter',str:'Bahnhofstrasse 5',plz:'2502 Biel',bt:'Wohnung',zi:'3.5',m2:'78',bad:'1',fen:'7',mob:'Leer',bal:true,kue:true,w1:'2026-11-28',name:'Anna Muster',email:'anna.muster@example.com',tel:'079 555 11 22',consent:false}};
    rWiz();toast(t('Beispielangaben eingefügt. Sie können alles ändern.','Sample details added. You can change anything.'));
  };

  const stages = () => [
    [t('Anfrage','Enquiry'),t('Anna, Ihre Kundin','Anna, your customer'),t('«Meine Wohnung braucht eine Endreinigung.»','“My apartment needs an end-of-tenancy clean.”'),t('Anna füllt auf Ihrer Website eine kurze Anfrage aus. Alle Angaben kommen geordnet bei Ihnen an.','Anna sends an enquiry from your website. The details arrive together in your office.'),t('Beispiel-Anfrage senden','Send sample enquiry'),t('Sie müssen die Angaben nicht noch einmal abtippen.','You don’t need to type the same details again.')],
    [t('Offerte','Quote'),t('Sie im Büro','You in the office'),t('Eine Offerte ist schon vorbereitet.','A quote is ready for you to review.'),t('Das Programm bereitet das Preisangebot vor. Sie prüfen den Inhalt und entscheiden, ob es an Anna gehen darf.','The program prepares a price offer. You check it and decide whether to send it to Anna.'),t('Offerte prüfen und im Beispiel senden','Approve and send the sample quote'),t('Die Preise kommen aus Ihrer Preisliste. Sie behalten das letzte Wort.','Prices come from your price list. You have the final say.')],
    [t('Zusage','Acceptance'),t('Anna, Ihre Kundin','Anna, your customer'),t('Anna sagt Ja. Der Auftrag ist da.','Anna says yes. The job is confirmed.'),t('Anna sieht das Angebot und nimmt es an. Daraus entsteht ein Auftrag, den Sie direkt einplanen können.','Anna reviews and accepts your quote. This creates a job ready to be scheduled.'),t('Als Anna die Offerte annehmen','Accept the quote as Anna'),t('Anfrage, Angebot und Auftrag bleiben miteinander verbunden.','The enquiry, quote and job stay connected.')],
    [t('Planung','Planning'),t('Sie im Büro','You in the office'),t('Wer geht wann zu Anna?','Who visits Anna, and when?'),t('Sie wählen einen Termin und teilen Marco ein. Er findet Adresse und Aufgaben in seiner Handy-Ansicht.','Choose a date and assign Marco. The address and tasks appear in his staff view.'),t('Marco einteilen','Assign Marco'),t('Ihr Team hat die Angaben zum Einsatz an einem Ort.','Your team has the job details in one place.')],
    [t('Arbeit','Work'),t('Marco, Ihr Mitarbeiter','Marco, your team member'),t('Erledigt? Einfach abhaken.','Done? Just tick it off.'),t('Marco bestätigt die erledigten Aufgaben und schickt einen kurzen Arbeitsbericht ins Büro. Probieren Sie die Häkchen aus.','Marco confirms completed tasks and sends a short report to the office. Try ticking the boxes.'),t('Arbeitsbericht senden','Send work report'),t('Sie sehen, was erledigt ist, ohne nachtelefonieren zu müssen.','See what is done without making another phone call.')],
    [t('Rechnung','Invoice'),t('Sie im Büro','You in the office'),t('Arbeit prüfen. Rechnung erstellen.','Check the work. Create the invoice.'),t('Sie lesen Marcos Bericht. Wenn alles passt, erstellen Sie die Rechnung aus dem Auftrag.','Read Marco’s report. If everything is in order, create the invoice from the job.'),t('Arbeit freigeben und Rechnung erstellen','Approve work and create invoice'),t('Die Angaben aus der Offerte werden für die Rechnung übernommen.','The quote details are carried through to the invoice.')]
  ];
  const newGuide = () => ({step:0,done:[],ref:null,quote:null,job:null,invoice:null,date:'2026-11-28',time:'08:00'});
  window.tour = function () { if (!guide || (guide.ref&&!D.leads.some(l=>l.ref===guide.ref))) guide=newGuide(); show('guide'); };
  window.guideBack = function () { guide.step=Math.max(0,guide.step-1);renderGuide();focusGuide(); };
  const focusGuide=()=>{const h=$('guide-title');if(h){h.tabIndex=-1;h.focus({preventScroll:true});}window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});};
  window.guideNext = function () { guide.step=Math.min(6,guide.step+1);renderGuide();focusGuide(); };
  window.guideAction = function () {
    const s=guide.step;
    if(guide.done[s])return guideNext();
    if(s===0){
      guide.ref='UM-'+(++D.seq.lead);
      D.leads.unshift({ref:guide.ref,d:'2026-11-07',svc:'wohnung',ct:'Mieter',n:'Anna Muster',e:'anna.muster@example.com',tel:'079 555 11 22',addr:'Bahnhofstrasse 5, 2502 Biel',det:{zi:'3.5',m2:'78',bad:'1',fen:'7',bal:true,kue:true},st:'Neu',cust:null});
      logA(`Beispiel-Anfrage ${guide.ref} von Anna Muster eingegangen`);
      aiQuote(guide.ref);guide.quote=D.quotes.find(q=>q.lead===guide.ref).no;closeD();
    }
    if(s===1){qApprove(guide.quote);qSend(guide.quote);closeD();}
    if(s===2){acceptQ(guide.quote);guide.job=D.jobs.find(j=>j.quote===guide.quote).no;}
    if(s===3){
      const date=$('guide-date').value,time=$('guide-time').value;
      if(!date||!time)return guideError(t('Bitte wählen Sie Datum und Uhrzeit.','Please choose a date and time.'));
      const job=D.jobs.find(j=>j.no===guide.job),proposed={...job,date,time};
      if(conflict(proposed,'S3'))return guideError(t('Marco ist zu dieser Zeit bereits eingeteilt. Bitte wählen Sie einen anderen Termin.','Marco already has a job at that time. Please choose another time.'));
      job.date=date;job.time=time;job.staff=['S3'];job.st='Zugewiesen';job.log.push(`Zugewiesen: Marco Keller · ${dt(date)} ${time}`);guide.date=date;guide.time=time;
    }
    if(s===4){
      const job=D.jobs.find(j=>j.no===guide.job);
      if(job.cl.some(c=>!c[1]))return guideError(t('Bitte haken Sie zuerst alle erledigten Aufgaben ab.','Please tick off each completed task first.'));
      job.report=$('guide-report').value.trim()||t('Alle Arbeiten gemäss Checkliste erledigt.','All checklist tasks completed.');job.st='Qualitätsprüfung';job.log.push('Arbeitsbericht von Marco gesendet (Beispiel)');
    }
    if(s===5){jQA(guide.job);mkInv(guide.job);guide.invoice=D.invoices[0].no;closeD();}
    guide.done[s]=true;save();$('toast').style.display='none';guideNext();
  };
  function guideError(message){const e=$('guide-error');e.textContent=message;e.hidden=false;e.tabIndex=-1;e.focus();}
  window.guideCheck=(index,checked)=>{D.jobs.find(j=>j.no===guide.job).cl[index][1]=checked?1:0;save();};
  window.guideOpenOffice=()=>{ANAV='rechnungen';show('adm');if(guide?.invoice)invD(guide.invoice);};
  window.guideReplay=()=>{if(guide){guide.step=0;show('guide');}else tour();};
  resetDemo=function(){baseReset();guide=null;try{localStorage.removeItem('um-guide-v2');}catch{}if(VIEW==='guide'){guide=newGuide();renderGuide();}toast(t('Die Beispieldaten sind wieder am Anfang.','The sample data has been reset.'));document.querySelectorAll('.nav-menu').forEach(m=>m.open=false);};

  function renderGuide(){
    if(!guide)guide=newGuide();
    try { localStorage.setItem('um-guide-v2',JSON.stringify(guide)); } catch {}
    const s=guide.step,all=stages(),q=D.quotes.find(q=>q.no===guide.quote),job=D.jobs.find(j=>j.no===guide.job),total=q?totals(q.lines):null;
    if(s===6){
      $('guide-root').innerHTML=`<div class="guide-complete"><span class="complete-mark">${icon('check')}</span><p class="eyebrow">${t('DAS WAR IHR ERSTER BEISPIELAUFTRAG','YOUR FIRST EXAMPLE JOB IS COMPLETE')}</p><h1 id="guide-title">${t('Von der Anfrage<br>bis zur Rechnung.','From enquiry<br>to invoice.')}</h1><p>${t('Anna fragt an. Sie geben die Offerte frei. Marco erledigt die Arbeit. Alles bleibt an einem Ort.','Anna enquires. You approve the quote. Marco completes the work. Everything stays together.')}</p><div class="completion-receipt"><div><small>${t('Beispielrechnung für Anna Muster','Sample invoice for Anna Muster')}</small><b>${guide.invoice}</b></div><strong>${total?chf(total.tot):''}</strong><span class="mini-badge">${t('Offen · nicht bezahlt','Open · unpaid')}</span></div><p class="quiet-note">${t('Es wurde nichts versendet und keine Zahlung ausgelöst. Die Beispielrechnung finden Sie auch im Büro.','Nothing was sent and no payment was made. You can also find this sample invoice in the office.')}</p><div class="intro-actions"><button class="btn large" onclick="guideOpenOffice()">${t('Die Rechnung im Büro ansehen','See the invoice in the office')} ${arrow()}</button><button class="btn g" onclick="show('feat')">${t('Zur Startseite','Back to start')}</button><button class="text-button" onclick="guideReplay()">${t('Beispiel nochmals ansehen','Review the example')}</button></div></div>`;return;
    }
    const stage=all[s],done=guide.done[s];let content='';
    if(s===0)content=`<div class="example-heading"><span class="avatar">AM</span><div><h3>Anna Muster</h3><p>${t('Beispielkundin in Biel','Sample customer in Biel')}</p></div><span class="mini-badge">${t('Neue Anfrage','New enquiry')}</span></div><dl class="simple-data"><div><dt>${t('Was?','What?')}</dt><dd>${t('Wohnungsreinigung beim Auszug','End-of-tenancy apartment cleaning')}</dd></div><div><dt>${t('Wie gross?','How big?')}</dt><dd>3.5 ${t('Zimmer','rooms')} · 78 m² · 7 ${t('Fenster','windows')}</dd></div><div><dt>${t('Wo?','Where?')}</dt><dd>Bahnhofstrasse 5, 2502 Biel</dd></div><div><dt>${t('Wann?','When?')}</dt><dd>28.11.2026</dd></div></dl><div class="example-note">${t('Die Angaben sind bereits ausgefüllt. Klicken Sie unten auf «Beispiel-Anfrage senden».','The details are filled in for you. Click “Send sample enquiry” below.')}</div>`;
    if(s===1)content=`<div class="example-heading"><span class="soft-icon">${icon('paper')}</span><div><h3>${t('Offerte für Anna','Quote for Anna')}</h3><p>${q?.no||''} · ${t('Beispielpreise','Sample prices')}</p></div><span class="mini-badge">${done?t('Geprüft','Reviewed'):t('Ihre Prüfung nötig','Review needed')}</span></div><div class="quote-lines">${(q?.lines||[]).filter(l=>l.p>0).map(l=>`<div><span>${esc(l.t)}</span><b>${chf(l.q*l.p)}</b></div>`).join('')}</div><div class="quote-total"><span>${t('Total inkl. MWST','Total incl. VAT')}</span><strong>${total?chf(total.tot):''}</strong></div><div class="example-note">${t('Im vollständigen Büro können Sie jede Position und jeden Preis ändern. Hier sehen Sie den vorbereiteten Beispielentwurf.','In the full office view you can edit every line and price. Here you can review the prepared example.')}</div>`;
    if(s===2)content=`<div class="customer-quote"><span class="soft-icon">${icon('paper')}</span><small>Urs Moser Allround-Service</small><h3>${t('Grüezi Anna, Ihre Offerte ist da.','Hello Anna, your quote is ready.')}</h3><p>${t('Endreinigung Ihrer 3.5-Zimmer-Wohnung in Biel.','End-of-tenancy cleaning for your 3.5-room apartment in Biel.')}</p><strong>${total?chf(total.tot):''}</strong><span>${t('inklusive MWST · nur ein Beispielpreis','including VAT · sample price only')}</span><div class="example-note">${t('Anna kann das Angebot in Ruhe lesen und dann annehmen.','Anna can review the offer in her own time, then accept it.')}</div></div>`;
    if(s===3)content=`<div class="example-heading"><span class="soft-icon">${icon('calendar')}</span><div><h3>${t('Reinigung bei Anna','Cleaning at Anna’s')}</h3><p>${job?.no||''} · Biel</p></div></div><div class="g2"><div><label for="guide-date">${t('Datum','Date')}</label><input id="guide-date" type="date" value="${guide.date}" ${done?'disabled':''}></div><div><label for="guide-time">${t('Beginn','Start time')}</label><input id="guide-time" type="time" value="${guide.time}" ${done?'disabled':''}></div></div><div class="staff-choice"><span class="avatar">MK</span><div><b>Marco Keller</b><span>${t('Mitarbeiter · Reinigung','Team member · cleaning')}</span></div>${icon('check')}</div><div class="example-note">${t('Im Büro sehen Sie auch die anderen Einsätze. Bei einer Überschneidung weist Sie das Programm darauf hin.','The office also shows other jobs. The program flags a conflicting appointment.')}</div>`;
    if(s===4)content=`<div class="example-heading"><span class="avatar">MK</span><div><h3>${t('Marcos Aufgaben bei Anna','Marco’s tasks at Anna’s')}</h3><p>${dt(guide.date)} · ${guide.time}</p></div></div><div class="guide-checks">${(job?.cl||[]).map((c,i)=>`<label><input type="checkbox" ${c[1]?'checked':''} ${done?'disabled':''} onchange="guideCheck(${i},this.checked)"><span>${esc(c[0])}</span></label>`).join('')}</div><label for="guide-report">${t('Kurzer Arbeitsbericht','Short work report')}</label><textarea id="guide-report" rows="2" ${done?'readonly':''}>${esc(job?.report||t('Wohnung gereinigt. Alles für die Abgabe bereit.','Apartment cleaned. Everything ready for handover.'))}</textarea>`;
    if(s===5)content=`<div class="example-heading"><span class="soft-icon">${icon('check')}</span><div><h3>${t('Marcos Bericht ist da','Marco’s report is ready')}</h3><p>${t('Alle Aufgaben abgehakt','All tasks completed')}</p></div><span class="mini-badge">${t('Zur Prüfung','For review')}</span></div><blockquote class="work-report">${esc(job?.report||'')}</blockquote><dl class="simple-data"><div><dt>${t('Kundin','Customer')}</dt><dd>Anna Muster</dd></div><div><dt>${t('Leistung','Service')}</dt><dd>${t('Wohnungsreinigung','Apartment cleaning')}</dd></div><div><dt>${t('Rechnungsbetrag','Invoice amount')}</dt><dd><strong>${total?chf(total.tot):''}</strong></dd></div></dl><div class="example-note">${t('Erst nach Ihrer Prüfung wird die Rechnung erstellt. «Rechnung erstellt» bedeutet noch nicht «bezahlt».','The invoice is created only after your review. An invoice is not automatically marked as paid.')}</div>`;
    $('guide-root').innerHTML=`<div class="guide-topline"><button class="back-link" onclick="show('feat')">← ${t('Zur Startseite','Back to start')}</button><span>${t('Ein Auftrag mit Anna Muster','One job with Anna Muster')} · ${t('Beispieldaten','Sample data')}</span></div><ol class="guide-progress" aria-label="${t('Fortschritt','Progress')}">${all.map((step,i)=>`<li class="${i===s?'current':i<s?'done':''}" ${i===s?'aria-current="step"':''}><span>${i<s?'✓':i+1}</span><b>${step[0]}</b></li>`).join('')}</ol><div class="guide-layout"><div class="guide-copy"><p class="eyebrow">${t('SCHRITT','STEP')} ${s+1} ${t('VON','OF')} 6</p><div class="role-pill">${s===0||s===2?icon('people'):s===4?icon('phone'):icon('paper')}${stage[1]}</div><h1 id="guide-title">${stage[2]}</h1><p>${stage[3]}</p><div class="guide-benefit">${icon('check')}<span><b>${t('Das bringt es Ihnen','How it helps')}</b>${stage[5]}</span></div><div class="guide-safety">${t('Sie probieren nur aus. Es wird nichts versendet oder bezahlt.','You are only trying it out. Nothing is sent or paid.')}</div></div><div class="example-card"><div class="example-card-label"><span class="demo-dot"></span>${t('KLICKBARES BEISPIEL','INTERACTIVE EXAMPLE')}</div><div class="example-content">${content}<p id="guide-error" class="inline-error" role="alert" hidden></p><button class="btn large guide-action" onclick="guideAction()">${done?t('Weiter zum nächsten Schritt','Continue to next step'):stage[4]} ${arrow()}</button><div class="guide-controls">${s?`<button class="back-link" onclick="guideBack()">← ${t('Einen Schritt zurück','Back one step')}</button>`:`<span>${t('Starten Sie mit der grünen Schaltfläche.','Start with the green button.')}</span>`}<span>${s+1}/6</span></div></div></div></div>`;
  }

  rPub = function () {
    const featured=['wohnung','unterhalt','hauswart'];
    const serviceCard = service => `<article class="service-choice"><span class="service-icon" aria-hidden="true">${service[1]}</span><h3>${tr(service[2])}</h3><p>${tr(service[3])}</p><button class="text-button" onclick="W={s:1,d:{svc:'${service[0]}'}};show('wiz')">${t('Offerte anfragen','Request a quote')} ${arrow()}</button></article>`;
    $('v-pub').innerHTML=`<header class="public-header"><div class="w public-nav"><button class="public-brand" onclick="show('pub')">Urs Moser<span>Allround-Service</span></button><nav aria-label="${t('Website-Navigation','Website navigation')}"><a href="#s-dl" onclick="return go('pub','dl')">${t('Leistungen','Services')}</a><a href="#s-ue" onclick="return go('pub','ue')">${t('Über uns','About us')}</a><a href="#s-ko" onclick="return go('pub','ko')">${t('Kontakt','Contact')}</a></nav><button class="btn" onclick="show('wiz')">${t('Offerte anfragen','Request a quote')} ${arrow()}</button></div></header>
      <div class="public-hero w"><div class="public-hero-copy"><p class="eyebrow"><span></span>Bern · Biel · Solothurn</p><h1>${t('Saubere Räume.<br><em>Ein gutes Gefühl.</em>','Clean spaces.<br><em>Peace of mind.</em>')}</h1><p>${t('Reinigung, Hauswartung und technischer Unterhalt aus einer Hand. Damit Ihr Zuhause und Ihre Liegenschaft in guten Händen sind.','Cleaning, caretaking and technical maintenance from one local provider. Helping you take care of your home and property.')}</p><div class="intro-actions"><button class="btn large" onclick="show('wiz')">${t('Kostenlose Offerte anfragen','Request a free quote')} ${arrow()}</button><button class="text-button" onclick="go('pub','dl')">${t('Leistungen entdecken','Explore services')}</button></div><div class="quiet-note">${icon('check')}${t('Unverbindlich anfragen · Preis und Termin persönlich bestätigt','No-obligation enquiry · price and date confirmed personally')}</div></div><figure class="public-hero-photo">${picture('home',t('Heller Wohnraum mit gepflegtem Holzboden','A bright living room with a well-kept wooden floor'),'image-fill',true)}<figcaption>${photoNote()}</figcaption><div class="photo-callout">${icon('home')}<span>${t('Für Zuhause.<br>Für Ihre Liegenschaft.','For your home.<br>For your property.')}</span></div></figure></div>
      <div class="service-band"><div class="w"><span>${t('Reinigung','Cleaning')}</span><i></i><span>${t('Hauswartung','Caretaking')}</span><i></i><span>${t('Technik','Maintenance')}</span><i></i><span>${t('Ein Ansprechpartner','One point of contact')}</span></div></div>
      <section class="intro-section w" id="s-dl"><div class="section-heading"><div><p class="eyebrow">${t('WAS WIR FÜR SIE TUN','HOW WE CAN HELP')}</p><h2>${t('Was braucht Ihre Liegenschaft?','What does your property need?')}</h2></div><p>${t('Einmal gründlich reinigen oder regelmässig betreuen. Wählen Sie, was zu Ihnen passt.','A thorough one-off clean or regular care. Choose the service that fits your needs.')}</p></div><div class="service-grid">${featured.map(key=>serviceCard(SVCS.find(s=>s[0]===key))).join('')}</div><details class="more-services"><summary>${t('Alle weiteren Leistungen ansehen','See all other services')} <span>+</span></summary><div class="service-grid">${SVCS.filter(s=>!featured.includes(s[0])).map(serviceCard).join('')}</div></details></section>
      <section class="public-split w" id="s-iv"><figure>${picture('cleaning',t('Sorgfältige Reinigung einer Küchenoberfläche','Careful cleaning of a kitchen counter'),'image-fill')}<figcaption>${photoNote()}</figcaption></figure><div><p class="eyebrow">${t('REGELMÄSSIG GUT BETREUT','RELIABLE PROPERTY CARE')}</p><h2>${t('Eine Sorge weniger.<br>Jeden Tag.','One less thing to worry about.<br>Every day.')}</h2><p>${t('Für Eigentümer und Verwaltungen: Reinigung und Unterhalt übersichtlich organisiert. Ihre Termine, Arbeitsberichte und Rechnungen können Sie im Kundenbereich nachschauen.','For owners and property managers: cleaning and maintenance, clearly organised. View appointments, work reports and invoices in your customer area.')}</p><ul class="check-list"><li>${icon('check')}${t('Regelmässige Reinigung nach Absprache','Regular cleaning by arrangement')}</li><li>${icon('check')}${t('Wartung und Meldungen an einem Ort','Maintenance and issue reports together')}</li><li>${icon('check')}${t('Ein klarer Überblick über erledigte Arbeiten','A clear record of completed work')}</li></ul><button class="btn g" onclick="show('portal')">${t('Kundenbereich ausprobieren','Try the customer area')} ${arrow()}</button></div></section>
      <section class="intro-section w"><div class="section-heading"><div><p class="eyebrow">${t('SO EINFACH GEHT ES','HOW IT WORKS')}</p><h2>${t('Von Ihrer Anfrage zum sauberen Ergebnis.','From your enquiry to a clean result.')}</h2></div></div><div class="journey-row">${[
        [t('Sie sagen uns, was Sie brauchen.','Tell us what you need.'),t('Wählen Sie die Leistung und geben Sie Ort und Wunschdatum an.','Choose a service and tell us the location and preferred date.')],
        [t('Sie erhalten eine klare Offerte.','Receive a clear quote.'),t('Wir prüfen Ihre Angaben. Preis und Termin bestätigen wir persönlich.','We review your details and personally confirm the price and date.')],
        [t('Wir kümmern uns um die Arbeit.','We take care of the work.'),t('Unser Team kommt zum vereinbarten Termin. Sie erhalten einen Arbeitsbericht.','Our team arrives at the agreed time. You receive a report of the work.')]
      ].map(([a,b],i)=>`<article><span class="journey-number">0${i+1}</span><h3>${a}</h3><p>${b}</p></article>`).join('')}</div></section>
      <section class="about-section" id="s-ue"><div class="w details-section"><div><p class="eyebrow">Urs Moser Allround-Service</p><h2>${t('Persönlich.<br>In Ihrer Region.','Personal service.<br>In your region.')}</h2><p>${t('Reinigung, Hauswartung und technischer Gebäudeunterhalt in Bern, Biel und Solothurn. Ihr Anliegen hat einen festen Ansprechpartner.','Cleaning, caretaking and technical property maintenance in Bern, Biel and Solothurn. A personal point of contact for your needs.')}</p><div class="people-line"><div><span class="avatar">UM</span><span><b>Urs Moser</b><small>${t('Geschäftsinhaber','Business owner')}</small></span></div><div><span class="avatar">RB</span><span><b>Rita Bütikofer</b><small>${t('Büro & Organisation','Office & organisation')}</small></span></div></div></div><div class="simple-faq"><h3>${t('Noch eine Frage?','Have a question?')}</h3>${[
        [t('Ist die Offerte kostenlos?','Is the quote free?'),t('Ja. Für grössere oder schwer einzuschätzende Arbeiten vereinbaren wir zuerst eine Besichtigung.','Yes. For larger jobs or work that is difficult to assess, we first arrange a site visit.')],
        [t('Wo sind Sie tätig?','Where do you work?'),t('In der Region Bern, Biel und Solothurn. Für andere Orte fragen Sie uns gerne an.','In the Bern, Biel and Solothurn region. Please enquire about other locations.')],
        [t('Kann ich eine regelmässige Reinigung anfragen?','Can I request regular cleaning?'),t('Ja. Im Anfrageformular können Sie zum Beispiel eine wöchentliche oder monatliche Betreuung auswählen.','Yes. You can select a weekly or monthly arrangement in the enquiry form.')]
      ].map(([a,b])=>`<details><summary>${a}</summary><p>${b}</p></details>`).join('')}</div></div></section>
      <section class="public-cta w"><div><p class="eyebrow">${t('WIR FREUEN UNS AUF IHRE ANFRAGE','WE LOOK FORWARD TO YOUR ENQUIRY')}</p><h2>${t('Was dürfen wir<br>für Sie erledigen?','How can<br>we help you?')}</h2></div><div><button class="btn large" onclick="show('wiz')">${t('Kostenlose Offerte anfragen','Request a free quote')} ${arrow()}</button><p>${t('In dieser Demo probieren Sie die Anfrage unverbindlich aus.','In this demo, you can try an enquiry without any commitment.')}</p></div></section>
      <footer id="s-ko"><div class="w footer-grid"><div class="footer-brand">Urs Moser<span>Allround-Service</span><p>Bern · Biel · Solothurn</p></div><div><b>${t('Kontakt','Contact')}</b><p><a href="tel:+41763653848">+41 76 365 38 48</a><br><a href="mailto:info@urs-moser-allround-service.ch">info@urs-moser-allround-service.ch</a></p></div><div><b>${t('Konzept-Demo von Dion','Concept demo by Dion')}</b><p>${t('Keine echten Buchungen. Bilder sind KI-generierte Beispiele.','No real bookings. Images are AI-generated examples.')}</p><button class="footer-link" onclick="show('feat')">${t('Zur Demo-Übersicht','Back to demo overview')} →</button></div></div></footer>
      <button class="chatb" onclick="toggleServiceHelp()" aria-controls="chat" aria-expanded="false">${t('Fragen zu den Leistungen?','Questions about our services?')}</button>
      <div class="card chat" id="chat" role="dialog" aria-label="${t('Fragen zu den Leistungen','Service questions')}"><div class="help-heading"><div><b>${t('Wir helfen Ihnen weiter.','Let’s help you find out.')}</b><small>${t('Beispiel-Hilfe · keine Nachricht an das Büro','Sample help · no message is sent to the office')}</small></div><button class="btn g s" aria-label="${t('Hilfe schliessen','Close help')}" onclick="toggleServiceHelp()">✕</button></div><div class="msgs" id="cmsgs"><div class="m a">${t('Grüezi! Fragen Sie nach unseren Leistungen, der Region oder dem Ablauf. Preise und Termine bestätigt immer unser Team.','Hello! Ask about services, our region or how it works. Our team always confirms prices and dates.')}</div></div><form class="help-form" onsubmit="pubChat(event)"><label class="sr-only" for="cin">${t('Ihre Frage','Your question')}</label><input id="cin" placeholder="${t('z. B. Reinigung in Biel?','e.g. Cleaning in Biel?')}" required><button class="btn" aria-label="${t('Frage stellen','Ask question')}">→</button></form></div>`;
  };

  window.toggleServiceHelp=function(){const open=$('chat').classList.toggle('on');document.querySelector('.chatb').setAttribute('aria-expanded',String(open));if(open)$('cin').focus();else document.querySelector('.chatb').focus();};
  pubChat=function(event){
    event.preventDefault();const question=$('cin').value.trim();if(!question)return;$('cin').value='';
    let answer=t('Das kann diese Beispiel-Hilfe nicht sicher beantworten. Bitte besprechen Sie Ihr Anliegen mit dem Team.','This sample helper cannot answer that reliably. Please discuss your request with the team.');
    if(/preis|kost|chf|price|cost|quote/i.test(question))answer=t('Der Preis hängt von der Arbeit ab. Beschreiben Sie Ihr Anliegen in der Anfrage. Das Team prüft die Angaben und bestätigt eine Offerte.','The price depends on the work. Describe your needs in the enquiry. The team reviews the details and confirms a quote.');
    else if(/biel|bern|solothurn|region|where|wo /i.test(question))answer=t('Wir sind in der Region Bern, Biel und Solothurn tätig. Für andere Orte fragen Sie bitte beim Team an.','We work in the Bern, Biel and Solothurn region. Please ask the team about other locations.');
    else if(/termin|wann|date|when/i.test(question))answer=t('Sie können im Anfrageformular Wunschtermine angeben. Ein Termin gilt erst nach Bestätigung durch das Team.','You can enter preferred dates in the enquiry form. A date is confirmed only when the team agrees.');
    else if(/wohnung|abgabe|auszug|flat|apartment|move/i.test(question))answer=t('Für eine Wohnungsreinigung beim Auszug geben Sie Zimmer, Fläche und Abgabetermin an. Fotos helfen dem Team bei der Einschätzung.','For end-of-tenancy cleaning, give the number of rooms, area and handover date. Photos help the team assess the work.');
    else if(/abo|regelm|treppenhaus|weekly|regular/i.test(question))answer=t('Sie können eine regelmässige Reinigung anfragen, zum Beispiel wöchentlich oder monatlich. Wählen Sie «Unterhaltsreinigung» im Formular.','You can request regular cleaning, for example weekly or monthly. Choose “Maintenance cleaning” in the form.');
    const messages=$('cmsgs');messages.insertAdjacentHTML('beforeend',`<div class="m u">${esc(question)}</div><div class="m a">${answer}<br><button class="text-button" onclick="show('wiz')">${t('Anfrage ausprobieren','Try an enquiry')} →</button></div>`);messages.scrollTop=messages.scrollHeight;
  };

  const initialView=location.hash.slice(1);
  show(['feat','pub','guide','wiz','adm','portal','emp'].includes(initialView)?initialView:'feat');
  translateDOM(document.body);
})();
