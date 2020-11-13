export default {
  items: {
    Pangolin: {
      name: "Pangolin",
      img:
        "https://cdn5.coloritou.com/dessins/peindre/202023/pangolin-animaux-foraet-117524.jpg",
      id: 1,
      price: 10,
      contaminationPerSecond: 1,
      upgradeContaminationPerClick: 0.5,
      purchased: 0,
      synergies: ["Bat"]
    },
    Conspirationniste: {
      name: "Conspirationniste",
      img:
        "https://presse-evasion.fr/media/k2/items/cache/45c1ee0374ad5fd6005b1ab5b77233a6_XL.jpg",
      id: 2,
      price: 10,
      contaminationPerSecond: 1,
      upgradeContaminationPerClick: 0.5,
      purchased: 0
    },
    Manifestation: {
      name: "Manifestation",
      img:
        "https://images-na.ssl-images-amazon.com/images/I/31kMHFssvlL._AC_.jpg",
      id: 3,
      price: 10,
      contaminationPerSecond: 1,
      upgradeContaminationPerClick: 0.5,
      purchased: 0
    },
    Coronapero: {
      name: "Coronapero",
      img: "https://images.emojiterra.com/twitter/512px/1f37b.png",
      id: 4,
      price: 10,
      contaminationPerSecond: 1,
      upgradeContaminationPerClick: 0.5,
      purchased: 0
    },
    CovidParty: {
      name: "Covid Party",
      img: "https://photos.lci.fr/images/613/344/party-usa-3ddbf4-0@1x.jpeg",
      id: 5,
      price: 10,
      contaminationPerSecond: 1,
      upgradeContaminationPerClick: 0.5,
      purchased: 0
    }
  },
  powers: {
    Bat: {
      name: "Chauve-souris : Augmente de 20% la contamination par pangolin",
      img:
        "https://cdn.radiofrance.fr/s3/cruiser-production/2020/03/982d3baf-078c-4f60-83f0-0857ade246ee/1136_chiropteresgettyimages-118361290.jpg",
      id: 1,
      price: 10,
      purchased: false,
      multiplierSyngergy: 1.2,
      globalMultiplier: 1,
      upgradeContaminationPerClick: 1,
      clickMultiplier: 1
    }
  }
};
