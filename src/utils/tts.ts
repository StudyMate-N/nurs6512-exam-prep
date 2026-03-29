export function speak(text: string, rate = 1.0): void {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = 1.0;
  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find((v) => v.name.includes('Google') && v.lang === 'en-US') ||
    voices.find((v) => v.lang === 'en-US') ||
    voices[0];
  if (preferred) utterance.voice = preferred;
  window.speechSynthesis.speak(utterance);
}

export function speakSequence(texts: string[], rate = 1.0, pauseMs = 500): void {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find((v) => v.name.includes('Google') && v.lang === 'en-US') ||
    voices.find((v) => v.lang === 'en-US') ||
    voices[0];

  let index = 0;

  function next() {
    if (index >= texts.length) return;
    const utterance = new SpeechSynthesisUtterance(texts[index]);
    utterance.rate = rate;
    utterance.pitch = 1.0;
    if (preferred) utterance.voice = preferred;
    utterance.onend = () => {
      index++;
      if (index < texts.length) {
        setTimeout(next, pauseMs);
      }
    };
    window.speechSynthesis.speak(utterance);
    index++;
  }

  // reset index before starting
  index = 0;
  next();
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

export function isSpeaking(): boolean {
  return 'speechSynthesis' in window && window.speechSynthesis.speaking;
}
