import {getUserInfo, UserResponse} from "$lib/auth/Auth";
import {PUBLIC_BACKEND_SERVER} from "$env/static/public";

export const ssr = false;

export const load = async({ url }) => {
    const response = await fetch(`${PUBLIC_BACKEND_SERVER}/user`, {credentials: 'include'});
    let resJson;
    try {
        resJson = await response.json();
    } catch (error) {
        resJson = {error: `failed to parse json`}
    }
    const result = new UserResponse(response, resJson);
    // const userInfo: UserResponse = await getUserInfo();
    return {
        data: JSON.parse(JSON.stringify(result))
    };
}