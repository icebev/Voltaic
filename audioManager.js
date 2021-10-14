//// AUDIO SYSTEM CODE FOR VOLTAIC ////

const trackList = ["Aa", "Ab", "Ac", "Ad", "Ba", "Bb", "Bc","Bd"];
var tracksPlaying  = [];

class SoundEffect {
    constructor(fileName) {
        this.sound = new Audio();
        this.sound.src = "aud/" + fileName + ".wav";
        this.sound.volume = 0.3;
        console.log(`Created SFX ${fileName}`);
    }
};

class AudioTrack {
    constructor(trackName) {
        this.name = trackName;
        this.sound = new Audio();
        this.sound.src = "aud/" + trackName + ".wav";
        this.sound.loop = true;
        console.log(`Created soundtrack ${trackName}.`);
    }
    startPlaying() {
        this.sound.volume = 0;
        this.sound.play();
    }
    switchToTrack() {
        tracksPlaying.forEach((track) => {track.sound.volume = 0})
        this.sound.volume = 0.2;
    }
};

function StartTracks(identifier) {
    tracksPlaying.forEach((trackToStop) => {
        trackToStop.sound.pause();
    });
    tracksPlaying.splice(0, tracksPlaying.length);
    trackList.forEach((track) => {
        if (track[0] === identifier) {
            tracksPlaying.push(new AudioTrack(track));
        };
    });
    tracksPlaying.forEach((trackToPlay) => {
        trackToPlay.startPlaying();
    });
}; 

function ChangeTrack(trackName) {
    let targetTrack = tracksPlaying.find(track => track.name === trackName);
    if (targetTrack) {
        targetTrack.switchToTrack();
    } else {
        console.log(`${trackName} is an invalid track name.`);
    };
};

var buttonSounds = []
buttonSounds.push(new SoundEffect("ButtonSoundA"));
buttonSounds.push(new SoundEffect("ButtonSoundB"));

function PlayButtonSound() {
    let randomNumber = Math.random();
    (randomNumber > 0.5) ? buttonSounds[0].sound.play() : buttonSounds[1].sound.play();
}