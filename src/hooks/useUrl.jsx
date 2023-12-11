import { useSearchParams } from "react-router-dom";

export function useUrl() {
    const [searchParams, setSearchParams] = useSearchParams();

    function updateUrl(name, value) {
        if (value?.trim()) {
            searchParams.set(name, value);
        } else {
            searchParams.delete(name);
        }
        setSearchParams(searchParams);
    }

    function deleteUrl(...params) {
        params.forEach(param => searchParams.delete(param));
        setSearchParams(searchParams);
    }

    function getUrl(url, params) {
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key]) searchParams.set(key, params[key]);
                else searchParams.delete(key);
            })
        }
        return `${url}${searchParams.size ? "?" : ""}${searchParams.toString()}`
    }

    return { getUrl, updateUrl, deleteUrl, searchParams }
}