# DayPlanner

A one day planner that starts at 12:00 am and ends at 11:59 pm. It lets you lay out your day in blocks, colours them, and allows you to keep an archive of your previous day plans you saved.

**Live demo:** https://nub6809.github.io/DayPlanner/

screenshot: 
(image.png)

features:
- Add time blocks with a title, start time, end time, and colour
- Blocks are drawn on a 24 hour grid starting from 12:00 am ending at 11:59 pm at their exact time and length
- Overlapping blocks are rejected with a warning
- The text labelling each block will either be black or white depending on what colour the block's background is
- delete blocks with the x button on each block when hovering over one
- save your day plan in an archive sidebar that can be opened when clicking the archive button
- responsive layout for phones and desktops

limitations:
- saved content is only within the browser
- day plans must be saved manually by clicking the save plan button
- one archive entry per day because saves are only archived on the current day and saving again will overwrite it.
- loading an older day plan will store it under today's date 
- archived plans can not be deleted yet
- single day only
- very short blocks can result in the x button being cut off

about this project:
me trying to learn JavaScript out of personal curiosity outside my coursework by developing a web project using html css and JavaScript. It is also my first JavaScript project

acknowledgements:
- copilot helped with replacing some keywords
- claude used for the css part of the project
