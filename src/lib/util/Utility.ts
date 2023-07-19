import {goto} from "$app/navigation";

export const movePage = async(uri: string) => {
    await goto(uri);
}