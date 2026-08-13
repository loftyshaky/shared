import type { t } from 'shared_clean/internal';
import { s_env } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public version = (): string =>
        err(() => {
            return `v${(globalThis as t.AnyRecord)[s_env.Env.type()].get_app_version()}`;
        }, 'shr_1339');

    public suffix = (): string =>
        err(() => {
            const mode: string = env.mode.replace(/elopment|uction/, '');
            const browser: string = n(env) && env.env === 'ext' ? ` ${env.browser}` : '';
            const mode_final: string = browser === '' ? ` ${mode}` : `-${mode}`;
            const test: string = n(env) && env.test === 'true' ? `-test` : '';

            return `${browser}${mode_final}${test}`;
        }, 'shr_1334');
}

export const AppVersion = Class.get_instance();
