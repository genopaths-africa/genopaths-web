import { useTranslate, useOne } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/mantine";
import { Select, TextInput, Text, Textarea } from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import { useState } from 'react';
import { useParams } from "react-router-dom";

export const ParameterCreate: React.FC = () => {
        const t = useTranslate();
        let { projectId } = useParams();
    
    const { saveButtonProps, getInputProps, errors } = useForm({
        initialValues: {
            name: "",
            label: "",
            description: "",
            visibility: "private",
            project_id: projectId,
            access: "restricted",
        },
        validate: {
            name: (value) => (value.length < 2 ? "Too short name" : null),
            label: (value) => (value.length < 2 ? "Too short name" : null),
            description: (value) => (value.length < 2 ? "Too short name" : null),
        },
        // refineCoreProps: {
        //     resource: `projects/${projectId}/parameters`
        // },
    });

    const { data : projectData, isLoading : projectIsLoading, isError : projectIsError } = useOne({
        resource: `projects`,
        id: projectId + "",
    });

    return (
        <Create 
            saveButtonProps={saveButtonProps} 
            //resource={`projects/${projectId}/parameters`}
            title="Create Parameter">
            <form>
                <TextInput
                    mt={8}
                        label={t("parameters.fields.name")}
                        placeholder={t("parameters.fields.name")}
                    {...getInputProps("name")}
                />
               
               <TextInput
                    mt={8}
                        label={t("parameters.fields.label")}
                        placeholder={t("parameters.fields.label")}
                    {...getInputProps("label")}
                />

               <TextInput
                    mt={8}
                        label={t("parameters.fields.validation")}
                        placeholder={t("parameters.fields.validation")}
                    {...getInputProps("validation")}
                />

                <Select
                    mt={8}
                    label={t("parameters.fields.required")}
                    placeholder="Pick one"
                    {...getInputProps("required")}
                    defaultValue="2"
                    data={[
                        { label: "Required", value: "required" },
                        { label: "Optional", value: "optional" },
                        { label: "Recommended", value: "recommended" },
                    ]}
                />


                <Select
                    mt={8}
                    label="Access"
                    placeholder="Pick one"
                    {...getInputProps("access")}
                    defaultValue="2"
                    data={[
                        { label: "Restricted", value: "restricted" },
                        { label: "Optional", value: "optional" },
                        { label: "Open", value: "open" },
                    ]}
                />


                <Textarea 
                    label={t("projects.fields.description")}
                    {...getInputProps("description")}>
                </Textarea>
            </form>
        </Create>
    );
};
