<script>
  import { locale, translation } from "$lib/stores/i18n";
  import { onDestroy, onMount } from "svelte";
  import {
    defaultEvmStores as evm,
    connected,
    signer,
    chainId,
    chainData,
    contracts,
  } from "svelte-ethers-store";
  import { ethers } from "ethers";
  import ColorPicker from "svelte-awesome-color-picker";
  import rgeConf from "$lib/rge.conf.json";
  import { goto } from '$app/navigation';
  import { fade } from "svelte/transition";

  const maxX = 128;
  const maxY = 24;
  export let nymMode = false;

  let priceText = "0 Szabo";
  let destination = "";
  let fUpdatePrice;

  let w;
  $: t = $translation;
  $: lang = $locale;
  $: balance = $signer.getBalance()

  let showTooltip = false;

  let canvasWidth;
  function updateCanvasWidth() {
    // 896px width for medium or larger screens
    canvasWidth = window.innerWidth >= 768 ? 896 : window.innerWidth;
  }

  onMount(async () => {
    w = window;
    updateCanvasWidth();
    window.addEventListener("resize", updateCanvasWidth);
  });

  // Cleanup to remove the event listener when the component is destroyed
  onDestroy(async () => {
    if (w) w.removeEventListener("resize", updateCanvasWidth);
  });
  function getRandomColor() {
    // TODO Check color availability
    return {
      r: Math.floor(Math.random() * 255),
      g: Math.floor(Math.random() * 255),
      b: Math.floor(Math.random() * 255),
    };
  }

  let rgb = getRandomColor();

  onMount(async () => {
    destination = "0x89261878977b5a01c4fd78fc11566abe31bbc14e"; // RG DAO
	try {
     $signer.getAddress().then((address) => {
		destination = address;
		fUpdatePrice(rgb);
	});
	} catch (error) {
	  fUpdatePrice(rgb);
	}
    const canvas = document.getElementById("canvas");
    const saveBtn = document.getElementById("saveBtn");
    let drawing = false;
    let drawnPixels = new Array(maxX)
      .fill(null)
      .map(() => new Array(maxY).fill(false));
    const eraseBtn = document.getElementById("eraseBtn");
    let isEraserActive = false;
    let colorPrice = 0;
    fUpdatePrice = (rgb) => {
      $contracts.rge.callStatic["calcPrice(uint256,bytes)"](
        (rgb.r << 16) + (rgb.g << 8) + rgb.b, []
      )
        .then((priceWei) => {
          colorPrice = priceWei;
          saveBtn.disabled = false;
          let pricesz = ethers.utils.formatUnits(priceWei, "szabo");
	  	// if price has . split and assign otherwise let it
	  	if (pricesz.includes(".")) {
	  	  pricesz = pricesz.split(".")[0];
	  	}
          priceText =
            "Code " +
            rgbToHex(rgb.r, rgb.g, rgb.b) +
            " Price " + pricesz + " Szabo (ETH)";
          updateCanvasColors();
        })
        .catch((error) => {
          saveBtn.disabled = true;
          priceText =
            "Code " +
            rgbToHex(rgb.r, rgb.g, rgb.b) +
            " already used";
          console.error("An error occurred when calling calcPrice:", error);
        });
      updateCanvasColors();
    };
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

    saveBtn.addEventListener("click", async () => {
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
      let g = rgb.g;
      let b = rgb.b;

      // Call the smart contract function
      try {
        // TODO put r g b in an uint256
        let rgb256 =
          "0x" +
          r.toString(16).padStart(2, "0") +
          g.toString(16).padStart(2, "0") +
          b.toString(16).padStart(2, "0");
        console.log([sig, rgb256, destination]);
        // call the smart contract with ETH
        //console.log($contracts.rge);
        await $contracts.rge[
          "mintEpitaphOf(uint256[12],uint256,address,bytes)"
        ](sig, rgb256, destination, "0x01", {
          value: colorPrice,
        }).then((e) => {
          console.log("Message sent using Provider: ", e);
          goto("/");
        })
      } catch (error) {
        console.error("An error occurred when calling mintEpitaph:", error);
      }
    });

    function erasePixelEvent(e) {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(((e.clientX - rect.left) / rect.width) * maxX);
      const y = Math.floor(((e.clientY - rect.top) / rect.height) * maxY);
      setPixel(x, y, false);
    }

    function drawPixelEvent(e) {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(((e.clientX - rect.left) / rect.width) * maxX);
      const y = Math.floor(((e.clientY - rect.top) / rect.height) * maxY);
      setPixel(x, y, true);
    }

    function setPixel(x, y, set) {
      const ctx = canvas.getContext("2d");
      const pixX = ctx.canvas.width / maxX;
      const pixY = ctx.canvas.height / maxY;
      if (set) {
        ctx.fillStyle = rgbToHex(rgb.r, rgb.g, rgb.b);
        ctx.fillRect(x * pixX, y * pixY, pixX, pixY);
      } else {
        ctx.clearRect(x * pixX, y * pixY, pixX, pixY);
      }
      drawnPixels[x][y] = set;
    }

    function updateCanvasColors() {
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let x = 0; x < maxX; x++) {
        for (let y = 0; y < maxY; y++) {
          if (drawnPixels[x][y]) {
            setPixel(x, y, true);
          }
        }
      }
    }

    function rgbToHex(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
  });
