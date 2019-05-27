<template>
    <header class="main-background-color">
        <span class="main-font-color">Samurai Kirby-like Game</span>
        <player-avatar class="avatar" :header="true" />
    </header>
</template>

<script>
    import PlayerAvatar from './PlayerAvatar'

    export default {
        name: 'TheHeader',
        components: { PlayerAvatar }
    }
</script>

<style scoped lang="scss">
    header {
        height: 75px;
        width: 100%;
        display: flex;
    }
    header span {
        margin-left: 25px;
        font-size: 25px;
        line-height: 75px;
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .avatar {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 25px;
    }
</style>
