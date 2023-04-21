export interface APIResponse {
    error : boolean;
    mensaje : string;
    resultado : any;
    data : any;

    // Paginaciones
    pagina?: number;
    por_pagina?: number;
    siguiente_pagina?: number;
    total_contenido?: number;
    total_paginas?: number;

    // testing SockerIo
    _body?:undefined;
}
