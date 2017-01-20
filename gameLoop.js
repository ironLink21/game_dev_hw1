var gameLoop = (()=>{
    'use strict';
    
    var prevTime = 0;
    var events = [];

    function gameLoop(time) {
        let elapsedTime = time - prevTime;
        prevTime = time;

        update(elapsedTime);

        window.requestAnimationFrame(gameLoop);
    }

    function update(elapsedTime) {
        events.forEach((event, i)=>{
            event.time += elapsedTime;
            if(event.time >= event.interval) {
                if(event.repeat != 0) {
                    event.repeat -= 1;
                    event.time -= event.interval;
                    render(event);
                }
            }
            events[i] = event;
        });

        events = events.filter((item)=>{
            return (item.repeat != 0) ? item : null; 
        });
    }

    function render(event) {
        if(event) {
            let node = document.getElementById('output-section');
            node.innerHTML += "Event: " + event.eventName + "(" + event.repeat + " remaining)\n";
            node.scrollTop = node.scrollHeight;
        }
    }

    function addEvent(){
        let eventName = document.getElementById('event-name').value;
        let interval = parseInt(document.getElementById('interval').value);
        let repeat = parseInt(document.getElementById('repeat').value);

        events.push({eventName, interval, repeat, time: 0});

        document.getElementById('event-name').value = "";
        document.getElementById('interval').value = "";
        document.getElementById('repeat').value = "";
    }

    window.onload=()=>{
        window.requestAnimationFrame(gameLoop);
    };

    return {
        addEvent
    };
})();