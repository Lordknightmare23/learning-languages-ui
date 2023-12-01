import ChineseTones from "lib/const/ChineseTones.const";
import { Tones } from "lib/enums/Tones.enum";

export default function getPinyinTone (pinyin: string) {
    for (const character of pinyin) {
        if (ChineseTones.level.includes(character)) return Tones.Level;
        if (ChineseTones.rising.includes(character)) return Tones.Rising;
        if (ChineseTones.fallingRising.includes(character)) return Tones.FallingRising;
        if (ChineseTones.falling.includes(character)) return Tones.Falling;
    }

    return Tones.Neutral;
}
