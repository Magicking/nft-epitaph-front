<script>
  import { onMount } from "svelte";
  import {
    defaultEvmStores as evm,
    connected,
    signer,
    signerAddress,
    chainId,
    chainData,
    contracts,
  } from "svelte-ethers-store";
  import { ethers } from "ethers";
  import ColorPicker from 'svelte-awesome-color-picker';
  import rgeConf from "$lib/rge.conf.json";
  import rgeAbi from "$lib/rge.abi.json";

  let fUpdatePrice;
  let priceText="2.0 ETH";
  function getRandomColor() {
      // TODO Check color availability
      return {r: Math.floor(Math.random() * 255),
              g: Math.floor(Math.random() * 255),
              b: Math.floor(Math.random() * 255)};
    }

   let rgb = getRandomColor();
   if ($connected) 
   {
    evm.attachContract("rge", rgeConf["address"], rgeAbi["abi"]);

    onMount(async () => {
      const maxX = 128;
      const maxY = 24;
      const canvas = document.getElementById("canvas");
      const rect = canvas.getBoundingClientRect();
      const pixX = rect.width / maxX;
      const pixY = rect.height / maxY;
      const price = document.getElementById("price");
      let drawing = false;
      let drawnPixels = new Array(maxX)
        .fill(null)
        .map(() => new Array(maxY).fill(false));
      const eraseBtn = document.getElementById("eraseBtn");
      let isEraserActive = false;
      let colorPrice = 0;
      fUpdatePrice = (rgb) => {
        $contracts.rge["calcPrice(uint256)"]((rgb.r<<16) + (rgb.g<<8) + rgb.b).then((priceWei) => {
          colorPrice = priceWei;
          console.log("Price", priceWei.toString());
          price.innerText = ethers.utils.formatEther(priceWei).substring(0, 6) + " ETH";
          priceText = "Code " + rgbToHex(rgb.r, rgb.g, rgb.b) + " Price " + price.innerText;
          updateCanvasColors();
        });
      }
      eraseBtn.addEventListener("click", () => {
        drawing = false;
        isEraserActive = !isEraserActive;
        eraseBtn.classList.toggle("active", isEraserActive);
      });
      canvas.addEventListener("mousemove", (e) => {
        if (isEraserActive) {
          erasePixelEvent(e);
        } else if (drawing) {
          drawPixelEvent(e);
        }
      });
      canvas.addEventListener("mousedown", (e) => {
        drawing = true;
        if (isEraserActive) {
          erasePixelEvent(e);
        } else if (drawing) {
          drawPixelEvent(e);
        }
      });

      canvas.addEventListener("mousemove", (e) => {
        if (isEraserActive) {
          erasePixelEvent(e);
        } else if (drawing) {
          drawPixelEvent(e);
        }
      });

      canvas.addEventListener("mouseup", () => {
        drawing = false;
      });

      canvas.addEventListener("touchstart", (e) => {
        e.preventDefault();
        for (let i = 0; i < e.changedTouches.length; i++) {
          if (isEraserActive) {
            erasePixelEvent(e.changedTouches[i]);
          } else {
            drawPixelEvent(e.changedTouches[i]);
          }
        }
      });
      canvas.addEventListener("touchend", (e) => {
        e.preventDefault();
        for (let i = 0; i < e.changedTouches.length; i++) {
          if (isEraserActive) {
            erasePixelEvent(e.changedTouches[i]);
          } else {
            drawPixelEvent(e.changedTouches[i]);
          }
        }
      });
      canvas.addEventListener("touchmove", (e) => {
        e.preventDefault();
        for (let i = 0; i < e.changedTouches.length; i++) {
          if (isEraserActive) {
            erasePixelEvent(e.changedTouches[i]);
          } else {
            drawPixelEvent(e.changedTouches[i]);
          }
        }
      });

      fUpdatePrice(rgb);

      price.addEventListener("click", async () => {
        // Convert the canvas to an array of uint256s
        updateCanvasColors();
        let sig = [];
        let uint256 = "";
        for (let y = 0; y < maxY; y++) {
          // We are using 1 uint256 per 2 row of pixels
          if (y != 0 && y % 2 == 0) {
            sig.push("0x" + uint256);
            uint256 = "";
          }
          // Each uint256 is 256 pixels (128x2 = 256)
          for (let x = 0; x < maxX; x += 32) {
            let n = 0;
            for (let i = 0; i < 32; i++)
              if (drawnPixels[x + i][y]) n += Math.pow(2, 32 - i - 1);
            uint256 += n.toString(16).padStart(8, "0");
          }
        }
        sig.push("0x" + uint256);

        // Get the color from the color picker
        let r = rgb.r;
        let g = rgb.b;
        let b = rgb.b;

        // Call the smart contract function
        try {
          // TODO put r g b in an uint256
          let rgb256 =
            "0x" +
            r.toString(16).padStart(2, "0") +
            g.toString(16).padStart(2, "0") +
            b.toString(16).padStart(2, "0");
          console.log("Calling mintEpitaph", sig, rgb256);
          // call the smart contract with 0.1 ETH
          //console.log($contracts.rge);
          await $contracts.rge["mintEpitaph(uint256[12],uint256)"](sig, rgb256, {
            value: colorPrice,
          });
        } catch (error) {
          console.error("An error occurred when calling mintEpitaph:", error);
        }
      });

      function erasePixel(x, y) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(x * pixX, y * pixY, pixX, pixY);
        drawnPixels[x][y] = false;
      }

      function erasePixelEvent(e) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor(((e.clientX - rect.left) / rect.width) * maxX);
        const y = Math.floor(((e.clientY - rect.top) / rect.height) * maxY);
        erasePixel(x, y);
      }

      function drawPixel(x, y) {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = rgbToHex(rgb.r, rgb.g, rgb.b);
        ctx.fillRect(x * pixX, y * pixY, pixX, pixY);
        drawnPixels[x][y] = true;
      }

      function drawPixelEvent(e) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor(((e.clientX - rect.left) / rect.width) * maxX);
        const y = Math.floor(((e.clientY - rect.top) / rect.height) * maxY);
        drawPixel(x, y);
      }

      function updateCanvasColors() {
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let x = 0; x < maxX; x++) {
          for (let y = 0; y < maxY; y++) {
            if (drawnPixels[x][y]) {
              drawPixel(x, y);
            }
          }
        }
      }

      function hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
      }

      function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }
  });
}
</script>

