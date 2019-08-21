const config = {
    pages: [{
        questions: [{
                "type": "text",
                "name": "preferredName",
                "title": "If you go by a preferred name, please tell us",
                "isRequired": false,
                "placeHolder": "i.e. John"
            },
            {
                "type": "text",
                "name": "partnerShortcode",
                "title": "Please enter the shortcode of your partner",
                "isRequired": true,
                "placeHolder": "Shortcode, i.e. AB2916"
            },

            {
                type: "matrix",
                name: "interests",
                title: "In order to match you with fellow Freshers and Parents, we'd like to know a few things about your hobbies and interests. Please fill in the following, with 1 as having no interest whatsoever, to 5 being very strong interest. \n  \
            (Note you do not have to fill out every row - unchecked rows will be marked a no interest)",
                columns: [{
                        value: 0,
                        text: "1"
                    },
                    {
                        value: 1,
                        text: "2"
                    },
                    {
                        value: 2,
                        text: "3"
                    },
                    {
                        value: 3,
                        text: "4"
                    },
                    {
                        value: 4,
                        text: "5"
                    },
                ],
                rows: [{
                        value: "alcohol",
                        text: "Drinking"
                    },
                    {
                        value: "clubbing",
                        text: "Clubbing"
                    },
                    {
                        value: "anime",
                        text: "Anime"
                    },
                    {
                        value: "sports",
                        text: "Sports"
                    },
                    {
                        value: "cooking",
                        text: "Cooking"
                    },
                    {
                        value: "performingMusic",
                        text: "Performing Music"
                    },
                    {
                        value: "kpop",
                        text: "K-Pop"
                    },
                    {
                        value: "photography",
                        text: "Photography"
                    },
                    {
                        value: "dance",
                        text: "Dance"
                    },
                ]
            },
            {
                type: "comment",
                name: "selfDescription",
                title: "If you'd like to write a few words about yourself, here is your chance!"
            }
        ]
    }]
};

const hobbies = new Set([
    "alcohol",
    "clubbing",
    "anime",
    "sports",
    "cooking",
    "performingMusic",
    "kpop",
    "photography",
    "dance"
])

export {
    config,
    hobbies
};