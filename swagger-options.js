const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "FIRS-VMS API",
            version: "0.1.0",
            description:
                "A visitor management system api",
            // license: {
            //     name: "MIT",
            //     url: "https://spdx.org/licenses/MIT.html",
            // },
        },
        servers: [
            {
            url: "http://localhost:5000",
            },
        ],
    },
    // apis: ["./routes/books.js"],
    apis: [
        './Routes/user',
        './Routes/prebook',
        './Routes/authentication',
        // './Routes/section',
        // './Routes/testScore',
        // './Routes/sectionScore',
        // './Routes/admin',
        // './Routes/candidate',
        // './Routes/authentication',
    ],
};

module.exports = options