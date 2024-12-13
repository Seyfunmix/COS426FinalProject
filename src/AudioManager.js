import { Audio, AudioListener, AudioLoader, AudioAnalyser } from 'three';

class AudioManager {
  constructor(camera) {
    this.listener = new AudioListener();
    camera.add(this.listener);

    this.sound = new Audio(this.listener);
    this.loader = new AudioLoader();

    // Set up AnalyserNode
    this.analyser = new AudioAnalyser(this.sound, 256); // FFT size of 256
  }

  playBackgroundMusic(filePath, volume = 0.5) {
    console.log('Loading background music from:', filePath); // Debug log
    this.loader.load(
      filePath,
      (buffer) => {
        console.log('Audio loaded successfully');
        this.sound.setBuffer(buffer);
        this.sound.setLoop(true);
        this.sound.setVolume(volume);
        this.sound.play();
      },
      undefined,
      (error) => {
        console.error('Error loading audio:', error); // Log loading errors
      }
    );
  }

  playSoundEffect(filePath, volume = 1.0) {
    const sfx = new Audio(this.listener);
    this.loader.load(filePath, (buffer) => {
      sfx.setBuffer(buffer);
      sfx.setLoop(false);
      sfx.setVolume(volume);
      sfx.play();
    });
  }

  // Method to get frequency data
  getFrequencyData() {
    return this.analyser.getFrequencyData();
  }

  // Method to get average frequency value (useful for general intensity)
  getAverageFrequency() {
    return this.analyser.getAverageFrequency();
  }
}

export { AudioManager };