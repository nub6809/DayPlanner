const px_per_min = 3;
const grid_start = 200;  
const grid_end = grid_start + 1440 * px_per_min;  
const planner = document.getElementById("planner");
const warning = document.getElementById("warning");
let events = [];
document.getElementById("event-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const block_start_time = document.getElementById("start").value;
    const block_end_time = document.getElementById("end").value;
    const color = document.getElementById("color").value;      

    const start_minutes = to_minutes(block_start_time);
    const end_minutes = to_minutes(block_end_time);

    const new_block = { title, start_minutes, end_minutes, color };
if (anti_overlap(new_block)) {
    warning.textContent = "This is overlapping with prior events. Please choose a different time.";
    return;
}
warning.textContent = "";
events.push(new_block);
    render_events();
});
function to_minutes(str) {
    const parts = str.split(":");
    return Number(parts[0]) * 60 + Number(parts[1]);
}
function format_hour(hour){
    const suffix = hour < 12 ? "AM" : "PM";
    const display = hour % 12 === 0 ? 12 : hour % 12;
    return display + ":00 " + suffix;
}
function render_grid() {
    planner.style.height = (grid_end - grid_start) + "px";
    for (let hour = 0; hour < 24; hour++) {
        let y = grid_start + hour * 60 * px_per_min;
        const line = document.createElement("div");
        line.className = "hour-line";
        line.style.top = y + "px";
        planner.appendChild(line);
        const label = document.createElement("div");
        label.className = "hour-label";
        label.style.top = (y - 10) + "px";
        label.textContent = format_hour(hour);
        planner.appendChild(label);
    }
}
function anti_overlap(event) {
    for (const other of events) {
        if (other === event) continue;
        if (overlaps(event, other)) {
            return true;
        }
    }
    return false;
}
function overlaps(event1, event2) {
    return event1.start_minutes < event2.end_minutes && event2.start_minutes < event1.end_minutes;
}
function render_events() {
    planner.innerHTML = "";
    render_grid();
    for (const event of events) {
        
        const text_color = text_color_for(event.color);
        const block = document.createElement("div");
        block.className = "event";
        const top = grid_start + event.start_minutes * px_per_min; 
        const height = (event.end_minutes - event.start_minutes) * px_per_min;
        block.style.background = event.color;
        block.style.color = text_color;
        block.style.top = top + "px";
        block.style.height = height + "px";
        block.textContent = event.title;
        planner.appendChild(block);
    }
    
}
function text_color_for(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? "black" : "white";
}
render_events();