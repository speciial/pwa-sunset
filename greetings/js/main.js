"use strict";
window.onload = async () => {
    if ("serviceWorker" in navigator) {
        try {
            const worker = await navigator.serviceWorker.register("./sw.js");
            console.log("Service Worker Registered", worker);
        } catch (error) {
            console.log(error);
        }
    }
};

window.addEventListener("load", async () => {
    const ul = document.querySelector("ul");
    const rfrsh = document.querySelector("#refresh");
    const form = document.querySelector("form");
    const username = "changeThis";
    const greeting = form.elements.greeting;
    console.log("hello");

    const init = async () => {
        const data = [];
        try {
            const greetings = await getGreetingsByUser(username);
            for (const message of greetings) {
                data.push(message);
            }
        } catch (e) {
            console.log(e.message);
        }

        ul.innerHTML = "";
        data.forEach((item) => {
            ul.innerHTML += `<ul>${item.username}: ${item.greeting}</ul>`;
        });
    };

    init();

    rfrsh.addEventListener("click", init);
});
