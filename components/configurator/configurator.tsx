"use client";

import * as React from "react"
import uuid from 'react-uuid';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { data, connectionTypes } from "./data"
import { Button } from "../ui/button";

export function Configurator() {
  const [configTree, setConfigTree] = React.useState<IConfigTree | {}>({})
  const [configArray, setConfigArray] = React.useState<{id: number, parentId: number | null}[] | []>([])

  /* updateConfig
  * Update the configTree object, keeping track of the current node and its connections.
  * Restart the configTree if restart is true.
  * @param id: number
  * @param restart: boolean
  */
  const updateConfig = (id: number, parentId: number | null, restart:boolean = false) => {
    console.log(`Adding node: ${id} to parentId: ${parentId}`)
    const newBranch = {id, parentId};
    // If restart is true, reset the configArray
    !restart ? setConfigArray([...configArray, newBranch]) : setConfigArray([newBranch]);

    if (restart) {
      setConfigTree(newBranch);
      return;
    }

    
  }

  React.useEffect(() => {
    console.log("configArray:", configArray);
    const idMapping: Record<number, number> = configArray.reduce((acc: Record<number, number>, el, i) => {
      acc[el.id] = i;
      return acc;
    }, {});

    console.log("idMapping:", idMapping);

    let tree: IConfigTree | {} = {};
    configArray.forEach((el) => {
      // Handle the root element
      if (el.parentId === null) {
        tree = el;
        return;
      }
      // Use our mapping to locate the parent element in our data array
      const parentEl:IConfigTree = configArray[idMapping[el.parentId]];
      // Add our current el to its parent's `children` array
      parentEl.connections = [...(parentEl.connections || []), el];
    });

    console.log("tree:", tree);
    setConfigTree(tree);
  }, [configArray]);

  React.useEffect(() => {
    console.log("configTree:", configTree);
  }, [configTree]);

  /* showConfigTree
  * Add UI to show the configTree.
  * @return: JSX.Element
  */
  const showConfigTree = (configTree: IConfigTree | {}) => {
    
    if ('id' in configTree) {
      // Find the connection type in connectionTypes array
      const connectionType = connectionTypes.find(el => el.id === configTree.id);
      // Exit early if no connection type is found, or if the connection type has no typeIds
      if (!connectionType || connectionType.typeIds.length === 0) return null;

      return (
        <div key={uuid()} className="bg-green-300">
          <h3>{data.find(node => node.id === configTree.id)?.name}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger className="grid grid-cols-2 w-[250px]">
              <div className="text-left">{connectionType.name} {connectionType.id}</div>
              <div className="w-[50px]">[ + ]</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{connectionType.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
                {/* Filter data, returning nodes containing the relevant typeId, then loop through results and add dropdown menu item for each */}
                {data.filter(node => (connectionType.typeIds as number[]).includes(node.typeId)).map((filteredNode: any) => {
                    return (
                      <DropdownMenuItem key={uuid()} onClick={() => updateConfig(filteredNode.id, connectionType.id)}>{filteredNode.name}</DropdownMenuItem>
                    )
                  })
                }
            </DropdownMenuContent>
          </DropdownMenu> 
          {configTree.connections?.map((connection) => showTreeBranch(connection))}
        </div>
      );
    }
    
    return null;
  }
  
  const getConnectionTypeInfo = (connectionTypeIds: number[]) => {
    return connectionTypeIds.map((connId) => {
      const connectionType = connectionTypes.find(el => el.id === connId);
      return {connectionType}
    })
  }

  /* showTreeBranch
  * Add UI to show a branch of the configTree.
  * @return: JSX.Element
  */
  const showTreeBranch = (branch: IConfigTree | {}) => {
    if ('id' in branch) {
      // Find the data node
      const dataNode = data.find(node => node.id === branch.id);
      if (!dataNode) return null;

      // Find the available connection types for the node
      const availableConnectionTypes = getConnectionTypeInfo(dataNode.availableConnectionTypes);
      console.log("availableConnectionTypes:", availableConnectionTypes);
      
      // Find the connection type in connectionTypes array
      //const connectionType = connectionTypes.find(el => el.id === branch.id);
      //console.log("connectionType:", connectionType);
      
      // Exit early if no connection type is found, or if the connection type has no typeIds
      //if (!connectionType || connectionType.typeIds.length === 0) return null;

      return (
        <div key={uuid()} title={`DataNodeID: ${dataNode?.id}`}>
          <h3>{dataNode?.name}</h3>
          {availableConnectionTypes.map((connType) => (
            <DropdownMenu key={uuid()}>
              <DropdownMenuTrigger asChild className="grid grid-cols-2 w-[250px]">
                <Button variant="outline">
                  <div className="text-left" title={`TypeID: ${connType?.connectionType?.id}`}>{connType?.connectionType?.name} </div>
                  <div className="w-[50px]">[ + ]</div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{connType?.connectionType?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                  {/* Filter data, returning nodes containing the relevant typeId, then loop through results and add dropdown menu item for each */}
                  {data.filter(node => (connType?.connectionType?.typeIds as number[]).includes(node.typeId)).map((filteredNode: any) => {
                      return (
                        <DropdownMenuItem key={uuid()} onClick={() => updateConfig(filteredNode.id, dataNode.id)}>{filteredNode.name}</DropdownMenuItem>
                      )
                    })
                  }
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
           
          {branch.connections?.map((connection) => showTreeBranch(connection))}
        </div>
      );
    }
    
    return (<div>Select a node to start</div>);
  }

  /* nestedNode
  * Add UI functionality for the nesting nodes.
  * @param connectionId: number
  * @return: JSX.Element
  */
  const nestedNode = (connectionId: number) => {
    // Find the connection type in connectionTypes array
    const connectionType = connectionTypes.find(el => el.id === connectionId);
    // Exit early if no connection type is found, or if the connection type has no typeIds
    if (!connectionType || connectionType.typeIds.length === 0) return null;
    
    return (
      <div key={uuid()}>
        <DropdownMenu>
          <DropdownMenuTrigger className="grid grid-cols-2 w-[250px]">
            <div className="text-left">{connectionType.name} {connectionType.id}</div>
            <div className="w-[50px]">[ + ]</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{connectionType.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
              {/* Filter data, returning nodes containing the relevant typeId, then loop through results and add dropdown menu item for each */}
              {data.filter(node => (connectionType.typeIds as number[]).includes(node.typeId)).map((filteredNode: any) => {
                  return (
                    <DropdownMenuItem key={uuid()} onClick={() => updateConfig(filteredNode.id, connectionType.id)}>{filteredNode.name}</DropdownMenuItem>
                  )
                })
              }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="flex container max-w-screen-lg">
      <div className="w-1/5 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {configArray.length ===0 ? 'Select Node': 'Start Over'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Nodes</DropdownMenuLabel>
            <DropdownMenuSeparator />
              {/* Filter data, returning only genensis nodes, then loop through results and add dropdown menu item for each */}
              {data.filter(node => node.genesis === true).map((filteredNode) => {
                  return (
                    <DropdownMenuItem key={uuid()} onClick={() => updateConfig(filteredNode.id, null, true)}>{filteredNode.name}</DropdownMenuItem>
                  )
                })
              }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-4/5 p-4 dark:bg-slate-800 bg-emerald-100">
        {/* Traverse configTree, display config info for each branch */}
        {showTreeBranch(configTree)}

        {/* Loop through configArray, display config info for each item */}
        {configArray.map((configNode) => {
          if (1===1) return null; // disable this for now
          return (
            <div key={uuid()} className="bg-red-300">
              <h2>Configuration</h2>
              
              <h3>{data.find(node => node.id === configNode.id)?.name}</h3>
              
              {/* Find the data node, loop through availableConnections and add the nestedNode for each */}
              {data.find(node => node.id === configNode.id)?.availableConnectionTypes.map(
                (conn:number) => {
                  return (nestedNode(conn))
                })
              }   
            </div>
          )
        })}
      </div>
    </div>
  )
};

export interface IConnectionType {
  id: number;
  name: string;
  typeIds: number[];
}

export interface IDataStructure {
  id: number;
  name: string;
  description?: string;
  genesis: boolean;
  typeId: number;
  availableConnectionTypes: number[] | [];
}

export interface IConfigTree {
  id: number;
  parentId: number | null;
  connections?: IConfigTree[];
}