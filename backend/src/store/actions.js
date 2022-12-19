import axiosClient from "./../axios";

export async function getProducts({ commit }, { url = null }) {
    commit("setProducts", [true]);

    try {
        url = url || "/products";
        const response = await axiosClient.get(url);

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
