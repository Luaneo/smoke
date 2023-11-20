console.log('test.js');

// fetch('http://79.174.93.200/')
//     .then(response => {
//         console.log(response);
//         return response.json();
//     })
//     .then(data => {
//         console.log(data);
//     });

fetch("https://smoke-server2.smoke-ai.ru/post/groups_and_interests", {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        user_id: 101010,
        groups: JSON.stringify({
            data: null,
        }),
        interests: JSON.stringify({
            data: null,
        }),
    }),
})
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((data) => {
        console.log(data);
    });
