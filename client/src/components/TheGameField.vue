<template>
    <div>
        <div class="field">
            <div class="first-player">
                <player-avatar :id="1" />
            </div>
            <transition name="bounce">
                <div class="exclamation-mark">
                    <h1 v-if="exclamation_mark" ><strong>!</strong></h1>
                </div>
            </transition>
            <div class="second-player">
                <player-avatar :id="2" />
            </div>
        </div>
    </div>
</template>

<script>
    import PlayerAvatar from './PlayerAvatar'
    import TheGameVerdict from '../components/TheGameVerdict'
    import Anime from 'animejs'

    export default {
        name: 'TheGameField',
        components: { PlayerAvatar, TheGameVerdict },
        props: {
            exclamation_mark: {
                type: Boolean,
                required: true,
            }
        },
        methods: {
            bounce() {
                Anime({
                    targets: '.exclamation-mark',
                    translateY: '10vh',
                    duration: 300,
                    loop: true,
                    direction: 'alternate',
                    easing: 'easeInCubic',
                    scaleX: {
                        value: 1.05,
                        duration: 150,
                        delay: 268
                    }
                })
            },
        },
        watch: {
            exclamation_mark(value) {
                if(value) {
                    this.bounce()
                }
            }
        }
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
        font-size: 30px;
    }

    /* Galaxy S5 */
    @media (max-width: 640px) and (orientation: portrait) {
        .field {
            margin-top: 50%;
        }
    }

    /* Galaxy S5 */
    @media (max-width: 640px) and (orientation: landscape) {
        .field {
            margin-top: 5%;
        }
    }

    /* IPhone 6/7/8 */
    @media (max-width: 670px) and (orientation: landscape) {
        .field {
            margin-top: 5%;
        }
    }
</style>
