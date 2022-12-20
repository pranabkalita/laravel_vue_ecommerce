import axiosClient from "./../axios";

export async function updateProduct({ commit }, product) {
    const id = product.id;
    if (product.image instanceof File) {
        const form = new FormData();
        form.append("id", product.id);
        form.append("title", product.title);
        form.append("image", product.image);
        form.append("description", product.description);
        form.append("price", product.price);
        // form.append("_method", 'PUT');

        product = form;
    }

    return axiosClient.put(`/products/${id}`, product);
}

export async function createProduct({ commit }, product) {
    if (product.image instanceof File) {
        const form = new FormData();
        form.append("title", product.title);
        form.append("image", product.image);
        form.append("description", product.description);
        form.append("price", product.price);
        product = form;
    }

    return axiosClient.post("/products", product);
}

export async function getProducts(
    { commit },
    { url = null, search = "", perPage = 10, sortField, sortDirection } = {}
) {
    commit("setProducts", [true]);

    try {
        url = url || "/products";
        const response = await axiosClient.get(url, {
            params: {
                search,
                per_page: perPage,
                sort_field: sortField,
                sort_direction: sortDirection,
            },
        });

        commit("setProducts", [false, response.data]);
    } catch (error) {
        commit("setProducts", [false]);
    }
}

export async function login({ commit }, data) {
    const response = await axiosClient.post("/login", data);

    commit("setUser", response.data.user);
    commit("setToken", response.data.token);

    return response.data;
}

export async function logout({ commit }) {
    const response = await axiosClient.post("/logout");

    commit("setToken", null);

    return response;
}

export async function getUser({ commit }) {
    const response = await axiosClient.get("/user");

    commit("setUser", response.data);

    return response;
}

export async function deleteProduct({ commit }, id) {
    return axiosClient.delete(`/products/${id}`);
}
