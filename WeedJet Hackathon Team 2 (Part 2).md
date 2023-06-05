# WeedJet Hackathon Team 2 (Part 2)

## Introduction

This is the second part of the WeedJet hackathon. In this phase, our team will be focusing on implementing the route/session map to showcase various layers of data. Our main goal is to create an interactive and informative map, perhaps side-by-side with an informative/statistical user interface that provides insights into the vehicle's route, sprayed regions, points of interest, or other relevant statistics that will come up during our work.

## Creating and improving fictional data

1. **Additional (larger set) of route data** Currently, only a limited amount of data is provided, showing only a part of the route for a single unit. To create a more realistic end product, it would be nice to generate a route ourselves.

2. **Improve our spray data generator**

   A script has been written to generate 'fictional' data about where the nozzles have sprayed (along with the certainty of the AI model). We should improve and separate it into multiple smaller functions to allow us to change parameters at runtime and obtain a different set of data.

3. **Implement a point of interest data generator** To create the point of interest layer, we need to generate data that we can showcase on this layer. It is important that this data provides information on why it is of interest to the user and potentially includes a video fragment, image, or other attachments.

## Creating the map/layers

1. **Vehicle Route Layer:**
   - Visualize the route of the vehicle on the map (DONE)
   - Enhance the route representation with additional features to depict interesting statistics.
     - Speed (DONE)
     - What other interesting attributes can be included? (TO DO)
   - Provide the ability to switch between the shown statistics on the route (TO DO)
   - Provide an interactive user interface to change the visibility of the layer (TO DO)
   - Display all interesting statistics of the route in a statistical overview.
2. **Sprayed Regions Layer:**
   - Create a heatmap layer that shows the regions where the vehicle has sprayed fluids to eliminate the weeds (DONE).
   - Provide an interactive user interface to change the visibility and intensity of the heatmap layer (TO DO).
3. **Points of Interest Layer:**
   - Display points of interest on the map that require user attention (TO DO).
   - Differentiate between multiple types of points (TODO).
     - AI was not certain about their decision to spray or not spray.
   - Provide an interactive user interface with a video fragment of the point of interest where the user can give feedback to the system regarding the correctness of the decision (TODO).
4. **BONUS: Other great layers :D**