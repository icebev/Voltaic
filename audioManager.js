//// AUDIO SYSTEM CODE FOR VOLTAIC ////

// class for quickly creating sound effect objects
class SoundEffect {
    constructor(fileName) {
        this.sound = new Audio();
        this.sound.src = "aud/" + fileName + ".wav";
        this.sound.volume = 0.03;
        console.log(`Created SFX ${fileName}`);
    }
};

// class for creating music track objects that each have a switchToTrack method that will mute the other tracks
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
        this.sound.volume = 0.02;
    }
};

// funtion that takes in the identifier letter of the audio loops to then set up all of the loops to play at once
function StartTracks(identifier) {
    // pause any music currently playing
    tracksPlaying.forEach((trackToStop) => {
        trackToStop.sound.pause();
    });
    // remove the old track objects from the tracksPlaying array and then add the new ones
    tracksPlaying.splice(0, tracksPlaying.length);
    trackNameList.forEach((track) => {
        if (track[0] === identifier) {
            tracksPlaying.push(new AudioTrack(track));
        };
    });
    // start playing all of the new tracks at the same time but muted
    tracksPlaying.forEach((trackToPlay) => {
        trackToPlay.startPlaying();
    });
}; 

// function that will switch to the desired track in tracksPlaying by invoking the switchToTrack method
function ChangeTrack(trackName) {
    let targetTrack = tracksPlaying.find(track => track.name === trackName);
    if (targetTrack) {
        targetTrack.switchToTrack();
    } else {
        console.log(`${trackName} is an invalid track name.`);
    };
};

// Randomised button sound effect
buttonSounds.push(new SoundEffect("ButtonSoundA"));
buttonSounds.push(new SoundEffect("ButtonSoundB"));
function PlayButtonSound() {
    let randomNumber = Math.random();
    (randomNumber > 0.5) ? buttonSounds[0].sound.play() : buttonSounds[1].sound.play();
};