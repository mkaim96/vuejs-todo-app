<template>
        <div class="todo-item">
            <div style="display: flex">
                <span>
                    <input type="checkbox" 
                    :checked="completed"
                    @input="$emit('toggle')">
                </span>
                <div @dblclick="$emit('edit')">
                    {{ text }}
                </div>
            </div>
            <div class="delete"
                @click="$emit('delete')">
                &times;
            </div>
        </div>
</template>

<script>
export default {
    name: 'TodoItem',
    props: {
        text: String,
        completed: Boolean
    }
}
</script>

<style scoped>
    .todo-item {
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
    }

    span {
        margin-right: 20px;
    }

    input {
        width: 20px;
        height: 20px;
        margin: 0
    }

    .delete {
        cursor: pointer;
    }
</style>
