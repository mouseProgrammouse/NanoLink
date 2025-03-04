import './styles.css';

const ctaElement = document.getElementById('submitLink');
const linkInput = document.getElementById('longUrl') as HTMLInputElement;

ctaElement?.addEventListener('click', (e) => {
  console.log(linkInput?.value ?? '');
  console.log(e);
});
