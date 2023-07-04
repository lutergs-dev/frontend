import {json} from "@sveltejs/kit";
import {BACKEND_SERVER, TINYMCE_APIKEY, OAUTH_CLIENT_ID, OAUTH_REDIRECT_URL} from "$env/static/private";

export function GET(request: {url: URL}) {

    // get parameter
    const url: URL = request.url;
    const envName: string | null = url.searchParams.get("env");
    if (envName == null) {
        return json("");
    } else {
        if (envName == "BACKEND_SERVER") return json(BACKEND_SERVER);
        if (envName == "TINYMCE_APIKEY") return json(TINYMCE_APIKEY);
        if (envName == "OAUTH_CLIENT_ID") return json(OAUTH_CLIENT_ID);
        if (envName == "OAUTH_REDIRECT_URL") return json(OAUTH_REDIRECT_URL);
        else return json("UNDEFINED");
    }
}