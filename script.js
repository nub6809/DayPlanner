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
