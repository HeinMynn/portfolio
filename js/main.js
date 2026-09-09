const themeButton = document.getElementById('theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
let savedTheme;
try { savedTheme = localStorage.getItem('theme'); } catch {}
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}
applyTheme(savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : systemTheme.matches ? 'dark' : 'light');
themeButton.addEventListener('click', () => {
  savedTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(savedTheme);
  try { localStorage.setItem('theme', savedTheme); } catch {}
});
systemTheme.addEventListener('change', event => {
  if (savedTheme !== 'light' && savedTheme !== 'dark') applyTheme(event.matches ? 'dark' : 'light');
});
document.getElementById('year').textContent = new Date().getFullYear();
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
let scheduled = false;
function updateNavigation() {
  let active = '';
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) active = '#' + section.id;
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) active = '#contact';
  navLinks.forEach(link => {
    if (link.getAttribute('href') === active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scheduled = false;
}
function scheduleNavigation() {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
}
window.addEventListener('scroll', scheduleNavigation, { passive: true });
window.addEventListener('resize', scheduleNavigation);
updateNavigation();
