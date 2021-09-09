import {service} from "../https";
import {objToUrl} from "../util/public.config";

export function getMenuData(data) {
    return service.get('ximalaya/api.php?'+objToUrl(data))
}
