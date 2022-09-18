const svgPathsRaw = [
  'M 112 32 C 21 2 8 15 10 20 C 12.3513 25.3905 15 34 9 36 C 0 41 12 46 13 63 C 14.3495 80.6007 -1 91 18 99 C 39 101 23.8341 85.5 43 85.5 C 58 86 58.5056 108.589 76.4774 110.869 C 94 113 101.726 84.8874 126.97 89.778 C 152 95 152.65 84.6416 162.5 74.3874 C 169.909 66.6743 181 77 187 69 C 193.941 62.8477 194.337 52.3354 181.5 43.5 C 167 36 172 27 154 14 C 137 2 96 11 81 18 C 63 25 35 1 38 48 Z',
  'M 47 31 C 96 10 155 24 170 48 C 180 60 180 80 111 93 C 40 107 20 95 30 18 C 47 -20 96 40.6667 129 52 Z',
  'M 113 43 C 21 2 17 1 19 19 C 20 37 29 26 9 36 C 0 41 12 46 22 62 C 30 77 23.8341 85.5 43 85.5 C 58 86 75 114 78 97 C 82 77 109 79 136 81 C 158 87 173 69 176 56 C 179 44 194.337 52.3354 181 24 C 173 6 153 45 141 27 C 120 7 101 8 81 18 C 54 30 36 -2 56 66 Z',
  'M 113 43 C 21 2 17 1 19 19 C 20 37 35 49 25 61 C 12 75 53 70 53 89 C 57 108 70 125 79 96 C 99 58 108 107 121 100 C 132 91 109 79 136 81 C 161 84 162 35 171 55 C 182 74 185 31 168 26 C 152 21 153 45 141 27 C 127 -1 101 8 81 18 C 54 30 36 -2 56 66 Z',
  'M 42 37 C 75 2 155 24 167 44 C 181 63 181 109 146 81 C 121 65 85 77 64 95 C 39 109 16 91 21 43 C 49 -15 96 40.6667 129 52 Z',
  'M 79 37 C 75 2 174 16 162 47 C 144 58 187 95 141 77 C 131 116 105 69 102 83 C 94 120 85 77 64 95 C 39 109 16 91 15 66 C 12 41 25 57 29 26 C 37 -18 165 16 129 52 Z',
  'M 56 58 C -90 -27 152 14 169 53 C 182 75 118 77 152 91 C 173 110 46 83 44 72 C 28 80 38 22 66 73 C 47 112 7 91 8 67 C 10 43 25 57 31 21 C 37 -18 265 16 123 58 Z',
];

let lastRandomIndex = -1;

let svgPaths = svgPathsRaw.map((svgPathRaw) =>
  svgPathRaw
    .replaceAll(/M(\S{1})/g, 'M $1')
    .replaceAll(/(\S{1})C/g, '$1 C')
    .replaceAll(/C(\S{1})/g, 'C $1')
    .replaceAll(/(\S{1})Z/g, '$1 Z')
);

let randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export let getRandomSvgPath = () => {
  let index = randomIntFromInterval(0, svgPaths.length - 1);
  while (index === lastRandomIndex) {
    index = randomIntFromInterval(0, svgPaths.length - 1);
  }
  lastRandomIndex = index;
  return svgPaths[index];
};

export let getNewBBObject = () => ({
  speed: 0.4,
  height: 0,
  heightVelocity: 0.1,
  maxHeight: 25,
  points: [],
  xBase: 80,
  yBase: 80,
  radius: 50,
  firstTime: true,
  animFrame: undefined,
  starting: false,
  ending: false,
  alreadyEnding: false,
  mouseEntered: false,
  pointsMinValues: undefined,
  minimumMinValueDifX: 10,
  minimumMinValueDifY: 10,
  pointsMaxValues: undefined,
  maximumMaxValueDifX: 10,
  maximumMaxValueDifY: 10,
  pointsDirections: undefined,
  pointsMaxSpeeds: undefined,
  minSpeedX: 1,
  minSpeedY: 0.5,
  maxSpeedX: 2,
  maxSpeedY: 1,
  pointsSpeeds: undefined,
  pointsAccs: undefined,
  minAccX: 0.15,
  minAccY: 0.05,
  maxAccX: 0.1,
  maxAccY: 0.2,
  lastUpdate: undefined,
  lastUpdated: undefined,
  totalTime: 0,
});
