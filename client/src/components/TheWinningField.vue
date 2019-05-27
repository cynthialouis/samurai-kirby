<template>
    <div>
        <!--TODO: animation-->
        <transition name="bounce" >
            <the-game-verdict class="verdict" :show_message="show_message" />
        </transition>

        <div class="winning-field">
            <div class="first-player">
                <player-avatar :id="1" />
            </div>
            <div class="second-player">
                <player-avatar :id="2" />
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import PlayerAvatar from './PlayerAvatar'
    import TheGameVerdict from '../components/TheGameVerdict'
    import Anime from 'animejs'

    export default {
        name: 'TheWinningField',
        components: { PlayerAvatar, TheGameVerdict },
        data() {
            return {
                show_message: false,
                verdict: ' '
            }
        },
        computed: {
            ...mapState(['player', 'winner', 'looser']),
        },
        methods: {
            displayVerdict() {
                this.show_message = true

                setTimeout(() => {
                    this.$emit('done')
                }, 5000)
            },
            /**
             * Animated attack for winner
             */
            // TODO: improve
            attack() {
                var relativeEl = document.querySelector('.first-player')
                relativeEl.style.transform = 'translateX(100px)'

                Anime({
                    targets: '.first-player',
                    translateX: '500px',
                    easing: 'easeInOutCirc',
                    rotate: {
                        value: '+=2turn',
                        duration: 1800,
                        easing: 'easeInOutSine'
                    },
                    direction: 'alternate'
                })
            }
        },
        mounted() {
            this.attack()
            setTimeout(() => {
                this.displayVerdict()
            }, 1500)
        }
    }
</script>

<style scoped lang="scss">
    .verdict {
        margin-top: 15%;
    }
    /*.field {*/
        /*display: flex;*/
        /*margin-top: 20%;*/
    /*}*/
    .first-player {
        flex-grow: 1;
        text-align: center;
    }
    .second-player {
        flex-grow: 1;
        text-align: center;
    }
    .winning-field {
        display: flex;
        margin-top: 10%;
    }

    .bounce-enter-active {
        animation: bounceIn 2s;
    }
    @keyframes bounceIn {
        0% {
            transform: scale(0.1);
            opacity: 0;
        } 60% {
              transform: scale(3);
              opacity: 1;
          }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
</style>
