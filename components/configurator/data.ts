import { IDataStructure } from "./configurator"

export const data:IDataStructure[] = [
    {
        id: 1,
        description: 'Genesis Node',
        typeId: 1,
        name: 'GENESIS_NODE_1',
        genesis: true,
        connections: [
          {name: 'X1', typeId: [2,3]},
          {name: 'Y1', typeId: [4,5]}
        ],
    },
    {
      id: 2,
      description: 'Genesis Node',
      typeId: 1,
      name: 'GENESIS_NODE_2',
      genesis: true,
      connections: [
        {name: 'X1', typeId: [2,3]},
      ],
    },
    {
      id: 3,
      description: 'Genesis Node',
      typeId: 1,
      name: 'GENESIS_NODE_2',
      genesis: true,
      connections: [
        {name: 'Y1', typeId: [4,5]}
      ],
    },
    {
        id: 4,
        description: 'Complex Node',
        typeId: 2,
        name: 'COMPLEX_NODE_2',
        genesis: false,
        connections: [],
    },
    {
        id: 5,
        description: 'Complex Node',
        typeId: 2,
        name: 'COMPLEX_NODE_3',
        genesis: false,
        connections: [],
    },
    {
        id: 6,
        description: 'Complex Node',
        typeId: 3,
        name: 'COMPLEX_NODE_4',
        genesis: false,
        connections: [],
    },
    {
        id: 7,
        description: 'Complex Node',
        typeId: 3,
        name: 'COMPLEX_NODE_5',
        genesis: false,
        connections: [],
    },
    {
      id: 8,
      description: 'Complex Node',
      typeId: 4,
      name: 'COMPLEX_NODE_6',
      genesis: false,
      connections: [],
    },
    {
      id: 9,
      description: 'Complex Node',
      typeId: 4,
      name: 'COMPLEX_NODE_7',
      genesis: false,
      connections: [],
    },
];

function getRandomString(indexRef: number) {
    const nodeNames = ['NODE_', 'COMPLEX_NODE_', 'LIMITED_NODE_', 'TERMINAL_NODE_'];
    const randomNumber = Math.floor(Math.random() * 4);
    return indexRef < 10 ? 'GENESIS_NODE_'+indexRef : nodeNames[randomNumber]+indexRef;
}

function getRandomBoolean(indexRef: number) {
    return indexRef < 10 ? true : false;
}

function getRandomConnections(indexRef: number) {
  const connections:number[][] = [];
  const startRange = indexRef + 1;
  const endRange = indexRef + 10;
  const range = Math.floor(Math.random() * 5);

  // populate the connections array with 0 to 4 arrays containing 0 to 6 numbers between 10 and 100
  for (let i = 0; i < range; i++) {
    const connection = [];
    const connectionRange = Math.floor(Math.random() * 7);
    for (let j = 0; j < connectionRange; j++) {
      const connectionNumber = Math.floor(Math.random() * 91) + 10;
      connection.push(connectionNumber);
    }
    connections.push(connection);
  }
  
  return connections;
}

function getRandomTypeId(indexRef: number) {
  return indexRef < 10 ? 0 : Math.floor(Math.random() * 100);
}

export const dataGenerated: IDataStructure[] = [];
/*for (let i = 1; i <= 100; i++) {
    dataGenerated.push({
        id: i,
        description: '',
        typeId: getRandomTypeId(i),
        name: getRandomString(i),
        genesis: getRandomBoolean(i),
        connectionIn: getRandomConnections(i),
        connectionOut: getRandomConnections(i+1),
    });
}*/