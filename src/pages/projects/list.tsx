import React from "react";
import { IResourceComponentsProps
    useTranslate } from "@pankod/refine-core";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import {
    ScrollArea,
    List,
    Table,
    Pagination,
    Group,
    EditButton,
    ShowButton,
    DeleteButton,
    Button,
    Menu,
    Text,
    Box
} from "@pankod/refine-mantine";
import { ISchool } from "interfaces";
import { 
    IconSettings, 
    IconSearch, 
    IconPhoto, 
    IconMessageCircle, 
    IconTrash, 
    IconArrowsLeftRight 
} from '@tabler/icons-react';
import { useGo, useGetToPath } from "@refinedev/core";

import { ColumnFilter, ColumnSorter } from "../../components/table";

export const SchoolList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const go = useGo();
    const getToPath = useGetToPath();



    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [

            {
                id: "id",
                header: t("schools.fields.id"),
                accessorKey: "id",
                enableColumnFilter: false
            },
            {
                id: "name",
                header: t("schools.fields.name"),
                accessorKey: "name",
                meta: {
                    filterOperator: "eq",
                },

            },
            {
                id: "school_key",
                header: t("schools.fields.school_key"),
                accessorKey: "school_key"
            },
            {
                id: "phone",
                header: t("schools.fields.phone"),
                accessorKey: "phone",
                enableColumnFilter: false
            },
            {
                id: "motto",
                header: t("schools.fields.motto"),
                accessorKey: "motto",
                enableColumnFilter: false
            },
            {
                id: "emblem",
                header: t("schools.fields.emblem"),
                accessorKey: "emblem",
                enableColumnFilter: false
            },
            {
                id: "email",
                header: t("schools.fields.email"),
                accessorKey: "email"
            },
            //{
            //    id: "current_term",
            //    header: t("schools.fields.current_term"),
            //    accessorKey: "current_term",
            //    enableColumnFilter: false
            //},
            //{
            //    id: "admin_url",
            //    header: t("schools.fields.admin_url"),
            //    accessorKey: "admin_url",
            //    enableColumnFilter: false
            //},
            {
                id: "p_o_box",
                header: t("schools.fields.p_o_box"),
                accessorKey: "p_o_box",
                enableColumnFilter: false
            },
            {
                id: "physical_address",
                header: t("schools.fields.physical_address"),
                accessorKey: "physical_address",
                enableColumnFilter: false
            },
            //{
            //    id: "school_type",
            //    header: t("schools.fields.school_type"),
            //    accessorKey: "school_type",
            //    enableColumnFilter: false
            //},
            //{
            //    id: "gps",
            //    header: t("schools.fields.gps"),
            //    accessorKey: "gps",
            //    enableColumnFilter: false
            //},
            //{
            //    id: "about",
            //    header: t("schools.fields.about"),
            //    accessorKey: "about",
            //    enableColumnFilter: false
            //},
            {
                id: "actions",
                accessorKey: "id",
                header: "Actions",
                enableColumnFilter: false,
                cell: function render({ getValue }) {
                    
                    return (
                        <Group spacing="xs" noWrap>
                            <ShowButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                            <EditButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                            <DeleteButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                            <Menu shadow="md" width={200}>
                                <Menu.Target>
                                    <Button variant="filled">More</Button>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Label>School options</Menu.Label>
                                    <Menu.Item 
                                        icon={<IconSettings size={14} />} 
                                        onClick={ () => window.location.href="/schools/" + getValue() + "/staff"}
                                           
                                    >Staff</Menu.Item>
                                    <Menu.Item 
                                        icon={<IconSettings size={14} />} 
                                        onClick={ () => window.location.href="/schools/" + getValue() + "/terms"}
                                           
                                    >Terms</Menu.Item>
                                    <Menu.Item 
                                        icon={<IconSettings size={14} />} 
                                        onClick={ () => window.location.href="/schools/" + getValue() + "/classes"}
                                           
                                    >Classes</Menu.Item>
                                    <Menu.Item 
                                        icon={<IconSettings size={14} />} 
                                        onClick={ () => window.location.href="/schools/" + getValue() + "/subjects"}
                                           
                                    >Subjects</Menu.Item>
                                    <Menu.Divider />
                                    <Menu.Item 
                                        icon={<IconSettings size={14} />} 
                                        onClick={ () => window.location.href="/schools/" + getValue() + "/settings"}
                                           
                                    >Settings</Menu.Item>

                                </Menu.Dropdown>
                                </Menu>
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
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
        },
    }));



    return (
        <List>
            <ScrollArea>
                <Table highlightOnHover>
                <thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th key={header.id}>
                                            {!header.isPlaceholder && (
                                                <Group spacing="xs" noWrap>
                                                    <Box>
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext(),
                                                        )}
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
                                                {flexRender(
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
                page={current}
                onChange={setCurrent}
                
            />
        </List>
    );
};
