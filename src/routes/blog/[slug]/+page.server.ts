import {PUBLIC_BACKEND_SERVER} from "$env/static/public";


/** @type {import('./$types').PageServerLoad} */
export const load = async({ params }) => {
    const result = await fetch(`${PUBLIC_BACKEND_SERVER}/page/` + params.slug)
    const body = await result.json();
    if (result.status === 200) {
        return {
            isReceived: true,
            pageKey: {
                title: body.pageKey.title,
                endpoint: body.pageKey.endpoint,
                nickname: body.pageKey.nickName
            },
            pageValue: {
                paragraphs: body.pageValue.paragraphs
            },
            error: null
        }
    } else {
        return {
            isReceived: false,
            pageKey: null,
            pageValue: null,
            error: body.error
        }
    }
}