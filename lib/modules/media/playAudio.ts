import PlayAudioOptions from "lib/interfaces/PlayAudioOptions.interface";

export default function playAudio (name: string, options: PlayAudioOptions = {}) {
    const url = `/assets/audio/${name}.${options.ext ?? "mp3"}`;

    const audio = new Audio(url);

    if (options.loop) {
        if (typeof options.loop === "boolean") {
            audio.loop = options.loop;
        } else if(options.loop.start && options.loop.end) {
            audio.addEventListener("timeupdate", () => {
                if (audio.currentTime >= (<any>options.loop)!.end) {
                    audio.currentTime = (<any>options.loop)!.start;
                }
            });
        }
    }

    audio.play();

    return audio;
}
