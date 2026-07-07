const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const year = document.querySelector('#year');
const terminal = document.querySelector('#terminal-output');

if (year) year.textContent = new Date().getFullYear();

navToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealItems = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => revealObserver.observe(item));

const terminalLines = [
  '$ ./profile --load operator',
  'loading intelligence background... done',
  'loading security operations... done',
  'mapping homelab architecture... done',
  'indexing project evidence... done',
  'compiling briefing notes... done',
  'operator vault clue: inspect source, css, console',
  'ready: investigate | harden | brief | build'
];

let terminalIndex = 0;
function cycleTerminal() {
  if (!terminal) return;
  terminalIndex = (terminalIndex + 1) % terminalLines.length;
  const visible = terminalLines.slice(0, terminalIndex + 1).join('\n');
  terminal.textContent = visible;
}
setInterval(cycleTerminal, 1600);

const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('.project-card');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    const selected = filter.dataset.filter;
    filters.forEach((button) => button.classList.remove('is-active'));
    filter.classList.add('is-active');

    cards.forEach((card) => {
      const categories = card.dataset.category || '';
      const shouldShow = selected === 'all' || categories.includes(selected);
      card.classList.toggle('is-hidden', !shouldShow);
    });
  });
});

const modalData = {
  'cti-console': {
    kicker: 'Threat intelligence project',
    title: 'Threat Intelligence Daily Console',
    body: 'A practical analyst workflow for turning cyber news, advisories, malware reports, and vulnerability chatter into a daily intelligence product. The value is not the feed list. The value is source discipline, duplicate reduction, triage logic, and the final briefing that tells leadership what changed, why it matters, and what action is recommended.',
    tags: ['Python', 'Tkinter', 'RSS', 'CISA', 'MITRE', 'Analyst Workflow'],
    evidence: [
      { type: 'image', src: 'assets/evidence/cti-console-placeholder.svg', title: 'Console screenshot', caption: 'Replace with a screenshot of the working CTI console.' },
      { type: 'image', src: 'assets/evidence/briefing-placeholder.svg', title: 'Briefing format', caption: 'Replace with a redacted daily brief or sample intelligence note.' }
    ]
  },
  'tss-lab': {
    kicker: 'Infrastructure security project',
    title: 'TSS Homelab Security Architecture',
    body: 'A segmented lab designed to demonstrate real cybersecurity muscle: routing, firewall rules, NAT, isolated ranges, Windows domain services, Linux hosts, and controlled testing zones. It proves more than tool familiarity. It shows systems thinking, change control, documentation, and the ability to explain how traffic should move before asking tools what happened.',
    tags: ['Palo Alto', 'Windows Server', 'Linux', 'VLANs', 'Firewall Policy', 'Active Directory'],
    evidence: [
      { type: 'image', src: 'assets/evidence/lab-map-placeholder.svg', title: 'Network diagram', caption: 'Add a clean homelab diagram or redacted firewall/network map.' },
      { type: 'image', src: 'assets/evidence/firewall-placeholder.svg', title: 'Firewall proof', caption: 'Add redacted policy, NAT, or interface screenshots.' }
    ]
  },
  'halehound': {
    kicker: 'Cyber hardware project',
    title: 'ESP32 HaleHound Field Toolkit',
    body: 'A hands-on ESP32 project focused on building, flashing, validating, and documenting a compact cyber hardware workflow. This is the stronger public portfolio piece right now because it is real, current, and provable. The larger all-in-one handheld remains a design log until the physical build catches up with the concept.',
    tags: ['ESP32', 'HaleHound', 'Hardware', 'Flashing Logs', 'Field Notes', 'Design Log'],
    evidence: [
      { type: 'image', src: 'assets/evidence/halehound-placeholder.svg', title: 'Device proof', caption: 'Add your ESP32/HaleHound board photo or UI screenshot.' },
      { type: 'image', src: 'assets/evidence/handheld-concept-placeholder.svg', title: 'Concept design', caption: 'Add sketches/renders for the all-in-one handheld as concept evidence.' }
    ]
  },
  'creator-shield': {
    kicker: 'Security service concept',
    title: 'Creator Account Protection Framework',
    body: 'A scalable security offer for creators whose public visibility makes them easier to phish, stalk, impersonate, and doxx. The framework combines account hardening, password manager onboarding, MFA review, public exposure checks, impersonation monitoring, emergency recovery planning, and recurring check-ins. The business value is simple: protect revenue, identity, and reputation.',
    tags: ['OSINT', 'MFA', 'Account Security', 'Monitoring', 'Phishing Defense', 'Service Design'],
    evidence: [
      { type: 'image', src: 'assets/evidence/creator-shield-placeholder.svg', title: 'Framework sample', caption: 'Add a sanitized intake form, checklist, or sample dashboard mockup.' }
    ]
  },
  'campus-program': {
    kicker: 'Leadership and education project',
    title: 'Cyber Club & CTF Program Proposal',
    body: 'A practical campus program proposal that moves students from passive classes into active cybersecurity development. It centers on peer-led labs, NCL preparation, scrimmages, conference participation, mentor loops, hardware access, and documentation. The point is not to make everyone elite overnight. The point is to create an environment where students practice consistently and fail safely.',
    tags: ['Leadership', 'CTF', 'Mentorship', 'Program Design', 'Student Development'],
    evidence: [
      { type: 'image', src: 'assets/evidence/campus-program-placeholder.svg', title: 'Proposal proof', caption: 'Add proposal screenshots, agenda, or redacted school-facing materials.' }
    ]
  },
  'ctf-notes': {
    kicker: 'Applied security writeups',
    title: 'Capture-the-Flag Field Notes',
    body: 'A structured writeup collection focused on transferable methodology: what was observed, what was tested, what failed, what worked, and what should be remembered next time. Strong CTF documentation demonstrates curiosity, discipline, command-line fluency, and the ability to explain technical steps without hiding behind buzzwords.',
    tags: ['Linux', 'Web', 'NFC', 'Wi-Fi', 'Reverse Engineering', 'Documentation'],
    evidence: [
      { type: 'image', src: 'assets/evidence/ctf/ncl/ncl-spring-2026-team.png', title: 'NCL Spring 2026 Team', caption: '7th place, 3000/3000 points, 100% completion.' },
      { type: 'image', src: 'assets/evidence/ctf/ncl/ncl-fall-2025-individual.png', title: 'NCL Fall 2025 Individual', caption: '109th place, 2715/3000 points, 92.7% completion.' },
      { type: 'image', src: 'assets/evidence/ctf/ncl/ncl-fall-2025-team.png', title: 'NCL Fall 2025 Team', caption: '35th place, 2795/3015 points, 90.1% completion.' },
      { type: 'image', src: 'assets/evidence/ctf/ncl/ncl-spring-2025-team.png', title: 'NCL Spring 2025 Team', caption: '46th place, 2565/3000 points, 91.1% completion.' }
    ],
    actions: [
      { label: 'Open full CTF evidence vault', href: 'vault/reports/ctf-results.html' }
    ]
  }
};

