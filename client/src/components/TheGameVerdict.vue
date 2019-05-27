<template>
    <div>
        <h1 class="verdict" v-if="show_message">{{ title }}</h1>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'TheGameVerdict',
        props: {
            show_message: {
                type: Boolean,
                required: true,
            }
        },
        computed: {
            ...mapState(['player', 'winner', 'looser']),
            title() {
                if (this.winner) {
                    return this.player.id === this.winner ? 'YOU WON' : 'You lost...'
                } else if (this.looser) {
                    return this.player.id === this.looser ? 'You lost...' : 'YOU WON'
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .verdict {
        height: 40px;
        text-align: center;
    }
</style>
