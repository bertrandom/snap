import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";

const auth = JSON.parse(await Deno.readTextFile("./data/auth.json"));

const callApi = async (method) => {
    const response = await fetch(`https://us-west-2-cf.nvprod.snapgametech.com/v12.12/0/${method}`, {
        method: 'POST',
        headers: {
            'Host': 'us-west-2-cf.nvprod.snapgametech.com',
            'Content-Type': 'application/json',
            'AuthorizationToken': auth.AuthorizationToken,
            'User-Agent': 'SNAP/145 CFNetwork/1404.0.5 Darwin/22.3.0',
            'ClientSession': auth.ClientSession,
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'X-Unity-Version': '2021.3.13f1'
        },
        body: JSON.stringify({})
    });

    if (response.ok) {
        const body = await response.json();
        return body;
    }

    return null;

}

await new Command()
    .name("snap")
    .version("0.1.0")
    .description("CLI for Marvel Snap API")
    // .action((options, ...args) => console.log("Main command called."))
    .command("bytedance", "Get bytedance state")
    .action(async (options, ...args) => {
        const body = await callApi('progression/bytedance/getState');
        console.log(JSON.stringify(body, null, 4));
    })
    .command("collection", "Get collection state")
    .action(async (options, ...args) => {
        const body = await callApi('progression/collection/getState');
        console.log(JSON.stringify(body, null, 4));
    })
    .command("game", "Get active game")
    .action(async (options, ...args) => {
        const body = await callApi('game/getActiveGame');
        console.log(JSON.stringify(body, null, 4));
    })
    .command("inbox", "Get inbox state")
    .action(async (options, ...args) => {
        const body = await callApi('progression/inbox/getState');
        console.log(JSON.stringify(body, null, 4));
    })
    .command("mission", "Get mission state")
    .action(async (options, ...args) => {
        const body = await callApi('progression/mission/getState');
        console.log(JSON.stringify(body, null, 4));
    })
    .command("profile", "Get profile state")
    .action(async (options, ...args) => {
        const body = await callApi('progression/profile/getState');
        console.log(JSON.stringify(body, null, 4));
    })
    .command("reward", "Get reward state")
    .action(async (options, ...args) => {
        const body = await callApi('progression/reward/getState');
        console.log(JSON.stringify(body, null, 4));
    })
    .command("shop", "Get shop state")
    .action(async (options, ...args) => {
        const body = await callApi('progression/shop/getState');
        console.log(JSON.stringify(body, null, 4));
    })
    .command("time", "Get time state")
    .action(async (options, ...args) => {
        const body = await callApi('progression/time/getState');
        console.log(JSON.stringify(body, null, 4));
    })
    .command("tournament", "Get tournament state")
    .action(async (options, ...args) => {
        const body = await callApi('progression/tournament/getState');
        console.log(JSON.stringify(body, null, 4));
    })
    .parse(Deno.args);