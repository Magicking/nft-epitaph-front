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
  import rgeConf from "$lib/rge.conf.json";
  import rgeAbi from "$lib/rge.abi.json";
  evm.attachContract("rge", rgeConf["address"], rgeAbi["abi"]);
  
  onMount(async () => {
    const maxX = 128;
    const maxY = 24;
    const canvas = document.getElementById("canvas");
    const rect = canvas.getBoundingClientRect();
    const pixX = rect.width / maxX;
    const pixY = rect.height / maxY;
    const colorPicker = document.getElementById("colorPicker");
    const colorValue = document.getElementById("colorValue");
    const submitBtn = document.getElementById("submitBtn");
    let drawing = false;
    let drawnPixels = new Array(maxX)
      .fill(null)
      .map(() => new Array(maxY).fill(false));
    const eraseBtn = document.getElementById("eraseBtn");
    let isEraserActive = false;
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
    
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      // Check color availability
      return color;
    }

    colorPicker.value = getRandomColor();
    const rgb = hexToRgb(colorPicker.value);
    colorValue.innerText = rgbToHex(rgb.r, rgb.g, rgb.b);
    colorValue.style.color = colorPicker.value;
    colorPicker.addEventListener("input", () => {
      updateCanvasColors();
      const rgb = hexToRgb(colorPicker.value);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      colorValue.innerText = hex;
      colorValue.style.color = colorPicker.value;
    });

    submitBtn.addEventListener("click", async () => {
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
      let color = colorPicker.value;
      let r = parseInt(color.slice(1, 3), 16);
      let g = parseInt(color.slice(3, 5), 16);
      let b = parseInt(color.slice(5, 7), 16);

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
          value: ethers.utils.parseEther("0.1"),
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
      ctx.fillStyle = colorPicker.value;
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
</script>

<div>
  <h1>Draw your Reaper Gambit Epitaph</h1>
  <p>
    Select a color:
    <input type="color" id="colorPicker" class="rounded-md w-10 h-6 bg-black" />
  </p>
  <br /><br />
  <p>
    Write few signs of your soul on this immortal canvas on Color <span
      id="colorValue"
    />
  </p>
  <canvas
    id="canvas"
    class="block w-[896px] h-[168px] border-2 my-4 justify-center items-center mx-auto"
    width="896px"
    height="168px"
  />
  {#if $connected}
    {#if $chainId !== 1}
      <p>
        Your are connected to the wrong network ("{$chainData.name}")". Please
        connect to the mainnet
      </p>
    {/if}
  {:else}
    <p>
      Please first <a href="/">connect</a>
      connect to the mainnet network to be able to use this page.
    </p>
  {/if}
  <br />
  <div class="flex justify-between">
    <button
      id="submitBtn"
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
</div>