const modal = document.querySelector('#project-modal');
const modalKicker = document.querySelector('#modal-kicker');
const modalTitle = document.querySelector('#modal-title');
const modalBody = document.querySelector('#modal-body');
const modalMeta = document.querySelector('#modal-meta');
const modalEvidence = document.querySelector('#modal-evidence');
const modalActions = document.querySelector('#modal-actions');
let lastFocusedElement = null;

function escapeHTML(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderEvidence(items = []) {
  if (!modalEvidence) return;
  if (!items.length) {
    modalEvidence.innerHTML = '';
    return;
  }

  modalEvidence.innerHTML = items.map((item) => {
    const title = escapeHTML(item.title || 'Evidence');
    const caption = escapeHTML(item.caption || '');
    if (item.type === 'image') {
      const src = escapeHTML(item.src);
      return `<a class="evidence-card" href="${src}" target="_blank" rel="noreferrer">
        <img src="${src}" alt="${title}" loading="lazy" />
        <strong>${title}</strong>
        <span>${caption}</span>
      </a>`;
    }
    const href = escapeHTML(item.href || '#');
    return `<a class="evidence-card evidence-document" href="${href}" target="_blank" rel="noreferrer">
      <span class="document-icon">PDF</span>
      <strong>${title}</strong>
      <span>${caption}</span>
    </a>`;
  }).join('');
}

function renderActions(actions = []) {
  if (!modalActions) return;
  if (!actions.length) {
    modalActions.innerHTML = '';
    return;
  }

  modalActions.innerHTML = actions.map((action) => {
    const label = escapeHTML(action.label || 'Open');
    const href = escapeHTML(action.href || '#');
    const disabled = action.disabled ? ' aria-disabled="true" tabindex="-1" class="button button-ghost is-disabled"' : ' class="button button-ghost"';
    return `<a href="${href}"${disabled}>${label}</a>`;
  }).join('');
}

function openModal(key) {
  const data = modalData[key];
  if (!modal || !data) return;
  lastFocusedElement = document.activeElement;
  modalKicker.textContent = data.kicker;
  modalTitle.textContent = data.title;
  modalBody.textContent = data.body;
  modalMeta.innerHTML = data.tags.map((tag) => `<span>${escapeHTML(tag)}</span>`).join('');
  renderEvidence(data.evidence);
  renderActions(data.actions);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-close')?.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lastFocusedElement?.focus?.();
}

document.querySelectorAll('[data-modal]').forEach((button) => {
  button.addEventListener('click', () => openModal(button.dataset.modal));
});

document.querySelectorAll('[data-close-modal]').forEach((element) => {
  element.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});
