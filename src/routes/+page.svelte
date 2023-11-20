<script lang="ts">
    import {Seo, Space, Text, UnstyledButton} from "@svelteuidev/core";
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";
    import Vim from "$lib/ui/Vim.svelte";

    let width, height;

    const largeMainButtonCss = {
        display: "block",
        position: "fixed",
        width: "31rem",
        height: "31rem",
        // background: "gray",
        top: "50%",
        marginTop: "-15.5rem",
        right: "50%",
        marginRight: "-15.5rem",
        border: "1rem solid #CCC",
        borderRadius: "50%",
        zIndex: '5'
    }

    const largeMainLogoCss = {
        display: "block",
        position: "absolute",
        width: "24rem",
        height: "6rem",
        top: "50%",
        marginTop: "-3rem",
        right: "50%",
        marginRight: "-12rem",
        zIndex: '10',
        fontSize: "5.5rem"
    }

    const largeSubButtonCss = {
        padding: "0rem",
        display: "block",
        position: "absolute",
        backgroundColor: "white",
        borderRadius: "50%",
        width: "6rem",
        height: "6rem",
        top: "50%",
        marginTop: "-2.5rem",
        right: "50%",
        marginRight: "-2.5rem",
        border: "1px solid #CCC",
        "&:hover": {
            backgroundColor: "#F1F1F1"
        }
    }

    const smallMainButtonCss = {
        display: "block",
        position: "fixed",
        width: "20rem",
        height: "20rem",
        // background: "gray",
        top: "50%",
        marginTop: "-10.0rem",
        right: "50%",
        marginRight: "-10.0rem",
        border: "1rem solid #CCC",
        borderRadius: "50%",
        zIndex: '5'
    }

    const smallMainLogoCss = {
        display: "block",
        position: "absolute",
        width: "24rem",
        height: "7rem",
        top: "50%",
        marginTop: "-1.4rem",
        right: "50%",
        marginRight: "-12rem",
        zIndex: '10',
        fontSize: "3rem"
    }

    const smallSubButtonCss = {
        padding: "0rem",
        display: "block",
        position: "absolute",
        backgroundColor: "white",
        borderRadius: "50%",
        width: "6rem",
        height: "6rem",
        top: "50%",
        marginTop: "-3rem",
        right: "50%",
        marginRight: "-3rem",
        border: "1px solid #CCC",
        "&:hover": {
            backgroundColor: "#F1F1F1"
        }
    }

    const movePage = (pageName: string) => {
        if (browser) { // to prevent error window is not defined, because it's SSR
            goto(`/${pageName}`);
        }
    }

    const onEnter = async(value: string) => {
        if (value == ":/about") {
            await goto("/about")
        } else if (value == ":/blog") {
            await goto("/blog")
        } else if (value == ":/eugene") {
            await goto("/eugene")
        } else if (value == ":/user") {
            await goto("/user")
        } else if (value == ":/guestbook") {
            await goto("/guestbook")
        } else if (value == ":/help") {
            const helpMessage = "Below commands are available\n" +
                `":/about" : go to about page\n` +
                `":/blog" : go to blog page\n` +
                `":/eugene" : go to eugene page\n` +
                `":/user" : go to user page\n` +
                `":/guestbook" : go to guestbook page\n` +
                `":/help" : show this help message`
            alert(helpMessage);
        }
    }
</script>

<body>
    <Seo
            title="Intro"
            titleTemplate="%t% | LuterGS"
    />

    <div bind:clientWidth={width} bind:clientHeight={height}>
        {#if width > 580}
            <UnstyledButton override={largeMainButtonCss}>
                <Text override={largeMainLogoCss} align='center' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }} class='title'>
                    LuterGS
                </Text>

                <div class="largeCircle1">
                    <UnstyledButton override={largeSubButtonCss} on:click={() => {movePage("about")}}>
                        <Text override={{fontSize: "1.2rem"}} align='center' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }} class='title'>
                            About
                        </Text>
                    </UnstyledButton>
                </div>

                <div class="largeCircle2">
                    <UnstyledButton override={largeSubButtonCss} on:click={() => {movePage("blog")}}>
                        <Text override={{fontSize: "1.2rem"}} align='center' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                            Blog
                        </Text>
                    </UnstyledButton>
                </div>

                <div class="largeCircle3">
                    <UnstyledButton override={largeSubButtonCss} on:click={() => {movePage("eugene")}}>
                        <Text override={{fontSize: "1.2rem"}} align='center' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                            Eugene
                        </Text>
                    </UnstyledButton>
                </div>

                <div class="largeCircle4">
                    <UnstyledButton override={largeSubButtonCss} on:click={() => {movePage("user")}}>
                        <Text override={{fontSize: "1.2rem"}} align='center' variant='gradient' weight='bold' lineClamp={2} gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                            User
                        </Text>
                    </UnstyledButton>
                </div>

                <div class="largeCircle5">
                    <UnstyledButton override={largeSubButtonCss} on:click={() => {movePage("guestbook")}}>
                        <Text override={{fontSize: "1.2rem"}} align='center' variant='gradient' weight='bold' lineClamp={2} gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                            Guest
                        </Text>
                        <Space override={{height: "0.2rem"}}/>
                        <Text override={{fontSize: "1.2rem"}} align='center' variant='gradient' weight='bold' lineClamp={2} gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                            Book
                        </Text>
                    </UnstyledButton>
                </div>

            </UnstyledButton>
        {:else}
            <UnstyledButton override={smallMainButtonCss}>
                <Text override={smallMainLogoCss} align='center' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }} class='title'>
                    LuterGS
                </Text>

                <div class="smallCircle1">
                    <UnstyledButton override={smallSubButtonCss} on:click={() => {movePage("about")}}>
                        <Text override={{fontSize: "1.2rem"}} align='center' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }} class='title'>
                            About
                        </Text>
                    </UnstyledButton>
                </div>

                <div class="smallCircle2">
                    <UnstyledButton override={smallSubButtonCss} on:click={() => {movePage("blog")}}>
                        <Text override={{fontSize: "1.2rem"}} align='center' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                            Blog
                        </Text>
                    </UnstyledButton>
                </div>

                <div class="smallCircle3">
                    <UnstyledButton override={smallSubButtonCss} on:click={() => {movePage("eugene")}}>
                        <Text override={{fontSize: "1.2rem"}} align='center' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                            Eugene
                        </Text>
                    </UnstyledButton>
                </div>

                <div class="smallCircle4">
                    <UnstyledButton override={smallSubButtonCss} on:click={() => {movePage("user")}}>
                        <Text override={{fontSize: "1.2rem"}} align='center' variant='gradient' weight='bold' lineClamp={2} gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                            User
                        </Text>
                    </UnstyledButton>
                </div>

                <div class="smallCircle5">
                    <UnstyledButton override={smallSubButtonCss} on:click={() => {movePage("guestbook")}}>
                        <Text override={{fontSize: "1.2rem"}} align='center' variant='gradient' weight='bold' lineClamp={2} gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                            Guest
                        </Text>
                        <Space override={{height: "0.2rem"}}/>
                        <Text override={{fontSize: "1.2rem"}} align='center' variant='gradient' weight='bold' lineClamp={2} gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                            Book
                        </Text>
                    </UnstyledButton>
                </div>

            </UnstyledButton>
        {/if}
    </div>

    <Vim onEnter={onEnter} />
