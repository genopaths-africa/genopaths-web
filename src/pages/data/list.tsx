import React from "react";
import { 
    IResourceComponentsProps, useExport, useImport, useList, useOne, useTranslate 
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import {
    ScrollArea,
    Table,
    Pagination,
    Group,
    Button,
    Menu,
    Text,
    Box
} from "@mantine/core";
import { 
    List, 
    EditButton,
    ShowButton,
    DeleteButton,
    ListButton,
    CreateButton,
    RefreshButton,
    ImportButton,
    ExportButton
} from "@refinedev/mantine";

import { IProject } from "interfaces";
import { 
    IconSettings
} from '@tabler/icons-react';
import type { ColumnDef, flexRender, createColumnHelper } from "@tanstack/react-table";
import { ColumnFilter, ColumnSorter } from "../../components/table";
import { useParams } from "react-router-dom";

const rowflexRender =  (Comp:any, props: any) =>  {
    return <Text>{props.cell ? props.cell.column.columnDef.cell(props.cell.getContext()) : props.getValue()}</Text>
}

const headerflexRender =  (Comp:any, props: any) =>  {
    return <Text>{props.column.columnDef.header}</Text>
}

export const DataList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    let { projectId } = useParams();

    const [parameters, setParameters] = React.useState<any[]>([]);
    const [cols, setCols] = React.useState<any[]>([]);


    const { data: _parameters , isLoading: parametersLoading, isError: loadingParamError } = useList({
        resource: `projects/${projectId}/parameters`,
    });



    const columns = React.useMemo<ColumnDef<any>[]>(
        () => {
            let _cols: any = [];
            _parameters?.data.forEach((param: any) => {
                _cols.push({
                    id: param.name,
                    header: param.label,
                    accessorKey: `data.${param.name}`,
                    meta: {
                        filterOperator: "eq",
                    },
                    key: param.name
                });
            });

            return _cols;   

        },
        [_parameters?.data],
    );


    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        refineCoreProps: {
            resource: `projects/${projectId}/data`,
            meta: {
                projectId
            }
        },
        columns,
        // pagination: {
        //     mode: 'server',
        //     current: 1,
        //     page_size: 10
        // }
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
        },
    }));
    
    const { data : projectData, isLoading : projectIsLoading, isError : projectIsError } = useOne({
        resource: `projects`,
        id: projectId + "",
    });

    const { inputProps, isLoading } = useImport();
   // const { inputProps as exportInputPros, isLoading as exportIsLoading } = useExport();
   const { triggerExport } = useExport();

    console.log(projectData);
    return (
        <List 
            headerButtons={[
                <ListButton 
                    resource="projects" meta={{title: 'Project'}}>Projects</ListButton>, 
                <ImportButton inputProps={inputProps} loading={isLoading}></ImportButton>,
                <ExportButton></ExportButton>,
                <RefreshButton resource="data"></RefreshButton>,
                //<CreateButton></CreateButton>,
            ]}

            title={`Data ${projectData ? " for " + projectData?.data?.name : ""}`} 
            canCreate={true}
            //resource={`projects/${projectId}/parameters`}
            >
            <ScrollArea>
                <Table highlightOnHover>
                <thead>
                        {getHeaderGroups().map((headerGroup:any) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header: any) => {
                                    return (
                                        <th key={header.id}>
                                            {!header.isPlaceholder && (
                                                <Group spacing="xs" noWrap>
                                                    <Box>
                                                        {
                                                        //header.column.columnDef.header
                                                        headerflexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext(),
                                                        )
                                                        }
                                                    </Box>
                                                    <Group spacing="xs" noWrap>
                                                        <ColumnSorter
                                                            column={
                                                                header.column
                                                            }
                                                        />
                                                        <ColumnFilter
                                                            column={
                                                                header.column
                                                            }
                                                        />
                                                    </Group>
                                                </Group>
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {getRowModel().rows.map((row) => {
                            return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td key={cell.id}>
                                                {rowflexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </ScrollArea>
            <br />
            <Pagination
                position="right"
                total={pageCount}
                //page={current}
                onChange={setCurrent}
                
            />
        </List>
    );
};
