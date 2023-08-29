import React from "react";
import { 
    IResourceComponentsProps, useOne, useTranslate 
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
    CreateButton
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

export const ParameterList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    let { projectId } = useParams();

    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                id: "id",
                header: t("parameters.fields.id"),
                accessorKey: "id",
                enableColumnFilter: false,
            },
            {
                id: "name",
                header: t("parameters.fields.name"),
                accessorKey: "name",
                meta: {
                    filterOperator: "eq",
                },
            },
            {
                id: "label",
                header: t("parameters.fields.label"),
                accessorKey: "label",
                meta: {
                    filterOperator: "eq",
                },
            },
            {
                id: "required",
                header: t("parameters.fields.required"),
                accessorKey: "required",
                meta: {
                    filterOperator: "eq",
                },
            },
            {
                id: "description",
                header: t("parameters.fields.description"),
                accessorKey: "description"
            },
            {
                id: "validation",
                header: t("parameters.fields.validation"),
                accessorKey: "validation",
                enableColumnFilter: false
            },
            {
                id: "actions",
                accessorKey: "id",
                header: "Actions",
                enableColumnFilter: false,
                cell: function render({ getValue }) {
                    
                    return (
                        <Group spacing="xs" noWrap>
                            {
                            // <ShowButton
                            //     hideText
                            //     recordItemId={getValue() as string}
                            // />
                            }
                            <EditButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                            <DeleteButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                           
                        </Group>
                    );
                },
            },
        ],
        [],
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
            resource: `projects/${projectId}/parameters`,
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

    console.log(projectData);
    return (
        <List 
            headerButtons={[
                <ListButton 
                    resource="projects" meta={{title: 'Project'}}>Projects</ListButton>, 
                <CreateButton></CreateButton>
            ]}

            title={`Parameters ${projectData ? " for " + projectData?.data?.name : ""}`} 
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
