
export const placemarkListController = {
    index: {
        handler: async function (request, h) {
            return h.view("placemark-list");
        },
    },
};
