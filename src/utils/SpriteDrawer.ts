const sprite = {
  width: 40,
  height: 30,
};

const spritesheet = {
  width: 1280,
  height: 780,
  image: new Image(),
  colCount: 1280 / sprite.width,
  rowCount: 780 / sprite.height,
  isLoading: true,
};

spritesheet.image.onload = () => {
  console.log("Spritesheet is loaded");
  spritesheet.isLoading = false;
};

spritesheet.image.src = require("../assets/pokeSprites/pokesprite.png");

export const drawSprite = (id: number, canvas: HTMLCanvasElement) => {
  if (spritesheet.isLoading) {
    console.log("Spritesheet is loading, retrying...");
    setTimeout(() => drawSprite(id, canvas), 10);
    return;
  }

  const x = ((id - 1) % spritesheet.colCount) * sprite.width;
  const y = (((id - 1) / spritesheet.colCount) >> 0) * sprite.height;
  const context = canvas.getContext("2d");

  if (context == null) {
    throw new Error("Canvas context is null");
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(
    spritesheet.image,
    x,
    y,
    sprite.width,
    sprite.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  // // translate sprite to bottom of canvas
  // const imgData = context.getImageData(0, 0, sprite.width, sprite.height);
  // let data = imgData.data;
  // let pixel = 0;
  // let offset = 0;
  // let offsetFound = false;
  // for (let i = data.length - 1; i >= 0; i -= 4) {
  //   if (((i - 3) % (sprite.width * 4)) * 4 === 0 && !offsetFound) {
  //     pixel = i - 3;
  //   }
  //   if (data[i] > 0 && !offsetFound) {
  //     offset = data.length - pixel;
  //     offsetFound = true;
  //   }
  //   if (offsetFound) {
  //     data[i - 3 + offset] = data[i - 3];
  //     data[i - 2 + offset] = data[i - 2];
  //     data[i - 1 + offset] = data[i - 1];
  //     data[i + offset] = data[i];
  //   }
  // }
  // context.putImageData(imgData, 0, 0);
};
