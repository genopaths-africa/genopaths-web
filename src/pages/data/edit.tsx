import { useTranslate } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/mantine";
import { Select, TextInput, Text, Textarea } from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import { useParams } from "react-router-dom";

export const ParameterEdit: React.FC = () => {
    const t = useTranslate();
    let { projectId } = useParams();

    const { 
        saveButtonProps,
        getInputProps,
        errors,
        refineCore: { queryResult },
    } = useForm({
        initialValues: {
            name: "",
            description: "",
            label: "",
            validation: "",
            required: "",
        },
        validate: {
            name: (value) => (value.length < 2 ? "Too short name" : null),
          
        },
        refineCoreProps: {
            action: "edit",
            warnWhenUnsavedChanges: true,
            // resource: `projects/${projectId}/parameters`
        },
    });

    console.log(queryResult);


    return (
        <Edit 
            resource={`projects/${projectId}/parameters`}
            saveButtonProps={saveButtonProps} title="Edit Parameter" >
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

                <Textarea 
                    label={t("projects.fields.description")}
                    {...getInputProps("description")}>
                </Textarea>

            </form>
        </Edit>
    );
};