</script>

<div class="min-h-screen">
  <div class="flex flex-col">
    <div class="w-full flex items-center justify-evenly">
      <div
        class=" flex flex-col text-white mt-5 p-6 gap-y-4 w-[50rem] my-0 md:my-10"
      >
        <h1 class="text-green underline">Getting Started!</h1>
        <p class="info-box">
        {t("Mint.Banner" + (nymMode ? "Nym" : ""))}
      </p>
      </div>

      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <div class="flex flex-col items-stretch md:items-center relative p-6">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div>
          <label
            for="address"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            In memory of (Ethereum address):
          </label>
          <input
            type="text"
            bind:value={destination}
            id="address"
            class="bg-gray-50 blue border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="0xDE2..."
            required
          />
        </div>
      </div>
    </div>

    <br />
    <div class="p-10">
      <h1 class="text-white">Your Canvas</h1>
      <div
        class="flex items-center justify-center flex-col md:flex-row-reverse"
      >
        <div class="flex justify-center text-white text-sm">
          <ColorPicker
            bind:rgb
            label={priceText}
            isPopup={true}
            isInput={true}
            isAlpha={false}
            isDark={true}
            on:input={(event) => {
              if (fUpdatePrice != null) {
                fUpdatePrice(event.detail.rgb);
              } else {
                console.log("fUpdatePrice is null");
              }
            }}
          />
        </div>
        <div class="">
          <canvas
            id="canvas"
            class="block w-full border-2 my-4 justify-center items-center mx-auto"
            height="168px"
            width={canvasWidth}
          />
        </div>
      </div>
    </div>
    <div class="p-10 bg-black bottom-bar">
      <br />
      <div class="flex justify-between flex-col md:flex-row gap-y-6 md:gap-y-0">
        <div>
          <div class="text-white">
            <button
              id="saveBtn"
              class=" w-full mt-4 neon-btn blue px-2 py-1 text-sm text-white rounded-md shadow-md focus:outline-none"
            >
              {t("Mint.Save")}
            </button>
          </div>
          <button
            id="eraseBtn"
            class="block w-full mt-4 px-4 py-2 text-base font-medium text-white bg-red-500 rounded-md shadow-md hover:bg-red-900 focus:outline-none focus:ring-red-500 focus:ring-offset-2"
            >Erase</button
          >
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .info-box {
    font-size: 12px;
  }

  .tool-tip {
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    padding: 10px 20px;
  }

  .tooltip-svg {
    position: absolute;
    width: 20px;
    height: 10px;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    overflow: visible;
  }

  .tooltip-svg path {
    fill: black;
  }

  .bottom-bar {
    /* border: 1px solid #4cc9ff; */
  }
</style>
