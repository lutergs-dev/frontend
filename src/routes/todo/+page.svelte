<!--building todo-app-->
<script lang="ts">
    import Center from './assets/Header.svelte';
    import TodolistManager from "./assets/TodolistManager.svelte";
    import FloatingButton from "$lib/ui/FloatingButton.svelte";

    TodolistManager.inputTextField = 'test2';

    let inputField;

    let todoList: string[];
    $: todoList = [];
    let newTodoName = "";


    const onInput = (event) => {
        if (event.key !== 'Enter') return;
        todoList.push(newTodoName);
        todoList = todoList;
        inputField.value = '';
    };

    function deleteTodo(i: number) {
        todoList = todoList.filter((todo, index) => index !== i);
    }
</script>


<Center/>
<TodolistManager/>

<input
    name="addTodoField"
    type="text"
    placeholder="add todo list name here"
    bind:this={inputField}
    on:keydown={onInput}
    bind:value={newTodoName}
/>



<ul>
    {#each todoList as todo, i}
        <p><b>{i}</b>, {todo} <button on:click={() => deleteTodo(i)}>complete</button></p>
    {/each}
</ul>


<FloatingButton backlink={''}/>