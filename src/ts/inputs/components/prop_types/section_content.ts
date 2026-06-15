import type { i_inputs, o_inputs } from 'inputs/internal';

export interface SectionContent {
    section?: o_inputs.Section;
    inputs: i_inputs.Inputs | i_inputs.Links;
}
