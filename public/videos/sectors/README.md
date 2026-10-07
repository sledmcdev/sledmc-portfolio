# Sector background videos

The sector cards currently stream free stock clips from Pexels (free commercial use, no attribution required).
The URLs are set in `data/collections/sector-pathways.json` (`video` + `poster` per sector):

| Sector | Clip |
|---|---|
| drivers | https://www.pexels.com/video/caminhao-de-carga-4320049/ |
| hospitality | https://www.pexels.com/video/a-chef-cooking-food-in-the-kitchen-8626269/ |
| healthcare | https://www.pexels.com/video/people-helping-an-elderly-man-7522219/ |
| logistics | https://www.pexels.com/video/person-driving-forklift-6079421/ |
| skilled-trades | https://www.pexels.com/video/a-man-welding-6046365/ |

To use the client's own footage instead, drop `<sector>.mp4` (+ optional `<sector>.jpg` poster) in this folder
and point the matching `video` / `poster` entries at `/videos/sectors/<sector>.mp4`.
Recommended: 10–20 s loop, 1280×720, H.264, no audio, under ~6 MB.
