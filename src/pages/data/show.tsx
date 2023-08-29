import { useShow, useOne, useTranslate } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/mantine";
import { Title, Text } from "@mantine/core";

import { ISchool } from "interfaces";

export const SchoolShow: React.FC = () => {
        const t = useTranslate();

    const { queryResult } = useShow<ISchool>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    //const { data: categoryData } = useOne<ICategory>({
    //    resource: "categories",
    //    id: record?.category.id || "",
    //    queryOptions: {
    //        enabled: !!record?.category.id,
    //    },
    //});

    return (
        <Show isLoading={isLoading}>

            <Title mt="xs" order={5}>
                {t("schools.fields.name")}
            </Title>
            <Text mt="xs">{record?.name}</Text>

            <Title mt="xs" order={5}>
                {t("schools.fields.status.name")}
            </Title>
            <Text mt="xs">{record?.name}</Text>


            <Title mt="xs" order={5}>
                {t("schools.fields.about")}
            </Title>
            <MarkdownField value={record?.about} />
        </Show>
    );
};
