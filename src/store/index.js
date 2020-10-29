import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const headers = {Accept: "application/json",
                'Content-Type': 'application/json'};
const get_options = {
    method: 'GET',
    credentials: 'include',
    headers: headers,
  };


export default new Vuex.Store({
    state :{
        isShowSidebar: true,
        sidebarItemSelected: "hmm",
        qCardsErrors: {},
        qCardsData: [],
        searchedQuestions: [],
        isLoggedIn: false
    },
    mutations: {
        // synchoronous
        setIsShowSidebar: function(state) {
            state.isShowSidebar = !state.isShowSidebar
        },
        resetUpdateTargetError: function(state, [id, field, errMsg]) {
            state.qCardsErrors[id] = state.qCardsErrors[id] || {};
            state.qCardsErrors[id][field] = errMsg;
        },
        setQCardsData: function(state, data) {
            state.qCardsData = data
        },
        setSearchedQuestions: function(state, data) {
            state.searchedQuestions = data
        },
        setIsLoggedIn: function(state, data) {
            state.isLoggedIn = data
        }
        
    },
    actions : {
        // write from component to store
        setIsShowSidebar: async function(state) {
            // can just do state.isShowSidebar = !state.isShowsidebar;
            state.commit('setIsShowSidebar' )
        },
        // Remove a qcard
        removeQCard: async function(state, id) {
            // Issue DELETE request to delete a card
            const url =  "http://127.0.0.1:5000/api/qcard/" + id + "/delete"
            const post_options = {
                method: 'POST',
                credentials: 'include',
                headers: headers,
              };
            await fetch(url, post_options);
            await state.dispatch("fetchQCardsData");
            // let qCardsData = state.state.qCardsData.filter(
            //     element => element.id != id
            // )
            // state.commit('updateQCardTarget', qCardsData)
        },
        updateQCardTarget: async function(state, [qid, rid, target]) {

            // First await GET and validate data
            const url =  "http://127.0.0.1:5000/api/relationship/" + rid + "/update"
            const post_options = {
                method: 'POST',
                credentials: 'include',
                headers: headers,
                body: JSON.stringify({
                    "target": target
                  })
              };
            let res = await fetch(url, post_options);
            res = await res.json();
            if ("error" in res) { 
                state.commit('resetUpdateTargetError',[qid, rid, res.error.target])
                return;
            } else {
                state.commit('resetUpdateTargetError',[qid, rid, undefined])
            }
            state.dispatch("fetchQCardsData");
        }, 
        addQCardTarget: async function(state, [data, direction, target]) {
            data = JSON.parse(JSON.stringify(data))
            const url =  "http://127.0.0.1:5000/api/qcard/" + data.id + "/relationship/add"
            const post_options = {
                method: 'POST',
                credentials: 'include',
                headers: headers,
                body: JSON.stringify({
                    "direction": direction,
                    "target": target
                  })
              };
            const res = await fetch(url, post_options);
            let questions = await res.json();
            let error = false;
            if ("error" in questions && "target" in questions.error) {
                state.commit('resetUpdateTargetError',
                    [data.id, 'newTarget', questions.error.target]);
                error = true;
            } else {
                state.commit('resetUpdateTargetError', [data.id, 'newTarget', ""])
            }
            if ("error" in questions && "direction" in questions.error) {
                state.commit('resetUpdateTargetError',
                    [data.id, 'newDirection', questions.error.direction]);
                error = true;
            } else {
                state.commit('resetUpdateTargetError', [data.id, 'newDirection', ""])
            }
            if (error) {
                return
            }
            state.dispatch("fetchQCardsData");
        }, 
        removeQCardTarget: async function(state, id) {
            const url =  "http://127.0.0.1:5000/api/relationship/" + id + "/delete"
            const post_options = {
                method: 'POST',
                credentials: 'include',
                headers: headers
              };
            await fetch(url, post_options);
            state.dispatch("fetchQCardsData");
        },
        fetchQCardsData: async function(state) {
            const res = await fetch("http://127.0.0.1:5000/api/qcards", get_options);
            const qcards = await res.json();
            state.commit('setQCardsData', qcards['qcards'])
        },
        fetchQuestions: async function(state, param) {
            // [TODO]: Issue GET to get data from back end
            const url =  "http://127.0.0.1:5000/api/search/" + param
            const res = await fetch(url, get_options);
            let questions = await res.json();
            // let r = questions['questions'].map(q => q["question"])
            // state.commit('setSearchedQuestions', r)
            // return r
            state.commit('setSearchedQuestions', questions['questions'])
            console.log("in fetchQuestions")
            console.log(questions['questions'])
            return questions['questions']

            // let res = placeHolderSearchedQuestions[qCard] || []
            // console.log('in fetchQuestions')
            // console.log(res)
            // state.commit('setSearchedQuestions', res)
        },
        addQCard: async function(state, qn) {
            // [TODO]: replace and move following to back end 
            const url =  "http://127.0.0.1:5000/api/qcard/add";
            const post_options = {
                method: 'POST',
                headers: headers,
                credentials: 'include',
                body: JSON.stringify({
                    "questionid": qn.id
                })
              };
            let res = await fetch(url, post_options);
            res = await res.json();
            return res;
        },
        registerUser: async function(state, form) {
            const post_options = {
                method: 'POST',
                headers: headers,
                credentials: 'include',
                body: JSON.stringify(form)
            };
            const url = "http://127.0.0.1:5000/auth/register";
            let res = await fetch(url, post_options);
            res = await res.json();
            return res;
        },
        loginUser: async function(state, form) {
            const post_options = {
                method: 'POST',
                headers: headers,
                credentials: 'include',
                body: JSON.stringify(form)
            };
            const url = "http://127.0.0.1:5000/auth/login";
            let res = await fetch(url, post_options);
            res = await res.json();
            state.dispatch('fetchIsLoggedIn')
            return res;
        },
        logoutUser: async function(state) {
            const post_options = {
                method: 'POST',
                headers: headers,
                credentials: 'include',
            };
            const url = "http://127.0.0.1:5000/auth/logout";
            let res = await fetch(url, post_options);
            res = await res.json();
            state.dispatch('fetchIsLoggedIn')
            return res;
        },
        fetchIsLoggedIn: async function(state) {
            const post_options = {
                method: 'GET',
                credentials: 'include',
                withCredentials: true,
                headers: headers,
            };
            const url = "http://127.0.0.1:5000/auth/logged-in-user";
            let res = await fetch(url, post_options);
            res = await res.json();
            let loggedIn = "userid" in res && res["userid"]
            state.commit("setIsLoggedIn", loggedIn)
            return loggedIn
        },
        
    },
    modules: {},
    
    getters: {
        getIsShowSidebar: function(state){
            return state.isShowSidebar
        },
        getQCardsData: function(state) {
            return JSON.parse ( JSON.stringify ( state.qCardsData) )
        },
        getQCardsErrors: state => state.qCardsErrors,
        getSidebarItemSelected: state => state.sidebarItemSelected,
        getSearchedQuestions: state => state.searchedQuestions,
        getIsLoggedIn: state => state.isLoggedIn

    } 
})