import React from "react";
import { IResourceComponentsProps, useTranslate, useGo, useGetToPath } from "@refinedev/core";
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
    DeleteButton
} from "@refinedev/mantine";
import { IconDatabase } from '@tabler/icons-react';
import { IProject } from "interfaces";
import { 
    IconSettings,
    IconChartLine
} from '@tabler/icons-react';
import type { ColumnDef, flexRender, createColumnHelper } from "@tanstack/react-table";
import { ColumnFilter, ColumnSorter } from "../../components/table";
import { useNavigate } from "react-router-dom";

const rowflexRender =  (Comp:any, props: any) =>  {
    return <Text>{props.cell ? props.cell.column.columnDef.cell(props.cell.getContext()) : props.getValue()}</Text>
}

const headerflexRender =  (Comp:any, props: any) =>  {
    return <Text>{props.column.columnDef.header}</Text>
}

export const ProjectList: React.FC<IResourceComponentsProps> = () => {
    const navigate = useNavigate();
    const t = useTranslate();
    const go = useGo();
    const getToPath = useGetToPath();
    const _to = getToPath({
        resource: {
            name:  "/projects/:projectId/parameters",
            identifier: "parameters",
        },
        action: "list",
        meta: {
            projectId: 1,
        },
    });

    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                id: "id",
                header: t("projects.fields.id"),
                accessorKey: "id",
                enableColumnFilter: false,
            },
            {
                id: "name",
                header: t("projects.fields.name"),
                accessorKey: "name",
                meta: {
                    filterOperator: "eq",
                },
            },
            {
                id: "cateogry",
                header: t("projects.fields.category"),
                accessorKey: "category",
                meta: {
                    filterOperator: "eq",
                },
            },
            {
                id: "description",
                header: t("projects.fields.description"),
                accessorKey: "description"
            },
            {
                id: "visibility",
                header: t("projects.fields.visibility"),
                accessorKey: "visibility",
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
                             <Button  
                                onClick={() => {
                                    //window.location.href= `projects/${getValue()}/data`;
                                    navigate(`/projects/${getValue()}/data`);
                                }}
                                variant="default" leftIcon={<IconDatabase size="1.2rem" />}></Button>
                             <Button  
                                onClick={() => {
                                    //window.location.href= `projects/${getValue()}/data`;
                                    navigate(`/projects/${getValue()}/analysis`);
                                }}
                                variant="default" leftIcon={<IconChartLine size="1.2rem" />}></Button>
                             <Button 
                                onClick={() => {
                                    //window.location.href= `projects/${getValue()}/parameters`;
                                    navigate(`/projects/${getValue()}/parameters`);
                                }}
                                variant="filled">Parameters</Button>
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



    return (
        <List 
            
            title="Projects">
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
