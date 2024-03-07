import { env } from '$env/dynamic/public';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const result = await fetch(`${env.PUBLIC_BACKEND_SERVER}/pages/` + params.slug);
	const body = await result.json();
	if (result.status === 200) {
		return {
			isReceived: true,
			pageKey: {
				title: body.pageKey.title,
				endpoint: body.pageKey.endpoint.value,
				nickname: body.pageKey.nickName.value,
				createdAt: body.pageKey.createdAt
			},
			pageValue: {
				paragraphs: body.pageValue.paragraphs
			},
			error: null
		};
	} else {
		return {
			isReceived: false,
			pageKey: null,
			pageValue: null,
			error: body.error
		};
	}
};
