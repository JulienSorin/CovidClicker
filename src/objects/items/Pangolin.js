import Bat from "../powers/Bat.js";

export default {
  name: "Pangolin",
  img:
    "https://cdn5.coloritou.com/dessins/peindre/202023/pangolin-animaux-foraet-117524.jpg",
  id: 1,
  price: 10,
  contaminationPerSecond: 1,
  upgradeContaminationPerClick: 0.5,
  purchased: 0,
  synergies: [Bat]
};
