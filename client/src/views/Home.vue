<template>
    <div tabindex="0" @keydown="play">
        <v-touch v-on:tap="play">
            <the-header />
            <div class="background home" v-if="is_not_started">
                <div class="rules" data-context="rules">
                    <div>Press any key immediately when the exclamation mark pops up.</div>
                    <div>If successful, you win.</div>
                    <div>If not, you're dead on spot.</div>
                </div>
                <the-play-button class="play-button" ></the-play-button>
            </div>
            <div v-if="is_welcoming_new_player" class="background home loading" data-context="welcoming-player">
                <div class="welcome">Welcome Player {{ computed_player }}</div>
                <div v-if="computed_player === 1" class="waiting">... waiting for Player 2</div>
                <div v-else class="ready">... Ready to play ?</div>
            </div>
            <div v-if="is_loading_game" class="background home loading">
                READY ... SET ... GO
            </div>
            <div v-if="is_game_on" class="background">
                <the-game-field :exclamation_mark="exclamation_mark_on" v-if="!winner && !looser"/>
                <the-winning-field v-if="winner || looser" @done="resetsAll()"/>
            </div>
            <the-footer />
        </v-touch>
    </div>
</template>

<script>
    import TheHeader from '../components/TheHeader'
    import TheFooter from '../components/TheFooter'
    import ThePlayButton from '../components/ThePlayButton'
    import TheGameField from '../components/TheGameField'
    import TheWinningField from '../components/TheWinningField'
    import { mapState, mapActions } from 'vuex'
    import Anime from 'animejs'

    export default {
        name: 'Home',
        components: { TheGameField, TheHeader, TheFooter, ThePlayButton, TheWinningField },
        data() {
            return {
                is_welcoming_new_player: false,
                is_loading_game: false,
                is_game_on: false,
            }
        },
        computed: {
            ...mapState(['player', 'exclamation_mark_on', 'winner', 'looser']),
            is_not_started() {
                return !this.is_welcoming_new_player && !this.is_loading_game && !this.is_game_on
            },
            computed_player() {
                return this.player.id
            },
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
            },
            BE_READY: function () {
                this.is_welcoming_new_player = false
                this.is_loading_game = true
            },
            GAME_ON: function(date) {
                this.is_loading_game = false
                this.is_game_on = true

                // every 0.5 seconds, check date -> max 7 sec because random would be between 1 and 6
                let timerId = setInterval(() => {
                    this.checkCurrentDate(date)
                }, 100)

                setTimeout(() => { clearInterval(timerId);  }, 7000);
            },
            GET_WINNER: function(winner_id) {
                this.setWinner(winner_id)
            },
            GET_LOOSER: function(looser_id) {
                this.setLooser(looser_id)
            }
        },
        methods: {
            ...mapActions(['displayExclamationMark', 'setWinner', 'setLooser',  'resetGame']),
            /**
             * Both users are ready to play
             */
            launchGame() {
                // send event to server to emit back info to all
                this.$socket.emit('GET_READY')
            },
            /**
             * To check when to display the '!'
             * @param date
             */
            checkCurrentDate(date) {
                const now = Math.round(Date.now() / 1000)

                if (now === Math.round(date / 1000)) {
                    // display !
                    this.displayExclamationMark()
                }
            },
            /**
             * Triggered when an user presses 'space' tab
             * Sets winner and looser
             */
            play() {
                if(this.is_game_on && this.exclamation_mark_on && !this.winner) {
                    // user wins : send socket to server to emit back info to all
                    this.$socket.emit('SET_WINNER', this.computed_player)
                } else if (this.is_game_on && !this.winner) {
                    // user looses : send socket to server to emit back info to all
                    this.$socket.emit('SET_LOOSER', this.computed_player)
                }
            },
            /**
             * Setting a new game
             */
            resetsAll() {
                // send socket to server to reset registered players
                this.$socket.emit('RESET')

                this.is_welcoming_new_player = false
                this.is_loading_game = false
                this.is_game_on = false
                this.resetGame()
            },
        },
        watch: {
            computed_player(value) {
                // display welcome banner
                if(value) {
                    this.is_welcoming_new_player = true

                    // launch game if 2 players set
                    if (value === 2) {
                        setTimeout(() => {
                            this.launchGame()
                        }, 2500)
                    }
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    .background {
        position: absolute;
        top: 75px;
        bottom: 50px;
        width: 100%;
        background-image: linear-gradient(to top, #2c405b 0%, #F6F6F6 50%, #F6F6F6 100%);
    }
    .home {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .rules {
        margin-bottom: 150px;
        font-size: 25px;
    }
    .loading {
        font-size: 35px;
    }
    .welcome {
        margin-bottom: 50px;
    }

    /* Galaxy S5 */
    @media (max-width: 640px) {
        .background {
            top: 75px;
            bottom: 50px;
        }
        .rules {
            margin-bottom: 90px;
            margin-left: 15px;
            margin-right: 15px;
            font-size: 17px;
        }
        .loading {
            font-size: 25px;
        }
        .welcome {
            margin-bottom: 30px;
        }
    }

    /* IPhone 6/7/8 */
    @media (max-width: 670px) and (orientation: landscape) {
        .background {
            top: 75px;
            bottom: 20px;
        }
        .rules {
            margin-bottom: 40px;
            margin-left: 15px;
            margin-right: 15px;
            font-size: 15px;
        }
        .loading {
            font-size: 25px;
        }
        .welcome {
            margin-bottom: 30px;
        }
    }
</style>
