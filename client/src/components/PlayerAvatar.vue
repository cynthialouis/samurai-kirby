<template>
    <div v-if="player_id" :class="avatar_classes"></div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'PlayerAvatar',
        props: {
            id: {
                type: Number,
                default: null,
            },
            header: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            ...mapState(['player']),
            player_id() {
                return this.id || this.player.id
            },
            avatar_classes() {
                let classes = []

                if (this.header) {
                    classes.push('header-avatar')
                } else {
                    classes.push('battle-avatar')
                }

                if(this.player_id === 1) {
                    classes.push('yellow')
                } else if (this.player_id === 2) {
                    classes.push('pink')
                }

                return classes
            }
        },
    }
</script>

<style scoped lang="scss">
    .battle-avatar {
        border-radius: 80%;
        width: 100px;
        height: 100px;
    }
    .header-avatar{
        border-radius: 50%;
        max-width: 50px;
        max-height: 50px;
    }
    .yellow{
        background-color: #ffb900;
    }
    .pink{
        background-color: #fc8c84;
    }

    /* Galaxy S5 */
    @media (max-width: 640px) {
        .battle-avatar {
            width: 70px;
            height: 70px;
        }
        .header-avatar{
            max-width: 40px;
            max-height: 40px;
        }
    }
    /* IPhone 6/7/8 */
    @media (max-width: 670px) and (orientation: landscape) {
        .header-avatar{
            max-width: 35px;
            max-height: 35px;
        }
    }
</style>
