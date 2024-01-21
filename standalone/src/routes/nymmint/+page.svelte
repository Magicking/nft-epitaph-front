<script>
  import Mint from "$lib/components/Mint.svelte";
  import { createNymMixnetClient } from "@nymproject/sdk-full-fat";
  import { onMount } from "svelte";

  onMount(async () => {
    createNymMixnetClient().then((nym) => {
      // show message payload content when received
      nym.events.subscribeToTextMessageReceivedEvent((e) => {
        console.log("Got a message: ", e.args.payload);
      });

      // start the client and connect to a gateway
      let clientId = "insecure";
      if (window.isSecureContext) {
        clientId = crypto.randomUUID();
      }
      nym.client
        .start({
          clientId: clientId,
          preferredGateway: "E3mvZTHQCdBvhfr178Swx9g4QG3kkRUun7YnToLMcMbM", //gateway1.nymtech.net
          forceTls: true, // force WSS
        })
        .then((e) => {
          window.nym = nym;
          console.log("Nym client started");
          // send a message to yourself
          console.log(e);
        });
      console.log("Nym client started");
    });
  });
</script>

<div>
  <Mint nymMode="true"/>
</div>
