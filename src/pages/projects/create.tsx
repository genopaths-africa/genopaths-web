import { useTranslate } from "@refinedev/core";
import { Create, useForm, useSelect,
    ListButton
} from "@refinedev/mantine";
import { Select, TextInput, Text, Textarea } from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { title } from "process";

export const ProjectCreate: React.FC = () => {
        const t = useTranslate();
        const { projectId } = useParams();
    
    const { saveButtonProps, getInputProps, errors } = useForm({
        initialValues: {
            name: "",
            description: "",
            visibility: "private",
            category: "human",
        },
        validate: {
            name: (value) => (value.length < 2 ? "Too short name" : null),
            description: (value) => (value.length < 2 ? "Too short name" : null),
        },
    });

    return (
        <Create saveButtonProps={saveButtonProps} title="Create Project"
        headerButtons={<ListButton hideText resource="projects" meta={{title: 'Project'}}/>}
        >
            <form>
                <TextInput
                    mt={8}
                        label={t("projects.fields.name")}
                        placeholder={t("projects.fields.name")}
                    {...getInputProps("name")}
                />
               
               <Select
                    mt={8}
                    label={t("projects.fields.category")}
                    placeholder="Pick one"
                    {...getInputProps("category")}
                    defaultValue="human"
                    data={[
                        { label: "Human", value: "human" },
                        { label: "Animals", value: "animals" },
                        { label: "Environment", value: "environment" }
                    ]}
                />

                <Select
                    mt={8}
                    label={t("projects.fields.visibility")}
                    placeholder="Pick one"
                    {...getInputProps("visibility")}
                    defaultValue="private"
                    data={[
                        { label: "Private", value: "private" },
                        { label: "Public", value: "public" }
                    ]}
                />
               
                <Text mt={8} weight={500} size="sm" color="#212529">
                       
                </Text>

                <Textarea 
                    label={t("projects.fields.description")}
                    {...getInputProps("description")}>
                </Textarea>

            </form>
        </Create>
    );
};
