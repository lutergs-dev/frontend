
export const getEnv = async (envName: string) => {
    return await fetch('/env?' + new URLSearchParams({
        env: envName
    })).then(result => result.json());
}