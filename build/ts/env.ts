const generate_env = ({ env, mode }: { env: Record<string, string>; mode: string }) => {
    const env_2 = JSON.stringify({
        version: process.env.npm_package_version,
        name: process.env.npm_package_name,
        browser: env.browser,
        mode: mode,
        env: env.env,
    });

    return env_2;
};

export { generate_env };
