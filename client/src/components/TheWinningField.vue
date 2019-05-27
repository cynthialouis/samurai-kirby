<template>
    <div>
        <the-game-verdict class="verdict" :show_message="show_message" />

        <div class="winning-field" v-if="!winner_bounce">
            <div class="first-player">
                <player-avatar :id="1" />
            </div>
            <div class="second-player">
                <player-avatar :id="2" />
            </div>
        </div>

        <transition name="bounce">
            <div class="winning-field" v-if="winner_bounce">
                <player-avatar :id="winner_id" class="winner" />
            </div>
        </transition>
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
                winner_bounce: false,
            }
        },
        computed: {
            ...mapState(['player', 'winner', 'looser']),
            winner_id() {
                if (this.winner) {
                    return this.winner
                } else if (this.looser) {
                    return this.looser === 1 ? 2 : 1
                }
            }
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
            attack() {
                const winner_class = this.winner === 1 ? '.first-player' : '.second-player'
                const distance = this.winner === 1 ? '2500px' : '-2500px'

                Anime({
                    targets: winner_class,
                    translateX: distance,
                    easing: 'easeInOutExpo',
                })
            },
            /**
             * Animated "winning dance"
             */
            bounce() {
                this.winner_bounce = true

                Anime({
                    targets: '.winner',
                    translateY: '60vh',
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
        mounted() {
            this.attack()
            setTimeout(() => {
                this.displayVerdict()
                this.bounce()
            }, 1500)
        }
    }
</script>

<style scoped lang="scss">
    .verdict {
        margin-top: 15%;
    }
    .field {
        display: flex;
        margin-top: 20%;
        align-items: center;
        justify-content: space-around;
    }
    .winning-field {
        display: flex;
        margin-top: 10%;
        align-items: center;
        justify-content: space-around;
    }
    .first-player {
        flex-grow: 1;
        text-align: center;
    }
    .second-player {
        flex-grow: 1;
        text-align: center;
    }
    .winner {
        flex-grow: 1;
        text-align: center;
        max-width: 100px;
    }

    /* Galaxy S5 */
    @media (max-width: 640px) and (orientation: portrait) {
        .winning-field {
            margin-top: 30%;
        }
    }

    /* Galaxy S5 */
    @media (max-width: 640px) and (orientation: landscape) {
        .verdict {
            margin-top: 5%;
        }
        .winning-field {
            margin-top: 5%;
        }
    }

    /* IPhone 6/7/8 */
    @media (max-width: 670px) and (orientation: landscape) {
        .verdict {
            margin-top: 0;
        }
        .winning-field {
            margin-top: 5%;
        }
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
