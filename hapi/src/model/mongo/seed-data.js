export const seedData = {
    users: {
        _model: "User",
        homer: {
            firstName: "Homer",
            lastName: "Simpson",
            username: "HomerSimpson",
            email: "homer@simpson.com",
            password: "secret",
            isAdmin: true
        },
        marge: {
            firstName: "Marge",
            lastName: "Simpson",
            username: "MargeSimpson",
            email: "marge@simpson.com",
            password: "secret",
            isAdmin: false
        },
        bart: {
            firstName: "Bart",
            lastName: "Simpson",
            username: "BartSimpson",
            email: "bart@simpson.com",
            password: "secret",
            isAdmin: false
        },
        me: {
            firstName: "f",
            lastName: "f",
            username: "ff",
            email: "f@f.com",
            password: "f",
            isAdmin: true
        }
    },

    placemark: {
      _model: "Placemark",
        iron: {
            name: "Eiserne Brücke",
            category: "Bridge",
            description: "Small Bridge made out of iron. Is only reachable by foot or bike.",
            image: [],
            location:{latitude: 49.020895276653654, longitude: 12.1018256612773},
            createdById: "->users.me"
        },
        oberpfalzbrücke: {
            name: "Oberpfalzbrücke",
            category: "Bridge",
            description: "Bridge made out of iron. Is only reachable by foot or bike.",
            image: [],
            location:{latitude: 49.02710475555395, longitude: 12.0905992460099},
            createdById: "->users.me"
        },
        steinerne_brücke: {
            name: "Steinerne Brücke",
            category: "Bridge",
            description: "Stone bridge built in 1100s featuring 16 arches spanning 300m over the Danube River.",
            image: [],
            location:{latitude: 49.022676838235945, longitude: 12.097234021044144},
            createdById: "->users.me"
        },
        hochschule: {
            name: "OTH Regensburg Fakultät Informatik und Mathematik",
            category: "Others",
            description: "ttt",
            image: [],
            location:{latitude: 49.00246815044316, longitude: 12.097496555850848},
            createdById: "->users.me"
        }
    },
    groups: {
        _model: "Group",
        want: {
            title: "Want to visit",
            userId: "->users.me"
        },
        already: {
            title: "Already visited",
            userId: "->users.me"
        },
        nice: {
            title:"Nice Scenery",
            userId: "->users.me"
        },
        history: {
            title: "Historic sites",
            userId: "->users.me"
        }
    },
};
