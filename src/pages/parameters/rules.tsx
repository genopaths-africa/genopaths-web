import { useShow, useOne, useTranslate } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/mantine";

import { Button, Card, Title, Text } from "@mantine/core";
import { useState } from 'react';
import type { RuleGroupType } from 'react-querybuilder';
import { QueryBuilder } from 'react-querybuilder';
import { fields } from './fields';
import 'react-querybuilder/dist/query-builder.css';
import './styles.css';

const initialQuery: RuleGroupType = { combinator: 'and', rules: [] };

export const ParameterRules: React.FC = () => {
    const t = useTranslate();
    const [query, setQuery] = useState(initialQuery);

    const { queryResult } = useShow<any>();
    const { data, isLoading } = queryResult;
    const record = data?.data;


    return (
        <Show
            //goBackUrl={`/parameters/{$projectId}/parameters`}
            //isLoading={isLoading}
            title={t("parameters.title", "Validation and Transformation Rules")}
        >

            <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw={500}>Validation Rules</Text>
                <Card.Section p="sm">
                    <QueryBuilder
                        fields={fields}
                        query={query}
                        onQueryChange={(q) => setQuery(q)}
                    />

                </Card.Section>

                <Button color="blue" mt="md" radius="md">
                    Save rules
                </Button>
                
            </Card>

        </Show>
    );
};
