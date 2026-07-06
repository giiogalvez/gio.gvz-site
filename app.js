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
    tags: ['Python', 'Tkinter', 'RSS', 'CISA', 'MITRE', 'Analyst Workflow']
  },
  'tss-lab': {
    kicker: 'Infrastructure security project',
    title: 'TSS Homelab Security Architecture',
    body: 'A segmented lab designed to demonstrate real cybersecurity muscle: routing, firewall rules, NAT, isolated ranges, Windows domain services, Linux hosts, and controlled testing zones. It proves more than tool familiarity. It shows systems thinking, change control, documentation, and the ability to explain how traffic should move before asking tools what happened.',
    tags: ['Palo Alto', 'Windows Server', 'Linux', 'VLANs', 'Firewall Policy', 'Active Directory']
  },
  'handheld': {
    kicker: 'Cyber hardware concept',
    title: 'All-in-One Cyber Handheld Concept',
    body: 'A field toolkit concept built around the reality that offensive security hardware needs more than a cool case. The design considers compute, power, RF separation, NFC capability, Wi-Fi adapter flexibility, recovery modes, serviceability, thermal constraints, and safe operating assumptions. It is a portfolio piece because it shows engineering tradeoffs, not just parts shopping.',
    tags: ['CM5', 'NFC', 'Wi-Fi', 'LoRa', 'BLE', 'Hardware Planning']
  },
  'creator-shield': {
    kicker: 'Security service concept',
    title: 'Creator Account Protection Framework',
    body: 'A scalable security offer for creators whose public visibility makes them easier to phish, stalk, impersonate, and doxx. The framework combines account hardening, password manager onboarding, MFA review, public exposure checks, impersonation monitoring, emergency recovery planning, and recurring check-ins. The business value is simple: protect revenue, identity, and reputation.',
    tags: ['OSINT', 'MFA', 'Account Security', 'Monitoring', 'Phishing Defense', 'Service Design']
  },
  'campus-program': {
    kicker: 'Leadership and education project',
    title: 'Cyber Club & CTF Program Proposal',
    body: 'A practical campus program proposal that moves students from passive classes into active cybersecurity development. It centers on peer-led labs, NCL preparation, scrimmages, conference participation, mentor loops, hardware access, and documentation. The point is not to make everyone elite overnight. The point is to create an environment where students practice consistently and fail safely.',
    tags: ['Leadership', 'CTF', 'Mentorship', 'Program Design', 'Student Development']
  },
  'ctf-notes': {
    kicker: 'Applied security writeups',
    title: 'Capture-the-Flag Field Notes',
    body: 'A structured writeup collection focused on transferable methodology: what was observed, what was tested, what failed, what worked, and what should be remembered next time. Strong CTF documentation demonstrates curiosity, discipline, command-line fluency, and the ability to explain technical steps without hiding behind buzzwords.',
    tags: ['Linux', 'Web', 'NFC', 'Wi-Fi', 'Reverse Engineering', 'Documentation']
  }
};

const modal = document.querySelector('#project-modal');
const modalKicker = document.querySelector('#modal-kicker');
const modalTitle = document.querySelector('#modal-title');
const modalBody = document.querySelector('#modal-body');
const modalMeta = document.querySelector('#modal-meta');
let lastFocusedElement = null;

function openModal(key) {
  const data = modalData[key];
  if (!modal || !data) return;
  lastFocusedElement = document.activeElement;
  modalKicker.textContent = data.kicker;
  modalTitle.textContent = data.title;
  modalBody.textContent = data.body;
  modalMeta.innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join('');
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
