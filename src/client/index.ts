import './styles.css';
import { isValidURL } from './util';

const ctaElement = document.getElementById('submitLink') as HTMLButtonElement;
const linkInput = document.getElementById('longUrl') as HTMLInputElement;
const linkForm = document.getElementById('linkForm') as HTMLElement;

linkInput.addEventListener('input', (e) => {
  linkForm.classList.remove('error');
  ctaElement.disabled = !(e.target as HTMLTextAreaElement).value;
});

linkInput.addEventListener('change', (e) => {
  const valid = isValidURL((e.target as HTMLTextAreaElement).value);
  if (!valid && (e.target as HTMLTextAreaElement).value) {
    linkForm.classList.add('error');
    ctaElement.disabled = true;
  }
});

ctaElement?.addEventListener('click', async () => {
  console.log(linkInput?.value ?? '');
  const response = await fetch('/v1/links/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ longUrl: linkInput?.value }),
  });
  console.log(response);
});
