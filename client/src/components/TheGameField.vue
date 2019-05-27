<template>
    <div>
        <div class="field">
            <div class="first-player">
                <player-avatar :id="1" />
            </div>
             <!--TODO: animation-->
            <div class="exclamation-mark">
                <h1 v-if="exclamation_mark" ><strong>!</strong></h1>
            </div>
            <div class="second-player">
                <player-avatar :id="2" />
            </div>
        </div>
    </div>
</template>

<script>
    import PlayerAvatar from './PlayerAvatar'
    import TheGameVerdict from '../components/TheGameVerdict'

    export default {
        name: 'TheGameField',
        components: { PlayerAvatar, TheGameVerdict },
        props: {
            exclamation_mark: {
                type: Boolean,
                required: true,
            }
        },
    }
</script>

<style scoped lang="scss">
    .field {
        display: flex;
        margin-top: 20%;
        align-items: center;
        justify-content: space-around;
    }
    .first-player {
        text-align: center;
    }
    .second-player {
        text-align: center;
    }
    .exclamation-mark {
        text-align: center;
    }
</style>
