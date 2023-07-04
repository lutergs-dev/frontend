
<script lang="ts">

    let todoList: string[] = [];

    // values from HTML component
    let inputTextField;
    let inputTextObject;

    const onInput = () => {
        todoList.push(inputTextField);
        todoList = todoList;
        inputTextObject.value = '';
    }

</script>

<div class="todo_input" id="todo_input_root">
    <input
            name="newTodoList"
            type="text"
            placeholder=""
            bind:this={inputTextObject}
            bind:value={inputTextField} />
    <button on:click={onInput}>ADD</button>
</div>

<div class="todo_show" id="todo_show_root">
    <div class="todo_show_buttons">
        <button on:click={null}>All</button>
        <button on:click={null}>Active</button>
        <button on:click={null}>Completed</button>
    </div>
</div>


<style>
    #todo_input_root {
        margin: 0.55rem;
    }
    .todo_input > input {
        width: 100%;
        height: 3rem;
        font-size: 2.6rem;
        box-sizing : border-box;
        margin-bottom: 0.55rem;
    }
    .todo_input > button {
        width: 100%;
        height: 2rem;
        font-size: 1.5rem;
        color: azure;
        background-color: rgba(49,49,49,0.96);
    }

    #todo_show_root {
        margin: 0.55rem;
        padding-left: 10%;
        padding-right: 10%;
    }

    .todo_show_buttons {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .todo_show_buttons > button {
        width: 100%;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }
</style>