</body>


<style global>
    .largeCircle1{
        animation: largeRotate1 1s ease-out 0s 1 normal forwards;
    }

    .largeCircle2{
        animation: largeRotate2 1s ease-out 0s 1 normal forwards;
    }

    .largeCircle3{
        animation: largeRotate3 1s ease-out 0s 1 normal forwards;
    }

    .largeCircle4{
        animation: largeRotate4 1s ease-out 0s 1 normal forwards;
    }

    .largeCircle5{
        animation: largeRotate5 1s ease-out 0s 1 normal forwards;
    }

    @keyframes largeRotate1{
        0%{
            transform:rotate(90deg)
            translate(-15rem)
            rotate(-90deg);
        }
        100%{
            transform:rotate(90deg)
            translate(-15rem)
            rotate(-90deg);
        }
    }

    @keyframes largeRotate2{
        0%{
            transform:rotate(90deg)
            translate(-15rem)
            rotate(-90deg);
        }
        100%{
            transform:rotate(162deg)
            translate(-15rem)
            rotate(-162deg);
        }
    }

    @keyframes largeRotate3{
        0%{
            transform:rotate(90deg)
            translate(-15rem)
            rotate(-90deg);
        }
        100%{
            transform:rotate(234deg)
            translate(-15rem)
            rotate(-234deg);
        }
    }

    @keyframes largeRotate4{
        0%{
            transform:rotate(90deg)
            translate(-15rem)
            rotate(-90deg);
        }
        100%{
            transform:rotate(306deg)
            translate(-15rem)
            rotate(-306deg);
        }
    }

    @keyframes largeRotate5{
        0%{
            transform:rotate(90deg)
            translate(-15rem)
            rotate(-90deg);
        }
        100%{
            transform:rotate(378deg)
            translate(-15rem)
            rotate(-378deg);
        }
    }





    .smallCircle1{
        animation: smallRotate1 1s ease-out 0s 1 normal forwards;
    }

    .smallCircle2{
        animation: smallRotate2 1s ease-out 0s 1 normal forwards;
    }

    .smallCircle3{
        animation: smallRotate3 1s ease-out 0s 1 normal forwards;
    }

    .smallCircle4{
        animation: smallRotate4 1s ease-out 0s 1 normal forwards;
    }

    .smallCircle5{
        animation: smallRotate5 1s ease-out 0s 1 normal forwards;
    }

    @keyframes smallRotate1{
        0%{
            transform:rotate(90deg)
            translate(-9rem)
            rotate(-90deg);
        }
        100%{
            transform:rotate(90deg)
            translate(-9rem)
            rotate(-90deg);
        }
    }

    @keyframes smallRotate2{
        0%{
            transform:rotate(90deg)
            translate(-9rem)
            rotate(-90deg);
        }
        100%{
            transform:rotate(162deg)
            translate(-9rem)
            rotate(-162deg);
        }
    }

    @keyframes smallRotate3{
        0%{
            transform:rotate(90deg)
            translate(-9rem)
            rotate(-90deg);
        }
        100%{
            transform:rotate(234deg)
            translate(-9rem)
            rotate(-234deg);
        }
    }

    @keyframes smallRotate4{
        0%{
            transform:rotate(90deg)
            translate(-9rem)
            rotate(-90deg);
        }
        100%{
            transform:rotate(306deg)
            translate(-9rem)
            rotate(-306deg);
        }
    }

    @keyframes smallRotate5{
        0%{
            transform:rotate(90deg)
            translate(-9rem)
            rotate(-90deg);
        }
        100%{
            transform:rotate(378deg)
            translate(-9rem)
            rotate(-378deg);
        }
    }

</style>