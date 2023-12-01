import { InputType } from "lib/enums/InputType.enum";

export default interface Gamemode {
    id: string;
    name: string;
    description: string;
    icon?: string;
    settings: {
        key: string,
        label: string,
        type: InputType,
        defaultValue?: any,

        min?: number,
        icon?: string,
        value?: any
    }[]
}
