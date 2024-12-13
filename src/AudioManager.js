import { Audio, AudioListener, AudioLoader } from 'three';

class AudioManager {
  constructor(camera) {
    this.listener = new AudioListener();
    camera.add(this.listener);

    this.sound = new Audio(this.listener);
    this.loader = new AudioLoader();
  }

  playBackgroundMusic(filePath, volume = 0.5) {
    this.loader.load(filePath, (buffer) => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(true);
      this.sound.setVolume(volume);
      this.sound.play();
    });
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
}

export { AudioManager };