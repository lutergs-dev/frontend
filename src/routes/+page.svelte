<script lang="ts">
    import {Seo, Space, Text, UnstyledButton} from "@svelteuidev/core";
    import {browser} from "$app/environment";

    const mainButtonCss = {
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

    const mainLogoCss = {
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

    const subButtonCss = {
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

    const movePage = (pageName: string) => {
        if (browser) { // to prevent error window is not defined, because it's SSR
            window.location.href = '/' + pageName;
        }
    }
</script>

<body>
    <Seo
            title="Intro"
            titleTemplate="%t% | LuterGS"
    />

    <UnstyledButton override={mainButtonCss}>
        <Text override={mainLogoCss} align='center' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }} class='title'>
            LuterGS
        </Text>

        <div class="circle1">
            <UnstyledButton override={subButtonCss} on:click={() => {movePage("about")}}>
                <Text override={{fontSize: "1.2rem"}} align='center' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }} class='title'>
                    About
                </Text>
            </UnstyledButton>
        </div>

        <div class="circle2">
            <UnstyledButton override={subButtonCss} on:click={() => {movePage("blog")}}>
                <Text override={{fontSize: "1.2rem"}} align='center' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                    Blog
                </Text>
            </UnstyledButton>
        </div>

        <div class="circle3">
            <UnstyledButton override={subButtonCss} on:click={() => {movePage("eugene")}}>
                <Text override={{fontSize: "1.2rem"}} align='center' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                    Eugene
                </Text>
            </UnstyledButton>
        </div>

        <div class="circle4">
            <UnstyledButton override={subButtonCss} on:click={() => {movePage("user")}}>
                <Text override={{fontSize: "1.2rem"}} align='center' variant='gradient' weight='bold' lineClamp={2} gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                    User
                </Text>
            </UnstyledButton>
        </div>

        <div class="circle5">
            <UnstyledButton override={subButtonCss} on:click={() => {movePage("guestbook")}}>
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
</body>


<style global>
    .circle1{
        animation: rotate1 1s ease-out 0s 1 normal forwards;
    }

    .circle2{
        animation: rotate2 1s ease-out 0s 1 normal forwards;
    }

    .circle3{
        animation: rotate3 1s ease-out 0s 1 normal forwards;
    }

    .circle4{
        animation: rotate4 1s ease-out 0s 1 normal forwards;
    }

    .circle5{
        animation: rotate5 1s ease-out 0s 1 normal forwards;
    }

    @keyframes rotate1{
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

    @keyframes rotate2{
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

    @keyframes rotate3{
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

    @keyframes rotate4{
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

    @keyframes rotate5{
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
</style>