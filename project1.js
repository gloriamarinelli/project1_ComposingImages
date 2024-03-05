// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite(bgImg, fgImg, fgOpac, fgPos) {
    // Calculate the starting index in the background image based on the foreground position
    let bgIndex = fgPos.x + fgPos.y * 4 * bgImg.width;
    
    // Initialize the foreground index
    let fgIndex = 0;

    // Loop through each row of the foreground image
    for (let y = 0; y < fgImg.height; ++y, bgIndex += 4 * bgImg.width) {
        // Loop through each pixel in the current row of the foreground image
        for (let x = 0; x < fgImg.width; ++x, fgIndex += 4) {
            // Loop through each color channel (Red, Green, Blue)
            for (let color = 0; color < 3; ++color) {
                // Calculate the new color value in the background image using the compositing formula
                bgImg.data[bgIndex + 4 * x + color] =
                    fgImg.data[fgIndex + color] * fgOpac +
                    (1 - fgOpac) * bgImg.data[bgIndex + 4 * x + color];
            }
        }
    }
}

/*const clamp = (value, min, max) => value > min ? value < max ? value : max : min;

function composite(bgImg, fgImg, fgOpac, { x: offsetX, y: offsetY }) {

  // find the intersecting rectangle of the two (offset) images
  const top = clamp(offsetY, 0, bgImg.height);
  const bottom = clamp(offsetY + fgImg.height, 0, bgImg.height);
  const left = clamp(offsetX, 0, bgImg.width);
  const right = clamp(offsetX + fgImg.width, 0, bgImg.width);

  const t = fgOpac, u = 1 - t;

  // process each row
  for (let y = top; y < bottom; ++y) {
    // compute the indices for both images
    let i = 4 * (y * bgImg.width + left);
    let j = 4 * ((y - offsetY) * fgImg.width + (left - offsetX));

    // process row, pixel by pixel
    for (let x = left; x < right; ++x, i += 4, j += 4) {
      // either background is opaque and you fade in the fgImg on top of it, 
      // then you need to include the pixels transparency
      // const t = fgOpac * fgImg.data[fg+3], u = 1 - t;

      bgImg.data[i + 0] = u * bgImg.data[i + 0] + t * fgImg.data[j + 0];
      bgImg.data[i + 1] = u * bgImg.data[i + 1] + t * fgImg.data[j + 1];
      bgImg.data[i + 2] = u * bgImg.data[i + 2] + t * fgImg.data[j + 2];
      // or you cross fade the alpha channel as well 
      // and let the browser mix this with what's behind the canvas.
      bgImg.data[i + 3] = u * bgImg.data[i + 3] + t * fgImg.data[j + 3];
    }
  }
}*/


