(() => {
  const key = 'incizade_privacy_v1';
  const duration = 180 * 24 * 60 * 60 * 1000;
  const banner = document.createElement('aside');
  banner.className = 'privacy-banner';
  banner.setAttribute('aria-label', 'Çerez bilgilendirmesi');
  banner.innerHTML = `<div><strong>Gizliliğiniz bizim için önemli.</strong><p>Bu sitede reklam veya analiz çerezi kullanılmaz. Seçiminizi hatırlamak için cihazınızda 180 gün geçerli bir tercih kaydı tutarız. <a href="cerez-politikasi.html">Çerez Politikası</a></p></div><div class="privacy-actions"><button type="button" data-save>Yalnızca gerekli ile devam et</button><button type="button" data-settings>Tercihleri incele</button></div>`;
  const dialog = document.createElement('dialog');
  dialog.className = 'privacy-dialog';
  dialog.setAttribute('aria-labelledby', 'privacy-title');
  dialog.innerHTML = `<h2 id="privacy-title">Çerez tercihleri</h2><p>Sitemizde yalnızca tercihlerinizi hatırlayan yerel kayıt kullanılır. Analiz ve reklam takibi bulunmaz.</p><dl><dt>Tercih kaydı</dt><dd>Seçiminizi 180 gün hatırlar. Adınızı veya ziyaretçi kimliği saklamaz.</dd><dt>Analiz ve reklam</dt><dd>Kullanılmıyor. Bu kategoriler için izin istenmez.</dd></dl><p><a href="cerez-politikasi.html">Çerez Politikası</a> · <a href="gizlilik-politikasi.html">Gizlilik Politikası</a></p><p class="privacy-status" role="status"></p><div class="privacy-actions"><button type="button" data-save>Yalnızca gerekli ile devam et</button><button type="button" data-reset>Tercih kaydını sil</button><button type="button" data-close>Kapat</button></div>`;
  document.body.append(banner, dialog);
  let returnFocus;
  const valid = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(key));
      if (stored && stored.version === 1 && stored.choice === 'necessary-only' && stored.expires > Date.now() && stored.expires <= Date.now() + duration) return true;
      localStorage.removeItem(key);
    } catch (_) { /* Storage can be unavailable in private browsing. */ }
    return false;
  };
  banner.hidden = valid();
  const close = () => { dialog.close(); if (returnFocus?.isConnected && !returnFocus.closest('[hidden]')) returnFocus.focus(); };
  const open = (trigger) => { returnFocus = trigger; dialog.querySelector('.privacy-status').textContent = ''; dialog.showModal(); };
  const save = () => {
    try { localStorage.setItem(key, JSON.stringify({version: 1, choice: 'necessary-only', expires: Date.now() + duration})); } catch (_) { /* Choice still applies to this page. */ }
    banner.hidden = true;
    if (dialog.open) close();
  };
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-privacy-open]');
    if (trigger) open(trigger);
  });
  banner.querySelector('[data-settings]').addEventListener('click', event => open(event.currentTarget));
  banner.querySelector('[data-save]').addEventListener('click', save);
  dialog.querySelector('[data-save]').addEventListener('click', save);
  dialog.querySelector('[data-close]').addEventListener('click', close);
  dialog.querySelector('[data-reset]').addEventListener('click', () => {
    try { localStorage.removeItem(key); } catch (_) {}
    banner.hidden = false;
    dialog.querySelector('.privacy-status').textContent = 'Tercih kaydınız silindi. Reklam veya analiz takibi etkinleştirilmedi.';
  });
  window.addEventListener('storage', event => { if (event.key === key || event.key === null) banner.hidden = valid(); });
})();
