<script lang="ts">

    let width, height;
</script>

<body bind:clientWidth={width} bind:clientHeight={height}>
    <p style="--maxWidth: {width}">
        <slot>

        </slot>
    </p>
</body>

<style lang="scss">
  p {
    max-width: 100%;
    overflow: hidden;

    :global(body) {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.4;
      margin: 1rem;
    }

    :global(table) {
      border-collapse: collapse;
    }

    :global(table:not([cellpadding]) th), :global(table:not([cellpadding]) td) {
      padding: 0.4rem;
    }

    :global(table[border]:not([border="0"]):not([style*="border-width"]) th), :global(table[border]:not([border="0"]):not([style*="border-width"]) td) {
      border-width: 1px;
    }

    :global(table[border]:not([border="0"]):not([style*="border-style"]) th), :global(table[border]:not([border="0"]):not([style*="border-style"]) td) {
      border-style: solid;
    }

    :global(table[border]:not([border="0"]):not([style*="border-color"]) th), :global(table[border]:not([border="0"]):not([style*="border-color"]) td) {
      border-color: #ccc;
    }

    :global(figure) {
      display: table;
      margin: 1rem auto;
    }

    :global(figure figcaption) {
      color: #999;
      display: block;
      margin-top: 0.25rem;
      text-align: center;
    }

    :global(hr) {
      border-color: #ccc;
      border-style: solid;
      border-width: 1px 0 0 0;
    }

    :global(p > code) {
      background-color: #e8e8e8;
      border-radius: 3px;
      padding: 0.1rem 0.2rem;
    }

    :global(.mce-content-body:not([dir=rtl]) blockquote) {
      border-left: 2px solid #ccc;
      margin-left: 1.5rem;
      padding-left: 1rem;
    }

    :global(.mce-content-body[dir=rtl] blockquote) {
      border-right: 2px solid #ccc;
      margin-right: 1.5rem;
      padding-right: 1rem;
    }

    :global(pre[class*=language-]) {
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

    :global(p > img) {
      max-width: 100%;
      width: auto;
      height: auto;
    }
  }

</style>