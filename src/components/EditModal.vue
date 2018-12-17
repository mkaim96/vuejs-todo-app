<template>
<transition name="fade">
    <div class="modal" v-if="editModalOpened">
        <div id="overlay" @click="closeModal($event)">
            <div id="edit-box">
                <div id="close-btn" @click="closeModal">
                    &times;
                </div>
                <input type="text" v-focus 
                :value="editedTodo.text"
                @keydown.enter="edit($event)"
                
                />
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'EditModal',

    methods: {
        closeModal(event) {
            if( event.target.id == 'overlay' || event.target.id == 'close-btn') {
                this.$store.commit('closeModal')
            }
        },

        edit(event) {
            this.$store.commit('edit', event.target.value)
        }
    },

    computed: {
        ...mapState([
            'editModalOpened',
            'editedTodo'
        ])
    }
}
</script>

<style scoped> 
    #overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 10;
        display: flex;
        justify-content: center;
        background-color: rgb(13,13, 44, 0.4)
    }

    #edit-box {
        z-index: 11;
        margin-top: 150px;
        background: white;
        width: 650px;
        height: 50px;
        -webkit-box-shadow: 10px 9px 51px -7px rgba(0,0,0,0.75);
        -moz-box-shadow: 10px 9px 51px -7px rgba(0,0,0,0.75);
        box-shadow: 10px 9px 51px -7px rgba(0,0,0,0.75);
        border-radius: 6px;
        position: relative;
    }

    #close-btn {
        position: absolute;
        right: 10px;
        top: 12px;
        cursor: pointer;
    }

    input {
        width: 100%;
        height: 100%;
        font-size: 20px;
        padding: .8rem;
        box-sizing: border-box;
        color: inherit;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .15s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

</style>
