<template>
    <div>
        <label>Ukończono:</label>
        <div class="wrapper">
            <div :style="{width: wrapperWidth + 'px'}" class="progressbar-wrapper">
                <div :style="{width: progressbarWidth + 'px'}" class="progressbar"></div>
            </div>
            <span>{{ Math.round(completedTodosPercentage * 100) }}%</span>
        </div>
        
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name: 'Progressbar',

    data() {
        return {
            wrapperWidth: 400,
        }
    },

    computed: {
        ...mapGetters([
            'todosCount',
            'completedTodosCount',
        ]),

        completedTodosPercentage() {
            if (this.todosCount == 0) {
                return 1
            }
            return (this.completedTodosCount / this.todosCount)
        },

        progressbarWidth() {
            return this.wrapperWidth * this.completedTodosPercentage
        }
    }
}
</script>

<style scoped>
    .progressbar-wrapper {

        height: 16px;
        border: 1px solid darkgray;
        border-radius: 10px;

    }

    label {
        font-size: 14px;
    }

    span {
        margin-left: 3px;
        font-size: 12px;
    }

    .progressbar {
        background: #3FB783;
        height: 16px;
        border-radius: 10px;
        width: 30px;
        transition: width .2s
    }

    .wrapper {
        display: flex;
        align-content: center;
        align-items: center;
    }
</style>
