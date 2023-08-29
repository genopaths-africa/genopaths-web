
export interface ISchool {
    id: number;
    name: string;
    website?: string;
    phone?: string;
    emblem?: string;
    motto?: string;
    current_term_id?: string;
    admin_url?: string;
    p_o_box?: string;
    physical_address?: string;
    school_key?: string;
    gps?: string;
    about?: string;
    school_type_id?: number;
    createdAt: string;
}

export interface ColumnButtonProps {
    column: Column<any, any>;
}


type IProject = {
    id: number;
    name: string;
    description: string;
  };

type ILogin = {
    email: string;
    password: string;
}