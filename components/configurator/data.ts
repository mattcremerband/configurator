import { IConnectionType, IDataStructure } from "./configurator"

export const connectionTypes:IConnectionType[] = [
  {id: 1, name: 'X1', typeIds: [2,3]}, // accepts nodes of type 2 and 3
  {id: 2, name: 'Y1', typeIds: [4,5]},
  {id: 3, name: 'A1', typeIds: [6,7]},
  {id: 4, name: 'A2', typeIds: [8,9]},
  {id: 5, name: 'B1', typeIds: [10,11,12]},
  {id: 6, name: 'B2', typeIds: [12,13,14]},
  {id: 7, name: 'B3', typeIds: [14,15,16]},
  {id: 8, name: 'B4', typeIds: [11,13,15]},
];

export const data:IDataStructure[] = [
  {
    id: 1,
    description: 'Genesis Node',
    typeId: 1,
    name: 'GENESIS_NODE_1',
    genesis: true,
    availableConnectionTypes: [1,2] // this node has 2 connection types available: X1 and Y1
  },
  {
    id: 2,
    description: 'Genesis Node',
    typeId: 1,
    name: 'GENESIS_NODE_2',
    genesis: true,
    availableConnectionTypes: [1],
  },
  {
    id: 3,
    description: 'Genesis Node',
    typeId: 1,
    name: 'GENESIS_NODE_3',
    genesis: true,
    availableConnectionTypes: [2],
  },
  {
    id: 4,
    description: 'Complex Node',
    typeId: 2,
    name: 'COMPLEX_NODE_4',
    genesis: false,
    availableConnectionTypes: [3,4],
  },
  {
    id: 5,
    description: 'Complex Node',
    typeId: 2,
    name: 'COMPLEX_NODE_5',
    genesis: false,
    availableConnectionTypes: [3,4],
  },
  {
    id: 6,
    description: 'Complex Node',
    typeId: 3,
    name: 'COMPLEX_NODE_6',
    genesis: false,
    availableConnectionTypes: [3,4],
  },
  {
    id: 7,
    description: 'Complex Node',
    typeId: 3,
    name: 'COMPLEX_NODE_7',
    genesis: false,
    availableConnectionTypes: [3,4],
  },
  {
    id: 8,
    description: 'Complex Node',
    typeId: 4,
    name: 'COMPLEX_NODE_8',
    genesis: false,
    availableConnectionTypes: [3,4],
  },
  {
    id: 9,
    description: 'Complex Node',
    typeId: 5,
    name: 'COMPLEX_NODE_9',
    genesis: false,
    availableConnectionTypes: [3,4],
  },
  {
    id: 10,
    description: 'Complex Node',
    typeId: 5,
    name: 'COMPLEX_NODE_10',
    genesis: false,
    availableConnectionTypes: [3],
  },
  {
    id: 11,
    description: 'Complex Node',
    typeId: 5,
    name: 'COMPLEX_NODE_11',
    genesis: false,
    availableConnectionTypes: [3],
  },
  {
    id: 12,
    description: 'Complex Node',
    typeId: 5,
    name: 'COMPLEX_NODE_12',
    genesis: false,
    availableConnectionTypes: [4],
  },
  {
    id: 13,
    description: 'Complex Node',
    typeId: 5,
    name: 'COMPLEX_NODE_13',
    genesis: false,
    availableConnectionTypes: [4],
  },
  {
    id: 14,
    description: 'Limited Node',
    typeId: 6,
    name: 'LIMITED_NODE_14',
    genesis: false,
    availableConnectionTypes: [5],
  },
  {
    id: 15,
    description: 'Limited Node',
    typeId: 7,
    name: 'LIMITED_NODE_15',
    genesis: false,
    availableConnectionTypes: [5],
  },
  {
    id: 16,
    description: 'Limited Node',
    typeId: 8,
    name: 'LIMITED_NODE_16',
    genesis: false,
    availableConnectionTypes: [5],
  },
  {
    id: 17,
    description: 'Limited Node',
    typeId: 8,
    name: 'LIMITED_NODE_17',
    genesis: false,
    availableConnectionTypes: [5],
  },
  {
    id: 18,
    description: 'Limited Node',
    typeId: 9,
    name: 'LIMITED_NODE_18',
    genesis: false,
    availableConnectionTypes: [5],
  },
  {
    id: 19,
    description: 'Limited Node',
    typeId: 9,
    name: 'LIMITED_NODE_19',
    genesis: false,
    availableConnectionTypes: [5],
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