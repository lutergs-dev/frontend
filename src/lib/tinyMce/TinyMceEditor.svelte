<script lang="ts">
	import Editor from '@tinymce/tinymce-svelte';
	import { env } from '$env/dynamic/public';

	const getPresignedUrl = async (fileName: string) => {
		return await fetch(
			`${env.PUBLIC_BACKEND_SERVER}/image?` +
				new URLSearchParams({
					name: fileName
				}),
			{ method: 'GET' }
		)
			.then((result) => result.json())
			.then((jsonResult) => jsonResult.url);
	};

	const uploadImage = (blobInfo, progress) =>
		new Promise((resolve, reject) => {
			progress(50);
			getPresignedUrl(blobInfo.filename())
				.then((url) => {
					fetch(url, {
						method: 'PUT',
						headers: {
							'Content-Length': blobInfo.blob().size,
							'Content-Type': 'application/octet-stream',
							'x-amz-acl': 'public-read'
						},
						body: blobInfo.blob()
					})
						.then(() => {
							const resultUrl = new URL(url);
							resolve(`${resultUrl.protocol}//${resultUrl.hostname}${resultUrl.pathname}`);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				})
				.catch((err) => {
					reject(err);
				});
		});

	// TinyMCE configuration
	const conf = {
		plugins:
			'save preview searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking insertdatetime advlist lists wordcount help charmap quickbars emoticons',
		toolbar:
			'save cancel | restoredraft undo redo | bold italic underline strikethrough blockquote | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview print | image media link codesample',
		toolbar_sticky: true,
		images_upload_handler: uploadImage,
		object_resizing: true,
		quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable'
	};
	export let value = '';
</script>

<!--{#await getEnv("TINYMCE_APIKEY")}-->
<!--    <Group position="center">-->
<!--        <Loader variant="bars" />-->
<!--    </Group>-->
<!--{:then apiKey}-->
<Editor {conf} bind:value apiKey={env.PUBLIC_TINYMCE_APIKEY} />
<!--{:catch err}-->
<!--    <Alert icon={InfoCircled} title="이런!">-->
<!--        <p>에디터를 불러오는 데 실패했습니다! lutergs@lutergs.dev 에게 문의해주세요.</p>-->
<!--        <p>err : {err}</p>-->
<!--    </Alert>-->
<!--{/await}-->
