import Vue from 'vue';
import Vuex from 'vuex'
import TimeRecord from './../src/classes/TimeRecord'

Vue.use(Vuex);

const LOCAL_STORAGE_KEY = 'timesStore';

var Store = new Vuex.Store({
    state:{
        currentRecord:0,
        times: []
    },
    mutations:{
        addTime: function(state,time){
            state.times.push(time);
            state.times.sort(TimeRecord.compareRecords);
        },
        removeTime: function(state, timeId){
            state.times = state.times.filter(time => time.id !== timeId);
        },
        initStore(state){
            let storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            console.log(JSON.stringify(storedData,null,3));
            if(storedData){
                let parsedData = JSON.parse(storedData);
                console.log(JSON.stringify(parsedData,null,3));
                if(Array.isArray(parsedData)){
                    state.times = state.times.concat(...parsedData);
                    state.times.sort(TimeRecord.compareRecords);
                }else{
                    state.times = []
                }
            }
            state.currentRecord = 0;
        },
        setCurrentRecord(state,newRecord){
            state.currentRecord = newRecord;
        }
    },
    getters:{
        bestTime: function(state){
            if(state.times.length > 0){
                return state.times[0].timeInMillis;
            }
            return 0;
        }
    }
    
});
//this way, every time our times list changes (no matter if after inserting or removing an element) the resulting
//times array will be overwritten inside browser storage
Store.subscribe((mutation, state) => {
    console.log(mutation);
    if('removeTime' === mutation.type && 0 === state.times.length){
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }else{
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.times));
    }
    
});

export default Store;
