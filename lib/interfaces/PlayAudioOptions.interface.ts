export default interface PlayAudioOptions {
    ext?: string;
    loop?: boolean | {
        start?: number;
        end?: number;
    };
}