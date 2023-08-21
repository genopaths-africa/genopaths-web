import {
    useTranslate,
} from "@pankod/refine-core";
import {
    Create,
    Select,
    TextInput,
    useForm,
    useSelect,
    Text,
} from "@pankod/refine-mantine";
import { RichTextEditor } from "@mantine/rte";
import { useState } from 'react';

export const SchoolCreate: React.FC = () => {
        const t = useTranslate();
    
    const { saveButtonProps, getInputProps, errors } = useForm({
        initialValues: {
            name: "",
            motto: "",
            about: "",
            email: ""
        },
        validate: {
            name: (value) => (value.length < 2 ? "Too short name" : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            motto: (value) =>
                value.length <= 0 ? "Motto is required" : null,
            about: (value) =>
                value.length < 10 ? "Too short about" : null,
        },
    });

    const { selectProps } = useSelect({
        resource: "school_types",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <form>
                <TextInput
                    mt={8}
                        label={t("schools.fields.name")}
                        placeholder={t("schools.fields.name")}
                    {...getInputProps("name")}
                />
               
                <TextInput
                    mt={8}
                        label={t("schools.fields.email")}
                        placeholder={t("schools.form.placeholders.email")}
                    {...getInputProps("email")}
                    
                />
               
               <TextInput
                    mt={8}
                        label={t("schools.fields.phone")}
                        placeholder={t("schools.fields.phone")}
                    {...getInputProps("phone")}
                />
               
               <TextInput
                    mt={8}
                        label={t("schools.fields.emblem")}
                        placeholder={t("schools.fields.emblem")}
                    {...getInputProps("emblem")}
                />
               
               <TextInput
                    mt={8}
                        label={t("schools.fields.motto")}
                        placeholder={t("schools.fields.motto")}
                    {...getInputProps("motto")}
                />

                <TextInput
                    mt={8}
                        label={t("schools.fields.school_key")}
                        placeholder={t("schools.fields.school_key")}
                    {...getInputProps("school_key")}
                />

                <TextInput
                    mt={8}
                        label={t("schools.fields.p_o_box")}
                        placeholder={t("schools.fields.p_o_box")}
                    {...getInputProps("p_o_box")}
                />

                <TextInput
                    mt={8}
                        label={t("schools.fields.physical_address")}
                        placeholder={t("schools.fields.physical_address")}
                    {...getInputProps("physical_address")}
                />



                <Select
                    mt={8}
                    label={t("schools.fields.school_type")}
                    placeholder="Pick one"
                    {...getInputProps("school_type_id")}
                    defaultValue="2"
                    data={[
                        { label: "Pre-school", value: "1" },
                        { label: "Primary", value: "2" },
                        { label: "Secondary", value: "3" },
                        { label: "University", value: "4" },
                        { label: "Vocational", value: "5" },
                    ]}
                />

                <Text mt={8} weight={500} size="sm" color="#212529">
                        {t("schools.fields.about")}
                </Text>
                <RichTextEditor {...getInputProps("about")} />
                {errors.about && (
                    <Text mt={2} weight={500} size="xs" color="red">
                        {errors.about}
                    </Text>
                )}
            </form>
        </Create>
    );
};
