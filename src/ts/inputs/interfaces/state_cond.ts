export interface StateCond {
    input_name: string;
    val_accessor?: string; // a.b.c
    pass_vals: (boolean | string | number)[];
}
