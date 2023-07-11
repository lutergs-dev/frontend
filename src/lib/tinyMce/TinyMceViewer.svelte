<p><slot></slot></p>

<style>

    /* TinyMCE default CSS */
    p :global(body) {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        line-height: 1.4;
        margin: 1rem;
    }
    p :global(table) {
        border-collapse: collapse;
    }
    /* Apply a default padding if legacy cellpadding attribute is missing */
    p :global(table:not([cellpadding]) th) {
        padding: 0.4rem;
    }
    p :global(table:not([cellpadding]) td) {
        padding: 0.4rem;
    }

    /* Set default table styles if a table has a positive border attribute
       and no inline css */
    p :global(table[border]:not([border="0"]):not([style*="border-width"]) th) {
        border-width: 1px;
    }
    p :global(table[border]:not([border="0"]):not([style*="border-width"]) td) {
        border-width: 1px;
    }

    /* Set default table styles if a table has a positive border attribute
       and no inline css */
    p :global(table[border]:not([border="0"]):not([style*="border-style"]) th) {
        border-style: solid;
    }
    p :global(table[border]:not([border="0"]):not([style*="border-style"]) td) {
        border-style: solid;
    }

    /* Set default table styles if a table has a positive border attribute
       and no inline css */
    p :global(table[border]:not([border="0"]):not([style*="border-color"]) th) {
        border-color: #ccc;
    }
    p :global(table[border]:not([border="0"]):not([style*="border-color"]) td) {
        border-color: #ccc;
    }

    p :global(figure) {
        display: table;
        margin: 1rem auto;
    }
    p :global(figure figcaption) {
        color: #999;
        display: block;
        margin-top: 0.25rem;
        text-align: center;
    }
    p :global(hr) {
        border-color: #ccc;
        border-style: solid;
        border-width: 1px 0 0 0;
    }
    /* override code style by selector */
    p :global(p > code) {
        background-color: #e8e8e8;
        border-radius: 3px;
        padding: 0.1rem 0.2rem;
    }
    p :global(.mce-content-body:not([dir=rtl]) blockquote) {
        border-left: 2px solid #ccc;
        margin-left: 1.5rem;
        padding-left: 1rem;
    }
    p :global(.mce-content-body[dir=rtl] blockquote) {
        border-right: 2px solid #ccc;
        margin-right: 1.5rem;
        padding-right: 1rem;
    }
    /* override code block style by selector */
    p :global(pre[class*=language-]) {
        padding: 0.7em;
        margin: 0.5em 0;
        overflow: auto;
        color: #000;
        background: #f5f2f0;
        text-shadow: 0 1px #fff;
        font-family: Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;
        font-size: 1.2em;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.1;
        -moz-tab-size: 4;
        tab-size: 4;
        -webkit-hyphens: none;
        hyphens: none;
    }

    p :global(p > img) {
        object-fit: cover;
        width: -webkit-fill-available;
    }
</style>