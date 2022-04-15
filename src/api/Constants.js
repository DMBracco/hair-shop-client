const API_BASE_URL_DEVELOPMENT = 'https://localhost:7043';

const ENDPOINTS = {
    GET_ALL: 'brand-get-list',
    GET_BY_ID: 'brand-get-by-id',
    CREATE: 'brand-post',
    UPDATE: 'brand-put-by-id',
    DELETE_BY_ID: 'brand-delete-by-id'
};

export const BrandsUrl = {
    API_URL_GET_ALL: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_ALL}`,
    API_URL_GET_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_BY_ID}`,
    API_URL_CREATE: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.CREATE}`,
    API_URL_UPDATE: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.UPDATE}`,
    API_URL_DELETE_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.DELETE_BY_ID}`
};

export const ProductTypesUrl = {
    API_URL_GET_ALL: `${API_BASE_URL_DEVELOPMENT}/productType-get-list`,
    API_URL_GET_BY_ID: `${API_BASE_URL_DEVELOPMENT}/productType-get-by-id`,
    API_URL_CREATE: `${API_BASE_URL_DEVELOPMENT}/productType-post`,
    API_URL_UPDATE: `${API_BASE_URL_DEVELOPMENT}/productType-put-by-id`,
    API_URL_DELETE_BY_ID: `${API_BASE_URL_DEVELOPMENT}/productType-delete-by-id`
}

export const SuppliersUrl = {
    API_URL_GET_ALL: `${API_BASE_URL_DEVELOPMENT}/supplier-get-list`,
    API_URL_GET_BY_ID: `${API_BASE_URL_DEVELOPMENT}/supplier-get-by-id`,
    API_URL_CREATE: `${API_BASE_URL_DEVELOPMENT}/supplier-post`,
    API_URL_UPDATE: `${API_BASE_URL_DEVELOPMENT}/supplier-put-by-id`,
    API_URL_DELETE_BY_ID: `${API_BASE_URL_DEVELOPMENT}/supplier-delete-by-id`
}

export const SuppliesUrl = {
    API_URL_GET_ALL: `${API_BASE_URL_DEVELOPMENT}/supply-get-list`,
    API_URL_GET_BY_ID: `${API_BASE_URL_DEVELOPMENT}/supply-get-by-id`,
    API_URL_CREATE: `${API_BASE_URL_DEVELOPMENT}/supply-post`,
    API_URL_UPDATE: `${API_BASE_URL_DEVELOPMENT}/supply-put-by-id`,
    API_URL_DELETE_BY_ID: `${API_BASE_URL_DEVELOPMENT}/supply-delete-by-id`
}

export default function formatDate(string){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
}

export const ProductsUrl = {
    API_URL_GET_ALL: `${API_BASE_URL_DEVELOPMENT}/product-get-list`,
    API_URL_GET_ALL_OF_SYPPLY: `${API_BASE_URL_DEVELOPMENT}/product-get-list-of-supply`,
    API_URL_GET_BY_ID: `${API_BASE_URL_DEVELOPMENT}/product-get-by-id`,
    API_URL_CREATE: `${API_BASE_URL_DEVELOPMENT}/product-post`,
    API_URL_UPDATE: `${API_BASE_URL_DEVELOPMENT}/product-put-by-id`,
    API_URL_DELETE_BY_ID: `${API_BASE_URL_DEVELOPMENT}/product-delete-by-id`,
    API_URL_OF_CREATE: `${API_BASE_URL_DEVELOPMENT}/product-get-brands-productTypes-hairTypes`
}

export const AccountsUrl = {
    API_URL_CHECK_USER: `${API_BASE_URL_DEVELOPMENT}/account-check-user`
}

export const UserRole = {
    ADMIN: 'admin',
    USER: 'user'
}