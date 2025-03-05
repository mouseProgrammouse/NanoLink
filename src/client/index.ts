import './styles.css';
import { isValidURL } from './util';

const ctaElement = document.getElementById('submitLink') as HTMLButtonElement;
const linkInput = document.getElementById('longUrl') as HTMLInputElement;
const linkForm = document.getElementById('linkForm') as HTMLElement;
const loader = document.getElementById('loader') as HTMLElement;
const loaderCopy = document.getElementById('loaderCopy') as HTMLElement;
const defaultCopy = document.getElementById('defaultCopy') as HTMLElement;
const doneCopy = document.getElementById('doneCopy') as HTMLElement;
const genericError = document.getElementById('genericError') as HTMLElement;
const shortLinkForm = document.getElementById('shortLinkForm') as HTMLElement;
const copyLinkBtn = document.getElementById('copyLink') as HTMLButtonElement;
const shortUrlInput = document.getElementById('shortUrl') as HTMLInputElement;

const toggleElementVisibility = (element: HTMLElement, show: boolean) => {
  element.classList.toggle('hide', !show);
};

linkInput.addEventListener('input', () => {
  linkForm.classList.remove('error');
  ctaElement.disabled = !linkInput.value.trim();
});

linkInput.addEventListener('change', () => {
  const isValid = isValidURL(linkInput.value);
  if (!isValid && linkInput.value.trim()) {
    linkForm.classList.add('error');
    ctaElement.disabled = true;
  }
});

ctaElement?.addEventListener('click', async () => {
  console.log(linkInput?.value.trim() ?? '');

  toggleElementVisibility(defaultCopy, false);
  toggleElementVisibility(linkForm, false);
  toggleElementVisibility(loader, true);
  toggleElementVisibility(loaderCopy, true);

  try {
    const response = await fetch('/v1/links/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ longUrl: linkInput?.value.trim() }),
    });

    if (response.ok) {
      const { shortUrl } = await response.json();
      shortUrlInput.value = shortUrl;
      const copyConfMsg = shortLinkForm.querySelector(
        '.copy span',
      ) as HTMLElement;

      copyLinkBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(shortUrl);
          copyConfMsg.classList.add('show');
          setTimeout(() => copyConfMsg.classList.remove('show'), 1000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });

      shortUrlInput.addEventListener('input', () => {
        if (shortUrlInput.value !== shortUrl) {
          toggleElementVisibility(defaultCopy, true);
          linkInput.value = '';
          ctaElement.disabled = true;
          toggleElementVisibility(linkForm, true);
          linkInput.focus();
          toggleElementVisibility(doneCopy, false);
          toggleElementVisibility(shortLinkForm, false);
        }
      });

      toggleElementVisibility(doneCopy, true);
      toggleElementVisibility(shortLinkForm, true);
    } else {
      throw new Error('Failed to shorten URL');
    }
  } catch (error) {
    console.error(error);
    toggleElementVisibility(genericError, true);
    toggleElementVisibility(defaultCopy, true);
    toggleElementVisibility(linkForm, true);
  } finally {
    toggleElementVisibility(loader, false);
    toggleElementVisibility(loaderCopy, false);
  }
});
