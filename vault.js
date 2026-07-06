(() => {
  const USER_HASH = '341cdcad00e17f7d7768f24b82a70aca78ac5bce271c0fa5549c2a4898ef3d25';
  const PASS_HASH = 'de652c97f895be471da6357b2697b0f0adc0dccf4c339cefceabcfc32daf9e41';
  const STORAGE_KEY = 'tss_operator_vault_unlocked';

  async function sha256(value) {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  function setMessage(message, isError = false) {
    document.querySelectorAll('.vault-message').forEach((element) => {
      element.textContent = message;
      element.style.color = isError ? 'var(--danger)' : 'var(--muted)';
    });
  }

  function showUnlockedState() {
    document.querySelectorAll('#vault-unlocked, [data-vault-unlocked]').forEach((element) => {
      element.hidden = false;
    });
    document.querySelectorAll('[data-vault-locked]').forEach((element) => {
      element.hidden = true;
    });
  }

  function isUnlocked() {
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  }

  async function handleLogin(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const username = form.querySelector('[name="username"]')?.value.trim().toLowerCase() || '';
    const password = form.querySelector('[name="password"]')?.value.trim() || '';

    try {
      const [userHash, passHash] = await Promise.all([sha256(username), sha256(password)]);
      if (userHash === USER_HASH && passHash === PASS_HASH) {
        sessionStorage.setItem(STORAGE_KEY, 'true');
        setMessage('Access granted. Receipts unlocked.');
        showUnlockedState();
        return;
      }
      setMessage('Access denied. Keep digging. The clues are not in the visible text.', true);
    } catch (error) {
      setMessage('Browser crypto failed. Try a modern browser.', true);
    }
  }

  document.querySelectorAll('[data-vault-form]').forEach((form) => {
    form.addEventListener('submit', handleLogin);
  });

  if (isUnlocked()) {
    showUnlockedState();
    setMessage('Vault already unlocked for this session.');
  }

  window.vault_hint = () => {
    console.log('CTF hint: user = brand_role. password = CSS clue + this suffix: _it_didnt_happen');
    return 'Check the CSS comments, then combine the passphrase.';
  };

  console.info('Operator Vault loaded. Try vault_hint() if you get stuck.');
})();
