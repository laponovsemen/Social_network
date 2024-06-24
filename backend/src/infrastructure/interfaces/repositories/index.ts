import { UpdateById } from "./updateById";
import { GetById } from "./getById";
import { Create } from "./create";
import { Get } from "./get";
import { DeleteById } from "./deleteById";

export interface ApiRepository
    extends UpdateById,
        GetById,
        Create,
        Get,
        DeleteById {}
