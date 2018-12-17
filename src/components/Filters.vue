<template>
    <div class="filters">

    <a 
        @click.prevent="changeFilter('ALL')"
        class="filter"
        :class="{ activeFilter: todosFilter == 'ALL' ? true : false  }"
        >Wszystkie ({{ todosCount }})
    </a>
    <a 
        @click.prevent="changeFilter('COMPLETED')"
        class="filter"
        :class="{ activeFilter: todosFilter == 'COMPLETED' ? true : false  }"
        >Ukończone ({{ completedTodosCount }})
        
    </a>
    <a 
        @click.prevent="changeFilter('NOT_COMPLETED')" 
        class="filter"
        :class="{ activeFilter: todosFilter == 'NOT_COMPLETED' ? true : false  }"
        >Nie ukończone ({{ notCompletedTodosCount }})
    </a>
</div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
    name: 'Filters',

    methods: {
       changeFilter(newFilter) {
           this.$store.commit('changeFilter', newFilter)
       } 
    },

    computed: {
        ...mapState([
            'todosFilter'
        ]),

        ...mapGetters([
            'todosCount',
            'completedTodosCount',
            'notCompletedTodosCount'
        ])
    }
}
</script>

<style>
    .filters {
        margin-bottom: 15px;
        margin-top: 20px;
    }

    .filter {
        margin-right: 10px;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        color: inherit;
        transition: color .2s;
        cursor: pointer;
    }

    .activeFilter {
        text-decoration: underline;
        color: #3FB783;
        transition: color .2s;
    }

    
</style>
