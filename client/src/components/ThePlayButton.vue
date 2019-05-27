<template>
    <div>
        <button @click="submit" data-context="play-button">PLAY</button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: 'ThePlayButton',
        methods: {
            ...mapActions(['savePlayer']),
            async submit(e) {
                e.preventDefault()

                try {
                     await this.$store.dispatch('savePlayer')
                } catch(error) {
                    // TODO
                    console.log('catch', error)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    button {
        background-color: #ffb900;
        width: 150px;
        height: 75px;
        border-radius: 15px;
    }
</style>
