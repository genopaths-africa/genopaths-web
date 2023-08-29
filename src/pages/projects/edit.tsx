import { useTranslate } from "@refinedev/core";
import { Edit, useForm, useSelect, ListButton } from "@refinedev/mantine";
import { Select, TextInput, Text, Textarea} from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";

export const ProjectEdit: React.FC = () => {
        const t = useTranslate();
    
    const { 
        saveButtonProps,
        getInputProps,
        errors,
        refineCore: { queryResult },
    } = useForm({
        initialValues: {
            name: "",
            description: "",
            visibility: "",
            category: "",
        },
        validate: {
            name: (value) => (value.length < 2 ? "Too short name" : null),
            description: (value) =>  (value.length < 2 ? "Too short name" : null),
            visibility: (value) =>  (value.length < 2 ? "Too short name" : null),
          
        },
        refineCoreProps: {
            warnWhenUnsavedChanges: true,
        },
    });



    return (
        <Edit 
        headerButtons={<ListButton resource="projects" meta={{title: 'Project'}}>Projects</ListButton>}
            saveButtonProps={saveButtonProps} title="Edit Project">
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

                <Textarea 
                    label={t("projects.fields.description")}
                    {...getInputProps("description")}>
                </Textarea>
            </form>
        </Edit>
    );
};
