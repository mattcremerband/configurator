"use client";

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

//import { dataGenerated as data } from "./data"
import { data } from "./data"

export function Configurator() {
  const [configTree, setConfigTree] = React.useState<any>({})
  const [configArray, setConfigArray] = React.useState<number[]>([])

  const updateConfig = (id: number) => {
    //setConfigTree({id})
    setConfigArray([...configArray, id]);
    console.log(configArray);
  }

  const nestedNode = (connection: IConnection) => {
    if (connection.typeId.length === 0) return null;

    return (
      <div>
        {connection.typeId.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger>[ + ] {connection.name} </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{connection.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
                {data.filter(conn => (connection.typeId as number[]).includes(conn.typeId)).map((filteredConn: any, index) => {
                    return (
                      <DropdownMenuItem key={index} onClick={() => updateConfig(filteredConn.id)}>{filteredConn.name}</DropdownMenuItem>
                    )
                  })
                }
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
      </div>
    );
  }

  console.log(data);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>Select Node</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Nodes</DropdownMenuLabel>
          <DropdownMenuSeparator />
            {data.filter(item => item.genesis === true).map((item, index) => {
                return (
                  <DropdownMenuItem key={index} onClick={() => updateConfig(item.id)}>{item.name}</DropdownMenuItem>
                )
              })
            }
        </DropdownMenuContent>
      </DropdownMenu>

      {configArray.map((nodeId) => {
        return (
          <div key={nodeId}>
            <h2>Config</h2>
            <h3>Node: {data.find(node => node.id === nodeId)?.name}</h3>
            
            {data.find(node => node.typeId === nodeId)?.connections.map(
              (conn:IConnection) => {
                return (nestedNode(conn))
              })
            }   
          </div>
        )
      })}
      
      {configTree.id && (
        <div>
          <h2>Config</h2>
          <h3>Node: {data.find(item => item.id === configTree.id)?.name}</h3>
          
          <pre>{JSON.stringify(configTree, null, 2)}</pre>
          {nestedNode(configTree.id)}
        </div>
      )}
    </div>
  )
};

export interface IConnection {
  name: string;
  typeId: number[];
}

export interface IDataStructure {
  id: number;
  name: string;
  description?: string;
  genesis: boolean;
  typeId: number;
  connections: IConnection[] | [];
  connectionIn?: number[][] | [];
  connectionOut?: number[][] | [];
}