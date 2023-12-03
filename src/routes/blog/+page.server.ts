import { env } from "$env/dynamic/public";


export const load = async({url}) => {
    const receivedUrl: URL = url

    const index = receivedUrl.searchParams.get("index") ?? "1";
    const size = receivedUrl.searchParams.get("size") ?? "10";

    const result = await fetch(`${env.PUBLIC_BACKEND_SERVER}/pages?` + new URLSearchParams({
        index: `${+index - 1}`,
        size: size
    }))
    if (result.status === 200) {
        const body = await result.json();
        body.sort((a, b) => {
            if (a.createdAt > b.createdAt) return -1;
            else if (a.createdAt < b.createdAt) return 1;
            else return 0;
        })
        return {
            isReceived: true,
            pageList: body, // it is array of pageKey,
            error: null,
            position: {
                index: index,
                size: size
            }
        }
    } else {
        let body;
        try {
            body = await result.json();
        } catch (e) {
            body = {error: `status ${result.status}`}
        }
        return {
            isReceived: false,
            pageList: null,
            error: body.error,
            position: {
                index: index,
                size: size
            }
        }
    }
}