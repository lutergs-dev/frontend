import {PUBLIC_BACKEND_SERVER} from "$env/static/public";


export const load = async({url}) => {
    const receivedUrl: URL = url

    const index = receivedUrl.searchParams.get("index") ?? "0";
    const size = receivedUrl.searchParams.get("size") ?? "10";

    const result = await fetch(`${PUBLIC_BACKEND_SERVER}/page/list?` + new URLSearchParams({
        index: index,
        size: size
    }))
    const body = await result.json();
    console.log(body);
    if (result.status === 200) {
        return {
            isReceived: true,
            pageList: body, // it is array of pageKey,
            error: null
        }
    } else {
        return {
            isReceived: false,
            pageList: null,
            error: body.error
        }
    }
}