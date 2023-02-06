declare class Url {
    #private;
    constructor(url?: Url);
    constructor(urlparts?: Url.UrlParts);
    constructor(url?: string);
    constructor(scheme?: string | Scheme, host?: string | Host, port?: string | number | Port, path?: string | Path, query?: string | Query, fragment?: string | Fragment);
    get scheme(): string;
    set scheme(scheme: (string | Scheme | undefined | null));
    get host(): string;
    set host(host: (string | Host | undefined | null));
    get port(): string;
    set port(port: (string | number | Port | undefined | null));
    get path(): string;
    set path(path: (string | Path | undefined | null));
    get query(): string;
    set query(query: (string | Query | undefined | null));
    addQueryParam(keyOrKeyValue: string | [string, string], value?: string): void;
    removeQueryParam(key: string): void;
    get fragment(): string;
    set fragment(fragment: (string | Fragment | undefined | null));
    get isValid(): boolean;
    toString(): string;
    static encode(url: string): string;
    static decode(url: string): string;
    static encodePart(part: string): string;
    static decodePart(part: string): string;
}
declare namespace Url {
    interface UrlParts {
        scheme?: string | Scheme;
        host?: string | Host;
        port?: string | number | Port;
        path?: string | Path;
        query?: string | Query;
        fragment?: string | Fragment;
    }
    const _File: typeof File;
    const _Scheme: typeof Scheme;
    const _Host: typeof Host;
    const _Port: typeof Port;
    const _Path: typeof Path;
    const _Query: typeof Query;
    const _Fragment: typeof Fragment;
    const _SchemeHostPortPathQueryFragment: typeof SchemeHostPortPathQueryFragment;
}
//# sourceMappingURL=Url.d.ts.map