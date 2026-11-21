// grid dimensions and scaling
const px_per_min = 3;
const grid_start = 200;
const grid_end = grid_start + 1440 * px_per_min;
// DOM elements
const planner = document.getElementById("planner");
const warning = document.getElementById("warning");
// block data
let block_data = JSON.parse(localStorage.getItem("day_plan")) || [];
// block form submission
document.getElementById("event-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page from reloading when adding a block
    const title = document.getElementById("title").value.trim();
    const block_start_time = document.getElementById("start").value;
    const block_end_time = document.getElementById("end").value;
    const color = document.getElementById("color").value;
    const start_minutes = to_minutes(block_start_time);
    const end_minutes = to_minutes(block_end_time);
    // builds the new block, check it for overlap, and only save it if it's clear
    const new_block = { title, start_minutes, end_minutes, color };
    if (anti_overlap(new_block)) {
        // warning message for overlapping blocks
        warning.textContent = "This is overlapping with prior blocks. Please choose a different time.";
        return;
    }
    warning.textContent = ""; // Clear the warning message if no overlap
    
    block_data.push(new_block);
    render_blocks();
});
// converts time to minutes for easier calculations
function to_minutes(str) {
    const parts = str.split(":");
    return Number(parts[0]) * 60 + Number(parts[1]);
}
// displays the hour in 12-hour format with AM/PM for grid labels
function format_hour(hour) {
    const suffix = hour < 12 ? "AM" : "PM";
    const display = hour % 12 === 0 ? 12 : hour % 12;
    return display + ":00 " + suffix;
}
// renders the grid lines and hour labels on the planner
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
// checks if the new block overlaps with any existing blocks
function anti_overlap(block_data_item) {
    for (const other of block_data) {
        if (other === block_data_item) continue;
        if (overlaps(block_data_item, other)) {
            return true;
        }
    }
    return false;
}
// helper for anti_overlap
function overlaps(block1, block2) {
    return block1.start_minutes < block2.end_minutes && block2.start_minutes < block1.end_minutes;
}
// renders the blocks on the planner
function render_blocks() {
    planner.innerHTML = ""; // Clear existing blocks and grid to avoid duplicates.
    //  each redraw would stack another copy of the grid and every block on top of the old ones.
    render_grid();
    for (const block_data_item of block_data) {
        const text_color = text_color_for(block_data_item.color);
        const block = document.createElement("div");
        block.className = "event";
        const top = grid_start + block_data_item.start_minutes * px_per_min;
        const height = (block_data_item.end_minutes - block_data_item.start_minutes) * px_per_min;
        block.style.background = block_data_item.color;
        block.style.color = text_color;
        block.style.top = top + "px";
        block.style.height = height + "px";
        block.textContent = block_data_item.title;
        block.appendChild(delete_block_button(block_data_item));
        planner.appendChild(block);
    }
}
// creates a delete button for each block
function delete_block_button(block_data_item) {
    const button = document.createElement("button");
    button.className = "delete-button";
    button.textContent = "×";
    button.addEventListener("click", function () {
        delete_block(block_data_item);
    });
    return button;
}
// deletes blocks from the planner and the block_data array
function delete_block(block_data_item) {
    const index = block_data.indexOf(block_data_item);
    if (index !== -1) {
        block_data.splice(index, 1);
        render_blocks();
    }
}
//color picker contrast helper function to determine whether to use black or white text based on the background color
function text_color_for(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? "black" : "white";
}
// day plan saving and loading functions
function save_day_plan() {
    localStorage.setItem("day_plan", JSON.stringify(block_data));
}
// button to save the day plan to localStorage
document.getElementById("save-button").addEventListener("click", function () {
    save_day_plan();
    message.textContent = "Day plan saved!";
    setTimeout(function () {
        message.textContent = "";
    }, 2000);
});
render_blocks();