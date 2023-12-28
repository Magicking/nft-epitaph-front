<script>
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
  import rgeAbi from "$lib/rge.abi.json";
  import { fade } from "svelte/transition";

  let fUpdatePrice;
  let priceText = "2.0 ETH";
  let destination = "";
  let coupon = "";

  let isCopied = false;

  let showTooltip = false;

  let canvasWidth;

  function copyToClipboard() {
    navigator.clipboard.writeText(destination).then(() => {
      isCopied = true;
      setTimeout(() => {
        isCopied = false;
      }, 2000); // Reset after 2 seconds
    });
  }

  function updateCanvasWidth() {
    // 896px width for medium or larger screens
    canvasWidth = window.innerWidth >= 768 ? 896 : window.innerWidth;
  }

  onMount(async () => {
    updateCanvasWidth();
    window.addEventListener("resize", updateCanvasWidth);
  });

  // Cleanup to remove the event listener when the component is destroyed
  onDestroy(async () => {
    window.removeEventListener("resize", updateCanvasWidth);
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
  function validate(e) {
    console.log("TODO CHECK destination is a valid address");
  }
  function validateCoupon(e) {
    const couponText = document.getElementById("coupon");
    if (coupon == "") {
      couponText.classList.remove("border-green-500");
      couponText.classList.remove("border-red-500");
      return;
    }
    $contracts.pricing["isValidCoupon(bytes)"](coupon)
      .then((isValid) => {
        console.log(isValid);
        if (isValid) {
          couponText.classList.remove("border-red-500");
          couponText.classList.add("border-green-500");
          fUpdatePrice(rgb);
        } else {
          couponText.classList.remove("border-green-500");
          couponText.classList.add("border-red-500");
        }
      })
      .catch((error) => {
        couponText.classList.remove("border-green-500");
        couponText.classList.add("border-red-500");
        console.error("An error occurred when calling isValidCoupon:");
      });
    console.log("TODO CHECK coupon is a valid coupon");
  }
  if ($connected) {
    evm.attachContract("rge", rgeConf["address"], rgeAbi["abi"]);

    onMount(async () => {
      destination = await $signer.getAddress();
      $contracts.rge["pricer()"]().then((pricerAddress) => {
        console.log(pricerAddress);
        evm.attachContract("pricing", pricerAddress, rgeAbi["price"]);
      });
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
        $contracts.rge["calcPrice(uint256,bytes)"](
          (rgb.r << 16) + (rgb.g << 8) + rgb.b,
          coupon == "" ? [] : coupon
        )
          .then((priceWei) => {
            colorPrice = priceWei;
            price.innerText =
              ethers.utils.formatEther(priceWei).substring(0, 6) + " ETH";
            price.disabled = false;
            priceText =
              "Code " +
              rgbToHex(rgb.r, rgb.g, rgb.b) +
              " Price " +
              price.innerText;
            updateCanvasColors();
          })
          .catch((error) => {
            price.disabled = true;
            priceText =
              "Code " +
              rgbToHex(rgb.r, rgb.g, rgb.b) +
              " already used or invalid coupon";
            console.error("An error occurred when calling calcPrice:", error);
          });
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
          console.log("Calling mintEpitaph", sig, rgb256);
          // call the smart contract with 0.1 ETH
          //console.log($contracts.rge);
          await $contracts.rge[
            "mintEpitaphOf(uint256[12],uint256,address,bytes)"
          ](sig, rgb256, destination, coupon == "" ? [] : coupon, {
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
        return (
          "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
      }
    });
  }
</script>

<div class="min-h-screen">
  {#if $connected}
    {#if $chainId !== 1}
      <p>
        Your are connected to the wrong network ("{$chainData.name}")". Please
        connect to the mainnet
      </p>
    {:else}
      <div class="flex flex-col">
        <div class="w-full flex items-center justify-evenly">
          <div
            class=" flex flex-col text-white mt-5 p-6 gap-y-4 w-[50rem] my-0 md:my-20"
          >
            <h1 class="text-green underline">Getting Started!</h1>
            <p class="info-box">
              Draw your message on the canvas below, it will be stored on the
              Ethereum blockchain eternarly.
            </p>

            <p class="info-box">
              Press down lightly your finger where you want to start drawing on
              the canvas. And move your finger in the direction you wish to
              draw.
            </p>

            <p class="info-box">Use the erase button to gently erase pixel.</p>
          </div>

          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <div class="flex flex-col items-stretch md:items-center relative p-6">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              on:mouseover={() => (showTooltip = true)}
              on:mouseleave={() => (showTooltip = false)}
              on:click={copyToClipboard}
            >
              <label
                for="address"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                In memory of:
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

            {#if showTooltip}
              <span
                class="tool-tip absolute z-10 w-auto text-white bg-black rounded-md shadow-lg -translate-x-1/2 left-1/2"
              >
                {isCopied ? "Copied!" : "Click to copy"}
                <svg class="tooltip-svg" viewBox="0 0 20 10">
                  <path d="M0,0 L10,10 L20,0 Z"></path>
                </svg>
              </span>
            {/if}
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
          <div
            class="flex justify-between flex-col md:flex-row gap-y-6 md:gap-y-0"
          >
            <div>
              <label
                for="coupon"
                class="block w-56 mb-2 text-sm font-medium text-gray-100 dark:text-white"
                >Coupon</label
              >
              <input
                type="text"
                bind:value={coupon}
                on:input={(e) => validateCoupon(e)}
                id="coupon"
                class="bg-gray-50 w-1/6 border text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0xDE2..."
              />
            </div>

            <div>
              <div class="text-white">
                You can pay:
                <button
                  id="price"
                  class=" w-full mt-4 neon-btn blue px-2 py-1 text-sm text-white rounded-md shadow-md focus:outline-none"
                >
                  Submit
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
    {/if}
  {:else}
    <div class="h-[30vh] flex items-center justify-center p-20">
      <p class="text-white text-center">
        Please first <a href="/" class="">connect</a>
        to the mainnet network to be able to use this page!
      </p>
    </div>
  {/if}
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
