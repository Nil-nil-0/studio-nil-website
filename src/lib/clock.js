// Studio local time (João Pessoa). Updates on the minute, not every second.
export function initClock(root = document) {
  const nodes = [...root.querySelectorAll('[data-clock]')];
  if (!nodes.length) return;
  const update = () => {
    const now = new Date();
    nodes.forEach((el) => {
      const tz = el.dataset.tz;
      const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz });
      el.textContent = `${fmt.format(now)} GMT−3`;
      el.dateTime = now.toISOString();
    });
  };
  update();
  const msToNextMinute = 60000 - (Date.now() % 60000);
  setTimeout(() => { update(); setInterval(update, 60000); }, msToNextMinute);
}
