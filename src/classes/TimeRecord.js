export default class TimeRecord{

    constructor(timeInMillis){
        this.id = Date.now(); //just a way of having a unique id easyly...
        this.timeInMillis = timeInMillis;
        //this is the way to use a static function in a constructor... when object does not exist yet
        this.formatedTime = this.constructor.formatTime(timeInMillis).string;
        this.date = new Date().toLocaleString();
    }

    static compareRecords(a, b){
        return a.timeInMillis -  b.timeInMillis;
    }

    static formatTime (timeInMillis){
        let millis = timeInMillis % 1000;
        timeInMillis -= millis;
        timeInMillis /= 1000; //seconds
        let seconds = timeInMillis % 60;
        timeInMillis -= seconds;
        let minutes = (timeInMillis % 3600) / 60;

        seconds = (seconds).toString().padStart(2,'0');
        minutes = (minutes).toString().padStart(2,'0');
        millis = (millis).toString().padEnd(3,'0');
        //returned as separated strings to lately the can be treated separatedly
        return {
            seconds, 
            minutes, 
            millis, 
            string: `${minutes}:${seconds}.${millis}`
        };
      } 
}