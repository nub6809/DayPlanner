const px_per_min = 3;
const grid_start = 200;  
const grid_end = grid_start + 1440 * px_per_min;  
let events = [];
function to_minutes(str) {
    const parts = str.split(":");
    return Number(parts[0]) * 60 + Number(parts[1]);
}
document.getElementById("event-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const block_start_time = document.getElementById("start").value;
    const block_end_time = document.getElementById("end").value;
    
    const start_minutes = to_minutes(block_start_time);
    const end_minutes = to_minutes(block_end_time);


    events.push({ title, start_minutes, end_minutes });
    renderEvents();
});
function renderEvents() {
    console.log(events);
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
