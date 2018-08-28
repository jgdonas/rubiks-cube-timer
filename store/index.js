import Vue from 'vue';
import Vuex from 'vuex'
import TimeRecord from './../src/classes/TimeRecord'

Vue.use(Vuex);

const LOCAL_STORAGE_KEY = 'timesStore' 

var Store = new Vuex.Store({
    state:{
        times: []
    },
    mutations:{
        addTime: function(state,time){
            state.times.push(time);
        },
        initStore(state){
            let storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if(storedData){
                this.replaceState(Object.assign(state, JSON.parse(storedData)));
            }
        }
    },
    getters:{
        bestTime: function(state){
            let bestTime = 0;
            if(state.times.length > 0){
                bestTime =  state.times.sort(TimeRecord.compareRecords)[0].timeInMillis;
            }
            return bestTime;
        }
    }
    
});
//this way, every time our times list changes (no matter if after inserting or removing an element) the resulting
//times array will be overwritten inside browser storage
Store.subscribe((mutation, state) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
});

export default Store;