<div>

  {#if $connected}
    {#if $chainId !== 1}
      <p>
        Your are connected to the wrong network ("{$chainData.name}")". Please
        connect to the mainnet
      </p>
      {:else}
      <pre style="color:aliceblue">
      Press and hold the mouse button and move the mouse in the direction you wish to draw.

      Press down lightly your finger where you want to start your drawing on the canvas.
      And move your finger in the direction you wish to draw.</pre>
      
      <div class="flex justify-center">
        <p>
        <ColorPicker bind:rgb
            label={priceText}
            isPopup={true}
            isInput={true}
            isRight={false}
            isAlpha={false}
            isDark={true}
            on:input={(event) => {
          if (fUpdatePrice!=null) {
            fUpdatePrice(event.detail.rgb);
          } else {
            console.log("fUpdatePrice is null");
          }
        }} />
      </p>
      </div>
      <canvas
        id="canvas"
        class="block w-[896px] h-[168px] border-2 my-4 justify-center items-center mx-auto"
        width="896px"
        height="168px"
      />
      <br />
      <div class="flex justify-between">
        <button
          id="price"
          class="block mt-4 px-4 py-2 text-base font-medium text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
        <button
          id="eraseBtn"
          class="block mt-4 px-4 py-2 text-base font-medium text-white bg-red-500 rounded-md shadow-md hover:bg-red-900 focus:outline-none focus:ring-red-500 focus:ring-offset-2"
          >Erase</button
        >
      </div>
    {/if}
  {:else}
    <p>
      Please first <a href="/">connect</a>
      connect to the mainnet network to be able to use this page.
    </p>
  {/if}
</div>
