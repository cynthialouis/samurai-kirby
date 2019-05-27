import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        player: Object,
        exclamation_mark_on: false,
        winner: null,
        looser: null,
    },
    mutations: {
        setPlayer(state, id) {
            state.player = {
                id: id,
            }
        },
        resetPlayer(state) {
            state.player = {}
        },
        setExclamationMark(state, value) {
            state.exclamation_mark_on = value
        },
        setAsWinner(state, winner_id) {
            state.winner = winner_id
        },
        setAsLooser(state, looser_id) {
            state.looser = looser_id
        },
        resetAll(state) {
            state.player = {}
            state.exclamation_mark_on = false
            state.winner = null
        }
    },
    actions: {
        savePlayer(context) {
            return axios.post('http://192.168.1.19:3000/items/save-player').then((res)=> {
                context.commit('setPlayer', res.data.id)
                return res.data
            }).catch((error) => {
                //TODO
                console.log('error', error)
            })
        },
        displayExclamationMark(context) {
            context.commit('setExclamationMark', true)
        },
        setWinner(context, winner_id) {
            context.commit('setAsWinner', winner_id)
        },
        setLooser(context, looser_id) {
            context.commit('setAsLooser', looser_id)
        },
        resetGame(context) {
            context.commit('setAsWinner', null)
            context.commit('setAsLooser', null)
            context.commit('setExclamationMark', false)
            context.dispatch('removePlayer')
        },
        removePlayer(context) {
            return axios.put('http://192.168.1.19:3000/items/reset').then(()=> {
                context.commit('resetPlayer')
            }).catch((error) => {
                //TODO
                console.log('error', error)
            })
        },
    }
})
